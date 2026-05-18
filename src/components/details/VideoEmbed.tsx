interface VideoEmbedProps {
  embedUrl: string;
  title: string;
  fallback: string;
  className?: string;
}

export const VideoEmbed = ({ embedUrl, title, fallback, className = '' }: VideoEmbedProps) => (
  <div className={`aspect-video overflow-hidden rounded-[2rem] bg-black shadow-2xl md:rounded-[3rem] ${className}`}>
    {embedUrl ? (
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <div className="flex h-full items-center justify-center px-6 text-center text-sm font-bold text-white/70">
        {fallback}
      </div>
    )}
  </div>
);
