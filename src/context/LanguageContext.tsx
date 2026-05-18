import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { ky, ru, type Language, type TranslationDictionary } from '@/src/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const translations: Record<Language, TranslationDictionary> = { ky, ru };

export const LanguageProvider = ({ children }: PropsWithChildren) => {
    const [language, setLanguage] = useState<Language>('ky');
    const t = (key: string) => translations[language][key] || key;
    return (<LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>);
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
