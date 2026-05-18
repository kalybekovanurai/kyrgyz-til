import React from 'react';
import { Save, X } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { cn } from '@/src/lib/utils';
import { categoryOptions, fieldLabels, typeOptions } from '../lib/adminConfig';
import { AdminCollection, AdminFormValues } from '../model/types';
type AdminContentFormProps = {
    values: AdminFormValues;
    collection: AdminCollection;
    onChange: (key: string, value: string) => void;
    onSubmit: (event: React.FormEvent) => void;
    isEditing?: boolean;
    onCancelEdit?: () => void;
};
const longFields = new Set(['content', 'contentRu', 'description', 'descriptionRu']);
const text = {
    ky: { editing: 'Редактирлөө', cancel: 'Жокко чыгаруу', save: 'Өзгөртүүлөрдү сактоо', create: 'Материал кошуу' },
    ru: { editing: 'Редактирование', cancel: 'Отмена', save: 'Сохранить изменения', create: 'Добавить материал' },
};
export const AdminContentForm = ({ values, collection, onChange, onSubmit, isEditing, onCancelEdit, }: AdminContentFormProps) => {
    const { language } = useLanguage();
    const copy = text[language];
    return (<Card>
      {isEditing && (<div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="text-sm font-black uppercase tracking-widest text-brand-primary">{copy.editing}</span>
          <button type="button" onClick={onCancelEdit} className="cursor-pointer flex items-center gap-1 text-xs font-bold text-gray-400 transition-colors hover:text-red-500">
            <X className="h-4 w-4"/> {copy.cancel}
          </button>
        </div>)}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(values).map(([key, value]) => (<Field key={key} collection={collection} name={key} value={value} onChange={onChange}/>))}
        </div>
        <Button type="submit" icon={Save}>
          {isEditing ? copy.save : copy.create}
        </Button>
      </form>
    </Card>);
};
type FieldProps = {
    key?: React.Key;
    collection: AdminCollection;
    name: string;
    value: string;
    onChange: (key: string, value: string) => void;
};
const Field = ({ collection, name, value, onChange }: FieldProps) => {
    const { language } = useLanguage();
    const isLong = longFields.has(name);
    if (name === 'category') {
        const options = collection === 'media' ? categoryOptions.media : categoryOptions.news;
        return (<FieldShell name={name}>
        <select value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input">
          {options.map((option) => (<option key={option.value} value={option.value}>
              {option.labels[language]}
            </option>))}
        </select>
      </FieldShell>);
    }
    if (name === 'type') {
        return (<FieldShell name={name}>
        <select value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input">
          {typeOptions.map((option) => (<option key={option.value} value={option.value}>
              {option.labels[language]}
            </option>))}
        </select>
      </FieldShell>);
    }
    return (<label className={cn('space-y-2', isLong && 'md:col-span-2')}>
      <FieldLabel name={name}/>
      {isLong ? (<textarea value={value} onChange={(event) => onChange(name, event.target.value)} rows={4} className="admin-input resize-none font-medium"/>) : (<input value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input"/>)}
    </label>);
};
const FieldShell = ({ name, children }: {
    name: string;
    children: React.ReactNode;
}) => {
    return (<label className="space-y-2">
      <FieldLabel name={name}/>
      {children}
    </label>);
};
const FieldLabel = ({ name }: {
    name: string;
}) => {
    const { language } = useLanguage();
    return <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{fieldLabels[language][name] || name}</span>;
};
