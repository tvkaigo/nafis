
import { Grade, Question } from '../types';

export enum MathDomain {
  NUMBERS = "الأعداد والعمليات",
  GEOMETRY = "الهندسة والقياس",
  ALGEBRA = "الجبر والدوال",
  DATA = "الإحصاء والاحتمالات",
  GENERAL = "اختبار شامل"
}

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const mathBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "ما ناتج جمع ٣٤٥ + ١٢٣؟", options: ["٤٦٨", "٥٦٨", "٤٥٨", "٤٦٩"], correctAnswer: "٤٦٨", category: MathDomain.NUMBERS },
    { text: "أي الأشكال التالية له ٤ أضلاع متساوية و٤ زوايا قائمة؟", options: ["المثلث", "المستطيل", "المربع", "الدائرة"], correctAnswer: "المربع", category: MathDomain.GEOMETRY },
    { text: "ما هو العدد المفقود في النمط: ٢، ٤، ٦، ....؟", options: ["٧", "٨", "٩", "١٠"], correctAnswer: "٨", category: MathDomain.ALGEBRA },
    { text: "٥ مجموعات في كل منها ٣ تفاحات، كم عدد التفاح الكلي؟", options: ["٨", "١٥", "١٢", "١٠"], correctAnswer: "١٥", category: MathDomain.NUMBERS },
    { text: "ما قيمة الرقم ٥ في العدد ٥٧٢؟", options: ["٥", "٥٠", "٥٠٠", "٥٠٠٠"], correctAnswer: "٥٠٠", category: MathDomain.NUMBERS },
  ],
  [Grade.PRI_6]: [
    { text: "ما ناتج ضرب ٠.٥ × ٠.٢؟", options: ["٠.١", "٠.٠١", "١.٠", "٠.٢٥"], correctAnswer: "٠.١", category: MathDomain.NUMBERS },
    { text: "محيط مربع طول ضلعه ٥ سم يساوي:", options: ["١٠ سم", "٢٠ سم", "٢٥ سم", "١٥ سم"], correctAnswer: "٢٠ سم", category: MathDomain.GEOMETRY },
    { text: "تبسيط الكسر ١٠/٢٠ هو:", options: ["١/٢", "١/٤", "٢/٣", "١/٥"], correctAnswer: "١/٢", category: MathDomain.NUMBERS },
    { text: "قيمة س في المعادلة س + ٧ = ١٥ هي:", options: ["٧", "٨", "٩", "٢٢"], correctAnswer: "٨", category: MathDomain.ALGEBRA },
    { text: "المتوسط الحسابي للأعداد ٢، ٤، ٦ هو:", options: ["٣", "٤", "٥", "١٢"], correctAnswer: "٤", category: MathDomain.DATA },
  ],
  [Grade.INT_3]: [
    { text: "ما ميل المستقيم المار بالنقطتين (٠،٠) و (٢،٤)؟", options: ["٢", "١/٢", "٤", "٠"], correctAnswer: "٢", category: MathDomain.ALGEBRA },
    { text: "مجموعة حل المعادلة س² = ٢٥ هي:", options: ["٥", "-٥", "{٥، -٥}", "٢٥"], correctAnswer: "{٥، -٥}", category: MathDomain.ALGEBRA },
    { text: "مثلث قائم الزاوية طول ضلعيه ٣ سم، ٤ سم. ما طول الوتر؟", options: ["٥ سم", "٦ سم", "٧ سم", "٢٥ سم"], correctAnswer: "٥ سم", category: MathDomain.GEOMETRY },
    { text: "ما احتمال ظهور عدد زوجي عند إلقاء مكعب أرقام مرة واحدة؟", options: ["١/٢", "١/٣", "١/٦", "٢/٣"], correctAnswer: "١/٢", category: MathDomain.DATA },
    { text: "تبسيط العبارة (٣س) × (٢س) هو:", options: ["٥س", "٦س", "٦س²", "٥س²"], correctAnswer: "٦س²", category: MathDomain.ALGEBRA },
  ]
};

export const generateMathQuestions = (grade: Grade, count: number = 10, domain?: string): Question[] => {
  const fullBank = mathBank[grade] || mathBank[Grade.PRI_3];
  let pool = domain && domain !== MathDomain.GENERAL 
    ? fullBank.filter(q => q.category === domain) 
    : fullBank;

  if (pool.length < count) {
    const remaining = fullBank.filter(q => !pool.includes(q));
    pool = [...pool, ...shuffleArray(remaining)];
  }

  return shuffleArray(pool).slice(0, count).map((q, i) => ({
    ...q,
    id: i + 1,
    options: shuffleArray(q.options || [])
  }));
};

export const getMathOutcomes = (grade: Grade): string[] => {
  return [MathDomain.GENERAL, MathDomain.NUMBERS, MathDomain.GEOMETRY, MathDomain.ALGEBRA, MathDomain.DATA];
};
