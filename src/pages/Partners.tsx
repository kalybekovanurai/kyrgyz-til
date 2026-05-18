import { ExternalLink, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Link } from 'react-router-dom';
const Partners = () => {
    const { t } = useLanguage();
    const partners = [
        { name: 'Улуттук тил комиссиясы', role: t('partners.item.role.strategic'), icon: 'КТ' },
        { name: 'Кыргыз улуттук университети', role: t('partners.item.role.scientific'), icon: 'КУ' },
        { name: 'Билим берүү министрлиги', role: t('partners.item.role.state'), icon: 'БМ' },
        { name: 'ЮНЕСКО', role: t('partners.item.role.international'), icon: 'UN' },
    ];
    return (<div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="h-1.5 w-12 bg-brand-primary"/>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('partners.hero.subtitle')}</p>
            <div className="h-1.5 w-12 bg-brand-primary"/>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-none mb-4">{t('nav.partners')}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, idx) => (<motion.div key={partner.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col items-center text-center justify-between min-h-[400px]">
              <div className="space-y-8 flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all font-black text-2xl transform group-hover:rotate-6">
                   {partner.icon}
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">{partner.role}</p>
                   <h3 className="text-lg font-black leading-tight text-brand-primary uppercase tracking-tighter">{partner.name}</h3>
                </div>
              </div>
              <button className="cursor-pointer flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:translate-x-1 transition-transform mt-10">
                {t('partners.btn.site')} <ExternalLink className="w-4 h-4"/>
              </button>
            </motion.div>))}
        </div>

        <div className="mt-24 p-12 md:p-20 bg-brand-primary rounded-[3rem] text-white text-center relative overflow-hidden">
           <div className="relative z-10">
             <Users className="w-16 h-16 mx-auto mb-8 text-white/20"/>
             <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">{t('partners.cta.title')}</h2>
             <p className="text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
               {t('partners.cta.desc')}
             </p>
             <Link to="/contact#form" className="cursor-pointer bg-white text-brand-primary px-12 py-5 rounded-sm font-black text-[11px] uppercase tracking-widest hover:bg-brand-ink hover:text-white transition-all inline-block">
               {t('partners.cta.btn')}
             </Link>
           </div>
           <div className="absolute -left-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"/>
        </div>
      </div>
    </div>);
};
export default Partners;
