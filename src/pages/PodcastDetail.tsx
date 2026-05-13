import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Mic, Share2, Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { fetchMedia, fetchMediaItem } from '@/src/modules/media/mediaThunk';
import { clearSelectedMedia } from '@/src/modules/media/mediaSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

export default function PodcastDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media.items);
  const selectedMedia = useAppSelector((state) => state.media.selectedItem);
  const podcasts = media.filter(m => m.type === 'podcast');
  const podcast = selectedMedia?.type === 'podcast' ? selectedMedia : podcasts[0] || null;

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    dispatch(fetchMedia());
    if (id) {
      dispatch(fetchMediaItem(id));
    }
    return () => {
      dispatch(clearSelectedMedia());
    };
  }, [dispatch, id]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!podcast) {
    return <div className="min-h-screen bg-slate-50 py-20"><div className="container mx-auto px-4 text-sm font-bold text-gray-400">Маалыматтар жүктөлүп жатат...</div></div>;
  }

  // Use a sample audio if URL is not a direct audio file
  const audioSrc = podcast.url.endsWith('.mp3') ? podcast.url : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const title = language === 'ky' ? podcast.title : (podcast.titleRu || podcast.title);
  const guest = language === 'ky' ? podcast.guest : (podcast.guestRu || podcast.guest);
  const description = language === 'ky' ? podcast.description : (podcast.descriptionRu || podcast.description);
  const quote = language === 'ky'
    ? 'Тил - бул жөн гана баарлашуу куралы эмес, бул биздин улуттук эс тутумубуз жана келечегибиз.'
    : 'Язык - не просто средство общения, а наша культурная память и будущее.';

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <section className="bg-slate-50 border-b border-gray-100 py-20">
        <div className="container mx-auto px-4">
          <Link to="/media/podcast" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1.5 w-12 bg-brand-primary" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('common.podcast_episode')}</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-primary uppercase tracking-tighter leading-tight mb-8">{title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-primary" /> {podcast.date}</span>
              {guest && <span className="flex items-center gap-2"><User className="w-4 h-4 text-brand-primary" /> {t('common.guest')} {guest}</span>}
              <span className="bg-white px-3 py-1 rounded-full border border-gray-100 text-brand-primary italic">{t('header.portal')}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="bg-brand-ink rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden group">
            <audio 
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-[2rem] overflow-hidden shadow-2xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img src={podcast.thumbnail} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">{isPlaying ? 'Playing Now' : 'Paused'}</h2>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative" 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      if (audioRef.current) {
                        audioRef.current.currentTime = percentage * duration;
                      }
                    }}
                  >
                    <motion.div 
                      className="h-full bg-white" 
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-50">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white text-brand-primary rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl"
                  >
                    {isPlaying ? <span className="text-2xl font-black">||</span> : <Play className="w-8 h-8 fill-current translate-x-1" />}
                  </button>
                  <div className="flex gap-4">
                    <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Share2 className="w-5 h-5" /></button>
                    <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Mic className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <h3 className="text-xl font-black text-brand-primary uppercase tracking-tighter mb-8 border-b border-gray-100 pb-4">{t('common.info')}</h3>
              <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
                <p className="mb-6">{description}</p>
                <blockquote className="border-l-4 border-brand-primary pl-8 italic text-brand-ink font-black text-2xl my-12 bg-slate-50 py-10 rounded-r-[2rem]">"{quote}"</blockquote>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 sticky top-24">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-8 underline underline-offset-8">{t('common.other_episodes')}</h4>
                <div className="space-y-8">
                  {podcasts.filter(m => m.id !== podcast.id).slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/media/podcast/${p.id}`} className="block group">
                      <p className="text-[9px] font-black text-brand-primary opacity-50 uppercase mb-2 tracking-widest">{p.date}</p>
                      <h5 className="text-sm font-black text-brand-primary uppercase leading-snug group-hover:text-brand-ink transition-colors line-clamp-2">{language === 'ky' ? p.title : (p.titleRu || p.title)}</h5>
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


