import { ShieldCheck, FileText, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Link } from 'react-router-dom';

export default function LanguagePolicy() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary leading-relaxed opacity-80">{t('policy.hero.subtitle')}</p>
              <div className="h-1 w-16 bg-brand-primary mt-2" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-none mb-4">{t('nav.policy')}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 mb-12 relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
               <div className="w-24 h-24 bg-slate-50 text-brand-primary rounded-[2rem] flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-12 h-12" />
               </div>
               <div className="flex-1">
                 <h2 className="text-2xl font-black text-brand-primary uppercase tracking-tighter mb-6">{t('policy.main.title')}</h2>
                 <p className="text-lg text-gray-500 font-bold leading-relaxed uppercase tracking-tight opacity-80">
                   {t('policy.main.desc')}
                 </p>
               </div>
            </div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-slate-50 text-brand-primary rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:-rotate-3">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-brand-primary uppercase tracking-tighter mb-6">{t('policy.ads.title')}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                {t('policy.ads.desc')}
              </p>
              <ul className="space-y-4">
                {['Талкуулоо', 'Каталарды оңдоо', 'Нормативдер', 'Сунуштар'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[11px] font-black uppercase text-brand-primary tracking-widest">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-primary p-12 rounded-[3.5rem] shadow-xl shadow-brand-primary/20 text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-brand-primary transition-all transform group-hover:rotate-3">
                  <Scale className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{t('policy.laws.title')}</h3>
                <p className="text-white/70 font-medium leading-relaxed mb-8">
                  {t('policy.laws.desc')}
                </p>
                <div className="space-y-4">
                  <a 
                    href="http://cbd.minjust.gov.kg/act/view/ru-ru/111956" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full py-4 bg-white text-brand-primary text-[10px] font-black uppercase tracking-widest hover:bg-brand-ink hover:text-white transition-all rounded-sm flex items-center justify-center"
                  >
                    {t('policy.laws.btn')}
                  </a>
                  <button className="w-full py-4 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all rounded-sm">
                    {t('policy.laws.prog')}
                  </button>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-gray-100 shadow-sm text-center">
             <h2 className="text-2xl font-black text-brand-primary uppercase mb-6 tracking-tighter">{t('policy.methods.title')}</h2>
             <p className="text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
               {t('policy.methods.desc')}
             </p>
             <Link to="/contact#form" className="bg-slate-50 text-brand-primary font-black px-12 py-5 rounded-sm border border-gray-100 hover:border-brand-primary transition-all text-xs uppercase tracking-widest inline-block">
               {t('policy.methods.btn')}
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


