import React from 'react';
import { Save } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { SiteSettings } from '@/src/types';

type FlatSettings = Record<string, string>;

const pageLabels = {
  ky: {
    title: 'Сайт баракчалары',
    subtitle: 'Бул жерде сайттагы статикалык тексттер, байланыштар, өнөктөштөр жана баракча блоктору өзгөртүлөт.',
    page: 'Баракча',
    save: 'Баракчаны сактоо',
    jsonHint: 'Тизмелер жана татаал блоктор JSON форматында сакталат.',
  },
  ru: {
    title: 'Страницы сайта',
    subtitle: 'Здесь редактируются статические тексты, контакты, партнеры и блоки страниц.',
    page: 'Страница',
    save: 'Сохранить страницу',
    jsonHint: 'Списки и сложные блоки сохраняются в JSON-формате.',
  },
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const flattenSettings = (value: Record<string, unknown>, prefix = ''): FlatSettings => {
  return Object.entries(value).reduce<FlatSettings>((acc, [key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isObject(item)) {
      return { ...acc, ...flattenSettings(item, path) };
    }
    acc[path] = Array.isArray(item) ? JSON.stringify(item, null, 2) : String(item ?? '');
    return acc;
  }, {});
};

const assignPath = (target: Record<string, unknown>, path: string, value: string) => {
  const keys = path.split('.');
  let cursor = target;
  keys.slice(0, -1).forEach((key) => {
    if (!isObject(cursor[key])) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  });
  const finalKey = keys[keys.length - 1];
  const trimmed = value.trim();
  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      cursor[finalKey] = JSON.parse(trimmed);
      return;
    } catch {
      cursor[finalKey] = value;
      return;
    }
  }
  cursor[finalKey] = value;
};

const unflattenSettings = (values: FlatSettings) => {
  const result: Record<string, unknown> = {};
  Object.entries(values).forEach(([key, value]) => assignPath(result, key, value));
  return result;
};

interface PageSettingsPanelProps {
  pages: SiteSettings[];
  onSave: (page: SiteSettings) => Promise<void>;
}

export const PageSettingsPanel = ({ pages, onSave }: PageSettingsPanelProps) => {
  const { language } = useLanguage();
  const copy = pageLabels[language];
  const [activeId, setActiveId] = React.useState(pages[0]?.id || 'home');
  const activePage = pages.find((page) => page.id === activeId) || pages[0];
  const [values, setValues] = React.useState<FlatSettings>({});

  React.useEffect(() => {
    if (activePage) {
      setValues(flattenSettings(activePage.data));
    }
  }, [activePage]);

  if (!activePage) {
    return null;
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSave({ ...activePage, data: unflattenSettings(values) });
  };

  return (
    <Card>
      <div className="mb-6 space-y-2 border-b border-gray-100 pb-5">
        <h2 className="text-lg font-black uppercase tracking-tighter text-brand-primary">{copy.title}</h2>
        <p className="text-sm font-semibold text-gray-400">{copy.subtitle}</p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <label className="block space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{copy.page}</span>
          <select value={activeId} onChange={(event) => setActiveId(event.target.value)} className="admin-input">
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {language === 'ky' ? page.title : page.titleRu || page.title}
              </option>
            ))}
          </select>
        </label>

        <p className="rounded-lg bg-slate-50 p-4 text-xs font-bold text-gray-500">{copy.jsonHint}</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(values).map(([key, rawValue]) => {
            const value = String(rawValue);
            const isLong = value.length > 80 || value.trim().startsWith('[');
            return (
              <label key={key} className={`space-y-2 ${isLong ? 'md:col-span-2' : ''}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{key}</span>
                {isLong ? (
                  <textarea
                    value={value}
                    onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                    rows={8}
                    className="admin-input resize-y font-mono text-xs"
                  />
                ) : (
                  <input
                    value={value}
                    onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                    className="admin-input"
                  />
                )}
              </label>
            );
          })}
        </div>

        <Button type="submit" icon={Save}>{copy.save}</Button>
      </form>
    </Card>
  );
};
