import React from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Quote } from "lucide-react";
import { DetailHero, RelatedLinks, VideoEmbed } from "@/src/components/details";
import { ShareButton } from "@/src/components/share/ShareButton";
import { useLanguage } from "@/src/context/LanguageContext";
import { fetchMedia, fetchMediaItem } from "@/src/modules/media/mediaThunk";
import { clearSelectedMedia } from "@/src/modules/media/mediaSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { getYouTubeEmbedUrl } from "@/src/lib/mediaPlayer";
const SurveyDetail = () => {
    const { id } = useParams();
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const media = useAppSelector((state) => state.media.items);
    const selectedMedia = useAppSelector((state) => state.media.selectedItem);
    const surveys = media.filter((m) => m.type === "survey");
    const survey = selectedMedia?.type === "survey" ? selectedMedia : surveys[0] || null;
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
        return (<div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-sm font-bold text-gray-400">
          Маалыматтар жүктөлүп жатат...
        </div>
      </div>);
    }
    const embedUrl = getYouTubeEmbedUrl(survey.url);
    const title = language === "ky" ? survey.title : survey.titleRu || survey.title;
    const description = language === "ky"
        ? survey.description
        : survey.descriptionRu || survey.description;
    const fullDescription = language === "ky"
        ? "Бул видео сурамжылоодо шаар тургундарынын жана жаштардын мамлекеттик тилдин өнүгүшүнө болгон көз карашы чагылдырылды."
        : "В этом видеоопросе отражено мнение жителей города и молодежи о развитии государственного языка.";
    const quotes = language === "ky"
        ? [
            "Эне тилин билүү - ар бир жарандын парзы.",
            "Тил өссө - эл өсөт, тил өчсө - эл өчөт.",
            "Санарип доордо кыргыз тилин өнүктүрүү - эң башкы максат.",
        ]
        : [
            "Знать родной язык - обязанность каждого гражданина.",
            "Когда развивается язык, развивается и народ.",
            "В цифровую эпоху развитие кыргызского языка особенно важно.",
        ];
    const relatedSurveys = surveys
        .filter((m) => m.id !== survey.id)
        .slice(0, 3)
        .map((s) => ({
        id: s.id,
        date: s.date,
        title: language === "ky" ? s.title : s.titleRu || s.title,
    }));
    const videoFallback = language === 'ky'
        ? 'Видео URL туура эмес. YouTube шилтемесин кошуңуз.'
        : 'Видео URL указан неверно. Добавьте ссылку YouTube.';
    return (<div className="flex flex-col w-full min-h-screen bg-white">
      <DetailHero
        backTo="/media/survey"
        backLabel={t("common.back")}
        eyebrow={t("common.video_survey")}
        title={title}
        meta={[{ label: survey.date }]}
        badge={t("common.public_opinion")}
      />

      {/* CONTENT */}
      <div className="container mx-auto px-6 py-12 md:px-12 md:py-20">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
          {/* VIDEO */}
          <VideoEmbed embedUrl={embedUrl} title={title} fallback={videoFallback}/>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* LEFT */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-brand-primary">
                  <MessageSquare className="w-6 h-6"/>

                  <h3 className="text-xl font-black uppercase tracking-tighter">
                    {t("common.main_question")}
                  </h3>
                </div>

                <p className="text-2xl md:text-3xl font-black text-brand-ink italic leading-tight border-l-8 border-brand-primary pl-10 py-4">
                  {description}
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
                <h4 className="text-brand-ink font-black uppercase tracking-widest text-sm mb-6">
                  {t("common.description")}
                </h4>

                <p className="mb-8">{fullDescription}</p>

                <div className="space-y-10 mt-16">
                  <h4 className="flex items-center gap-4 text-brand-primary text-xs font-black uppercase tracking-widest">
                    <Quote className="w-5 h-5"/>

                    {t("common.important_quotes")}
                  </h4>

                  {quotes.map((q, i) => (<div key={q} className="bg-slate-50 p-8 rounded-[2rem] border-l-4 border-brand-primary shadow-sm hover:translate-x-4 transition-transform">
                      <p className="text-lg font-black text-brand-primary lowercase italic tracking-tight">
                        "{q}"
                      </p>

                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">
                        - {t("common.respondent")}
                        {i + 1}
                      </p>
                    </div>))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <RelatedLinks title={t("common.other_surveys")} items={relatedSurveys} getPath={(itemId) => `/media/survey/${itemId}`}/>
                <ShareButton
                  title={title}
                  text={description}
                  label={t("common.share")}
                  className="cursor-pointer inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default SurveyDetail;
