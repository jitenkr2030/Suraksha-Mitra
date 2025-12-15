"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  CheckCircle, 
  Download, 
  Volume2,
  ArrowLeft
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  progress: number;
  downloaded: boolean;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    progress: 100,
    downloaded: true
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    progress: 100,
    downloaded: true
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    progress: 85,
    downloaded: false
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    progress: 80,
    downloaded: false
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇮🇳",
    progress: 75,
    downloaded: false
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
    progress: 70,
    downloaded: false
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    progress: 65,
    downloaded: false
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    progress: 60,
    downloaded: false
  }
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBack?: () => void;
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  onBack 
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const currentLang = languages.find(lang => lang.code === currentLanguage);
  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleDownloadLanguage = async (languageCode: string) => {
    setDownloading(languageCode);
    setDownloadProgress(0);

    // Simulate download process
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(null);
          
          // Mark language as downloaded
          const langIndex = languages.findIndex(lang => lang.code === languageCode);
          if (langIndex !== -1) {
            languages[langIndex].downloaded = true;
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleApplyLanguage = () => {
    if (selectedLanguage !== currentLanguage) {
      onLanguageChange(selectedLanguage);
    }
  };

  const handleTestVoice = (languageCode: string) => {
    const messages = {
      en: "This is a test of the English voice.",
      hi: "यह हिंदी आवाज का परीक्षण है।",
      ta: "இது தமிழ் குரல் சோதனை.",
      te: "ఇది తెలుగు వాయిస్ పరీక్ష.",
      bn: "এটি বাংলা ভয়েস পরীক্ষা।",
      mr: "हे मराठी आवाज चाचणी आहे.",
      gu: "આ ગુજરાતી અવાજનું પરીક્ષણ છે.",
      kn: "ಇದು ಕನ್ನಡ ಧ್ವನಿ ಪರೀಕ್ಷೆ."
    };

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages[languageCode as keyof typeof messages] || messages.en);
      utterance.lang = getLanguageLocale(languageCode);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const getLanguageLocale = (code: string) => {
    const locales = {
      en: 'en-US',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      kn: 'kn-IN'
    };
    return locales[code as keyof typeof locales] || 'en-US';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Language Settings</h1>
          <p className="text-gray-600">Choose your preferred language</p>
        </div>
        {onBack && (
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
      </div>

      {/* Current Language */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{currentLang?.flag}</div>
              <div>
                <h3 className="font-medium">Current Language</h3>
                <p className="text-sm text-gray-600">
                  {currentLang?.nativeName} ({currentLang?.name})
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Select Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {languages.map((language) => (
              <div
                key={language.code}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{language.flag}</div>
                    <div>
                      <h4 className="font-medium">{language.nativeName}</h4>
                      <p className="text-sm text-gray-600">{language.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedLanguage === language.code && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                    {language.downloaded ? (
                      <Badge variant="outline" className="text-xs">
                        Downloaded
                      </Badge>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadLanguage(language.code);
                        }}
                        variant="outline"
                        size="sm"
                        disabled={downloading === language.code}
                      >
                        {downloading === language.code ? (
                          <div className="flex items-center space-x-1">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                            <span>{downloadProgress}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </div>
                        )}
                      </Button>
                    )}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestVoice(language.code);
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {language.progress < 100 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Translation Progress</span>
                      <span>{language.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${language.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Button */}
      {selectedLanguage !== currentLanguage && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Apply Changes</h3>
                <p className="text-sm text-gray-600">
                  Switch to {selectedLang?.nativeName}
                </p>
              </div>
              <Button onClick={handleApplyLanguage}>
                Apply Language
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Language Info */}
      <Card>
        <CardHeader>
          <CardTitle>Language Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Total Languages</p>
              <p className="text-gray-600">{languages.length} supported</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Downloaded</p>
              <p className="text-gray-600">
                {languages.filter(lang => lang.downloaded).length} languages
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium text-gray-900">Features:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Complete app interface translation</li>
              <li>• Voice command support in multiple languages</li>
              <li>• Text-to-speech for accessibility</li>
              <li>• Offline language support</li>
              <li>• Regional language keyboard support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}