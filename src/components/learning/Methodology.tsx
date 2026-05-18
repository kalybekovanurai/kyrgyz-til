import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { SectionHeading, Card, Button } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

const methodologyFiles = [
  {
    title: 'Методика №1',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Методика №2',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Методика №3',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Методика №4',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

export const Methodology = () => {
  const { t } = useLanguage();

  return (
    <div>
      <SectionHeading title={t('learning.methods.title')} className="mb-8 md:mb-12" />
      <Card padding="lg">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-primary uppercase mb-6 tracking-tighter">{t('learning.methods.subtitle')}</h3>
              <p className="text-sm md:text-base text-gray-500 font-medium mb-8 leading-relaxed">
                {t('learning.methods.desc')}
              </p>
              <a href={methodologyFiles[0].url} target="_blank" rel="noreferrer">
                <Button icon={ArrowRight}>{t('learning.methods.download')}</Button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {methodologyFiles.map((file, index) => (
                 <a
                   key={file.title}
                   href={file.url}
                   target="_blank"
                   rel="noreferrer"
                   className="aspect-square bg-slate-50 rounded-2xl md:rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-2 p-4 md:p-6 hover:bg-white transition-colors cursor-pointer group"
                 >
                   <FileText className="w-6 h-6 md:w-8 md:h-8 text-brand-primary opacity-20 group-hover:opacity-100 transition-all" />
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">{t('learning.methods.item')}{index + 1}</span>
                 </a>
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
};
