// AIRecommendation.tsx
import React, { useState } from 'react';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import { Bot, Loader } from 'lucide-react';

interface AIRecommendationProps {
  travelData: any;
  onClose: () => void;
  initialLanguage: string;
}

// Desteklenen diller
const languages = {
  'tr': 'Türkçe',
  'en': 'English',
  'de': 'Deutsch',
  'fr': 'Français',
  'es': 'Español',
  'it': 'Italiano',
  'ru': 'Русский'
};

const AIRecommendation: React.FC<AIRecommendationProps> = ({ 
  travelData, 
  onClose,
  initialLanguage 
}) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedLanguage] = useState<string>(initialLanguage);

  const getPromptForLanguage = (lang: string) => {
    const basePrompt = {
      tr: `Bir seyahat danışmanı olarak, aşağıdaki seyahat bilgilerine göre kişiye özel öneriler sunun.
      
      Seyahat Bilgileri:
      ${Object.entries(travelData)
        .filter(([key]) => !['address', 'hash'].includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}
      
      Lütfen şu konularda öneriler sunun:
      1. Destinasyonlar arasındaki ulaşım önerileri
      2. Her destinasyon için mutlaka görülmesi gereken yerler
      3. Yerel lezzetler ve restoran önerileri
      4. Konaklama tavsiyeleri
      5. Güvenlik ipuçları
      6. Bütçe önerileri`,

      en: `As a travel consultant, please provide personalized recommendations based on the following travel information.
      
      Travel Information:
      ${Object.entries(travelData)
        .filter(([key]) => !['address', 'hash'].includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}
      
      Please provide recommendations on:
      1. Transportation suggestions between destinations
      2. Must-see places for each destination
      3. Local cuisine and restaurant recommendations
      4. Accommodation advice
      5. Safety tips
      6. Budget suggestions`,
    };

    return basePrompt[lang as keyof typeof basePrompt] || basePrompt.en;
  };

  const generateRecommendation = async () => {
    try {
      setLoading(true);
      setError('');

      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompt = getPromptForLanguage(selectedLanguage);
      const languageInstruction = `Please provide the response in ${languages[selectedLanguage as keyof typeof languages]}. Use markdown format and include emojis.`;

      console.log('Sending prompt to OpenAI with language:', selectedLanguage);

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional travel consultant. Provide detailed and personalized recommendations. Respond in ${languages[selectedLanguage as keyof typeof languages]}.`
          },
          {
            role: "user",
            content: `${prompt}\n\n${languageInstruction}`
          }
        ],
        temperature: 0.7,
      });

      const aiResponse = response.choices[0]?.message?.content;
      if (!aiResponse) throw new Error('No response from AI');

      setRecommendation(aiResponse);

    } catch (err) {
      console.error('AI Generation Error:', err);
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    generateRecommendation();
  }, []); // Komponent mount olduğunda otomatik olarak çalıştır

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="bg-purple-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot size={24} />
            AI Travel Recommendations
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-purple-200"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {loading && (
            <div className="flex items-center justify-center gap-3 text-purple-600">
              <Loader className="animate-spin" />
              Generating recommendations...
            </div>
          )}

          {error && (
            <div className="text-red-500 p-4 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          {recommendation && (
            <div className="prose prose-purple max-w-none">
              <ReactMarkdown>{recommendation}</ReactMarkdown>
            </div>
          )}
        </div>

        {recommendation && (
          <div className="p-4 border-t">
            <button
              onClick={generateRecommendation}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Generate New Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendation;