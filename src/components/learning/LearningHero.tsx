import React from 'react';
import { Container, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

export const LearningHero = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-b border-gray-100 py-16 md:py-20">
      <Container className="text-center">
        <SectionHeading 
          title={t('nav.learning')} 
          subtitle={t('learning.hero.subtitle')}
          centered
          className="mb-6"
        />
        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest max-w-2xl mx-auto">
          {t('learning.hero.desc')}
        </p>
      </Container>
    </section>
  );
};
