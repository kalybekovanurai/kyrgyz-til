import React from 'react';
import { useParams } from 'react-router-dom';
import { Share2, User } from 'lucide-react';
import { DetailHero, PodcastAudioCard, RelatedLinks } from '@/src/components/details';
import { useLanguage } from '@/src/context/LanguageContext';
import { isAudioUrl } from '@/src/lib/mediaPlayer';
import { clearSelectedMedia } from '@/src/modules/media/mediaSlice';
import { fetchMedia, fetchMediaItem } from '@/src/modules/media/mediaThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
const PodcastDetail = () => {
    const { id } = useParams();
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const media = useAppSelector((state) => state.media.items);
    const selectedMedia = useAppSelector((state) => state.media.selectedItem);
    const podcasts = media.filter((item) => item.type === 'podcast');
    const podcast = selectedMedia?.type === 'podcast' ? selectedMedia : podcasts[0] || null;
    React.useEffect(() => {
        dispatch(fetchMedia());
        if (id) {
            dispatch(fetchMediaItem(id));
        }
        return () => {
            dispatch(clearSelectedMedia());
        };
    }, [dispatch, id]);
    if (!podcast) {
        return (<div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-6 text-sm font-bold text-gray-400 md:px-12">
          Маалыматтар жүктөлүп жатат...
        </div>
      </div>);
    }
    const title = language === 'ky' ? podcast.title : (podcast.titleRu || podcast.title);
    const guest = language === 'ky' ? podcast.guest : (podcast.guestRu || podcast.guest);
    const description = language === 'ky' ? podcast.description : (podcast.descriptionRu || podcast.description);
    const hasAudio = isAudioUrl(podcast.url);
    const relatedPodcasts = podcasts
        .filter((item) => item.id !== podcast.id)
        .slice(0, 3)
        .map((item) => ({
        id: item.id,
        date: item.date,
        title: language === 'ky' ? item.title : (item.titleRu || item.title),
    }));
    const audioFallback = language === 'ky'
        ? 'Подкаст үчүн түз аудио файлга шилтеме керек: .mp3, .wav, .ogg, .m4a же .aac.'
        : 'Для подкаста нужна прямая ссылка на аудио-файл: .mp3, .wav, .ogg, .m4a или .aac.';
    const quote = language === 'ky'
        ? 'Тил - бул жөн гана баарлашуу куралы эмес, бул биздин улуттук эс тутумубуз жана келечегибиз.'
        : 'Язык - не просто средство общения, а наша культурная память и будущее.';
    return (<div className="flex min-h-screen w-full flex-col bg-white">
      <DetailHero
        backTo="/media/podcast"
        backLabel={t('common.back')}
        eyebrow={t('common.podcast_episode')}
        title={title}
        meta={[{ label: podcast.date }, ...(guest ? [{ icon: User, label: `${t('common.guest')} ${guest}` }] : [])]}
        badge={t('header.portal')}
      />

      <div className="container mx-auto px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-12 md:space-y-16">
          <PodcastAudioCard title={title} thumbnail={podcast.thumbnail} url={podcast.url} hasAudio={hasAudio} fallback={audioFallback}/>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h3 className="mb-8 border-b border-gray-100 pb-4 text-xl font-black uppercase tracking-tighter text-brand-primary">{t('common.info')}</h3>
              <div className="prose prose-lg max-w-none font-medium leading-relaxed text-gray-600">
                <p className="mb-6">{description}</p>
                <blockquote className="my-12 rounded-r-[2rem] border-l-4 border-brand-primary bg-slate-50 py-10 pl-8 text-2xl font-black italic text-brand-ink">"{quote}"</blockquote>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <RelatedLinks title={t('common.other_episodes')} items={relatedPodcasts} getPath={(itemId) => `/media/podcast/${itemId}`}/>
                <button className="cursor-pointer mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  <Share2 className="h-4 w-4"/> {t('common.share')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default PodcastDetail;
