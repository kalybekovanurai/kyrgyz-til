import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, BookOpen } from 'lucide-react';
import { Container, Card } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';

export const Mission = () => {
  const { t } = useLanguage();

  return (
    <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10 md:space-y-12"
        >
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/20">
                <Target className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-brand-primary uppercase tracking-tighter">{t('about.mission.title')}</h2>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] text-brand-primary uppercase tracking-tighter">
              {t('about.mission.text1')}
            </p>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
              {t('about.mission.text2')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="group p-6 md:p-8" hoverEffect>
              <div className="bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-[10px] md:text-xs font-black uppercase mb-3 tracking-widest text-brand-primary">{t('about.mission.edu.title')}</h3>
              <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{t('about.mission.edu.desc')}</p>
            </Card>
            <Card className="group p-6 md:p-8" hoverEffect>
              <div className="bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-[10px] md:text-xs font-black uppercase mb-3 tracking-widest text-brand-primary">{t('about.mission.community.title')}</h3>
              <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{t('about.mission.community.desc')}</p>
            </Card>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative"
        >
           <div className="aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border border-gray-100 bg-slate-100">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBRsK4QoIlpL52j2CV6BWjytpADMk7Y2hLg&s" 
                className="w-full h-full object-cover" 
                alt="About Portal" 
                loading="lazy"
              />
           </div>
           <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[100px]" />
        </motion.div>
      </div>
    </Container>
  );
};
