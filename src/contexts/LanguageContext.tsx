"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string, fallback?: string) => string;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});

  const availableLanguages = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn'];

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // In a real app, this would fetch from API or import dynamically
        const response = await fetch(`/messages/${currentLanguage}.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          // Fallback to English if translation not found
          const enResponse = await fetch('/messages/en.json');
          if (enResponse.ok) {
            const data = await enResponse.json();
            setTranslations(data);
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        // Load fallback translations
        try {
          const enResponse = await fetch('/messages/en.json');
          if (enResponse.ok) {
            const data = await enResponse.json();
            setTranslations(data);
          }
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
        }
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: string) => {
    if (availableLanguages.includes(language)) {
      setCurrentLanguage(language);
      localStorage.setItem('preferred-language', language);
      
      // Update document language
      document.documentElement.lang = language;
    }
  };

  // Translation function with nested key support
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    // Fallback to English translation
    if (currentLanguage !== 'en') {
      let enValue: any = translations;
      for (const k of keys) {
        enValue = enValue?.[k];
      }
      if (typeof enValue === 'string') {
        return enValue;
      }
    }
    
    // Return fallback or key itself
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}