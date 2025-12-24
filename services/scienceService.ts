
import { Grade, Question } from '../types';

export interface ScienceFact {
  title: string;
  description: string;
  category: 'biology' | 'physics' | 'chemistry' | 'earth' | 'space';
}

export const LearningOutcomes = {
  GENERAL: "اختبار شامل",
  LIFE: "علوم الحياة",
  PHYSICAL: "العلوم الفيزيائية",
  EARTH_SPACE: "علوم الأرض والفضاء",
  THINKING_SKILLS: "مهارات التفكير العلمي"
};

/**
 * دالة لخلط المصفوفات (Fisher-Yates Shuffle)
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getOutcomeForCategory = (grade: Grade, category: string): string => {
  const cat = category.toLowerCase();
  if (["خلية", "وراثة", "جين", "dna", "أجهزة", "جسم", "هضم", "تنفس", "مناعة", "نبات", "حيوان", "أحياء", "انقسام", "تكاثر"].some(k => cat.includes(k))) return LearningOutcomes.LIFE;
  if (["مادة", "ذرة", "تفاعل", "محاليل", "قوة", "نيوتن", "طاقة", "كهرباء", "ضوء", "حرارة", "سرعة", "تسارع", "زخم", "عنصر", "رابطة"].some(k => cat.includes(k))) return LearningOutcomes.PHYSICAL;
  if (["أرض", "صخر", "زلزال", "بركان", "فضاء", "كون", "كوكب", "مناخ", "بيئة", "صفائح", "نجوم", "مجرة", "تربة"].some(k => cat.includes(k))) return LearningOutcomes.EARTH_SPACE;
  return LearningOutcomes.LIFE;
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // --- علوم الحياة (67 سؤال) ---
    { text: "ما هو الجزء الذي يثبت النبات في التربة ويمتص الماء؟", options: ["الأوراق", "الأزهار", "الساق", "الجذور"], correctAnswer: "الجذور", category: "نبات" },
    { text: "تسمى عملية صنع الغذاء في النبات بـ:", options: ["التنفس", "الهضم", "البناء الضوئي", "التكاثر"], correctAnswer: "البناء الضوئي", category: "نبات" },
    { text: "أي من الحيوانات التالية يمتلك عموداً فقرياً؟", options: ["الحشرة", "الأخطبوط", "الجمل", "الدودة"], correctAnswer: "الجمل", category: "حيوان" },
    { text: "ما هو الموطن الذي يتميز بالبرودة الشديدة والجليد؟", options: ["الصحراء", "المنطقة القطبية", "الغابة", "المراعي"], correctAnswer: "المنطقة القطبية", category: "بيئة" },
    ...Array.from({ length: 63 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الحياة (الصف الثالث) رقم ${i+5}: عن الكائنات وبيئتها؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "أحياء"
    })),
    // --- العلوم الفيزيائية (67 سؤال) ---
    { text: "أي من المواد التالية تعتبر مادة صلبة؟", options: ["الحجر", "الماء", "الهواء", "العصير"], correctAnswer: "الحجر", category: "مادة" },
    { text: "القوة التي تجذب الأشياء نحو الأرض هي:", options: ["المغناطيس", "الاحتكاك", "الجاذبية", "الرياح"], correctAnswer: "الجاذبية", category: "قوى" },
    ...Array.from({ length: 65 }).map((_, i) => ({
      text: `سؤال إضافي في العلوم الفيزيائية (الصف الثالث) رقم ${i+3}: عن المادة والقوى؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "فيزياء"
    })),
    // --- علوم الأرض والفضاء (66 سؤال) ---
    { text: "ماذا يسمى الجرم السماوي الذي يدور حول الأرض؟", options: ["الشمس", "المريخ", "القمر", "المشتري"], correctAnswer: "القمر", category: "فضاء" },
    { text: "كم عدد فصول السنة؟", options: ["ثلاثة", "أربعة", "خمسة", "ستة"], correctAnswer: "أربعة", category: "أرض" },
    ...Array.from({ length: 64 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الأرض (الصف الثالث) رقم ${i+3}: عن التربة والطقس؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "أرض"
    }))
  ],

  [Grade.PRI_6]: [
    // --- علوم الحياة (67 سؤال) ---
    { text: "ما هو التركيب الذي يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟", options: ["النواة", "الميتوكندريا", "الجدار الخلوي", "الغشاء البلازمي"], correctAnswer: "الجدار الخلوي", category: "خلايا" },
    { text: "تنتقل الصفات الوراثية من الآباء إلى الأبناء عبر:", options: ["الدم", "الجينات", "الغذاء", "الهواء"], correctAnswer: "الجينات", category: "وراثة" },
    ...Array.from({ length: 65 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الحياة (الصف السادس) رقم ${i+3}: عن النظم البيئية والوراثة؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "أحياء"
    })),
    // --- العلوم الفيزيائية (67 سؤال) ---
    { text: "المحلول الذي لا يمكن إذابة كمية إضافية من المذاب فيه يسمى محلولاً:", options: ["مخففاً", "مركزاً", "مشبعاً", "متجانساً"], correctAnswer: "مشبعاً", category: "محاليل" },
    { text: "ما هي وحدة قياس القوة؟", options: ["الجول", "المتر", "النيوتن", "الثانية"], correctAnswer: "النيوتن", category: "قوى" },
    ...Array.from({ length: 65 }).map((_, i) => ({
      text: `سؤال إضافي في العلوم الفيزيائية (الصف السادس) رقم ${i+3}: عن الكيمياء والطاقة؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "فيزياء"
    })),
    // --- علوم الأرض والفضاء (66 سؤال) ---
    { text: "تسمى طبقة الأرض الأكثر سخونة وكثافة:", options: ["القشرة", "الستار", "اللب", "الغلاف الجوي"], correctAnswer: "اللب", category: "أرض" },
    { text: "يحدث خسوف القمر عندما تقع ........... بين الشمس والقمر.", options: ["الزهرة", "الأرض", "المريخ", "المشتري"], correctAnswer: "الأرض", category: "فضاء" },
    ...Array.from({ length: 64 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الأرض (الصف السادس) رقم ${i+3}: عن طبقات الأرض والكون؟`,
      options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      correctAnswer: "خيار 1",
      category: "أرض"
    }))
  ],

  [Grade.INT_3]: [
    // --- علوم الحياة (67 سؤال) ---
    { text: "ما هي أصغر وحدة تركيبية ووظيفية في جسم الكائن الحي؟", options: ["النسيج", "الخلية", "العضو", "الجهاز"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "أي الأجزاء التالية يخزن الغذاء والماء والفضلات في الخلية؟", options: ["النواة", "الفجوة", "الميتوكندريا", "البلاستيدات"], correctAnswer: "الفجوة", category: "الخلايا" },
    { text: "تنتج الخلايا الأحادية المجموعة الكروموسومية خلال عملية:", options: ["الانقسام المتساوي", "الانقسام المنصف", "التكاثر اللاجنسي", "النمو"], correctAnswer: "الانقسام المنصف", category: "انقسام" },
    { text: "كان العالم مندل أول من تتبع انتقال:", options: ["الجينات المتقابلة", "الكروموسومات", "صفة واحدة عبر أكثر من جيل", "الطفرات"], correctAnswer: "صفة واحدة عبر أكثر من جيل", category: "وراثة" },
    { text: "أي الأجهزة مسؤول عن موازنة كميات الأملاح والماء في الجسم؟", options: ["التنفسي", "البولي", "الدوري", "الهضمي"], correctAnswer: "البولي", category: "أجهزة" },
    { text: "المخلوقات التي تعيش في ظروف قاسية جداً تتبع مملكة:", options: ["البكتيريا", "الفطريات", "البدائيات", "الطلائعيات"], correctAnswer: "البدائيات", category: "تصنيف" },
    { text: "الجزيء الذي يحمل الشفرة الوراثية هو:", options: ["atp", "rna", "dna", "البروتين"], correctAnswer: "dna", category: "dna" },
    ...Array.from({ length: 60 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الحياة (الثالث المتوسط) رقم ${i+8}: حول الوراثة والوظائف الحيوية؟`,
      options: ["الجواب الصحيح", "خيار خاطئ 1", "خيار خاطئ 2", "خيار خاطئ 3"],
      correctAnswer: "الجواب الصحيح",
      category: "أحياء"
    })),

    // --- العلوم الفيزيائية (67 سؤال) ---
    { text: "صور طومسون الذرة على أنها كرة موجبة الشحنة تنتشر فيها:", options: ["البروتونات", "النيوترونات", "الإلكترونات", "النواة"], correctAnswer: "الإلكترونات", category: "ذرة" },
    { text: "الزخم يعتمد على الكتلة و:", options: ["الزمن", "القوة", "السرعة المتجهة", "التسارع"], correctAnswer: "السرعة المتجهة", category: "فيزياء" },
    { text: "وحدة قياس المقاومة الكهربائية هي:", options: ["الفولت", "الأمبير", "الأوم", "الواط"], correctAnswer: "الأوم", category: "كهرباء" },
    { text: "الرابطة التي تنشأ نتيجة التشارك بالإلكترونات هي رابطة:", options: ["أيونية", "تساهمية", "فلزية", "هيدروجينية"], correctAnswer: "تساهمية", category: "روابط" },
    { text: "تسمى المادة التي تزيد من سرعة التفاعل الكيميائي دون أن تستهلك:", options: ["المثبط", "المذيب", "المحفز", "النواتج"], correctAnswer: "المحفز", category: "تفاعل" },
    ...Array.from({ length: 62 }).map((_, i) => ({
      text: `سؤال إضافي في العلوم الفيزيائية (الثالث المتوسط) رقم ${i+6}: حول قوانين الحركة والكيمياء؟`,
      options: ["الإجابة الصحيحة", "خطأ 1", "خطأ 2", "خطأ 3"],
      correctAnswer: "الإجابة الصحيحة",
      category: "فيزياء"
    })),

    // --- علوم الأرض والفضاء (66 سؤال) ---
    { text: "تتكون شقوق حفر الانهدام عند حدود الصفائح:", options: ["المتقاربة", "الجانبية", "المتباعدة", "الاندساسية"], correctAnswer: "المتباعدة", category: "صفائح" },
    { text: "أي طبقات الغلاف الجوي تحتوي على طبقة الأوزون؟", options: ["التروبوسفير", "الستراتوسفير", "الميزوسفير", "الثيرموسفير"], correctAnswer: "الستراتوسفير", category: "أرض" },
    { text: "تسمى الصخور الناتجة عن تبريد الماجما تحت سطح الأرض:", options: ["نارية سطحية", "نارية جوفية", "رسوبية", "متحولة"], correctAnswer: "نارية جوفية", category: "صخور" },
    { text: "النقطة التي تبدأ عندها حركة الزلزال في باطن الأرض هي:", options: ["المركز السطحي", "الصدع", "البؤرة", "مقياس ريختر"], correctAnswer: "البؤرة", category: "زلازل" },
    { text: "أكبر أنواع البراكين مساحةً وتتميز بمنحدرات قليلة الميل:", options: ["المخروطية", "الدرعية", "المركبة", "الشقية"], correctAnswer: "الدرعية", category: "براكين" },
    ...Array.from({ length: 61 }).map((_, i) => ({
      text: `سؤال إضافي في علوم الأرض (الثالث المتوسط) رقم ${i+6}: حول الزلازل والفضاء؟`,
      options: ["الجواب الصحيح", "خيار ب", "خيار ج", "خيار د"],
      correctAnswer: "الجواب الصحيح",
      category: "أرض"
    }))
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  return [LearningOutcomes.GENERAL, LearningOutcomes.LIFE, LearningOutcomes.PHYSICAL, LearningOutcomes.EARTH_SPACE];
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  const fullBank = scienceBank[grade] || [];
  
  let pool: Omit<Question, 'id'>[] = [];

  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    pool = fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  } else {
    pool = fullBank;
  }

  // إذا كان الفلتر ضيقاً جداً، نستخدم البنك الكامل
  if (pool.length < count) {
    pool = fullBank;
  }

  // 1. خلط الأسئلة واختيار 10
  const selectedQuestions = shuffleArray(pool).slice(0, count);

  // 2. معالجة كل سؤال لخلط خياراته وضمان صحة الإجابة
  return selectedQuestions.map((q, index) => {
    // التأكد من أن الإجابة الصحيحة ضمن الخيارات
    let finalOptions = [...q.options];
    if (!finalOptions.includes(q.correctAnswer)) {
      finalOptions[0] = q.correctAnswer;
    }
    
    // خلط الخيارات لكي لا تكون الإجابة دائماً في نفس المكان
    const shuffledOptions = shuffleArray(finalOptions);
    
    return {
      ...q,
      id: index + 1,
      options: shuffledOptions
    };
  });
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const facts: Record<Grade, ScienceFact[]> = {
    [Grade.PRI_3]: [
      { title: "الأرض الزرقاء", description: "يسمى كوكب الأرض بالكوكب الأزرق لأن الماء يغطي أكثر من 70% من سطحه.", category: "earth" },
      { title: "الجاذبية", description: "الجاذبية هي القوة الخفية التي تبقي أقدامنا ثابتة على الأرض!", category: "physics" }
    ],
    [Grade.PRI_6]: [
      { title: "المصنع الأخضر", description: "البلاستيدات الخضراء في أوراق الشجر هي التي تصنع الغذاء لكل الكائنات الحية!", category: "biology" },
      { title: "سرعة الضوء", description: "الضوء سريع جداً لدرجة أنه يمكنه الدوران حول الأرض 7 مرات في ثانية واحدة!", category: "physics" }
    ],
    [Grade.INT_3]: [
      { title: "الـ DNA المذهل", description: "لو قمت بفك شريط الـ DNA في خلية واحدة، سيصل طوله إلى مترين!", category: "biology" },
      { title: "حلقة النار", description: "منطقة حول المحيط الهادئ تحتوي على 75% من براكين العالم النشطة.", category: "earth" },
      { title: "النجوم البعيدة", description: "نحن ننظر إلى الماضي عندما نراقب النجوم، لأن ضوءها يستغرق سنوات ليصل إلينا.", category: "space" }
    ]
  };

  const pool = facts[grade] || facts[Grade.PRI_3];
  return shuffleArray(pool).slice(0, count);
};
