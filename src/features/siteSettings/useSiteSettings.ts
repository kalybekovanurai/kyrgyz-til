import React from 'react';
import { api } from '@/src/lib/api';
import { SiteSettings } from '@/src/types';
import { defaultSiteSettings } from './defaults';

export const useSiteSettings = <T extends Record<string, unknown>>(id: string) => {
  const fallback = defaultSiteSettings[id] as SiteSettings | undefined;
  const [settings, setSettings] = React.useState<SiteSettings | null>(fallback ?? null);

  React.useEffect(() => {
    let alive = true;
    api.siteSettingsItem(id).then((item) => {
      if (alive && item) {
        setSettings(item);
      }
    });
    return () => {
      alive = false;
    };
  }, [id]);

  return {
    settings,
    data: (settings?.data || fallback?.data || {}) as T,
  };
};
