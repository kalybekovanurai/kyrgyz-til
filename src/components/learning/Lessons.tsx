import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading, Card } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fetchLessons } from '@/src/modules/lessons/lessonsThunk';

const icons = {
  text: BookOpen,
  video: Video,
  test: CheckCircle,
};

export const Lessons = () => {
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((state) => state.lessons.items);

  React.useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <div>
      <SectionHeading title={t('learning.lessons.title')} className="mb-8 md:mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {lessons.map((item) => {
          const Icon = icons[item.type] || BookOpen;
          const title = language === 'ky' ? item.title : (item.titleRu || item.title);
          const desc = language === 'ky' ? item.content : (item.contentRu || item.content);

          return (
            <Link key={item.id} to={`/learning/${item.id}`} className="cursor-pointer block h-full">
              <Card className="flex h-full flex-col items-center text-center group" hoverEffect>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 text-brand-primary rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-brand-primary uppercase mb-4 tracking-tighter">{title}</h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-4">{desc}</p>
                <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:translate-x-2 transition-transform mt-auto">
                  {t('learning.lessons.go')} <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
