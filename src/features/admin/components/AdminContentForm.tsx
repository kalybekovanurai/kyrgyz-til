import React from 'react';
import { Save } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { fieldLabels } from '../lib/adminConfig';
import { AdminFormValues } from '../model/types';

type AdminContentFormProps = {
  values: AdminFormValues;
  onChange: (key: string, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const longFields = new Set(['content', 'contentRu', 'description', 'descriptionRu']);

export function AdminContentForm({ values, onChange, onSubmit }: AdminContentFormProps) {
  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(values).map(([key, value]) => (
            <Field key={key} name={key} value={value} onChange={onChange} />
          ))}
        </div>
        <Button type="submit" icon={Save}>
          Материал кошуу
        </Button>
      </form>
    </Card>
  );
}

type FieldProps = {
  key?: React.Key;
  name: string;
  value: string;
  onChange: (key: string, value: string) => void;
};

function Field({ name, value, onChange }: FieldProps) {
  const isLong = longFields.has(name);

  if (name === 'category') {
    return (
      <FieldShell name={name}>
        <select value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input">
          <option value="events">Иш-чаралар</option>
          <option value="laws">Мыйзамдар</option>
          <option value="projects">Долбоорлор</option>
          <option value="education">Окутуу</option>
          <option value="media_news">Медиа жаңылыктар</option>
        </select>
      </FieldShell>
    );
  }

  if (name === 'type') {
    return (
      <FieldShell name={name}>
        <select value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input">
          <option value="podcast">Подкаст</option>
          <option value="survey">Сурамжылоо</option>
          <option value="video">Видео</option>
          <option value="text">Текст сабак</option>
          <option value="test">Тест</option>
        </select>
      </FieldShell>
    );
  }

  return (
    <label className={cn('space-y-2', isLong && 'md:col-span-2')}>
      <FieldLabel name={name} />
      {isLong ? (
        <textarea
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          rows={4}
          className="admin-input resize-none font-medium"
        />
      ) : (
        <input value={value} onChange={(event) => onChange(name, event.target.value)} className="admin-input" />
      )}
    </label>
  );
}

function FieldShell({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <FieldLabel name={name} />
      {children}
    </label>
  );
}

function FieldLabel({ name }: { name: string }) {
  return (
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {fieldLabels[name] || name}
    </span>
  );
}
