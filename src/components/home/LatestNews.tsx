import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Container, SectionHeading, Card } from '../ui';
import { NewsItem } from '@/src/types';
import { useLanguage } from '@/src/context/LanguageContext';

interface LatestNewsProps {
  news: NewsItem[];
}

export const LatestNews = ({ news }: LatestNewsProps) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <SectionHeading 
            title={t('nav.news')} 
            subtitle={t('nav.news')}
            className="mb-0"
          />
          <Link to="/news" className="cursor-pointer flex items-center gap-3 text-xs font-black uppercase text-gray-400 hover:text-brand-primary transition-colors tracking-widest">
            {t('common.all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {news.slice(0, 3).map((item, idx) => (
            <Card key={idx} padding="none" className="overflow-hidden flex flex-col group cursor-pointer" hoverEffect>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-6 left-6 bg-brand-primary text-white px-4 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest">
                  {t('cat.' + item.category)}
                </div>
              </div>
              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">
                  <Calendar className="w-4 h-4 text-brand-primary" /> {item.date}
                </div>
                <h3 className="text-lg md:text-xl font-black text-brand-primary uppercase leading-snug tracking-normal mb-5 md:mb-6 line-clamp-3 group-hover:text-brand-primary/80 transition-colors">
                  {language === 'ky' ? item.title : (item.titleRu || item.title)}
                </h3>
                <Link to={`/news/${item.id}`} className="cursor-pointer mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all">
                  {t('common.read')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
