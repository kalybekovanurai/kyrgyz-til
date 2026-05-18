import { Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { AdminCollection, AdminItem } from '../model/types';
type AdminItemsGridProps = {
    collection: AdminCollection;
    items: AdminItem[];
    onDelete: (collection: AdminCollection, id: string) => void;
    onEdit: (item: AdminItem) => void;
};
const text = {
    ky: { empty: 'Материалдар азырынча жок.', edit: 'Редактирлөө', delete: 'Өчүрүү' },
    ru: { empty: 'Материалов пока нет.', edit: 'Редактировать', delete: 'Удалить' },
};
export const AdminItemsGrid = ({ collection, items, onDelete, onEdit }: AdminItemsGridProps) => {
    const { language } = useLanguage();
    const copy = text[language];
    if (items.length === 0) {
        return (<Card>
        <p className="text-sm font-bold text-gray-400">{copy.empty}</p>
      </Card>);
    }
    return (<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {items.map((item) => (<Card key={item.id} className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {String(item.date || item.type || item.number || '')}
              </p>
              <h3 className="truncate text-base font-black uppercase leading-snug text-brand-primary">
                {String(item.title || item.number || item.id)}
              </h3>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => onEdit(item)} className="rounded-lg bg-blue-50 p-2 text-blue-500 transition-colors hover:bg-brand-primary hover:text-white" aria-label={copy.edit} title={copy.edit}>
                <Pencil className="h-4 w-4"/>
              </button>
              <button onClick={() => onDelete(collection, item.id)} className="rounded-lg bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white" aria-label={copy.delete} title={copy.delete}>
                <Trash2 className="h-4 w-4"/>
              </button>
            </div>
          </div>
          <p className="line-clamp-2 text-sm text-gray-500">
            {String(item.content || item.description || item.pdfUrl || item.url || '')}
          </p>
        </Card>))}
    </div>);
};
