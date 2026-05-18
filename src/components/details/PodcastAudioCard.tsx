import { Mic } from 'lucide-react';

interface PodcastAudioCardProps {
  title: string;
  thumbnail: string;
  url: string;
  hasAudio: boolean;
  fallback: string;
}

export const PodcastAudioCard = ({ title, thumbnail, url, hasAudio, fallback }: PodcastAudioCardProps) => (
  <div className="overflow-hidden rounded-[2rem] bg-brand-ink text-white shadow-2xl md:rounded-[3rem]">
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-[190px_1fr] md:p-12">
      <div className="aspect-square overflow-hidden rounded-[1.5rem] shadow-2xl">
        <img src={thumbnail} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="flex flex-col justify-center space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50">
            <Mic className="h-4 w-4" /> Audio podcast
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
        </div>

        {hasAudio ? (
          <audio controls preload="metadata" src={url} className="w-full" />
        ) : (
          <div className="rounded-lg bg-white/10 p-4 text-sm font-semibold text-white/70">{fallback}</div>
        )}
      </div>
    </div>
  </div>
);
