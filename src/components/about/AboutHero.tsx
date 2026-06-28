import React from 'react';
import { Container, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';

export const AboutHero = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{
    hero?: {
      titleKy?: string;
      titleRu?: string;
      subtitleKy?: string;
      subtitleRu?: string;
    };
  }>('about');
  const hero = data.hero || {};

  return (
    <section className="bg-white border-b border-gray-100 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl">
          <SectionHeading 
            title={language === 'ky' ? hero.titleKy || t('about.hero.title') : hero.titleRu || hero.titleKy || t('about.hero.title')} 
            subtitle={language === 'ky' ? hero.subtitleKy || t('about.hero.subtitle') : hero.subtitleRu || hero.subtitleKy || t('about.hero.subtitle')}
            className="mb-0"
          />
        </div>
      </Container>
    </section>
  );
};
