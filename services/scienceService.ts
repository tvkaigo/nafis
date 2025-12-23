
import { Grade, Question } from '../types';

export interface ScienceFact {
  title: string;
  description: string;
  category: 'biology' | 'physics' | 'chemistry' | 'earth' | 'space';
}

// نواتج التعلم المخصصة لكل مرحلة بناءً على معايير نافس
export const LearningOutcomes = {
  // عام
  GENERAL: "اختبار شامل",
  
  // ثالث ابتدائي وسادس
  LIFE_PRI: "علوم الحياة",
  PHYSICAL_PRI: "العلوم الفيزيائية",
  EARTH_SPACE_PRI: "الأرض والفضاء",
  
  // سادس إضافي
  THINKING_SKILLS: "مهارات التفكير العلمي",
  
  // ثالث متوسط
  SCIENTIFIC_METHOD: "الطريقة العلمية والمهارات",
  NATURAL_PHENOMENA: "الظواهر الطبيعية (زلازل وبراكين)",
  GENETICS_LIFE: "الوراثة وعلوم الحياة",
  MATTER_ENERGY: "المادة والطاقة"
};

// خريطة تصنيف الأسئلة حسب المرحلة وناتج التعلم
const getOutcomeForCategory = (grade: Grade, category: string): string => {
  if (grade === Grade.INT_3) {
    if (["الزلازل", "البراكين", "الأرض"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "جسم الإنسان"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "القوى"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  
  if (grade === Grade.PRI_6 && category === "مهارات") return LearningOutcomes.THINKING_SKILLS;
  
  if (["النباتات", "الحيوانات", "الأحياء", "جسم الإنسان", "الصحة", "الخلايا", "الوراثة", "البيئة"].includes(category)) 
    return LearningOutcomes.LIFE_PRI;
  
  if (["القوى", "الفيزياء", "المادة", "الكيمياء"].includes(category)) 
    return LearningOutcomes.PHYSICAL_PRI;
  
  if (["الأرض", "الفضاء"].includes(category)) 
    return LearningOutcomes.EARTH_SPACE_PRI;

  return LearningOutcomes.LIFE_PRI;
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "أي الأجزاء التالية في النبات يعمل على امتصاص الماء والأملاح من التربة؟", options: ["الأوراق", "الأزهار", "الجذور", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "أي حيوان يغطي جسمه الشعر ويرضع صغاره الحليب؟", options: ["الطيور", "الزواحف", "الثدييات", "البرمائيات"], correctAnswer: "الثدييات", category: "الحيوانات" },
    { text: "المادة التي لها شكل ثابت وحجم ثابت هي المادة:", options: ["الغازية", "السائلة", "الصلبة", "البلازما"], correctAnswer: "الصلبة", category: "المادة" },
    { text: "ما الذي يسبب تعاقب الليل والنهار على الأرض؟", options: ["دوران الأرض حول الشمس", "دوران القمر حول الأرض", "دوران الأرض حول محورها", "ميل محور الأرض"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    { text: "أي مما يلي يعتبر من موارد الطاقة المتجددة؟", options: ["النفط", "الفحم", "الرياح", "الغاز الطبيعي"], correctAnswer: "الرياح", category: "الأرض" },
    // إضافة المزيد من الأسئلة هنا لتغطية 100 سؤال...
  ],
  [Grade.PRI_6]: [
    { text: "عندما يقوم العالم بملاحظة نبات ينمو في الظلام، فإنه يستخدم مهارة:", options: ["الاستنتاج", "الملاحظة", "التجريب", "التواصل"], correctAnswer: "الملاحظة", category: "مهارات" },
    { text: "أي من التراكيب التالية يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟", options: ["الغشاء الخلوي", "النواة", "الجدار الخلوي", "السيتوبلازم"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "تنتقل الحرارة في الفراغ عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "الإشعاع", category: "الفيزياء" },
  ],
  [Grade.INT_3]: [
    { text: "تسمى الموجات التي تتولد عن حدوث زلزال في قاع المحيط بـ:", options: ["سونامي", "رعدية", "مغناطيسية", "صوتية"], correctAnswer: "سونامي", category: "الزلازل" },
    { text: "الجزء في الخلية الذي يحمل الشفرة الوراثية هو:", options: ["DNA", "الميتوكوندريا", "الفجوة", "الغشاء"], correctAnswer: "DNA", category: "الوراثة" },
    { text: "قام طالب بقياس درجة حرارة الماء ثلاث مرات، هذه الخطوة تسمى:", options: ["فرضية", "جمع البيانات", "استنتاج", "تواصل"], correctAnswer: "جمع البيانات", category: "مهارات" },
    { text: "عناصر المجموعة 18 في الجدول الدوري تسمى:", options: ["فلزات", "هالوجينات", "غازات نبيلة", "أشباه فلزات"], correctAnswer: "غازات نبيلة", category: "الكيمياء" },
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  const outcomes = [LearningOutcomes.GENERAL];
  
  if (grade === Grade.PRI_3) {
    outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI);
  } else if (grade === Grade.PRI_6) {
    outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI, LearningOutcomes.THINKING_SKILLS);
  } else if (grade === Grade.INT_3) {
    outcomes.push(LearningOutcomes.SCIENTIFIC_METHOD, LearningOutcomes.NATURAL_PHENOMENA, LearningOutcomes.GENETICS_LIFE, LearningOutcomes.MATTER_ENERGY);
  }
  
  return outcomes;
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  }

  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, bank.length)).map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 5): ScienceFact[] => {
  // يمكن استدعاء الحقائق هنا
  return [];
};
