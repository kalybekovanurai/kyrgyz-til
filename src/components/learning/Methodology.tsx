import { ArrowRight, FileText } from 'lucide-react';
import { Button, Card, SectionHeading } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';

type MethodologyFile = {
  titleKy?: string;
  titleRu?: string;
  url?: string;
};

export const Methodology = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteSettings<{ files?: MethodologyFile[] }>('methodology');
  const files = data.files || [];
  const firstFile = files[0];

  return (
    <div>
      <SectionHeading title={t('learning.methods.title')} className="mb-8 md:mb-12" />
      <Card padding="lg">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xl font-black uppercase tracking-tighter text-brand-primary md:text-2xl">{t('learning.methods.subtitle')}</h3>
            <p className="mb-8 text-sm font-medium leading-relaxed text-gray-500 md:text-base">{t('learning.methods.desc')}</p>
            {firstFile?.url && (
              <a href={firstFile.url} target="_blank" rel="noreferrer">
                <Button icon={ArrowRight}>{t('learning.methods.download')}</Button>
              </a>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <a
                key={`${file.url}-${index}`}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-slate-50 p-4 transition-colors hover:bg-white md:rounded-3xl md:p-6"
              >
                <FileText className="h-6 w-6 text-brand-primary opacity-20 transition-all group-hover:opacity-100 md:h-8 md:w-8" />
                <span className="text-center text-[9px] font-black uppercase tracking-widest text-gray-400 md:text-[10px]">
                  {language === 'ky' ? file.titleKy : file.titleRu || file.titleKy || `${t('learning.methods.item')}${index + 1}`}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
