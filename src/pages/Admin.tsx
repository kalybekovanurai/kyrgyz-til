import React from 'react';
import { Container, SectionHeading } from '@/src/components/ui';
import { api, adminRequest } from '@/src/lib/api';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { AdminContentForm } from '@/src/features/admin/components/AdminContentForm';
import { AdminItemsGrid } from '@/src/features/admin/components/AdminItemsGrid';
import { AdminTabs } from '@/src/features/admin/components/AdminTabs';
import { AdminTokenCard } from '@/src/features/admin/components/AdminTokenCard';
import { FileUploadCard } from '@/src/features/admin/components/FileUploadCard';
import { StatusAlert } from '@/src/features/admin/components/StatusAlert';
import { emptyForms } from '@/src/features/admin/lib/adminConfig';
import { AdminCollection, AdminFormValues, AdminItem } from '@/src/features/admin/model/types';
import { AdminLogin } from '@/src/features/auth/components/AdminLogin';
import { logoutAdmin } from '@/src/features/auth/authSlice';
import { checkAdminSession } from '@/src/features/auth/authThunk';

type AdminItems = Record<AdminCollection, AdminItem[]>;
type AdminForms = Record<AdminCollection, AdminFormValues>;

export default function Admin() {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [activeCollection, setActiveCollection] = React.useState<AdminCollection>('news');
  const [items, setItems] = React.useState<AdminItems>({ news: [], newspapers: [], media: [], lessons: [] });
  const [forms, setForms] = React.useState<AdminForms>(emptyForms);
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

  const updateForm = (key: string, value: string) => {
    setForms((current) => ({
      ...current,
      [activeCollection]: {
        ...current[activeCollection],
        [key]: value,
      },
    }));
  };

  const createItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Сакталып жатат...');
    const payload = Object.fromEntries(
      Object.entries(forms[activeCollection]).filter(([, value]) => String(value).trim() !== ''),
    );
    await adminRequest(`/api/${activeCollection}`, token, {
      method: 'POST',
      data: payload,
    });
    setForms((current) => ({ ...current, [activeCollection]: emptyForms[activeCollection] }));
    await loadItems();
    setStatus('Материал кошулду.');
  };

  const deleteItem = async (collection: AdminCollection, id: string) => {
    setStatus('Өчүрүлүп жатат...');
    await adminRequest(`/api/${collection}/${id}`, token, { method: 'DELETE' });
    await loadItems();
    setStatus('Материал өчүрүлдү.');
  };

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    setStatus('Файл жүктөлүп жатат...');
    const uploaded = await adminRequest<{ url: string }>('/api/uploads', token, {
      method: 'POST',
      formData: data,
    });
    setUploadedUrl(uploaded.url);
    setStatus('Файл жүктөлдү. URL талаага көчүрүп колдонсоңуз болот.');
  };

  const logout = () => {
    dispatch(logoutAdmin());
    setStatus('');
  };

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <Container>
          <SectionHeading
            title="Админ панель"
            subtitle={loading ? 'Сессия текшерилип жатат...' : 'Kyrgyztil.kg backend'}
            className="mb-0"
          />
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 md:gap-8">
          <aside className="space-y-6">
            <AdminTokenCard onLogout={logout} />
            <FileUploadCard uploadedUrl={uploadedUrl} onUpload={uploadFile} />
            <StatusAlert message={status} />
          </aside>

          <section className="space-y-6">
            <AdminTabs active={activeCollection} onChange={setActiveCollection} />
            <AdminContentForm
              values={forms[activeCollection]}
              onChange={updateForm}
              onSubmit={createItem}
            />
            <AdminItemsGrid
              collection={activeCollection}
              items={items[activeCollection]}
              onDelete={deleteItem}
            />
          </section>
        </div>
      </Container>
    </div>
  );
}
