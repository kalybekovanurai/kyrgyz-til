import { ExternalLink, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';

type PartnerItem = {
  nameKy?: string;
  nameRu?: string;
  roleKey?: string;
  icon?: string;
  url?: string;
};

const Partners = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{ items?: PartnerItem[] }>('partners');
  const partners = data.items || [];

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-1.5 w-12 bg-brand-primary" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('partners.hero.subtitle')}</p>
            <div className="h-1.5 w-12 bg-brand-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-black uppercase leading-none tracking-tighter text-brand-primary md:text-6xl">{t('nav.partners')}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner, idx) => {
            const content = (
              <>
                <div className="flex flex-col items-center space-y-8">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-slate-50 text-2xl font-black text-brand-primary transition-all group-hover:rotate-6 group-hover:bg-brand-primary group-hover:text-white">
                    {partner.icon || 'KT'}
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-400">{partner.roleKey ? t(partner.roleKey) : ''}</p>
                    <h3 className="text-lg font-black uppercase leading-tight tracking-tighter text-brand-primary">
                      {language === 'ky' ? partner.nameKy : partner.nameRu || partner.nameKy}
                    </h3>
                  </div>
                </div>
                <span className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-primary transition-transform group-hover:translate-x-1">
                  {t('partners.btn.site')} <ExternalLink className="h-4 w-4" />
                </span>
              </>
            );

            return (
              <motion.div
                key={`${partner.nameKy}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex min-h-[400px] flex-col items-center justify-between rounded-[2.5rem] border border-gray-100 bg-white p-12 text-center shadow-sm transition-all hover:shadow-2xl"
              >
                {partner.url ? (
                  <a href={partner.url} target="_blank" rel="noreferrer" className="flex h-full w-full cursor-pointer flex-col items-center justify-between">
                    {content}
                  </a>
                ) : content}
              </motion.div>
            );
          })}
        </div>

        <div className="relative mt-24 overflow-hidden rounded-[3rem] bg-brand-primary p-12 text-center text-white md:p-20">
          <div className="relative z-10">
            <Users className="mx-auto mb-8 h-16 w-16 text-white/20" />
            <h2 className="mb-6 text-3xl font-black uppercase tracking-tighter md:text-4xl">{t('partners.cta.title')}</h2>
            <p className="mx-auto mb-10 max-w-2xl font-medium leading-relaxed text-white/70">{t('partners.cta.desc')}</p>
            <Link to="/contact#form" className="inline-block cursor-pointer rounded-sm bg-white px-12 py-5 text-[11px] font-black uppercase tracking-widest text-brand-primary transition-all hover:bg-brand-ink hover:text-white">
              {t('partners.cta.btn')}
            </Link>
          </div>
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Partners;
