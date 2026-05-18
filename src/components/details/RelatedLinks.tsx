import { Link } from 'react-router-dom';

interface RelatedLinkItem {
  id: string;
  date: string;
  title: string;
}

interface RelatedLinksProps {
  title: string;
  items: RelatedLinkItem[];
  getPath: (id: string) => string;
}

export const RelatedLinks = ({ title, items, getPath }: RelatedLinksProps) => (
  <div className="sticky top-24 rounded-[2rem] border border-gray-100 bg-slate-50 p-8 md:p-10">
    <h4 className="mb-8 border-b border-gray-200 pb-4 text-xs font-black uppercase tracking-widest text-brand-primary italic">
      {title}
    </h4>
    <div className="space-y-8">
      {items.map((item) => (
        <Link key={item.id} to={getPath(item.id)} className="block cursor-pointer group">
          <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-brand-primary opacity-50">
            {item.date}
          </p>
          <h5 className="line-clamp-2 text-sm font-black uppercase leading-snug text-brand-primary transition-colors group-hover:text-brand-ink">
            {item.title}
          </h5>
        </Link>
      ))}
    </div>
  </div>
);
