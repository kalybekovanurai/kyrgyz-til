import React from 'react';
import { ArrowRight, BookOpen, Download, FileText, Globe, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';
import { fetchNewspapers } from '@/src/modules/newspapers/newspapersThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

const articleIcons = {
  editor: Quote,
  main: FileText,
  master: MessageSquare,
  term: Globe,
  culture: BookOpen,
};

type ArticleGroup = {
  key?: keyof typeof articleIcons;
  titleKy?: string;
  titleRu?: string;
  items?: Array<{
    titleKy?: string;
    titleRu?: string;
    descriptionKy?: string;
    descriptionRu?: string;
  }>;
};

const Newspaper = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{
    subscriptionIndex?: string;
    articleGroups?: ArticleGroup[];
    articles?: ArticleGroup['items'];
  }>('newspaper');
  const dispatch = useAppDispatch();
  const issues = useAppSelector((state) => state.newspapers.items);
  const articleGroups = data.articleGroups || [
    {
      key: 'main' as const,
      titleKy: t('newspaper.articles.main'),
      titleRu: t('newspaper.articles.main'),
      items: data.articles || [],
    },
  ];
  const [activeArticle, setActiveArticle] = React.useState(articleGroups[0]?.key || 'main');
  const [activeYear, setActiveYear] = React.useState('all');

  React.useEffect(() => {
    dispatch(fetchNewspapers());
  }, [dispatch]);

  React.useEffect(() => {
    if (!articleGroups.some((group) => group.key === activeArticle)) {
      setActiveArticle(articleGroups[0]?.key || 'main');
    }
  }, [activeArticle, articleGroups]);

  const selectedArticle = articleGroups.find((item) => item.key === activeArticle) || articleGroups[0];
  const articleTitle = language === 'ky' ? selectedArticle?.titleKy : selectedArticle?.titleRu || selectedArticle?.titleKy;
  const articleItems = selectedArticle?.items || [];
  const years = React.useMemo(() => Array.from(new Set(issues.map((issue) => issue.date.slice(0, 4)))).sort((a, b) => Number(b) - Number(a)), [issues]);
  const filteredIssues = activeYear === 'all' ? issues : issues.filter((issue) => issue.date.startsWith(activeYear));

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex flex-col items-center gap-4">
              <p className="text-[10px] font-black uppercase leading-relaxed tracking-[0.4em] text-brand-primary opacity-80 md:text-[11px]">{t('newspaper.subtitle')}</p>
              <div className="mt-2 h-1 w-16 bg-brand-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-black uppercase leading-none tracking-tighter text-brand-primary md:text-6xl">{t('nav.newspaper')}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-brand-primary">{t('newspaper.archive.title')}</h2>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('newspaper.archive.years')}</div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {[{ key: 'all', label: language === 'ky' ? 'Баары' : 'Все' }, ...years.map((year) => ({ key: year, label: year }))].map((filter) => (
                <button key={filter.key} type="button" onClick={() => setActiveYear(filter.key)} className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeYear === filter.key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredIssues.map((issue, idx) => (
                <motion.div key={issue.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group flex gap-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
                  <div className="flex h-32 w-24 shrink-0 flex-col items-center justify-center rounded-xl border border-gray-100 bg-slate-100 transition-colors group-hover:bg-brand-primary/5">
                    <FileText className="h-8 w-8 text-brand-primary opacity-30" />
                    <span className="mt-2 text-[9px] font-black tracking-widest text-brand-primary">PDF</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-black uppercase leading-tight tracking-tighter text-brand-primary transition-colors group-hover:text-brand-ink">{issue.number}</h3>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{issue.date}</p>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <a href={issue.pdfUrl} target="_blank" rel="noreferrer" className="flex-1 cursor-pointer rounded-sm bg-brand-primary px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-brand-primary/10 transition-all hover:bg-brand-ink">
                        {t('common.read')}
                      </a>
                      <a href={issue.pdfUrl} download={`kyrgyz-tili-${issue.number}.pdf`} className="cursor-pointer rounded-sm border border-gray-100 p-3 text-gray-400 transition-colors hover:border-brand-primary hover:text-brand-primary" aria-label="Download PDF">
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <section className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-8 flex flex-wrap gap-2 md:gap-3">
                {articleGroups.map((item) => (
                  <button key={item.key} type="button" onClick={() => setActiveArticle(item.key || 'main')} className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeArticle === item.key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-50 text-gray-500 hover:bg-gray-100'}`}>
                    {language === 'ky' ? item.titleKy : item.titleRu || item.titleKy}
                  </button>
                ))}
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{t('newspaper.sidebar.articles')}</p>
              <h2 className="mb-6 text-2xl font-black uppercase tracking-tighter text-brand-primary">{articleTitle}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {articleItems.map((item, index) => (
                  <article key={`${item.titleKy}-${index}`} className="rounded-lg bg-slate-50 p-5">
                    <h3 className="mb-3 text-sm font-black uppercase leading-snug text-brand-primary">{language === 'ky' ? item.titleKy : item.titleRu || item.titleKy}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-500">{language === 'ky' ? item.descriptionKy : item.descriptionRu || item.descriptionKy}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:col-span-4">
            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-8 border-b border-gray-50 pb-4 text-xs font-black uppercase tracking-widest text-brand-primary">{t('newspaper.sidebar.articles')}</h3>
              <nav className="flex flex-col gap-2">
                {articleGroups.map((item) => {
                  const Icon = articleIcons[item.key || 'main'];
                  const active = item.key === activeArticle;
                  return (
                    <button key={item.key} type="button" onClick={() => setActiveArticle(item.key || 'main')} className={`group flex items-center justify-between rounded-2xl p-4 text-left transition-all ${active ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-4">
                        <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-brand-primary'}`} />
                        <span className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-white' : 'group-hover:text-brand-primary'}`}>
                          {language === 'ky' ? item.titleKy : item.titleRu || item.titleKy}
                        </span>
                      </div>
                      <ArrowRight className={`h-4 w-4 transition-all ${active ? 'text-white opacity-100' : 'text-brand-primary opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-primary p-10 text-white shadow-xl shadow-brand-primary/20">
              <h3 className="relative z-10 mb-6 text-xl font-black uppercase tracking-tighter">{t('newspaper.sidebar.sub.title')}</h3>
              <p className="relative z-10 mb-10 text-sm font-medium leading-relaxed text-white/70">
                {t('newspaper.sidebar.sub.desc')} <span className="mx-1 rounded-sm bg-white px-2 py-0.5 font-black text-brand-primary">{data.subscriptionIndex || '12456'}</span>
              </p>
              <button className="relative z-10 w-full cursor-pointer rounded-sm bg-white py-4 text-[10px] font-black uppercase tracking-widest text-brand-primary transition-all hover:bg-brand-ink hover:text-white">
                {t('newspaper.sidebar.sub.btn')}
              </button>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newspaper;
