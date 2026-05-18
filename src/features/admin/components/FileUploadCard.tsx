import React from 'react';
import { Check, Copy, FileUp } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
type FileUploadCardProps = {
    uploadedUrl: string;
    onUpload: (file: File) => Promise<void>;
};
const text = {
    ky: {
        title: 'Файл жүктөө',
        description: 'PDF газета үчүн `pdfUrl` талаасына, сүрөт `image/thumbnail` талаасына, аудио `url` талаасына коюлат.',
        uploading: 'Жүктөлүүдө...',
        upload: 'Upload PDF / Media',
        copied: 'Көчүрүлдү',
        copy: 'URL көчүрүү',
    },
    ru: {
        title: 'Загрузка файла',
        description: 'PDF вставляйте в поле `pdfUrl`, изображение в `image/thumbnail`, аудио или видео в поле `url`.',
        uploading: 'Загружается...',
        upload: 'Upload PDF / Media',
        copied: 'Скопировано',
        copy: 'Скопировать URL',
    },
};
export const FileUploadCard = ({ uploadedUrl, onUpload }: FileUploadCardProps) => {
    const { language } = useLanguage();
    const copy = text[language];
    const [file, setFile] = React.useState<File | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file)
            return;
        setIsUploading(true);
        try {
            await onUpload(file);
        }
        finally {
            setIsUploading(false);
        }
    };
    const copyUrl = async () => {
        if (!uploadedUrl)
            return;
        await navigator.clipboard.writeText(uploadedUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };
    return (<Card className="space-y-4">
      <h2 className="text-sm font-black uppercase text-brand-primary">{copy.title}</h2>
      <p className="text-xs font-semibold leading-relaxed text-gray-400">{copy.description}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.mp3,.wav,.ogg,.m4a,.mp4,application/pdf,image/*,audio/*,video/*" onChange={(event) => setFile(event.target.files?.[0] || null)} className="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:text-white"/>
        <Button type="submit" size="sm" icon={FileUp} className="w-full" disabled={!file || isUploading}>
          {isUploading ? copy.uploading : copy.upload}
        </Button>
      </form>
      {uploadedUrl && (<div className="space-y-3 rounded-xl bg-slate-50 p-3">
          <p className="break-all text-xs font-bold text-gray-500">{uploadedUrl}</p>
          <button type="button" onClick={copyUrl} className="cursor-pointer inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary">
            {copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
            {copied ? copy.copied : copy.copy}
          </button>
        </div>)}
    </Card>);
};
