
import { Grade, Question } from '../types';

export interface ScienceFact {
  title: string;
  description: string;
  category: 'biology' | 'physics' | 'chemistry' | 'earth' | 'space';
}

// تعريف المجالات الكبرى (نواتج التعلم)
export const LearningOutcomes = {
  LIFE: "علوم الحياة",
  PHYSICAL: "العلوم الفيزيائية",
  EARTH_SPACE: "الأرض والفضاء",
  CHEMISTRY: "العلوم الكيميائية", // خاصة بالمتوسط والسادس
  GENERAL: "اختبار شامل"
};

// خريطة لربط الفئات التفصيلية بالمجالات الكبرى
const categoryToOutcomeMap: Record<string, string> = {
  "النباتات": LearningOutcomes.LIFE,
  "الحيوانات": LearningOutcomes.LIFE,
  "الأحياء": LearningOutcomes.LIFE,
  "جسم الإنسان": LearningOutcomes.LIFE,
  "الصحة": LearningOutcomes.LIFE,
  "الخلايا": LearningOutcomes.LIFE,
  "الوراثة": LearningOutcomes.LIFE,
  "البيئة": LearningOutcomes.LIFE,
  "القوى": LearningOutcomes.PHYSICAL,
  "الفيزياء": LearningOutcomes.PHYSICAL,
  "القوى والطاقة": LearningOutcomes.PHYSICAL,
  "المادة": LearningOutcomes.PHYSICAL, // للابتدائي تُصنف فيزيائي
  "الكيمياء": LearningOutcomes.CHEMISTRY,
  "الأرض": LearningOutcomes.EARTH_SPACE,
  "الفضاء": LearningOutcomes.EARTH_SPACE,
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // (الأسئلة السابقة محتفظ بها مع تصنيفاتها)
    { text: "أي الأجزاء التالية في النبات يعمل على امتصاص الماء والأملاح من التربة؟", options: ["الأوراق", "الأزهار", "الجذور", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لصنع غذائها إلى ضوء الشمس والماء وغاز:", options: ["الأكسجين", "النيتروجين", "ثاني أكسيد الكربون", "الهيدروجين"], correctAnswer: "ثاني أكسيد الكربون", category: "النباتات" },
    { text: "أي حيوان يغطي جسمه الشعر ويرضع صغاره الحليب؟", options: ["الطيور", "الزواحف", "الثدييات", "البرمائيات"], correctAnswer: "الثدييات", category: "الحيوانات" },
    { text: "المادة التي لها شكل ثابت وحجم ثابت هي المادة:", options: ["الغازية", "السائلة", "الصلبة", "البلازما"], correctAnswer: "الصلبة", category: "المادة" },
    { text: "القوة التي تسحب الأجسام نحو الأرض هي:", options: ["المغناطيسية", "الاحتكاك", "الجاذبية", "الدفع"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "ما الذي يسبب تعاقب الليل والنهار على الأرض؟", options: ["دوران الأرض حول الشمس", "دوران القمر حول الأرض", "دوران الأرض حول محورها", "ميل محور الأرض"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    // سيتم استكمال الـ 100 سؤال هنا لاحقاً...
  ],
  [Grade.PRI_6]: [
    { text: "أي من التراكيب التالية يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟", options: ["الغشاء الخلوي", "النواة", "الجدار الخلوي والبلاستيدات", "السيتوبلازم"], correctAnswer: "الجدار الخلوي والبلاستيدات", category: "الخلايا" },
    { text: "أي مما يلي يعتبر تغيراً كيميائياً (ينتج عنه مادة جديدة)؟", options: ["صدأ الحديد", "تمزيق الورق", "انصهار الجليد", "كسر الزجاج"], correctAnswer: "صدأ الحديد", category: "الكيمياء" },
    { text: "أي طبقة من طبقات الأرض تكون في حالة سائلة؟", options: ["القشرة", "الستار", "اللب الخارجي", "اللب الداخلي"], correctAnswer: "اللب الخارجي", category: "الأرض" },
  ],
  [Grade.INT_3]: [
    { text: "أين تتركز معظم كتلة الذرة؟", options: ["في الإلكترونات", "في النواة", "في المستويات الخارجية", "تتوزع بالتساوي"], correctAnswer: "في النواة", category: "الكيمياء" },
    { text: "ما هو المعدل الزمني لتغير السرعة المتجهة؟", options: ["السرعة اللحظية", "التسارع", "الإزاحة", "الزخم"], correctAnswer: "التسارع", category: "الفيزياء" },
  ]
};

// تابع لاسترجاع نواتج التعلم المتاحة لصف معين
export const getOutcomesByGrade = (grade: Grade): string[] => {
  const bank = scienceBank[grade] || [];
  const outcomes = new Set<string>();
  outcomes.add(LearningOutcomes.GENERAL); // الخيار الشامل دائماً متاح
  
  bank.forEach(q => {
    const outcome = categoryToOutcomeMap[q.category || ""] || LearningOutcomes.LIFE;
    outcomes.add(outcome);
  });
  
  return Array.from(outcomes);
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  // تطبيق الفلترة إذا تم اختيار ناتج تعلم معين
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => categoryToOutcomeMap[q.category || ""] === outcomeFilter);
  }

  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, bank.length)).map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 5): ScienceFact[] => {
  // استخدام الحقائق المخزنة سابقاً
  return []; // Placeholder للتبسيط، سيتم دمج الحقائق هنا
};
