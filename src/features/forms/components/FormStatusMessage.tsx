import { cn } from '@/src/lib/utils';
import { FormStatus } from '../types';
type FormStatusMessageProps = {
    status: FormStatus;
    message: string;
};
export const FormStatusMessage = ({ status, message }: FormStatusMessageProps) => {
    if (!message)
        return null;
    return (<div className={cn('rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-widest', status === 'success' && 'bg-green-50 text-green-700', status === 'error' && 'bg-red-50 text-red-600')}>
      {message}
    </div>);
};
