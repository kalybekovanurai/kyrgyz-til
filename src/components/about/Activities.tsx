import React from 'react';
import { Card, Container, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';
import { cn } from '@/src/lib/utils';

type ActivityItem = {
  titleKy?: string;
  titleRu?: string;
  bg?: string;
};

export const Activities = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{
    activities?: {
      titleKy?: string;
      titleRu?: string;
      items?: ActivityItem[];
    };
  }>('about');
  const activities = data.activities?.items || [];

  return (
    <Container className="pb-16 md:pb-24">
      <div className="mt-8 space-y-16 md:mt-16 md:space-y-24">
        <SectionHeading
          title={language === 'ky' ? data.activities?.titleKy || t('about.activities.title') : data.activities?.titleRu || data.activities?.titleKy || t('about.activities.title')}
          centered
          className="mb-0"
        />
        <div className="grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4">
          {activities.map((item, index) => (
            <Card key={`${item.titleKy}-${index}`} className="group relative flex flex-col items-center p-8 text-center md:p-12" hoverEffect>
              <div className={cn('absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl text-xs font-black text-brand-primary shadow-lg shadow-black/5 transition-transform group-hover:-translate-y-2', item.bg || 'bg-blue-50')}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-4 text-[11px] font-black uppercase leading-tight tracking-tight text-brand-primary md:text-sm">
                {language === 'ky' ? item.titleKy : item.titleRu || item.titleKy}
              </h3>
              <div className="mt-6 h-0.5 w-8 bg-gray-100 transition-all group-hover:w-16 group-hover:bg-brand-primary" />
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};
