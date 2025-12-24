
import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

export const getAiFeedback = async (score: number, history: Question[], grade: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const wrongAnswers = history.filter(q => !q.isCorrect);
  
  const prompt = `
    أنت خبير في مادة العلوم ومنهج اختبارات "نافس" الوطنية السعودية.
    قام طالب في مرحلة "${grade}" بإنهاء اختبار علوم تدريبي.
    النتيجة: ${score} من ${history.length}.
    
    تفاصيل الأخطاء (إن وجدت):
    ${wrongAnswers.map(q => `- سؤال: ${q.text} (الإجابة الصحيحة: ${q.correctAnswer}، إجابة الطالب: ${q.userAnswer})`).join('\n')}

    المطلوب منك تقديم استجابة قصيرة (لا تتجاوز 3 أسطر) تتضمن:
    1. رسالة تشجيعية علمية (مثل: "يا عالم المستقبل" أو "يا باحثنا المبدع").
    2. نصيحة علمية مركزة بناءً على مفاهيم الأخطاء (مثل: أجزاء الخلية، قوانين نيوتن، أو طبقات الأرض).
    3. إذا كانت النتيجة كاملة، اذكر حقيقة علمية مدهشة (مثل: سرعة الضوء أو عجائب الـ DNA).
    
    اللغة: العربية الفاصحة المبسطة.
    الأسلوب: محفز، دقيق علمياً، وودود.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 250,
      }
    });

    return response.text?.trim() || "محاولة رائعة! استمر في البحث والاستكشاف لتصبح عالماً يفتخر به الوطن.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "أحسنت يا بطل! العلوم مهارة تتطور بالبحث والتجربة. راجع مفاهيمك وستصل للقمة.";
  }
};
