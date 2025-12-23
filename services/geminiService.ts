
import {GoogleGenAI} from "@google/genai";
import { Question } from "../types";

export const getAiFeedback = async (score: number, history: Question[], grade: string): Promise<string> => {
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  const wrongAnswers = history.filter(q => !q.isCorrect);
  
  const prompt = `
    أنت خبير في مادة العلوم ومنهج اختبارات "نافس" الوطنية السعودية.
    قام طالب في "${grade}" بإنهاء اختبار علوم.
    النتيجة: ${score} من ${history.length}.
    
    تفاصيل الأخطاء:
    ${wrongAnswers.map(q => `سؤال: ${q.text} (الإجابة الصحيحة: ${q.correctAnswer}، إجابة الطالب: ${q.userAnswer})`).join('\n')}

    المطلوب منك:
    1. رسالة تشجيعية ملهمة كعالم علوم.
    2. نصيحة علمية دقيقة بناءً على المفاهيم التي أخطأ فيها (مثلاً عن الخلايا أو الفضاء أو القوى).
    3. معلومة علمية مدهشة (Science Fact) إذا كانت نتيجته ممتازة.
    
    اللغة: العربية. الأسلوب: ودود، علمي، مشجع. (بحد أقصى 3 أسطر).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "أداء علمي متميز! استمر في استكشاف أسرار الكون.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "محاولة رائعة يا عالم المستقبل! استمر في التعلم لتصل إلى النجوم.";
  }
};
