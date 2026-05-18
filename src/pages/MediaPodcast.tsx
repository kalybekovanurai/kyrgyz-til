import React from 'react';
import { Play, Mic, Share2, Calendar, User } from 'lucide-react';
import { fetchMedia } from '@/src/modules/media/mediaThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Link } from 'react-router-dom';
const MediaPodcast = () => {
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const { items: allMedia } = useAppSelector((state) => state.media);
    const [activeCategory, setActiveCategory] = React.useState('all');
    const podcasts = allMedia.filter(m => m.type === 'podcast' && (activeCategory === 'all' || m.category === activeCategory));
    React.useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);
    const categories = [
        { key: 'all', label: t('media.topics.all') },
        { key: 'tech', label: t('media.topics.tech') },
        { key: 'history', label: t('media.topics.history') },
        { key: 'culture', label: t('media.topics.culture') },
        { key: 'education', label: t('media.topics.education') }
    ];
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1.5 w-12 bg-brand-primary"/>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('media.podcast.hero.title')}</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-none">{t('nav.podcast')}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="mb-10 flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (<button key={cat.key} type="button" onClick={() => setActiveCategory(cat.key)} className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
              {cat.label}
            </button>))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((item, idx) => (<motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-brand-ink shrink-0">
                <img src={item.thumbnail} alt={language === 'ky' ? item.title : (item.titleRu || item.title)} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"/>
                <Link to={`/media/podcast/${item.id}`} className="cursor-pointer absolute inset-0 flex items-center justify-center" aria-label={t('common.listen')}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all border border-white/30">
                    <Play className="w-6 h-6 fill-current"/>
                  </div>
                </Link>
                <div className="absolute top-4 left-4 bg-brand-primary px-3 py-1 rounded-sm text-[9px] font-black text-white uppercase tracking-widest">
                  AUDIO
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase text-brand-primary tracking-widest opacity-60">
                   <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5"/> {item.date}</span>
                   {item.guest && <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1.5"/> {language === 'ky' ? item.guest : (item.guestRu || item.guest)}</span>}
                </div>
                <Link to={`/media/podcast/${item.id}`} className="cursor-pointer block group/title">
                  <h3 className="text-lg font-black text-brand-primary mb-4 group-hover/title:text-brand-ink transition-colors leading-tight uppercase tracking-tighter">
                    {language === 'ky' ? item.title : (item.titleRu || item.title)}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-8 line-clamp-3 font-medium leading-relaxed flex-1">
                  {language === 'ky' ? item.description : (item.descriptionRu || item.description)}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <Link to={`/media/podcast/${item.id}`} className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    {t('common.listen')} <Mic className="w-4 h-4 ml-1"/>
                  </Link>
                  <button className="cursor-pointer p-2 text-gray-400 hover:text-brand-primary transition-colors">
                    <Share2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </motion.div>))}
        </div>
      </div>
    </div>);
};
export default MediaPodcast;
