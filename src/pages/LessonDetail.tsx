import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Play, BookOpen } from 'lucide-react';
import { Container } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { clearSelectedLesson } from '@/src/modules/lessons/lessonsSlice';
import { fetchLessonItem, fetchLessons } from '@/src/modules/lessons/lessonsThunk';

export default function LessonDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const lesson = useAppSelector((state) => state.lessons.selectedItem);

  React.useEffect(() => {
    dispatch(fetchLessons());
    if (id) {
      dispatch(fetchLessonItem(id));
    }
    return () => {
      dispatch(clearSelectedLesson());
    };
  }, [dispatch, id]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <Container>
          <p className="text-sm font-bold text-gray-400">Маалыматтар жүктөлүп жатат...</p>
        </Container>
      </div>
    );
  }

  const title = language === 'ky' ? lesson.title : (lesson.titleRu || lesson.title);
  const content = language === 'ky' ? lesson.content : (lesson.contentRu || lesson.content);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-50 border-b border-gray-100 py-12 md:py-20">
        <Container>
          <Link to="/learning" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
          <div className="max-w-4xl">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">
              {lesson.type === 'test' ? 'Тест' : lesson.type === 'video' ? 'Видео сабак' : 'Текст сабак'}
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-brand-primary uppercase tracking-tighter leading-tight">
              {title}
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        {lesson.type === 'video' && lesson.videoUrl ? (
          <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="mb-10 flex aspect-video items-center justify-center rounded-3xl bg-brand-ink text-white shadow-2xl overflow-hidden">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-primary transition-transform hover:scale-110">
              <Play className="h-9 w-9 fill-current translate-x-1" />
            </span>
          </a>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 rounded-lg border border-gray-100 bg-white p-6 md:p-10 shadow-sm">
            <div className="mb-6 flex items-center gap-3 text-brand-primary">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-sm font-black uppercase tracking-widest">Материал</h2>
            </div>
            <p className="whitespace-pre-wrap text-base md:text-lg font-medium leading-relaxed text-gray-600">
              {content}
            </p>
          </article>

          {lesson.type === 'test' && (
            <aside className="lg:col-span-4 rounded-lg bg-slate-50 p-6 md:p-8 border border-gray-100">
              <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-brand-primary">Практика</h3>
              {['Кыргыз тили кайсы тилдер тобуна кирет?', 'Мамлекеттик тилди өнүктүрүү эмне үчүн маанилүү?'].map((question, index) => (
                <label key={question} className="mb-4 flex items-start gap-3 rounded-lg bg-white p-4 text-sm font-bold text-gray-600">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <span>{index + 1}. {question}</span>
                </label>
              ))}
            </aside>
          )}
        </div>
      </Container>
    </div>
  );
}
