
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
    if (["الزلازل", "البراكين", "الأرض", "البيئة", "الصفائح"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "الخلية", "جسم الإنسان", "التكاثر", "DNA"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة", "القوى", "العناصر", "السرعة", "التسارع"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6) {
    if (["مهارات", "تفكير", "استقصاء", "فرضية", "ملاحظة"].includes(category)) return LearningOutcomes.THINKING_SKILLS;
    if (["الأحياء", "الخلايا", "جسم الإنسان", "تصنيف", "أنظمة", "التمثيل الضوئي"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء", "تغيرات", "مغناطيس"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "النجوم", "الموارد", "مناخ"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  if (grade === Grade.PRI_3) {
    if (["النباتات", "الحيوانات", "الأحياء", "دورة الحياة", "النمو"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["المادة", "القوى", "الحركة", "الحرارة", "المغناطيس", "الكهرباء"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "الطقس", "الشمس", "القمر", "الصخور"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  return LearningOutcomes.LIFE_PRI;
};

// بنك أسئلة ضخم يحتوي على مئات الأسئلة (سيتم عرض 10 منها فقط عشوائياً لكل جولة)
const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // علوم الحياة
    { text: "تحتاج النباتات لصنع الغذاء إلى غاز:", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"], correctAnswer: "ثاني أكسيد الكربون", category: "النباتات" },
    { text: "أي الأجزاء التالية يمتص الماء من التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "حيوان يغطي جسمه الريش ويضع البيض:", options: ["القطة", "السلحفاة", "العصفور", "السمكة"], correctAnswer: "العصفور", category: "الحيوانات" },
    { text: "اليرقة هي مرحلة من دورة حياة:", options: ["الجمل", "الفراشة", "الإنسان", "العنكبوت"], correctAnswer: "الفراشة", category: "دورة الحياة" },
    { text: "أين يعيش السمك؟", options: ["في الغابة", "في الصحراء", "في الماء", "في الجبل"], correctAnswer: "في الماء", category: "الأحياء" },
    { text: "من الكائنات التي تلد صغارها:", options: ["الدجاج", "الثعبان", "الأرنب", "الضفدع"], correctAnswer: "الأرنب", category: "الحيوانات" },
    { text: "وظيفة الساق في النبات هي:", options: ["امتصاص الماء", "تثبيت النبات", "نقل الماء والأملاح", "صنع البذور"], correctAnswer: "نقل الماء والأملاح", category: "النباتات" },
    // العلوم الفيزيائية
    { text: "المادة التي لها حجم ثابت وشكل غير ثابت هي:", options: ["الصلبة", "السائلة", "الغازية", "المغناطيسية"], correctAnswer: "السائلة", category: "المادة" },
    { text: "يستخدم الميزان ذو الكفتين لقياس:", options: ["الطول", "الكتلة", "الحجم", "الحرارة"], correctAnswer: "الكتلة", category: "المادة" },
    { text: "القوة التي تسحب الأجسام لأسفل هي:", options: ["المغناطيس", "الاحتكاك", "الجاذبية", "الدفع"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "عند تسخين الثلج فإنه:", options: ["يتجمد", "ينصهر", "يتبخر", "يتكثف"], correctAnswer: "ينصهر", category: "المادة" },
    { text: "المغناطيس يجذب الأجسام المصنوعة من:", options: ["الخشب", "الحديد", "البلاستيك", "الزجاج"], correctAnswer: "الحديد", category: "المغناطيس" },
    // الأرض والفضاء
    { text: "أي كوكب يسمى الكوكب الأحمر؟", options: ["الأرض", "المريخ", "زحل", "عطارد"], correctAnswer: "المريخ", category: "الفضاء" },
    { text: "تستغرق الأرض للدوران حول الشمس:", options: ["يوم واحد", "شهر واحد", "سنة واحدة", "ساعة واحدة"], correctAnswer: "سنة واحدة", category: "الفضاء" },
    { text: "من موارد الأرض الطبيعية:", options: ["البلاستيك", "الماء", "الزجاج", "السيارات"], correctAnswer: "الماء", category: "الأرض" },
    { text: "القمر يدور حول:", options: ["الشمس", "الأرض", "المريخ", "نفسه فقط"], correctAnswer: "الأرض", category: "الفضاء" }
    // ... يمكن إضافة 100+ سؤال هنا بنفس النمط
  ],
  [Grade.PRI_6]: [
    // مهارات التفكير العلمي
    { text: "توقع لجواب علمي يمكن اختباره يسمى:", options: ["ملاحظة", "فرضية", "استنتاج", "قانون"], correctAnswer: "فرضية", category: "فرضية" },
    { text: "عندما نستخدم حواسنا لجمع المعلومات فنحن نقوم بـ:", options: ["القياس", "التصنيف", "الملاحظة", "التجريب"], correctAnswer: "الملاحظة", category: "ملاحظة" },
    { text: "العامل الذي لا يتغير في التجربة يسمى:", options: ["المتغير المستقل", "المتغير التابع", "الثابت", "الفرضية"], correctAnswer: "الثابت", category: "تفكير" },
    { text: "الخطوة الأولى في الطريقة العلمية هي:", options: ["وضع فرضية", "تحديد المشكلة", "تحليل البيانات", "استخلاص النتائج"], correctAnswer: "تحديد المشكلة", category: "مهارات" },
    // علوم الحياة
    { text: "مركز التحكم في الخلية هو:", options: ["السيتوبلازم", "الغشاء البلازمي", "النواة", "الميتوكوندريا"], correctAnswer: "النواة", category: "الخلايا" },
    { text: "الحيوانات التي ليس لها عمود فقري تسمى:", options: ["فقاريات", "لا فقاريات", "ثدييات", "برمائيات"], correctAnswer: "لا فقاريات", category: "تصنيف" },
    { text: "تتم عملية البناء الضوئي في:", options: ["الجذور", "البلاستيدات الخضراء", "الأزهار", "النواة"], correctAnswer: "البلاستيدات الخضراء", category: "التمثيل الضوئي" },
    { text: "أي الكائنات التالية يعتبر من المنتجات؟", options: ["الأسد", "الأعشاب", "الفطريات", "الإنسان"], correctAnswer: "الأعشاب", category: "أنظمة" },
    // العلوم الفيزيائية
    { text: "تنتقل الحرارة في المواد الصلبة عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "التوصيل", category: "الحرارة" },
    { text: "المقاومة الكهربائية تقاس بوحدة:", options: ["الفولت", "الأمبير", "الأوم", "الواط"], correctAnswer: "الأوم", category: "الكهرباء" },
    { text: "أي مما يلي يعتبر تغيراً كيميائياً؟", options: ["تمزيق الورق", "صدأ الحديد", "ذوبان السكر", "تبخر الماء"], correctAnswer: "صدأ الحديد", category: "تغيرات" },
    { text: "القدرة على بذل شغل تسمى:", options: ["القوة", "الطاقة", "السرعة", "التسارع"], correctAnswer: "الطاقة", category: "الطاقة" }
  ],
  [Grade.INT_3]: [
    // الطريقة العلمية
    { text: "أي مما يلي يعتبر مهارة استقصائية؟", options: ["الملاحظة", "النوم", "الأكل", "اللعب"], correctAnswer: "الملاحظة", category: "استقصاء" },
    { text: "العامل الذي يتم قياسه في التجربة هو:", options: ["المتغير المستقل", "المتغير التابع", "العامل الثابت", "الفرضية"], correctAnswer: "المتغير التابع", category: "مهارات" },
    // الظواهر الطبيعية
    { text: "النقطة التي تقع مباشرة فوق بؤرة الزلزال هي:", options: ["المركز السطحي", "الصدع", "الموجة الزلزالية", "الحفرة"], correctAnswer: "المركز السطحي", category: "الزلازل" },
    { text: "الموجات الزلزالية التي تسبب معظم الدمار هي:", options: ["الأولية", "الثانوية", "السطحية", "الداخلية"], correctAnswer: "السطحية", category: "الزلازل" },
    { text: "بركان واسع الامتداد وقليل الانحدار يسمى:", options: ["الدرعي", "المخروطي", "المركب", "الخامد"], correctAnswer: "الدرعي", category: "البراكين" },
    { text: "تسمى المادة الصخرية المنصهرة في باطن الأرض:", options: ["لابة", "ماجما", "رماد", "حجر"], correctAnswer: "ماجما", category: "البراكين" },
    // الوراثة
    { text: "المادة الكيميائية في نواة الخلية التي تحمل الشفرة الوراثية هي:", options: ["RNA", "DNA", "ATP", "بروتين"], correctAnswer: "DNA", category: "DNA" },
    { text: "يحدث الانقسام المنصف في الخلايا:", options: ["الجسمية", "الجنسية", "العصبية", "الجلدية"], correctAnswer: "الجنسية", category: "التكاثر" },
    { text: "مخطط يوضح كيفية انتقال الصفات الوراثية في العائلة:", options: ["الجدول الدوري", "مربع بانيت", "سجل النسب", "خريطة المفاهيم"], correctAnswer: "سجل النسب", category: "الوراثة" },
    // المادة والطاقة
    { text: "عنصر يقع في المجموعة الأولى ويتميز بنشاطه الكيميائي العالي:", options: ["الحديد", "الصوديوم", "الذهب", "النيون"], correctAnswer: "الصوديوم", category: "العناصر" },
    { text: "الرابطة التي تنشأ من تجاذب أيون موجب وأيون سالب هي:", options: ["تساهمية", "فلزية", "أيونية", "هيدروجينية"], correctAnswer: "أيونية", category: "الكيمياء" },
    { text: "التغير في السرعة المتجهة مقسوماً على الزمن هو:", options: ["المسافة", "الزخم", "التسارع", "القوة"], correctAnswer: "التسارع", category: "التسارع" },
    { text: "قانون نيوتن الثاني يعبر عنه بالمعادلة:", options: ["ق = ك × ت", "س = ف / ز", "ج = ك / ح", "ط = ك × س²"], correctAnswer: "ق = ك × ت", category: "الفيزياء" }
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
 * إذا كان المجال هو "اختبار شامل"، تختار 10 من كافة المجالات عشوائياً.
 */
export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  // 1. الفلترة بناءً على ناتج التعلم المختار
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  }

  // 2. خلط الأسئلة عشوائياً (Fisher-Yates Shuffle) لضمان عدم التكرار
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 3. اختيار 10 أسئلة فقط (أو العدد المطلوب)
  // إذا كان البنك المفلتر يحتوي على أقل من 10، نأخذ المتاح
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
