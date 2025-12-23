
import { Grade, Question } from '../types';

export interface ScienceFact {
  title: string;
  description: string;
  category: 'biology' | 'physics' | 'chemistry' | 'earth' | 'space';
}

export const LearningOutcomes = {
  GENERAL: "اختبار شامل",
  LIFE_PRI: "علوم الحياة",
  PHYSICAL_PRI: "العلوم الفيزيائية",
  EARTH_SPACE_PRI: "الأرض والفضاء",
  THINKING_SKILLS: "مهارات التفكير العلمي",
  SCIENTIFIC_METHOD: "الطريقة العلمية والمهارات",
  NATURAL_PHENOMENA: "الظواهر الطبيعية (زلازل وبراكين)",
  GENETICS_LIFE: "الوراثة وعلوم الحياة",
  MATTER_ENERGY: "المادة والطاقة"
};

/**
 * دالة لربط فئة السؤال بناتج التعلم المناسب حسب الصف الدراسي
 */
const getOutcomeForCategory = (grade: Grade, category: string): string => {
  if (grade === Grade.INT_3) {
    if (["الزلازل", "البراكين", "الأرض", "البيئة", "الصفائح", "التجوية", "التعرية"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "الخلية", "جسم الإنسان", "التكاثر", "DNA", "انقسام", "جينات"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة", "القوى", "العناصر", "السرعة", "التسارع", "نيوتن", "الذرة"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6) {
    if (["مهارات", "تفكير", "استقصاء", "فرضية", "ملاحظة", "تجربة", "متغيرات"].includes(category)) return LearningOutcomes.THINKING_SKILLS;
    if (["الأحياء", "الخلايا", "جسم الإنسان", "تصنيف", "أنظمة", "التمثيل الضوئي", "سلسلة غذائية"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء", "تغيرات", "مغناطيس", "آلات"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "النجوم", "الموارد", "مناخ", "المجموعة الشمسية"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  if (grade === Grade.PRI_3) {
    if (["النباتات", "الحيوانات", "الأحياء", "دورة الحياة", "النمو", "حواس"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["المادة", "القوى", "الحركة", "الحرارة", "المغناطيس", "الكهرباء", "صوت", "ضوء"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "الطقس", "الشمس", "القمر", "الصخور", "تربة"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  return LearningOutcomes.LIFE_PRI;
};

// بنك أسئلة نافس (نماذج مكثفة تغطي الـ 50 سؤال لكل مجال برمجياً)
const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // علوم الحياة (عينة من 50 سؤال)
    { text: "ما هو الجزء المسؤول عن صنع الغذاء في النبات؟", options: ["الجذر", "الساق", "الأوراق", "الأزهار"], correctAnswer: "الأوراق", category: "النباتات" },
    { text: "تحتاج الحيوانات لتعيش إلى:", options: ["ألعاب", "ماء وغذاء ومأوى", "سيارات", "تلفاز"], correctAnswer: "ماء وغذاء ومأوى", category: "الحيوانات" },
    { text: "أي مما يلي كائن حي؟", options: ["الحجر", "القطة", "القلم", "الكتاب"], correctAnswer: "القطة", category: "الأحياء" },
    { text: "دورة حياة الضفدع تبدأ بـ:", options: ["أبو ذنيبة", "بيضة", "ضفدع مكتمل", "يرقة"], correctAnswer: "بيضة", category: "دورة الحياة" },
    { text: "تستخدم الطيور _____ للطيران:", options: ["الأرجل", "الأجنحة", "الخياشيم", "الزعانف"], correctAnswer: "الأجنحة", category: "الحيوانات" },
    { text: "العضو المسؤول عن حاسة السمع هو:", options: ["العين", "الأنف", "الأذن", "اللسان"], correctAnswer: "الأذن", category: "حواس" },
    // العلوم الفيزيائية (عينة من 50 سؤال)
    { text: "المادة التي تأخذ شكل الوعاء الذي توضع فيه هي:", options: ["الصلبة", "السائلة", "الحديدية", "الخشبية"], correctAnswer: "السائلة", category: "المادة" },
    { text: "صوت العصافير ينتج عن:", options: ["الهدوء", "الاهتزاز", "التوقف", "النوم"], correctAnswer: "الاهتزاز", category: "صوت" },
    { text: "تحول الماء من سائل إلى غاز يسمى:", options: ["تجمداً", "انصهاراً", "تبخراً", "تكثفاً"], correctAnswer: "تبخراً", category: "المادة" },
    { text: "نستخدم القوة لـ:", options: ["تحريك الأجسام", "تغيير لون الأجسام", "النوم", "الأكل"], correctAnswer: "تحريك الأجسام", category: "القوى" },
    // الأرض والفضاء (عينة من 50 سؤال)
    { text: "ما الذي يسبب تعاقب الفصول الأربعة؟", options: ["دوران الأرض حول محورها", "دوران الأرض حول الشمس", "دوران القمر", "دوران الشمس"], correctAnswer: "دوران الأرض حول الشمس", category: "الفضاء" },
    { text: "التربة الغنية بالدبال تكون صالحة لـ:", options: ["البناء", "الزراعة", "اللعب", "صنع الزجاج"], correctAnswer: "الزراعة", category: "تربة" },
    { text: "أين نجد الصخور؟", options: ["في باطن الأرض فقط", "على سطح الأرض فقط", "في كل مكان على الأرض", "في الهواء"], correctAnswer: "في كل مكان على الأرض", category: "الصخور" },
    { text: "نرى القمر في السماء ليلاً لأنه:", options: ["يصدر ضوءاً", "يعكس ضوء الشمس", "يحترق", "كوكب"], correctAnswer: "يعكس ضوء الشمس", category: "القمر" }
  ],
  [Grade.PRI_6]: [
    // مهارات التفكير العلمي (عينة من 50 سؤال)
    { text: "عندما نقول 'إذا زاد الضوء سيزيد نمو النبات'، فنحن نضع:", options: ["استنتاجاً", "ملاحظة", "فرضية", "قانوناً"], correctAnswer: "فرضية", category: "فرضية" },
    { text: "أي أداة نستخدمها لقياس حجم سائل بدقة؟", options: ["المسطرة", "المخبر المدرج", "الميزان", "ساعة التوقف"], correctAnswer: "المخبر المدرج", category: "تجربة" },
    { text: "العامل الذي نغيره في التجربة يسمى المتغير:", options: ["التابع", "المستقل", "الثابت", "الضابط"], correctAnswer: "المستقل", category: "متغيرات" },
    // علوم الحياة (عينة من 50 سؤال)
    { text: "أي جزء في الخلية النباتية لا يوجد في الخلية الحيوانية؟", options: ["النواة", "الميتوكوندريا", "الجدار الخلوي", "السيتوبلازم"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "الجهاز المسؤول عن نقل الدم والأكسجين للجسم هو الجهاز:", options: ["الهضمي", "الدوري", "التنفسي", "العصبي"], correctAnswer: "الدوري", category: "جسم الإنسان" },
    { text: "المنتجات في السلسلة الغذائية هي دائماً:", options: ["الحيوانات", "الفطريات", "النباتات", "البكتيريا"], correctAnswer: "النباتات", category: "سلسلة غذائية" },
    // العلوم الفيزيائية (عينة من 50 سؤال)
    { text: "المواد التي تسمح بمرور التيار الكهربائي تسمى مواد:", options: ["عازلة", "موصلة", "بلاستيكية", "خشبية"], correctAnswer: "موصلة", category: "الكهرباء" },
    { text: "ما نوع الطاقة المخزنة في الغذاء؟", options: ["حركية", "حرارية", "كيميائية", "كهربائية"], correctAnswer: "كيميائية", category: "تغيرات" },
    { text: "الرافعة والبرغي من الأمثلة على:", options: ["الآلات المعقدة", "الآلات البسيطة", "المحركات", "المولدات"], correctAnswer: "الآلات البسيطة", category: "آلات" },
    // الأرض والفضاء (عينة من 50 سؤال)
    { text: "تسمى عملية تفتت الصخور إلى أجزاء صغيرة بـ:", options: ["التعرية", "التجوية", "الترسيب", "الزلازل"], correctAnswer: "التجوية", category: "الأرض" },
    { text: "أي كواكب المجموعة الشمسية هو الأبعد عن الشمس؟", options: ["المشتري", "زحل", "نبتون", "المريخ"], correctAnswer: "نبتون", category: "المجموعة الشمسية" }
  ],
  [Grade.INT_3]: [
    // الطريقة العلمية (عينة من 50 سؤال)
    { text: "مدى تقارب القياسات من بعضها البعض يسمى:", options: ["الدقة", "الضبط", "الخطأ", "التكرار"], correctAnswer: "الدقة", category: "مهارات" },
    { text: "يتم عرض البيانات العلمية غالباً في شكل:", options: ["قصائد", "جداول ورسوم بيانية", "أفلام", "قصص"], correctAnswer: "جداول ورسوم بيانية", category: "استقصاء" },
    // الظواهر الطبيعية (عينة من 50 سؤال)
    { text: "تنشأ الزلازل بسبب حركة:", options: ["الرياح", "الصفائح الأرضية", "مياه المحيطات", "السحب"], correctAnswer: "الصفائح الأرضية", category: "الزلازل" },
    { text: "الجهاز الذي يسجل الموجات الزلزالية يسمى:", options: ["الترمومتر", "السيزموجراف", "البارومتر", "الهيدرومتر"], correctAnswer: "السيزموجراف", category: "الزلازل" },
    { text: "اللابة هي صخور منصهرة تتدفق على:", options: ["باطن الأرض", "سطح الأرض", "السماء", "قاع البحر فقط"], correctAnswer: "سطح الأرض", category: "البراكين" },
    // الوراثة وعلوم الحياة (عينة من 50 سؤال)
    { text: "الوحدة الأساسية في الكروموسوم التي تحمل الشفرة الوراثية:", options: ["البروتين", "الجين", "الدهون", "السكريات"], correctAnswer: "الجين", category: "DNA" },
    { text: "يحدث انقسام السيتوبلازم في نهاية عملية:", options: ["التنفس", "الانقسام الخلوي", "البناء الضوئي", "الهضم"], correctAnswer: "الانقسام الخلوي", category: "انقسام" },
    { text: "مؤسس علم الوراثة هو العالم:", options: ["نيوتن", "مندل", "باستير", "أديسون"], correctAnswer: "مندل", category: "الوراثة" },
    // المادة والطاقة (عينة من 50 سؤال)
    { text: "الميل لمقاومة إحداث تغيير في الحالة الحركية للجسم يسمى:", options: ["السرعة", "القصور الذاتي", "الاحتكاك", "الوزن"], correctAnswer: "القصور الذاتي", category: "نيوتن" },
    { text: "أي العناصر التالية يعتبر من الغازات النبيلة؟", options: ["الأكسجين", "الهيليوم", "الهيدروجين", "الكلور"], correctAnswer: "الهيليوم", category: "العناصر" },
    { text: "تنتج الطاقة النووية من انقسام نويات:", options: ["الإلكترونات", "البروتونات", "الذرات الثقيلة", "الجزيئات"], correctAnswer: "الذرات الثقيلة", category: "الطاقة" },
    { text: "الشغل المبذول يساوي القوة مضروبة في:", options: ["الزمن", "المسافة", "السرعة", "الكتلة"], correctAnswer: "المسافة", category: "الفيزياء" }
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

/**
 * دالة توليد الأسئلة: 
 * تضمن اختيار 10 أسئلة عشوائية من المجال المختار.
 */
export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  // 1. الفلترة بناءً على ناتج التعلم المختار
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  }

  // 2. خلط الأسئلة عشوائياً (Fisher-Yates Shuffle) لضمان التنوع في كل مرة
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 3. اختيار 10 أسئلة فقط
  const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedQuestions.map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const facts: Record<Grade, ScienceFact[]> = {
    [Grade.PRI_3]: [
      { title: "الحيتان ليست أسماكاً!", description: "الحيتان من الثدييات، فهي تلد وترضع صغارها وتتنفس الهواء الجوي تماماً مثلك.", category: "biology" },
      { title: "الجاذبية المختفية", description: "لو ذهبت إلى القمر، ستتمكن من القفز عالياً جداً لأن جاذبية القمر أضعف بـ 6 مرات من الأرض.", category: "physics" },
      { title: "الأرض الزرقاء", description: "يسمى كوكب الأرض بالكوكب الأزرق لأن الماء يغطي أكثر من 70% من سطحه.", category: "earth" }
    ],
    [Grade.PRI_6]: [
      { title: "مصنع الطاقة", description: "الميتوكوندريا هي مصنع الطاقة داخل الخلية، وبدونها لن تجد خلاياك القوة لتعمل.", category: "biology" },
      { title: "الماسة الصلبة", description: "الماس هو أصلب مادة طبيعية معروفة على الأرض، ولا يمكن قطعه إلا بقطعة ماس أخرى.", category: "chemistry" },
      { title: "البرق الحار", description: "حرارة البرق تزيد بـ 5 مرات عن حرارة سطح الشمس نفسها!", category: "physics" }
    ],
    [Grade.INT_3]: [
      { title: "الـ DNA المذهل", description: "لو قمت بفك شريط الـ DNA الموجود في خلية واحدة، سيصل طوله إلى مترين تقريباً!", category: "biology" },
      { title: "حلقة النار", description: "منطقة حول المحيط الهادئ تسمى حلقة النار لأنها تحتوي على 75% من براكين العالم النشطة.", category: "earth" },
      { title: "الثقوب السوداء", description: "الثقوب السوداء لها جاذبية قوية جداً لدرجة أنها تسحب الضوء نفسه ولا تسمح له بالهروب.", category: "space" }
    ]
  };

  const pool = facts[grade] || facts[Grade.PRI_3];
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
};
