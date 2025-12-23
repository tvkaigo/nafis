
import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

export const getAiFeedback = async (score: number, history: Question[], grade: string): Promise<string> => {
  // إنشاء مثيل جديد في كل مرة لضمان استخدام أحدث مفتاح API
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const wrongAnswers = history.filter(q => !q.isCorrect);
  
  const prompt = `
    أنت خبير في مادة العلوم ومنهج اختبارات "نافس" الوطنية السعودية.
    قام طالب في مرحلة "${grade}" بإنهاء اختبار علوم تدريبي.
    النتيجة: ${score} من ${history.length}.
    
    تفاصيل الأخطاء (إن وجدت):
    ${wrongAnswers.map(q => `- سؤال: ${q.text || 'سؤال علمي'} (الإجابة الصحيحة: ${q.correctAnswer}، إجابة الطالب: ${q.userAnswer})`).join('\n')}

    المطلوب منك تقديم استجابة قصيرة جداً (لا تتجاوز 3 أسطر) تتضمن:
    1. رسالة تشجيعية ملهمة بأسلوب عالم علوم.
    2. نصيحة علمية مركزة بناءً على المفاهيم التي تعثر فيها الطالب.
    3. إذا كانت النتيجة كاملة، اذكر حقيقة علمية مدهشة ومختصرة.
    
    اللغة: العربية الفصحى المبسطة.
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

    const feedbackText = response.text;
    
    if (!feedbackText) {
      throw new Error("Empty feedback from model");
    }

    return feedbackText.trim();
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // معالجة الأخطاء الشائعة
    if (error?.message?.includes("API_KEY_INVALID")) {
      return "خطأ: مفتاح الوصول غير صالح. يرجى إعادة اختيار المفتاح.";
    }
    
    return "محاولة رائعة يا بطل العلوم! استمر في استكشاف المعرفة، فالعلم هو الطريق نحو النجوم. ركز في المرة القادمة على مراجعة مفاهيمك وستصل للعلامة الكاملة.";
  }
};
