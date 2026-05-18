import React from 'react';
import { Container, SectionHeading } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { api, adminRequest } from '@/src/lib/api';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { AdminContentForm } from '@/src/features/admin/components/AdminContentForm';
import { AdminItemsGrid } from '@/src/features/admin/components/AdminItemsGrid';
import { AdminTabs } from '@/src/features/admin/components/AdminTabs';
import { AdminTokenCard } from '@/src/features/admin/components/AdminTokenCard';
import { FileUploadCard } from '@/src/features/admin/components/FileUploadCard';
import { StatusAlert } from '@/src/features/admin/components/StatusAlert';
import { adminText, emptyForms } from '@/src/features/admin/lib/adminConfig';
import { deleteHostedItem, saveHostedItem } from '@/src/features/admin/lib/hostedData';
import { AdminCollection, AdminFormValues, AdminItem } from '@/src/features/admin/model/types';
import { AdminLogin } from '@/src/features/auth/components/AdminLogin';
import { logoutAdmin } from '@/src/features/auth/authSlice';
import { checkAdminSession } from '@/src/features/auth/authThunk';
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
const Admin = () => {
    const { language } = useLanguage();
    const text = adminText[language];
    const dispatch = useAppDispatch();
    const { token, isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const [activeCollection, setActiveCollection] = React.useState<AdminCollection>('news');
    const [items, setItems] = React.useState<AdminItems>(initialItems);
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
        setItems({ news, newspapers, media, lessons });
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
        const created = await adminRequest<AdminItem>(`/api/${activeCollection}`, token, {
            method: 'POST',
            data: compactPayload(forms[activeCollection]),
        });
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
        const updated = await adminRequest<AdminItem>(`/api/${activeCollection}/${editingItem.id}`, token, {
            method: 'PUT',
            data: compactPayload(forms[activeCollection]),
        });
        await saveHostedItem(activeCollection, updated);
        await loadItems();
        resetForm();
        setStatus(text.updated);
    };
    const deleteItem = async (collection: AdminCollection, id: string) => {
        setStatus(text.deleting);
        await adminRequest(`/api/${collection}/${id}`, token, { method: 'DELETE' });
        await deleteHostedItem(collection, id);
        if (editingItem?.id === id)
            resetForm();
        await loadItems();
        setStatus(text.deleted);
    };
    const uploadFile = async (file: File) => {
        const data = new FormData();
        data.append('file', file);
        setStatus(text.uploading);
        const uploaded = await adminRequest<{
            url: string;
        }>('/api/uploads', token, {
            method: 'POST',
            formData: data,
        });
        setUploadedUrl(uploaded.url);
        setStatus(text.uploaded);
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
          </section>
        </div>
      </Container>
    </div>);
};
export default Admin;
