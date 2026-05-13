import { Trash2 } from 'lucide-react';
import { Card } from '@/src/components/ui';
import { AdminCollection, AdminItem } from '../model/types';

type AdminItemsGridProps = {
  collection: AdminCollection;
  items: AdminItem[];
  onDelete: (collection: AdminCollection, id: string) => void;
};

export function AdminItemsGrid({ collection, items, onDelete }: AdminItemsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {String(item.date || item.type || item.number || '')}
              </p>
              <h3 className="text-base font-black uppercase leading-snug text-brand-primary">
                {String(item.title || item.number || item.id)}
              </h3>
            </div>
            <button
              onClick={() => onDelete(collection, item.id)}
              className="shrink-0 rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Delete item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="line-clamp-3 text-sm text-gray-500">
            {String(item.content || item.description || item.pdfUrl || item.url || '')}
          </p>
        </Card>
      ))}
    </div>
  );
}

