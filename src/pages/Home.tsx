import React from 'react';
import {
  Hero,
  QuickAccess,
  LatestNews,
  MediaPreview,
  Subscription,
} from '@/src/components/home';
import { useLanguage } from '@/src/context/LanguageContext';
import { fetchNews } from '@/src/modules/news/newsThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

export default function Home() {
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.items);

  React.useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  const heroItems = [
    {
      title: language === 'ky' ? 'Эне тилим - элдүүлүгүм, тил тагдыры - эл тагдыры!' : 'Родной язык - наследие народа, судьба языка - судьба народа!',
      description: language === 'ky'
        ? 'Кыргыз тили веб-порталы - мамлекеттик тилди өнүктүрүү, сактоо жана заманбап технологиялар менен интеграциялоо үчүн бирдиктүү аянтча.'
        : 'Веб-портал кыргызского языка - единая платформа для развития, сохранения и интеграции государственного языка с современными технологиями.',
      image: news[0]?.image || 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: language === 'ky' ? 'Заманбап технологиялар кыргыз тилинин кызматында' : 'Современные технологии на службе кыргызского языка',
      description: language === 'ky'
        ? 'Санарип доордо эне тилибиздин кадыр-баркын көтөрүү жана аны келечек муундарга жеткирүү биздин негизги максатыбыз.'
        : 'Наша главная цель - повысить престиж родного языка в цифровую эпоху и передать его будущим поколениям.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <Hero items={heroItems} />
      <QuickAccess />
      <LatestNews news={news} />
      <MediaPreview />
      <Subscription />
    </div>
  );
}

