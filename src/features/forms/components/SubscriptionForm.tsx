import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { submitSubscription } from '../formService';
import { useSubmitState } from '../useSubmitState';
import { FormStatusMessage } from './FormStatusMessage';
export const SubscriptionForm = () => {
    const { t } = useLanguage();
    const [email, setEmail] = React.useState('');
    const submit = useSubmitState();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        submit.run(async () => {
            await submitSubscription({ email, source: 'home_subscription' });
            setEmail('');
        }, 'Жазылуу сакталды', 'Ката кетти. Кайра аракет кылыңыз.');
    };
    return (<form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="ml-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          {t('sub.email_label')}
        </label>
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@mail.com" className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold shadow-sm outline-none transition-all focus:border-brand-primary md:px-8 md:py-5"/>
      </div>
      <FormStatusMessage status={submit.status} message={submit.message}/>
      <Button type="submit" disabled={submit.isLoading} className="h-[60px] w-full rounded-2xl md:h-[70px]" icon={Send}>
        {submit.isLoading ? 'Жөнөтүлүүдө...' : t('sub.btn')}
      </Button>
    </form>);
};
