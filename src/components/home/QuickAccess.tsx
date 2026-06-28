import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, Video, Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Container, Card } from '../ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { useSiteSettings } from '@/src/features/siteSettings/useSiteSettings';

const iconMap = {
  newspaper: FileText,
  learning: BookOpen,
  media: Video,
  contact: Send,
};

type QuickLinkItem = {
  titleKy?: string;
  titleRu?: string;
  path?: string;
  icon?: keyof typeof iconMap;
  color?: string;
};

export const QuickAccess = () => {
  const { language } = useLanguage();
  const { data } = useSiteSettings<{ quickLinks?: QuickLinkItem[] }>('home');
  const quickLinks = data.quickLinks || [];

  return (
    <Container className="relative z-10 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {quickLinks.map((link, index) => {
          const Icon = iconMap[link.icon || 'newspaper'];
          return (
          <Link key={`${link.path}-${index}`} to={link.path || '/'}>
            <Card className="flex flex-col items-center text-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 lg:p-10 min-h-[140px] sm:min-h-[160px]" hoverEffect>
              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110", link.color || 'bg-blue-500')}>
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-widest leading-tight text-brand-primary">{language === 'ky' ? link.titleKy : link.titleRu || link.titleKy}</span>
            </Card>
          </Link>
        )})}
      </div>
    </Container>
  );
};
