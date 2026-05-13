import React from 'react';
import { MessageSquare, FileText, Send } from 'lucide-react';
import { Container, Button } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

export const Subscription = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 border border-gray-100 relative overflow-hidden shadow-sm">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-brand-primary text-white rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-3xl font-black text-brand-primary uppercase tracking-tighter italic leading-tight">{t('sub.title')}</h2>
              </div>
              <p className="text-sm font-medium text-gray-500 leading-relaxed mb-10">
                {t('sub.desc')}
              </p>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-inner">
                 <FileText className="w-6 h-6 text-brand-primary shrink-0" />
                 <span className="text-[10px] md:text-[11px] font-black text-gray-400 tracking-widest uppercase">{t('sub.safe')}</span>
              </div>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{t('sub.email_label')}</label>
                <input 
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full px-6 md:px-8 py-4 md:py-5 bg-white border border-gray-200 rounded-2xl focus:border-brand-primary outline-none transition-all font-bold text-sm shadow-sm"
                />
              </div>
              <Button className="w-full h-[60px] md:h-[70px] rounded-2xl" icon={Send}>
                {t('sub.btn')}
              </Button>
            </form>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
        </div>
      </Container>
    </section>
  );
};
