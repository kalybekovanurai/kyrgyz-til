import { Mail, MapPin, Phone } from 'lucide-react';
import { Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';
export const ContactInfoCards = () => {
    const { language, t } = useLanguage();
    const { data } = useSiteSettings<{
        phone?: string;
        email?: string;
        addressKy?: string;
        addressRu?: string;
    }>('contacts');
    const items = [
        { icon: Phone, label: t('contact.phone'), value: data.phone || '+996 (312) 66-00-00' },
        { icon: Mail, label: t('contact.email'), value: data.email || 'info@kyrgyztil.kg' },
        { icon: MapPin, label: t('contact.address'), value: language === 'ky' ? data.addressKy || t('footer.address_value') : data.addressRu || data.addressKy || t('footer.address_value') },
    ];
    return (<div className="space-y-4 md:space-y-6">
      {items.map((item) => (<Card key={item.label} className="group flex items-center gap-6 p-6 hover:border-brand-primary md:p-8" hoverEffect>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-brand-primary transition-all group-hover:bg-brand-primary group-hover:text-white md:h-14 md:w-14">
            <item.icon className="h-5 w-5 md:h-6 md:w-6"/>
          </div>
          <div>
            <p className="mb-1 text-[8px] font-black uppercase tracking-widest text-gray-400 md:text-[9px]">
              {item.label}
            </p>
            <p className="text-xs font-black uppercase tracking-tight text-brand-primary md:text-sm">{item.value}</p>
          </div>
        </Card>))}
    </div>);
};
