import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { adminTabs } from '../lib/adminConfig';
import { AdminCollection } from '../model/types';
type AdminTabsProps = {
    active: AdminCollection;
    onChange: (collection: AdminCollection) => void;
};
export const AdminTabs = ({ active, onChange }: AdminTabsProps) => {
    const { language } = useLanguage();
    return (<div className="flex flex-wrap gap-2">
      {adminTabs.map((tab) => (<button key={tab.id} onClick={() => onChange(tab.id)} className={cn('inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition-all', active === tab.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white text-gray-500 hover:text-brand-primary')}>
          <tab.icon className="w-4 h-4"/>
          {tab.labels[language]}
        </button>))}
    </div>);
};
