
import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

export const getAiFeedback = async (score: number, history: Question[], grade: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const wrongAnswers = history.filter(q => !q.isCorrect);
  
  const prompt = `
    أنت خبير في مادة الرياضيات ومنهج اختبارات "نافس" الوطنية السعودية.
    قام طالب في مرحلة "${grade}" بإنهاء اختبار رياضيات تدريبي.
    النتيجة: ${score} من ${history.length}.
    
    تفاصيل الأخطاء (إن وجدت):
    ${wrongAnswers.map(q => `- سؤال: ${q.text} (الإجابة الصحيحة: ${q.correctAnswer}، إجابة الطالب: ${q.userAnswer})`).join('\n')}

    المطلوب منك تقديم استجابة قصيرة (لا تتجاوز 3 أسطر) تتضمن:
    1. رسالة تشجيعية رياضية (مثل: "يا عبقري الأرقام").
    2. نصيحة رياضية مركزة بناءً على مفاهيم الأخطاء (مثل: جدول الضرب، ترتيب العمليات، أو قوانين المساحة).
    3. إذا كانت النتيجة كاملة، اذكر حقيقة رياضية مدهشة (مثل: الرقم الذهبي أو عجائب الرقم ٩).
    
    اللغة: العربية الفاصحة المبسطة.
    الأسلوب: محفز، دقيق رياضياً، وودود.
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

    return response.text?.trim() || "محاولة رائعة! استمر في التدريب لتصبح بطلاً في الرياضيات.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "أحسنت يا بطل! الرياضيات مهارة تتطور بالتدريب المستمر. راجع خطوات حلك وستصل للقمة.";
  }
};
