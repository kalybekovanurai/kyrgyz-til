import React from 'react';
import { Copy, Facebook, Mail, MessageCircle, Send, Share2, Twitter } from 'lucide-react';

type ShareButtonProps = {
  title: string;
  text?: string;
  url?: string;
  label?: string;
  iconOnly?: boolean;
  className?: string;
};

const getShareUrl = (url?: string) => {
  if (url) {
    return url;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.href;
};

const openShareWindow = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer,width=760,height=640');
};

export const ShareButton = ({ title, text, url, label, iconOnly = false, className = '' }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const shareUrl = getShareUrl(url);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text || title);
  const encodedTitle = encodeURIComponent(title);

  React.useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') {
          return;
        }
      }
    }

    setIsOpen((current) => !current);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const actions = [
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => openShareWindow(`https://wa.me/?text=${encodedText}%20${encodedUrl}`),
    },
    {
      label: 'Telegram',
      icon: Send,
      onClick: () => openShareWindow(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`),
    },
    {
      label: 'Facebook',
      icon: Facebook,
      onClick: () => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
    },
    {
      label: 'X',
      icon: Twitter,
      onClick: () => openShareWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`),
    },
    {
      label: 'Email',
      icon: Mail,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
      },
    },
    {
      label: copied ? 'Copied' : 'Copy',
      icon: Copy,
      onClick: copyLink,
    },
  ];

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={shareNative}
        className={
          className ||
          (iconOnly
            ? 'cursor-pointer rounded-xl p-2 text-gray-400 transition-colors hover:text-brand-primary'
            : 'cursor-pointer inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-brand-primary transition-all hover:bg-brand-primary hover:text-white')
        }
        aria-label={label || 'Share'}
      >
        <Share2 className="h-4 w-4" />
        {!iconOnly && <span>{label || 'Share'}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-3 w-72 rounded-[1.5rem] border border-gray-100 bg-white p-3 shadow-2xl">
          <div className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            Share
          </div>
          <div className="grid grid-cols-3 gap-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="cursor-pointer flex flex-col items-center gap-2 rounded-2xl bg-slate-50 px-2 py-3 text-[10px] font-black uppercase tracking-wider text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
