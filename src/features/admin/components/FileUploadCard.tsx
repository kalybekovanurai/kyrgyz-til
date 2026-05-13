import React from 'react';
import { FileUp } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';

type FileUploadCardProps = {
  uploadedUrl: string;
  onUpload: (file: File) => Promise<void>;
};

export function FileUploadCard({ uploadedUrl, onUpload }: FileUploadCardProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-sm font-black uppercase text-brand-primary">Файл жүктөө</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:text-white"
        />
        <Button type="submit" size="sm" icon={FileUp} className="w-full">
          Upload
        </Button>
      </form>
      {uploadedUrl && (
        <div className="rounded-xl bg-slate-50 p-3 text-xs font-bold text-gray-500 break-all">
          {uploadedUrl}
        </div>
      )}
    </Card>
  );
}

