import { ArrowRight, BookOpen, Download, FileText, Globe, MessageSquare, Quote } from 'lucide-react';
import React from 'react';
import { motion } from 'motion/react';
import { fetchNewspapers } from '@/src/modules/newspapers/newspapersThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useLanguage } from '@/src/context/LanguageContext';
const newspaperArticles = [
    {
        key: 'editor',
        icon: Quote,
        titleKy: 'Редактордон сөз',
        titleRu: 'Слово редактора',
        itemsKy: ['Тил тагдыры - эл тагдыры', 'Мамлекеттик тилдин жаңы кадамдары'],
        itemsRu: ['Судьба языка - судьба народа', 'Новые шаги государственного языка'],
    },
    {
        key: 'main',
        icon: FileText,
        titleKy: 'Негизги макалалар',
        titleRu: 'Основные статьи',
        itemsKy: ['Кыргыз тили санарип доорунда', 'Билим берүүдө тил саясаты'],
        itemsRu: ['Кыргызский язык в цифровую эпоху', 'Языковая политика в образовании'],
    },
    {
        key: 'master',
        icon: MessageSquare,
        titleKy: 'Мастер',
        titleRu: 'Мастер',
        itemsKy: ['Көркөм окуу боюнча кеңештер', 'Сабакта интерактивдүү ыкмалар'],
        itemsRu: ['Советы по выразительному чтению', 'Интерактивные методы на уроке'],
    },
    {
        key: 'term',
        icon: Globe,
        titleKy: 'Терминология',
        titleRu: 'Терминология',
        itemsKy: ['Жаңы терминдер жана түшүндүрмөлөр', 'Медиа тилиндеги терминдер'],
        itemsRu: ['Новые термины и объяснения', 'Термины в языке медиа'],
    },
    {
        key: 'culture',
        icon: BookOpen,
        titleKy: 'Тил маданияты',
        titleRu: 'Культура речи',
        itemsKy: ['Туура сүйлөө жана туура жазуу', 'Сөз байлыгын өнүктүрүү'],
        itemsRu: ['Грамотная речь и письмо', 'Развитие словарного запаса'],
    },
];
const Newspaper = () => {
    const { language, t } = useLanguage();
    const dispatch = useAppDispatch();
    const issues = useAppSelector((state) => state.newspapers.items);
    const [activeArticle, setActiveArticle] = React.useState(newspaperArticles[0].key);
    const [activeYear, setActiveYear] = React.useState('all');
    React.useEffect(() => {
        dispatch(fetchNewspapers());
    }, [dispatch]);
    const selectedArticle = newspaperArticles.find((item) => item.key === activeArticle) || newspaperArticles[0];
    const articleTitle = language === 'ky' ? selectedArticle.titleKy : selectedArticle.titleRu;
    const articleItems = language === 'ky' ? selectedArticle.itemsKy : selectedArticle.itemsRu;
    const years = React.useMemo(() => Array.from(new Set(issues.map((issue) => issue.date.slice(0, 4)))).sort((a, b) => Number(b) - Number(a)), [issues]);
    const filteredIssues = activeYear === 'all' ? issues : issues.filter((issue) => issue.date.startsWith(activeYear));
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary leading-relaxed opacity-80">{t('newspaper.subtitle')}</p>
              <div className="h-1 w-16 bg-brand-primary mt-2"/>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-none mb-4">{t('nav.newspaper')}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-brand-primary">{t('newspaper.archive.title')}</h2>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('newspaper.archive.years')}</div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {[{ key: 'all', label: language === 'ky' ? 'Баары' : 'Все' }, ...years.map((year) => ({ key: year, label: year }))].map((filter) => (<button key={filter.key} type="button" onClick={() => setActiveYear(filter.key)} className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeYear === filter.key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
                  {filter.label}
                </button>))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIssues.map((issue, idx) => (<motion.div key={issue.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex gap-8 group">
                  <div className="w-24 h-32 bg-slate-100 rounded-xl border border-gray-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-brand-primary/5 transition-colors">
                    <FileText className="w-8 h-8 text-brand-primary opacity-30"/>
                    <span className="text-[9px] font-black text-brand-primary mt-2 tracking-widest">PDF</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-black text-brand-primary leading-tight uppercase tracking-tighter group-hover:text-brand-ink transition-colors">{issue.number}</h3>
                      <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">{issue.date}</p>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <a href={issue.pdfUrl} target="_blank" rel="noreferrer" className="cursor-pointer flex-1 px-4 py-3 bg-brand-primary text-white rounded-sm text-[10px] font-black uppercase hover:bg-brand-ink transition-all tracking-widest shadow-lg shadow-brand-primary/10 text-center">
                        {t('common.read')}
                      </a>
                      <a href={issue.pdfUrl} download={`kyrgyz-tili-${issue.number}.pdf`} className="cursor-pointer p-3 border border-gray-100 text-gray-400 rounded-sm hover:text-brand-primary hover:border-brand-primary transition-colors" aria-label="Download PDF">
                        <Download className="w-4 h-4"/>
                      </a>
                    </div>
                  </div>
                </motion.div>))}
            </div>

            <section className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-8 flex flex-wrap gap-2 md:gap-3">
                {newspaperArticles.map((item) => (<button key={item.key} type="button" onClick={() => setActiveArticle(item.key)} className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeArticle === item.key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-50 text-gray-500 hover:bg-gray-100'}`}>
                    {language === 'ky' ? item.titleKy : item.titleRu}
                  </button>))}
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Макалалар</p>
              <h2 className="mb-6 text-2xl font-black uppercase tracking-tighter text-brand-primary">{articleTitle}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {articleItems.map((item) => (<article key={item} className="rounded-lg bg-slate-50 p-5">
                    <h3 className="mb-3 text-sm font-black uppercase leading-snug text-brand-primary">{item}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-500">
                      {language === 'ky'
                ? 'Бул макала гезиттин тандалган рубрикасына тиешелүү кыскача материал катары көрсөтүлөт.'
                : 'Этот материал показан как статья выбранной рубрики газеты.'}
                    </p>
                  </article>))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-8 border-b border-gray-50 pb-4">{t('newspaper.sidebar.articles')}</h3>
              <nav className="flex flex-col gap-2">
                {newspaperArticles.map((item) => {
            const Icon = item.icon;
            const active = item.key === activeArticle;
            return (<button key={item.key} type="button" onClick={() => setActiveArticle(item.key)} className={`flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${active ? 'bg-brand-primary text-white' : 'hover:bg-slate-50 text-gray-500'}`}>
                      <div className="flex items-center gap-4">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-brand-primary'}`}/>
                        <span className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-white' : 'group-hover:text-brand-primary'}`}>
                          {language === 'ky' ? item.titleKy : item.titleRu}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-all ${active ? 'text-white opacity-100' : 'text-brand-primary opacity-0 group-hover:opacity-100'}`}/>
                    </button>);
        })}
              </nav>
            </div>

            <div className="bg-brand-primary p-10 rounded-[2.5rem] shadow-xl shadow-brand-primary/20 text-white relative overflow-hidden">
              <h3 className="text-xl font-black mb-6 tracking-tighter uppercase relative z-10">{t('newspaper.sidebar.sub.title')}</h3>
              <p className="text-sm font-medium leading-relaxed mb-10 text-white/70 relative z-10">
                {t('newspaper.sidebar.sub.desc')} <span className="text-brand-primary bg-white px-2 py-0.5 rounded-sm font-black mx-1">12456</span>
              </p>
              <button className="cursor-pointer w-full py-4 bg-white text-brand-primary rounded-sm font-black text-[10px] uppercase hover:bg-brand-ink hover:text-white transition-all tracking-widest relative z-10">
                {t('newspaper.sidebar.sub.btn')}
              </button>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default Newspaper;
