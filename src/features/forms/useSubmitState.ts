import React from 'react';
import { FormStatus } from './types';
export const useSubmitState = () => {
    const [status, setStatus] = React.useState<FormStatus>('idle');
    const [message, setMessage] = React.useState('');
    const run = async (action: () => Promise<void>, successMessage: string, errorMessage: string) => {
        setStatus('loading');
        setMessage('');
        try {
            await action();
            setStatus('success');
            setMessage(successMessage);
        }
        catch {
            setStatus('error');
            setMessage(errorMessage);
        }
    };
    return {
        status,
        message,
        isLoading: status === 'loading',
        run,
    };
};
