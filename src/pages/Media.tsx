import React from 'react';
import { Mic, Video } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { Container, SectionHeading, Card, Button } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fetchMedia } from '@/src/modules/media/mediaThunk';
const Media = () => {
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const { items: allMedia, loading } = useAppSelector((state) => state.media);
    const [activeTopic, setActiveTopic] = React.useState('all');
    React.useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);
    const topics = [
        { key: 'all', label: t('media.topics.all') },
        { key: 'tech', label: t('media.topics.tech') },
        { key: 'history', label: t('media.topics.history') },
        { key: 'culture', label: t('media.topics.culture') },
        { key: 'education', label: t('media.topics.education') }
    ];
    const filteredMedia = allMedia.filter(m => activeTopic === 'all' || m.category === activeTopic);
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-16 md:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading title={t('nav.media')} subtitle={t('media.hero.subtitle')} className="mb-8"/>
            
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
          {/* Podcast Section Card */}
          <Card className="flex flex-col items-center text-center group py-12 md:py-16 px-8 md:px-12 rounded-[2.5rem] md:rounded-[3.5rem]" hoverEffect>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 text-brand-primary rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-6">
              <Mic className="w-10 h-10 md:w-12 md:h-12"/>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-brand-primary uppercase mb-6 tracking-tighter">{t('media.podcast.title')}</h2>
            <p className="text-sm md:text-base text-gray-500 font-medium mb-10 leading-relaxed max-w-sm">
              {t('media.podcast.desc')}
            </p>
            <Link to="/media/podcast">
              <Button size="md">{t('media.btn.go')}</Button>
            </Link>
          </Card>

          {/* Survey Section Card */}
          <Card className="flex flex-col items-center text-center group py-12 md:py-16 px-8 md:px-12 rounded-[2.5rem] md:rounded-[3.5rem]" hoverEffect>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 text-brand-primary rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:-rotate-6">
              <Video className="w-10 h-10 md:w-12 md:h-12"/>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-brand-primary uppercase mb-6 tracking-tighter">{t('media.survey.title')}</h2>
            <p className="text-sm md:text-base text-gray-500 font-medium mb-10 leading-relaxed max-w-sm">
              {t('media.survey.desc')}
            </p>
            <Link to="/media/survey">
              <Button size="md">{t('media.btn.go')}</Button>
            </Link>
          </Card>
        </div>

        {/* Filtered Content */}
        {activeTopic !== 'all' && (<div className="mt-12">
            <h3 className="text-xl font-black text-brand-primary uppercase mb-8 tracking-widest border-b pb-4">
              {topics.find(t => t.key === activeTopic)?.label}
            </h3>
            {loading && <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Жүктөлүүдө...</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredMedia.map((item) => (<Link key={item.id} to={`/media/${item.type}/${item.id}`} className="cursor-pointer block h-full">
                  <Card padding="none" className="flex flex-col group h-full cursor-pointer" hoverEffect>
                    <div className="aspect-video overflow-hidden relative">
                      <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt=""/>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[9px] font-black text-brand-primary uppercase tracking-widest">
                        {item.type}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-black text-brand-primary uppercase tracking-tighter mb-2 group-hover:text-brand-ink transition-colors">
                        {language === 'ky' ? item.title : (item.titleRu || item.title)}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 font-medium">
                        {language === 'ky' ? item.description : (item.descriptionRu || item.description)}
                      </p>
                    </div>
                  </Card>
                </Link>))}
              {filteredMedia.length === 0 && !loading && (<div className="col-span-full py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest bg-white rounded-3xl border-2 border-dashed border-gray-100">
                  Бул категорияда материалдар табылган жок
                </div>)}
            </div>
          </div>)}
      </Container>
    </div>);
};
export default Media;
