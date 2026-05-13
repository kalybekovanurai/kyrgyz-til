import { LogOut, ShieldCheck } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';

type AdminTokenCardProps = {
  onLogout: () => void;
};

export function AdminTokenCard({ onLogout }: AdminTokenCardProps) {
  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-primary" />
        <h2 className="text-sm font-black uppercase text-brand-primary">Admin access</h2>
      </div>
      <p className="text-sm leading-relaxed text-gray-500">
        Панель көрүнүп турат, бирок өзгөртүү, өчүрүү жана файл жүктөө backend token аркылуу гана иштейт.
      </p>
      <Button type="button" size="sm" className="w-full" icon={LogOut} onClick={onLogout}>
        Чыгуу
      </Button>
    </Card>
  );
}
