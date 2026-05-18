import { LogOut, ShieldCheck } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
type AdminTokenCardProps = {
    onLogout: () => void;
};
const text = {
    ky: {
        title: 'Admin access',
        description: 'Панель көрүнүп турат, бирок өзгөртүү, өчүрүү жана файл жүктөө backend token аркылуу гана иштейт.',
        logout: 'Чыгуу',
    },
    ru: {
        title: 'Admin access',
        description: 'Панель доступна, но изменение, удаление и загрузка файлов работают только через backend token.',
        logout: 'Выйти',
    },
};
export const AdminTokenCard = ({ onLogout }: AdminTokenCardProps) => {
    const { language } = useLanguage();
    const copy = text[language];
    return (<Card className="space-y-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-brand-primary"/>
        <h2 className="text-sm font-black uppercase text-brand-primary">{copy.title}</h2>
      </div>
      <p className="text-sm leading-relaxed text-gray-500">{copy.description}</p>
      <Button type="button" size="sm" className="w-full" icon={LogOut} onClick={onLogout}>
        {copy.logout}
      </Button>
    </Card>);
};
