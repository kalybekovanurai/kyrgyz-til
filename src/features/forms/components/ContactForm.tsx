import React from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { submitContactMessage } from '../formService';
import { useSubmitState } from '../useSubmitState';
import { FormStatusMessage } from './FormStatusMessage';
export const ContactForm = React.forwardRef<HTMLDivElement>((_, ref) => {
    const { t } = useLanguage();
    const submit = useSubmitState();
    const [values, setValues] = React.useState({ name: '', email: '', message: '' });
    const change = (key: keyof typeof values, value: string) => {
        setValues((current) => ({ ...current, [key]: value }));
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        submit.run(async () => {
            await submitContactMessage(values);
            setValues({ name: '', email: '', message: '' });
        }, 'Кайрылууңуз сакталды', 'Ката кетти. Кайра аракет кылыңыз.');
    };
    return (<div ref={ref}>
      <Card padding="lg" className="h-full">
        <div className="mb-10 flex items-center gap-4 md:mb-12">
          <div className="rounded-xl bg-brand-primary p-3 text-white">
            <MessageSquare className="h-6 w-6"/>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-brand-primary md:text-2xl">
            {t('contact.form.title')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <FormField label={t('contact.form.name')} value={values.name} placeholder={t('contact.form.name_placeholder')} onChange={(value) => change('name', value)}/>
            <FormField label={t('contact.form.email')} value={values.email} placeholder="example@mail.com" type="email" onChange={(value) => change('email', value)}/>
          </div>
          <FormField label={t('contact.form.message')} value={values.message} placeholder={t('contact.form.message_placeholder')} multiline onChange={(value) => change('message', value)}/>
          <FormStatusMessage status={submit.status} message={submit.message}/>
          <Button type="submit" disabled={submit.isLoading} icon={Send} className="w-full sm:w-auto">
            {submit.isLoading ? 'Жөнөтүлүүдө...' : t('contact.form.btn')}
          </Button>
        </form>
      </Card>
    </div>);
});
ContactForm.displayName = 'ContactForm';
type FormFieldProps = {
    label: string;
    value: string;
    placeholder: string;
    type?: string;
    multiline?: boolean;
    onChange: (value: string) => void;
};
const FormField = ({ label, value, placeholder, type = 'text', multiline, onChange }: FormFieldProps) => {
    const controlClass = 'w-full border-b-2 border-gray-100 bg-transparent px-0 py-4 text-sm font-bold outline-none transition-colors placeholder:text-gray-200 focus:border-brand-primary';
    return (<label className="block space-y-3">
      <span className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      {multiline ? (<textarea required rows={4} value={value} onChange={(event) => onChange(event.target.value)} className={`${controlClass} resize-none`} placeholder={placeholder}/>) : (<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className={`${controlClass} ${type === 'text' ? 'uppercase' : ''}`} placeholder={placeholder}/>)}
    </label>);
};
