import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Container, SectionHeading, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { fetchNews } from '@/src/modules/news/newsThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
const News = () => {
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const { items: news, loading } = useAppSelector((state) => state.news);
    const [activeCategory, setActiveCategory] = React.useState('all');
    React.useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);
    const categories = [
        { key: 'all', label: t('news.all') },
        { key: 'events', label: t('cat.events') },
        { key: 'laws', label: t('cat.laws') },
        { key: 'projects', label: t('cat.projects') },
        { key: 'education', label: t('cat.education') },
        { key: 'media_news', label: t('cat.media_news') },
    ];
    const filteredNews = activeCategory === 'all'
        ? news
        : news.filter(item => item.category === activeCategory);
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-12 md:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading title={t('nav.news')} subtitle={t('news.desc')} className="mb-8"/>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (<button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={cn('px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all', activeCategory === cat.key
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}>
                  {cat.label}
                </button>))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        {loading && (<div className="rounded-2xl bg-white p-8 text-sm font-bold text-gray-400">
            Маалыматтар жүктөлүп жатат...
          </div>)}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredNews.map((item) => (<Link key={item.id} to={`/news/${item.id}`} className="cursor-pointer block h-full">
              <Card padding="none" className="flex flex-col group h-full cursor-pointer" hoverEffect>
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt=""/>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[9px] font-black text-brand-primary uppercase tracking-widest">
                    {t('cat.' + item.category)}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary"/> {item.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-brand-primary leading-tight uppercase tracking-tighter mb-4 group-hover:text-brand-primary/80 transition-colors">
                    {language === 'ky' ? item.title : (item.titleRu || item.title)}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 md:mb-8 font-medium">
                    {language === 'ky' ? item.content : (item.contentRu || item.content)}
                  </p>
                  <div className="mt-auto flex justify-between items-center text-brand-primary">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('news.full')}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform"/>
                  </div>
                </div>
              </Card>
            </Link>))}
        </div>
      </Container>
    </div>);
};
export default News;
