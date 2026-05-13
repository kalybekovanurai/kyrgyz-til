import { FileText, Download, BookOpen, MessageSquare, Quote, Globe, ArrowRight } from 'lucide-react';
import React from 'react';
import { fetchNewspapers } from '@/src/modules/newspapers/newspapersThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';

export default function Newspaper() {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const issues = useAppSelector((state) => state.newspapers.items);

  React.useEffect(() => {
    dispatch(fetchNewspapers());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary leading-relaxed opacity-80">{t('newspaper.subtitle')}</p>
              <div className="h-1 w-16 bg-brand-primary mt-2" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-none mb-4">{t('nav.newspaper')}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content: Issues */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-brand-primary">{t('newspaper.archive.title')}</h2>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('newspaper.archive.years')}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issues.map((issue, idx) => {
                // Use a real dummy PDF for demonstration
                const realPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
                
                return (
                  <motion.div 
                    key={issue.id} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex gap-8 group"
                  >
                    <div className="w-24 h-32 bg-slate-100 rounded-xl border border-gray-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-brand-primary/5 transition-colors">
                       <FileText className="w-8 h-8 text-brand-primary opacity-30" />
                       <span className="text-[9px] font-black text-brand-primary mt-2 tracking-widest">PDF</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-lg font-black text-brand-primary leading-tight uppercase tracking-tighter group-hover:text-brand-ink transition-colors">{issue.number}</h3>
                        <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">{issue.date}</p>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <a href={realPdfUrl} target="_blank" rel="noreferrer" className="flex-1 px-4 py-3 bg-brand-primary text-white rounded-sm text-[10px] font-black uppercase hover:bg-brand-ink transition-all tracking-widest shadow-lg shadow-brand-primary/10 text-center">
                          {t('common.read')}
                        </a>
                        <a href={realPdfUrl} download={`кыргыз-тили-${issue.number}.pdf`} className="p-3 border border-gray-100 text-gray-400 rounded-sm hover:text-brand-primary hover:border-brand-primary transition-colors" aria-label="Download PDF">
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-8 border-b border-gray-50 pb-4">{t('newspaper.sidebar.articles')}</h3>
              <nav className="flex flex-col gap-2">
                {[
                  { icon: Quote, name: t('newspaper.articles.editor') },
                  { icon: FileText, name: t('newspaper.articles.main') },
                  { icon: MessageSquare, name: t('newspaper.articles.master') },
                  { icon: Globe, name: t('newspaper.articles.term') },
                  { icon: BookOpen, name: t('newspaper.articles.culture') },
                ].map((item) => (
                  <button key={item.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-4 h-4 text-brand-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-brand-primary">{item.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-brand-primary p-10 rounded-[2.5rem] shadow-xl shadow-brand-primary/20 text-white relative overflow-hidden">
               <h3 className="text-xl font-black mb-6 tracking-tighter uppercase relative z-10">{t('newspaper.sidebar.sub.title')}</h3>
               <p className="text-sm font-medium leading-relaxed mb-10 text-white/70 relative z-10">
                 {t('newspaper.sidebar.sub.desc')} <span className="text-brand-primary bg-white px-2 py-0.5 rounded-sm font-black mx-1">12456</span>
               </p>
               <button className="w-full py-4 bg-white text-brand-primary rounded-sm font-black text-[10px] uppercase hover:bg-brand-ink hover:text-white transition-all tracking-widest relative z-10">
                 {t('newspaper.sidebar.sub.btn')}
               </button>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




