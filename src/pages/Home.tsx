import React from 'react';
import { Hero, LatestNews, MediaPreview, QuickAccess, Subscription } from '@/src/components/home';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';
import { fetchNews } from '@/src/modules/news/newsThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

type HomeSettings = {
  hero?: {
    slides?: Array<{
      titleKy?: string;
      titleRu?: string;
      descriptionKy?: string;
      descriptionRu?: string;
      image?: string;
    }>;
  };
};

const Home = () => {
  const { language } = useLanguage();
  const { data } = useSiteSettings<HomeSettings>('home');
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.items);

  React.useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  const heroItems = (data.hero?.slides || []).map((slide) => ({
    title: language === 'ky' ? slide.titleKy || '' : slide.titleRu || slide.titleKy || '',
    description: language === 'ky' ? slide.descriptionKy || '' : slide.descriptionRu || slide.descriptionKy || '',
    image: slide.image || news[0]?.image || '',
  }));

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <Hero items={heroItems} />
      <QuickAccess />
      <LatestNews news={news} />
      <MediaPreview />
      <Subscription />
    </div>
  );
};

export default Home;
