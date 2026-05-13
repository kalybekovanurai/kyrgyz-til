import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { fetchNews, fetchNewsItem } from '@/src/modules/news/newsThunk';
import { clearSelectedNews } from '@/src/modules/news/newsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

export default function NewsDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.items);
  const newsItem = useAppSelector((state) => state.news.selectedItem);

  React.useEffect(() => {
    dispatch(fetchNews());
    if (id) {
      dispatch(fetchNewsItem(id));
    }
    return () => {
      dispatch(clearSelectedNews());
    };
  }, [dispatch, id]);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-sm font-bold text-gray-400">
          Маалыматтар жүктөлүп жатат...
        </div>
      </div>
    );
  }

  const title = language === 'ky' ? newsItem.title : (newsItem.titleRu || newsItem.title);
  const content = language === 'ky' ? newsItem.content : (newsItem.contentRu || newsItem.content);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <section className="py-20 bg-slate-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Link to="/news" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1.5 w-12 bg-brand-primary" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('cat.' + newsItem.category)}</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-primary uppercase tracking-tighter leading-tight mb-8">
              {title}
            </h1>
            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-primary" /> {newsItem.date}</span>
              <span className="flex items-center gap-2 italic">{language === 'ky' ? 'Булак:' : 'Источник:'} kyrgyztil.kg</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <img src={newsItem.image} className="w-full aspect-video object-cover rounded-[3rem] shadow-2xl mb-12" alt="" />
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
              <p className="mb-6 whitespace-pre-wrap">{content}</p>
            </div>
            <div className="mt-16 pt-12 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('common.share')}</span>
                <div className="flex gap-2">
                  {[Facebook, Twitter, MessageSquare].map((Icon, i) => (
                    <button key={i} className="p-3 bg-slate-50 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:translate-x-1 transition-transform">
                {t('common.send_suggestion')} <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-8 border-b border-gray-200 pb-4 italic">{t('common.more_news')}</h3>
                <div className="space-y-8">
                  {news.filter(n => n.id !== newsItem.id).slice(0, 3).map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="block group">
                      <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-2 opacity-50">{item.date}</p>
                      <h4 className="text-sm font-black text-brand-primary uppercase leading-snug group-hover:text-brand-ink transition-colors line-clamp-2">
                        {language === 'ky' ? item.title : (item.titleRu || item.title)}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


