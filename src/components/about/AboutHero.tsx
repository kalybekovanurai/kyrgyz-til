import React from 'react';
import { Container, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

export const AboutHero = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-b border-gray-100 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl">
          <SectionHeading 
            title={t('about.hero.title')} 
            subtitle={t('about.hero.subtitle')}
            className="mb-0"
          />
        </div>
      </Container>
    </section>
  );
};
