import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
// Lazy load pages
const Home = React.lazy(() => import('../pages/Home'));
const Newspaper = React.lazy(() => import('../pages/Newspaper'));
const LearningCenter = React.lazy(() => import('../pages/LearningCenter'));
const LessonDetail = React.lazy(() => import('../pages/LessonDetail'));
const Media = React.lazy(() => import('../pages/Media'));
const MediaPodcast = React.lazy(() => import('../pages/MediaPodcast'));
const PodcastDetail = React.lazy(() => import('../pages/PodcastDetail'));
const MediaSurvey = React.lazy(() => import('../pages/MediaSurvey'));
const SurveyDetail = React.lazy(() => import('../pages/SurveyDetail'));
const News = React.lazy(() => import('../pages/News'));
const NewsDetail = React.lazy(() => import('../pages/NewsDetail'));
const LanguagePolicy = React.lazy(() => import('../pages/LanguagePolicy'));
const Partners = React.lazy(() => import('../pages/Partners'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Admin = React.lazy(() => import('../pages/Admin'));
const Search = React.lazy(() => import('../pages/Search'));
const PageFallback = () => {
    const { t } = useLanguage();
    return (<div className="min-h-[65vh] bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-brand-primary/10">
          <div className="h-8 w-8 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin"/>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-primary">
            {t('header.site_name')}
          </p>
          <h2 className="text-xl font-black uppercase leading-tight text-brand-primary">
            {t('common.loading') || 'Баракча жүктөлүп жатат'}
          </h2>
          <div className="mx-auto grid max-w-xs gap-2 pt-2">
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-brand-primary/30 animate-pulse"/>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-brand-primary/20 animate-pulse"/>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export const AppRouter = () => {
    return (<Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newspaper" element={<Newspaper />}/>
        <Route path="/learning" element={<LearningCenter />}/>
        <Route path="/learning/:id" element={<LessonDetail />}/>
        <Route path="/media" element={<Media />}/>
        <Route path="/media/podcast" element={<MediaPodcast />}/>
        <Route path="/media/podcast/:id" element={<PodcastDetail />}/>
        <Route path="/media/survey" element={<MediaSurvey />}/>
        <Route path="/media/survey/:id" element={<SurveyDetail />}/>
        <Route path="/news" element={<News />}/>
        <Route path="/news/:id" element={<NewsDetail />}/>
        <Route path="/policy" element={<LanguagePolicy />}/>
        <Route path="/partners" element={<Partners />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </Suspense>);
};
