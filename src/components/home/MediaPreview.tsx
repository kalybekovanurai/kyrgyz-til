import { Link } from 'react-router-dom';
import { Mic, Video, Play, ArrowRight } from 'lucide-react';
import { Container, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

export const MediaPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-20 lg:py-24 bg-brand-primary text-white overflow-hidden relative">
      <Container className="relative z-10">
        <SectionHeading 
          title={t('nav.media')} 
          centered 
          className="mb-16 text-white"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <Link to="/media/podcast" className="bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl lg:rounded-[3rem] border border-white/10 group cursor-pointer hover:bg-white/20 transition-all flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="p-5 bg-white text-brand-primary rounded-3xl shadow-2xl transform group-hover:rotate-12 transition-transform">
                <Mic className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t('nav.podcast')}</p>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter mt-2">{t('home.media.podcast.title')}</h3>
              </div>
            </div>
            <p className="text-sm font-medium text-white/70 leading-relaxed mb-10 italic max-w-sm">
              {t('home.media.podcast.desc')}
            </p>
            <span className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
              {t('common.listen')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>

          <Link to="/media/survey" className="bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl lg:rounded-[3rem] border border-white/10 group cursor-pointer hover:bg-white/20 transition-all flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="p-5 bg-white text-brand-primary rounded-3xl shadow-2xl transform group-hover:rotate-12 transition-transform">
                <Video className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t('nav.survey')}</p>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter mt-2">{t('home.media.survey.title')}</h3>
              </div>
            </div>
            <div className="aspect-video w-full bg-black/40 rounded-3xl mb-10 flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all shadow-xl">
              <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-brand-primary rounded-full flex items-center justify-center relative z-10 shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-brand-primary" />
              </div>
            </div>
            <span className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
              {t('common.view')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </div>
      </Container>
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3" />
    </section>
  );
};
