import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Container } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';

export const Footer = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{
    footerPhone?: string;
    phone?: string;
    email?: string;
    addressKy?: string;
    addressRu?: string;
    footerDescriptionKy?: string;
    footerDescriptionRu?: string;
    social?: Record<string, string>;
  }>('contacts');

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.newspaper'), path: '/newspaper' },
    { name: t('nav.learning'), path: '/learning' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.policy'), path: '/policy' },
    { name: t('nav.partners'), path: '/partners' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 md:pt-24 pb-12 px-4">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-full flex items-center justify-center p-3 opacity-90 shadow-lg shadow-brand-primary/20">
                <Globe className="text-white w-full h-full" />
              </div>
              <p className="text-[12px] md:text-[13px] font-medium text-gray-500 leading-relaxed uppercase tracking-tight max-w-[300px]">
                {language === "ky"
                  ? data.footerDescriptionKy || t("footer.description")
                  : data.footerDescriptionRu ||
                    data.footerDescriptionKy ||
                    t("footer.description")}
              </p>
            </div>
            <div className="flex gap-3">
              {Object.entries(
                data.social || {
                  facebook: "",
                  instagram: "",
                  youtube: "",
                  telegram: "",
                },
              ).map(([key, url]) =>
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-[10px] font-black uppercase shadow-sm transition-all hover:bg-brand-primary hover:text-white"
                  >
                    {key.slice(0, 2)}
                  </a>
                ) : (
                  <div
                    key={key}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-[10px] font-black uppercase shadow-sm transition-all hover:bg-brand-primary hover:text-white"
                  >
                    {key.slice(0, 2)}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h3 className="text-brand-primary font-black uppercase text-[11px] md:text-[12px] tracking-widest border-b-2 border-brand-primary w-fit pb-1">
              {t("footer.sections")}
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="cursor-pointer text-[12px] md:text-[13px] text-gray-500 font-medium hover:text-brand-primary transition-colors tracking-tight uppercase"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h3 className="text-brand-primary font-black uppercase text-[11px] md:text-[12px] tracking-widest border-b-2 border-brand-primary w-fit pb-1">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-4 md:space-y-5">
              <li className="flex items-start gap-4">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 opacity-50" />
                <p className="text-[12px] md:text-[13px] text-gray-500 font-medium uppercase tracking-tight">
                  {data.email || "info@kyrgyztil.kg"}
                </p>
              </li>
              <li className="flex items-start gap-4">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 opacity-50" />
                <p className="text-[12px] md:text-[13px] text-gray-500 font-medium uppercase tracking-tight">
                  {data.footerPhone || data.phone || "+996 312 21-01-43"}
                </p>
              </li>
              <li className="flex items-start gap-4">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 opacity-50" />
                <div>
                  <p className="text-[12px] md:text-[13px] text-gray-500 font-medium uppercase tracking-tight">
                    {t("footer.address")}
                  </p>
                  <p className="text-[10px] md:text-[12px] text-gray-400 font-medium mt-1 uppercase italic">
                    {language === "ky"
                      ? data.addressKy || t("footer.address_value")
                      : data.addressRu ||
                        data.addressKy ||
                        t("footer.address_value")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-[11px] font-medium text-gray-400 uppercase tracking-widest text-center sm:text-left">
            {t("footer.copyright")}
          </p>
          <button className="cursor-pointer text-[10px] md:text-[11px] font-black uppercase text-gray-300 tracking-widest hover:text-brand-primary transition-colors">
            {t("footer.security")}
          </button>
        </div>
      </Container>
    </footer>
  );
};
