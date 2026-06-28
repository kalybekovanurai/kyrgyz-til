import React from 'react';
import { Container, SectionHeading } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { api } from '@/src/lib/api';
import { storage } from '@/src/lib/firebase';
import { firestoreCreate, firestoreDelete, firestoreUpdate } from '@/src/lib/adminFirestore';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { AdminContentForm } from '@/src/features/admin/components/AdminContentForm';
import { AdminItemsGrid } from '@/src/features/admin/components/AdminItemsGrid';
import { AdminTabs } from '@/src/features/admin/components/AdminTabs';
import { AdminTokenCard } from '@/src/features/admin/components/AdminTokenCard';
import { FileUploadCard } from '@/src/features/admin/components/FileUploadCard';
import { PageSettingsPanel } from '@/src/features/admin/components/PageSettingsPanel';
import { StatusAlert } from '@/src/features/admin/components/StatusAlert';
import { defaultSiteSettings } from '@/src/features/siteSettings/defaults';
import { adminText, emptyForms } from '@/src/features/admin/lib/adminConfig';
import { saveHostedItem } from '@/src/features/admin/lib/hostedData';
import { AdminCollection, AdminFormValues, AdminItem } from '@/src/features/admin/model/types';
import { AdminLogin } from '@/src/features/auth/components/AdminLogin';
import { logoutAdmin } from '@/src/features/auth/authSlice';
import { checkAdminSession } from '@/src/features/auth/authThunk';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
type AdminItems = Record<AdminCollection, AdminItem[]>;
type AdminForms = Record<AdminCollection, AdminFormValues>;
const initialItems: AdminItems = {
    news: [],
    newspapers: [],
    media: [],
    lessons: [],
};
const compactPayload = (values: AdminFormValues) => {
    return Object.fromEntries(Object.entries(values).filter(([, value]) => String(value).trim() !== ''));
};
const getUploadPath = (file: File) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    return `uploads/${Date.now()}-${safeName}`;
};
const Admin = () => {
    const { language } = useLanguage();
    const text = adminText[language];
    const dispatch = useAppDispatch();
    const { token, isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const [activeCollection, setActiveCollection] = React.useState<AdminCollection>('news');
    const [items, setItems] = React.useState<AdminItems>(initialItems);
    const [siteSettings, setSiteSettings] = React.useState(Object.values(defaultSiteSettings));
    const [forms, setForms] = React.useState<AdminForms>(emptyForms);
    const [editingItem, setEditingItem] = React.useState<AdminItem | null>(null);
    const [uploadedUrl, setUploadedUrl] = React.useState('');
    const [status, setStatus] = React.useState('');
    React.useEffect(() => {
        if (token && !isAuthenticated) {
            dispatch(checkAdminSession(token));
        }
    }, [dispatch, isAuthenticated, token]);
    const loadItems = React.useCallback(async () => {
        const [news, newspapers, media, lessons] = await Promise.all([
            api.news(),
            api.newspapers(),
            api.media(),
            api.lessons(),
        ]);
        setItems({
            news: news as unknown as AdminItem[],
            newspapers: newspapers as unknown as AdminItem[],
            media: media as unknown as AdminItem[],
            lessons: lessons as unknown as AdminItem[],
        });
        const settings = await api.siteSettings();
        if (settings.length > 0) {
            setSiteSettings(settings);
        }
    }, []);
    React.useEffect(() => {
        if (isAuthenticated) {
            loadItems().catch((error) => setStatus(error.message));
        }
    }, [isAuthenticated, loadItems]);
    const resetForm = React.useCallback(() => {
        setEditingItem(null);
        setForms((current) => ({ ...current, [activeCollection]: emptyForms[activeCollection] }));
    }, [activeCollection]);
    const updateForm = (key: string, value: string) => {
        setForms((current) => ({
            ...current,
            [activeCollection]: {
                ...current[activeCollection],
                [key]: value,
            },
        }));
    };
    const startEditing = (item: AdminItem) => {
        const fields = emptyForms[activeCollection];
        const prefilled = Object.fromEntries(Object.keys(fields).map((key) => [key, String(item[key] ?? '')])) as AdminFormValues;
        setEditingItem(item);
        setForms((current) => ({ ...current, [activeCollection]: prefilled }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const createItem = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus(text.saving);
        const payload = compactPayload(forms[activeCollection]);
        const createdRef = await firestoreCreate(activeCollection, payload);
        const created = { id: createdRef.id, ...payload };
        await saveHostedItem(activeCollection, created);
        await loadItems();
        resetForm();
        setStatus(text.saved);
    };
    const updateItem = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editingItem)
            return;
        setStatus(text.updating);
        const payload = compactPayload(forms[activeCollection]);
        await firestoreUpdate(activeCollection, editingItem.id, payload);
        const updated = { ...editingItem, ...payload, id: editingItem.id };
        await saveHostedItem(activeCollection, updated);
        await loadItems();
        resetForm();
        setStatus(text.updated);
    };
    const deleteItem = async (collection: AdminCollection, id: string) => {
        setStatus(text.deleting);
        await firestoreDelete(collection, id);
        if (editingItem?.id === id)
            resetForm();
        await loadItems();
        setStatus(text.deleted);
    };
    const uploadFile = async (file: File) => {
        setStatus(text.uploading);
        const ref = storageRef(storage, getUploadPath(file));
        await uploadBytes(ref, file);
        const url = await getDownloadURL(ref);
        setUploadedUrl(url);
        setStatus(text.uploaded);
    };
    const savePageSettings = async (page: (typeof siteSettings)[number]) => {
        setStatus(text.saving);
        const updated = page;
        await saveHostedItem('siteSettings', updated as unknown as AdminItem);
        setSiteSettings((current) => current.map((item) => item.id === updated.id ? updated : item));
        setStatus(text.saved);
    };
    const logout = () => {
        dispatch(logoutAdmin());
        setStatus('');
    };
    const changeTab = (collection: AdminCollection) => {
        setActiveCollection(collection);
        setEditingItem(null);
        setForms((current) => ({ ...current, [collection]: emptyForms[collection] }));
    };
    if (!isAuthenticated) {
        return <AdminLogin />;
    }
    return (<div className="min-h-screen bg-slate-50">
      <section className="border-b border-gray-100 bg-white py-12 md:py-16">
        <Container>
          <SectionHeading title={text.pageTitle} subtitle={loading ? text.checkingSession : text.backendSubtitle} className="mb-0"/>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <AdminTokenCard onLogout={logout}/>
            <FileUploadCard uploadedUrl={uploadedUrl} onUpload={uploadFile}/>
            <StatusAlert message={status}/>
          </aside>

          <section className="space-y-6">
            <AdminTabs active={activeCollection} onChange={changeTab}/>
            <AdminContentForm values={forms[activeCollection]} collection={activeCollection} onChange={updateForm} onSubmit={editingItem ? updateItem : createItem} isEditing={Boolean(editingItem)} onCancelEdit={resetForm}/>
            <AdminItemsGrid collection={activeCollection} items={items[activeCollection]} onDelete={deleteItem} onEdit={startEditing}/>
            <PageSettingsPanel pages={siteSettings} onSave={savePageSettings}/>
          </section>
        </div>
      </Container>
    </div>);
};
export default Admin;
