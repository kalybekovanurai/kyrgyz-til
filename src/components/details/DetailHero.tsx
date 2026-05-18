import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, LucideIcon } from 'lucide-react';

interface DetailMetaItem {
  icon?: LucideIcon;
  label: string;
}

interface DetailHeroProps {
  backTo: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  meta?: DetailMetaItem[];
  badge?: string;
}

export const DetailHero = ({ backTo, backLabel, eyebrow, title, meta = [], badge }: DetailHeroProps) => (
  <section className="border-b border-gray-100 bg-slate-50 py-12 md:py-20">
    <div className="container mx-auto px-6 md:px-12">
      <Link
        to={backTo}
        className="mb-10 inline-flex cursor-pointer items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-brand-primary md:mb-12"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>

      <div className="max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-1.5 w-12 bg-brand-primary" />
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary">{eyebrow}</p>
        </div>

        <h1 className="mb-8 text-3xl font-black uppercase leading-tight tracking-tighter text-brand-primary md:text-5xl">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
          {meta.map(({ icon: Icon = Calendar, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-brand-primary" /> {label}
            </span>
          ))}
          {badge && (
            <span className="rounded-full border border-gray-100 bg-white px-3 py-1 italic text-brand-primary">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  </section>
);
