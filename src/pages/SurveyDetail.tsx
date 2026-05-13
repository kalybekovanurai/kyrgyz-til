import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Video, Share2, Calendar, ArrowLeft, MessageSquare, Quote } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { fetchMedia, fetchMediaItem } from '@/src/modules/media/mediaThunk';
import { clearSelectedMedia } from '@/src/modules/media/mediaSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

export default function SurveyDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media.items);
  const selectedMedia = useAppSelector((state) => state.media.selectedItem);
  const surveys = media.filter(m => m.type === 'survey');
  const survey = selectedMedia?.type === 'survey' ? selectedMedia : surveys[0] || null;

  React.useEffect(() => {
    dispatch(fetchMedia());
    if (id) {
      dispatch(fetchMediaItem(id));
    }
    return () => {
      dispatch(clearSelectedMedia());
    };
  }, [dispatch, id]);

  if (!survey) {
    return <div className="min-h-screen bg-slate-50 py-20"><div className="container mx-auto px-4 text-sm font-bold text-gray-400">Маалыматтар жүктөлүп жатат...</div></div>;
  }

  const title = language === 'ky' ? survey.title : (survey.titleRu || survey.title);
  const description = language === 'ky' ? survey.description : (survey.descriptionRu || survey.description);
  const fullDescription = language === 'ky'
    ? 'Бул видео сурамжылоодо шаар тургундарынын жана жаштардын мамлекеттик тилдин өнүгүшүнө болгон көз карашы чагылдырылды.'
    : 'В этом видеоопросе отражено мнение жителей города и молодежи о развитии государственного языка.';
  const quotes = language === 'ky'
    ? ['Эне тилин билүү - ар бир жарандын парзы.', 'Тил өссө - эл өсөт, тил өчсө - эл өчөт.', 'Санарип доордо кыргыз тилин өнүктүрүү - эң башкы максат.']
    : ['Знать родной язык - обязанность каждого гражданина.', 'Когда развивается язык, развивается и народ.', 'В цифровую эпоху развитие кыргызского языка особенно важно.'];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <section className="bg-slate-50 border-b border-gray-100 py-20">
        <div className="container mx-auto px-4">
          <Link to="/media/survey" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6"><div className="h-1.5 w-12 bg-brand-primary" /><p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('common.video_survey')}</p></div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-primary uppercase tracking-tighter leading-tight mb-8">{title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest"><span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-primary" /> {survey.date}</span><span className="bg-white px-3 py-1 rounded-full border border-gray-100 text-brand-primary italic">{t('common.public_opinion')}</span></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="space-y-12">
            <div className="aspect-video bg-brand-ink rounded-[4rem] overflow-hidden relative group shadow-2xl">
              <img src={survey.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" alt="" />
              <div className="absolute inset-0 flex items-center justify-center"><a href={survey.url} target="_blank" rel="noreferrer" className="w-24 h-24 bg-white text-brand-primary rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl relative z-10"><Play className="w-10 h-10 fill-current translate-x-1" /></a></div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center"><Video className="text-white w-6 h-6" /></div><span className="text-white text-xs font-black uppercase tracking-widest">{t('common.view')}</span></div><button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all"><Share2 className="w-5 h-5" /></button></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-6"><div className="flex items-center gap-4 text-brand-primary"><MessageSquare className="w-6 h-6" /><h3 className="text-xl font-black uppercase tracking-tighter">{t('common.main_question')}</h3></div><p className="text-2xl md:text-3xl font-black text-brand-ink italic leading-tight border-l-8 border-brand-primary pl-10 py-4">{description}</p></div>
                <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed"><h4 className="text-brand-ink font-black uppercase tracking-widest text-sm mb-6">{t('common.description')}</h4><p className="mb-8">{fullDescription}</p><div className="space-y-10 mt-16"><h4 className="flex items-center gap-4 text-brand-primary text-xs font-black uppercase tracking-widest"><Quote className="w-5 h-5" /> {t('common.important_quotes')}</h4>{quotes.map((q, i) => (<div key={q} className="bg-slate-50 p-8 rounded-[2rem] border-l-4 border-brand-primary shadow-sm hover:translate-x-4 transition-transform"><p className="text-lg font-black text-brand-primary lowercase italic tracking-tight">"{q}"</p><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">- {t('common.respondent')}{i + 1}</p></div>))}</div></div>
              </div>

              <div className="lg:col-span-4"><div className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 sticky top-24"><h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-8 italic border-b border-gray-200 pb-4">{t('common.other_surveys')}</h4><div className="space-y-8">{surveys.filter(m => m.id !== survey.id).slice(0, 3).map((s) => (<Link key={s.id} to={`/media/survey/${s.id}`} className="block group"><p className="text-[9px] font-black text-brand-primary opacity-50 uppercase mb-2 tracking-widest">{s.date}</p><h5 className="text-sm font-black text-brand-primary uppercase leading-snug group-hover:text-brand-ink transition-colors line-clamp-2">{language === 'ky' ? s.title : (s.titleRu || s.title)}</h5></Link>))}</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


