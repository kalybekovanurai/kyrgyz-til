import React from 'react';
import { Container, SectionHeading, Card } from '../ui';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';

export const Activities = () => {
  const { t } = useLanguage();

  const activities = [
    { id: '01', title: t('about.activities.1'), bg: 'bg-blue-50' },
    { id: '02', title: t('about.activities.2'), bg: 'bg-green-50' },
    { id: '03', title: t('about.activities.3'), bg: 'bg-red-50' },
    { id: '04', title: t('about.activities.4'), bg: 'bg-orange-50' }
  ];

  return (
    <Container className="pb-16 md:pb-24">
      <div className="mt-8 md:mt-16 space-y-16 md:space-y-24">
        <SectionHeading 
          title={t('about.activities.title')} 
          centered 
          className="mb-0"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {activities.map((item) => (
            <Card key={item.id} className="flex flex-col items-center text-center p-8 md:p-12 relative group" hoverEffect>
              <div className={cn("absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg shadow-black/5 group-hover:-translate-y-2 transition-transform", item.bg, "text-brand-primary")}>
                {item.id}
              </div>
              <h3 className="text-[11px] md:text-sm font-black text-brand-primary uppercase tracking-tight leading-tight mt-4">{item.title}</h3>
              <div className="w-8 h-0.5 bg-gray-100 group-hover:w-16 group-hover:bg-brand-primary transition-all mt-6" />
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};
