import React from 'react';
import { Lock } from 'lucide-react';
import { Button, Container, SectionHeading } from '@/src/components/ui';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { adminLogin } from '@/src/features/auth/authThunk';

export function AdminLogin() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [password, setPassword] = React.useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(adminLogin({ password }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <Container>
          <SectionHeading title="Админ панель" subtitle="Кирүү үчүн сыр сөз керек" className="mb-0" />
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <form onSubmit={submit} className="mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Lock className="h-5 w-5" />
          </div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="admin-password">
            Admin сыр сөз
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="admin-input mt-2"
            placeholder="Сыр сөздү жазыңыз"
            autoComplete="current-password"
          />
          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          <Button type="submit" className="mt-5 w-full justify-center" disabled={loading || !password.trim()}>
            {loading ? 'Текшерилип жатат...' : 'Кирүү'}
          </Button>
        </form>
      </Container>
    </div>
  );
}
