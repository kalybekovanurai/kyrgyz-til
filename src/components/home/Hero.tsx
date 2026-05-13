import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';

export interface HeroItem {
  title: string;
  description: string;
  image: string;
}

interface HeroProps {
  items: HeroItem[];
}

export const Hero = ({ items }: HeroProps) => {
  const [activeHero, setActiveHero] = React.useState(0);
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-white border-b border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[520px] lg:h-[620px]">
        {/* Left Side: Image */}
        <div className="lg:w-[58%] relative overflow-hidden h-[260px] sm:h-[340px] lg:h-auto order-2 lg:order-1">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: activeHero === idx ? 1 : 0, scale: activeHero === idx ? 1 : 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img src={item.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
            </motion.div>
          ))}
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-[42%] flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14 xl:p-16 relative bg-white order-1 lg:order-2">
          <div className="max-w-xl">
            {items.map((item, idx) => (
              <AnimatePresence mode="wait" key={idx}>
                {activeHero === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="space-y-6 lg:space-y-8"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-1 w-8 sm:w-12 bg-brand-primary" />
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.24em] text-brand-primary">
                        {t('hero.slogan')}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black text-brand-primary uppercase leading-tight tracking-normal">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed italic border-l-4 border-brand-primary/20 pl-6">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-col xs:flex-row sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
                       <Link to="/news">
                         <Button icon={ArrowRight} size="md" className="w-full sm:w-auto">{t('hero.news_btn')}</Button>
                       </Link>
                       <Link to="/learning">
                         <Button variant="outline" icon={BookOpen} size="md" className="w-full sm:w-auto">{t('hero.learning_btn')}</Button>
                       </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
            
            <div className="flex gap-2 mt-8 sm:mt-12">
              {items.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveHero(idx)} 
                  className={cn(
                    "h-1.5 transition-all rounded-full",
                    activeHero === idx ? "w-12 bg-brand-primary" : "w-4 bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
