import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Container, SectionHeading, Card, Button } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const { t } = useLanguage();
  const location = useLocation();
  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (location.hash === '#form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading 
              title={t('nav.contact')} 
              subtitle={t('contact.subtitle')}
              className="mb-0"
            />
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {[
              { icon: Phone, label: t('contact.phone'), value: '+996 (312) 66-00-00' },
              { icon: Mail, label: t('contact.email'), value: 'info@kyrgyztil.kg' },
              { icon: MapPin, label: t('contact.address'), value: t('footer.address_value') }
            ].map((item, idx) => (
              <Card 
                key={item.label} 
                className="flex items-center gap-6 p-6 md:p-8 group hover:border-brand-primary"
                hoverEffect
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                   <p className="text-[8px] md:text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs md:text-sm font-black text-brand-primary uppercase tracking-tight">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
            ref={formRef}
          >
            <Card padding="lg" className="h-full">
               <div className="flex items-center gap-4 mb-10 md:mb-12">
                 <div className="p-3 bg-brand-primary text-white rounded-xl">
                   <MessageSquare className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-black text-brand-primary uppercase tracking-tighter">{t('contact.form.title')}</h2>
               </div>

               <form className="space-y-8 md:space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('contact.form.name')}</label>
                      <input type="text" className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-100 focus:border-brand-primary outline-none transition-colors text-sm font-black uppercase placeholder:text-gray-200" placeholder={t('contact.form.name_placeholder')} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('contact.form.email')}</label>
                      <input type="email" className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-100 focus:border-brand-primary outline-none transition-colors text-sm font-black placeholder:text-gray-200" placeholder="example@mail.com" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('contact.form.message')}</label>
                    <textarea rows={4} className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-100 focus:border-brand-primary outline-none transition-colors text-sm font-bold resize-none placeholder:text-gray-200" placeholder={t('contact.form.message_placeholder')}></textarea>
                 </div>
                 <Button icon={Send} className="w-full sm:w-auto">
                    {t('contact.form.btn')}
                 </Button>
               </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

