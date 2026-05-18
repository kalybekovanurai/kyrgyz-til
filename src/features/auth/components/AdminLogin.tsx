import React from 'react';
import { Lock } from 'lucide-react';
import { Button, Container, SectionHeading } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { adminLogin } from '@/src/features/auth/authThunk';
import { loginWithToken } from '@/src/features/auth/authSlice';
const isProd = import.meta.env.PROD;
const hostedAdminToken = import.meta.env.VITE_ADMIN_TOKEN as string | undefined;
const text = {
    ky: {
        title: 'Админ панель',
        subtitle: 'Кирүү үчүн сыр сөз керек',
        password: 'Admin сыр сөз',
        placeholder: 'Сыр сөздү жазыңыз',
        invalid: 'Сыр сөз туура эмес',
        checking: 'Текшерилип жатат...',
        login: 'Кирүү',
    },
    ru: {
        title: 'Админ панель',
        subtitle: 'Для входа нужен пароль',
        password: 'Пароль администратора',
        placeholder: 'Введите пароль',
        invalid: 'Неверный пароль',
        checking: 'Проверяется...',
        login: 'Войти',
    },
};
export const AdminLogin = () => {
    const { language } = useLanguage();
    const copy = text[language];
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [password, setPassword] = React.useState('');
    const [prodError, setProdError] = React.useState('');
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isProd) {
            if (hostedAdminToken && password.trim() === hostedAdminToken.trim()) {
                dispatch(loginWithToken(password.trim()));
            }
            else {
                setProdError(copy.invalid);
            }
            return;
        }
        dispatch(adminLogin({ password }));
    };
    const displayError = isProd ? prodError : error;
    return (<div className="min-h-screen bg-slate-50">
      <section className="border-b border-gray-100 bg-white py-12 md:py-16">
        <Container>
          <SectionHeading title={copy.title} subtitle={copy.subtitle} className="mb-0"/>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <form onSubmit={submit} className="mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Lock className="h-5 w-5"/>
          </div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="admin-password">
            {copy.password}
          </label>
          <input id="admin-password" type="password" value={password} onChange={(event) => {
            setPassword(event.target.value);
            setProdError('');
        }} className="admin-input mt-2" placeholder={copy.placeholder} autoComplete="current-password"/>
          {displayError && <p className="mt-3 text-sm font-semibold text-red-600">{displayError}</p>}
          <Button type="submit" className="mt-5 w-full justify-center" disabled={loading || !password.trim()}>
            {loading ? copy.checking : copy.login}
          </Button>
        </form>
      </Container>
    </div>);
};
