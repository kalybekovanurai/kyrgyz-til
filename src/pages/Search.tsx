import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, SectionHeading, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { fetchNews } from '@/src/modules/news/newsThunk';
import { fetchMedia } from '@/src/modules/media/mediaThunk';
import { Search as SearchIcon, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface UnifiedResult {
  id: string;
  title: string;
  titleRu?: string;
  date: string;
  image?: string;
  thumbnail?: string;
  content?: string;
  contentRu?: string;
  description?: string;
  descriptionRu?: string;
  resultType: string;
}

export default function Search() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';

  const news = useAppSelector((state) => state.news.items);
  const media = useAppSelector((state) => state.media.items);

  React.useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchMedia());
  }, [dispatch]);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(q.toLowerCase()) || 
    (item.titleRu && item.titleRu.toLowerCase().includes(q.toLowerCase()))
  );

  const filteredMedia = media.filter(item => 
    item.title.toLowerCase().includes(q.toLowerCase()) || 
    (item.titleRu && item.titleRu.toLowerCase().includes(q.toLowerCase()))
  );

  const results: UnifiedResult[] = [
    ...filteredNews.map(n => ({ ...n, resultType: 'news' })),
    ...filteredMedia.map(m => ({ ...m, resultType: m.type }))
  ];

  const getResultTypeLabel = (type: string) => {
    switch(type) {
      case 'news': return t('nav.news');
      case 'podcast': return t('nav.podcast');
      case 'survey': return t('nav.survey');
      default: return type;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading 
              title={t('common.search_results')} 
              subtitle={`${t('common.search_for')}: "${q}"`}
              className="mb-0"
            />
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-primary">
              {results.length} {t('common.results_found')}
            </h2>
          </div>

          <div className="space-y-6">
            {results.map((result, idx) => (
              <motion.div
                key={`${result.resultType}-${result.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/${result.resultType === 'news' ? 'news' : `media/${result.resultType === 'podcast' ? 'podcast' : 'survey'}`}/${result.id}`}>
                  <Card padding="lg" className="group hover:border-brand-primary transition-all overflow-hidden" hoverEffect>
                    <div className="flex flex-col md:flex-row gap-8">
                      {(result.image || result.thumbnail) ? (
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                          <img src={result.image || result.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                        </div>
                      ) : null}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-brand-primary rounded-sm">
                            {getResultTypeLabel(result.resultType)}
                          </span>
                          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-gray-400">
                            <Calendar className="w-3 h-3" /> {result.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-brand-primary uppercase tracking-tighter mb-2 group-hover:text-brand-ink transition-colors">
                          {language === 'ky' ? result.title : (result.titleRu || result.title)}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 font-medium">
                          {language === 'ky' 
                            ? (result.content || result.description) 
                            : (result.contentRu || result.descriptionRu || result.content || result.description)}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center justify-center pl-4 border-l border-gray-50">
                        <ArrowRight className="w-6 h-6 text-brand-primary group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {results.length === 0 && (
              <Card padding="xl" className="text-center bg-white">
                <div className="w-20 h-20 bg-slate-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <SearchIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-brand-primary uppercase tracking-tighter mb-4">
                  {t('common.no_results')}
                </h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8 leading-relaxed">
                  {t('common.no_results_desc')}
                </p>
                <Link to="/" className="text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">
                  {t('common.go_home')}
                </Link>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
