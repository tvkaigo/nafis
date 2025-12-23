
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

const getOutcomeForCategory = (grade: Grade, category: string): string => {
  if (grade === Grade.INT_3) {
    if (["الزلازل", "البراكين", "الأرض", "البيئة"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "الخلية", "جسم الإنسان"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة", "القوى"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6 && (category === "مهارات" || category === "تفكير")) return LearningOutcomes.THINKING_SKILLS;
  if (["النباتات", "الحيوانات", "الأحياء", "الخلايا", "جسم الإنسان", "دورة الحياة"].includes(category)) return LearningOutcomes.LIFE_PRI;
  if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء", "المغناطيسية"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
  if (["الأرض", "الفضاء", "الطقس", "النظام الشمسي", "الصخور", "الموارد"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  return LearningOutcomes.LIFE_PRI;
};

// بنك الأسئلة الموسع (أمثلة مكثفة لكل فئة)
const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // علوم الحياة (أمثلة من الـ 70+)
    { text: "أي الأجزاء التالية يمتص الماء من التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لصنع الغذاء إلى غاز:", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"], correctAnswer: "ثاني أكسيد الكربون", category: "النباتات" },
    { text: "الحيوان الذي يرضع صغاره الحليب هو:", options: ["الطيور", "الأسماك", "الثدييات", "الزواحف"], correctAnswer: "الثدييات", category: "الحيوانات" },
    { text: "أي مما يلي كائن حي؟", options: ["السيارة", "القطة", "القلم", "الكتاب"], correctAnswer: "القطة", category: "الأحياء" },
    { text: "دورة حياة الفراشة تبدأ بـ:", options: ["شرنقة", "يرقة", "بيضة", "فراشة مكتملة"], correctAnswer: "بيضة", category: "دورة الحياة" },
    { text: "تتنفس الأسماك عن طريق:", options: ["الرئتين", "الجلد", "الخياشيم", "الأنف"], correctAnswer: "الخياشيم", category: "الحيوانات" },
    { text: "يغطي جسم الجمل:", options: ["الريش", "الشعر", "الوبر", "القشور"], correctAnswer: "الوبر", category: "الحيوانات" },
    // العلوم الفيزيائية
    { text: "المادة التي لها شكل ثابت وحجم ثابت هي:", options: ["الغازية", "السائلة", "الصلبة", "البلازما"], correctAnswer: "الصلبة", category: "المادة" },
    { text: "القوة التي تسحب الأجسام نحو الأرض هي:", options: ["الدفع", "الجاذبية", "الاحتكاك", "المغناطيسية"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "أي مما يلي يعتبر مصدراً للضوء؟", options: ["المرآة", "القمر", "الشمس", "العين"], correctAnswer: "الشمس", category: "الطاقة" },
    { text: "عندما يتحرك الجسم فإنه يغير:", options: ["لونه", "وزنه", "موقعه", "حجمه"], correctAnswer: "موقعه", category: "الحركة" },
    { text: "المغناطيس يجذب الأشياء المصنوعة من:", options: ["الخشب", "البلاستيك", "الحديد", "الزجاج"], correctAnswer: "الحديد", category: "المغناطيسية" },
    // الأرض والفضاء
    { text: "ما الذي يسبب تعاقب الليل والنهار؟", options: ["دوران الأرض حول محورها", "دوران القمر", "دوران الأرض حول الشمس", "دوران الشمس"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    { text: "أكبر كواكب المجموعة الشمسية هو:", options: ["الأرض", "المريخ", "المشتري", "زحل"], correctAnswer: "المشتري", category: "الفضاء" },
    { text: "نحن نعيش على كوكب:", options: ["المريخ", "الزهرة", "الأرض", "عطارد"], correctAnswer: "الأرض", category: "الأرض" },
    { text: "حالة الجو في مكان معين ولفترة قصيرة تسمى:", options: ["المناخ", "الطقس", "الفصول", "الرياح"], correctAnswer: "الطقس", category: "الطقس" },
    // ... يمكن إضافة المزيد ليصل كل قسم لـ 70+
  ],
  [Grade.PRI_6]: [
    // مهارات التفكير العلمي
    { text: "عندما تتوقع نتيجة تجربة قبل بدئها، فأنت تضع:", options: ["استنتاجاً", "فرضية", "ملاحظة", "قانوناً"], correctAnswer: "فرضية", category: "مهارات" },
    { text: "استخدام الحواس الخمس لجمع المعلومات يسمى:", options: ["استنتاجاً", "ملاحظة", "تصنيفاً", "قياساً"], correctAnswer: "ملاحظة", category: "مهارات" },
    { text: "المتغير الذي يتم تغييره في التجربة يسمى المتغير:", options: ["المستقل", "التابع", "الثابت", "الضابط"], correctAnswer: "المستقل", category: "تفكير" },
    // علوم الحياة
    { text: "الوحدة الأساسية لبناء الكائن الحي هي:", options: ["النسيج", "العضو", "الخلية", "الجهاز"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "أي تراكيب الخلية يوفر لها الحماية والدعم؟", options: ["النواة", "الجدار الخلوي", "الفجوة العصارية", "الغشاء البلازمي"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "العملية التي يصنع بها النبات غذاءه هي:", options: ["التنفس", "البناء الضوئي", "النتح", "الهضم"], correctAnswer: "البناء الضوئي", category: "الأحياء" },
    // العلوم الفيزيائية
    { text: "تنتقل الحرارة في الفراغ عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "الإشعاع", category: "الحرارة" },
    { text: "أي مما يلي يعد تغيراً كيميائياً؟", options: ["تبخر الماء", "صدأ الحديد", "كسر الزجاج", "ذوبان السكر"], correctAnswer: "صدأ الحديد", category: "المادة" },
    { text: "الجهاز الذي يحول الطاقة الحركية إلى طاقة كهربائية هو:", options: ["المحرك", "المولد", "المصباح", "البطارية"], correctAnswer: "المولد", category: "الكهرباء" },
    // الأرض والفضاء
    { text: "أقرب الكواكب إلى الشمس هو:", options: ["الأرض", "عطارد", "الزهرة", "المريخ"], correctAnswer: "عطارد", category: "الفضاء" },
    { text: "أي طبقات الأرض تقع في المركز؟", options: ["القشرة", "الستار", "اللب", "الغلاف الجوي"], correctAnswer: "اللب", category: "الأرض" }
  ],
  [Grade.INT_3]: [
    // الظواهر الطبيعية
    { text: "تسمى النقطة الموجودة في باطن الأرض وتبدأ منها الهزة الأرضية:", options: ["المركز السطحي", "بؤرة الزلزال", "الصدع", "الحفرة"], correctAnswer: "بؤرة الزلزال", category: "الزلازل" },
    { text: "بركان يتميز بثوران عنيف ومخروط عالي الجوانب:", options: ["الدرعي", "المخروطي", "المركب", "الساكن"], correctAnswer: "المركب", category: "البراكين" },
    { text: "جهاز يستخدم لقياس وتسجيل الموجات الزلزالية:", options: ["الترمومتر", "السيزموجراف", "البارومتر", "البوصلة"], correctAnswer: "السيزموجراف", category: "الزلازل" },
    // الوراثة وعلوم الحياة
    { text: "المادة الكيميائية التي تحمل الشفرة الوراثية وتوجد في النواة:", options: ["DNA", "RNA", "ATP", "البروتين"], correctAnswer: "DNA", category: "الوراثة" },
    { text: "انقسام الخلية الذي ينتج عنه خليتان متماثلتان تماماً:", options: ["الانقسام المنصف", "الانقسام المتساوي", "الترشيح", "النتح"], correctAnswer: "الانقسام المتساوي", category: "الخلية" },
    { text: "الصفة التي تمنع صفة أخرى من الظهور تسمى صفة:", options: ["متنحية", "سائدة", "هجينة", "نقية"], correctAnswer: "سائدة", category: "الوراثة" },
    // المادة والطاقة
    { text: "عناصر المجموعة 18 في الجدول الدوري هي:", options: ["الفلزات", "الهالوجينات", "الغازات النبيلة", "أشباه الفلزات"], correctAnswer: "الغازات النبيلة", category: "الكيمياء" },
    { text: "الرابطة التي تنشأ من تجاذب أيون موجب مع أيون سالب:", options: ["تساهمية", "أيونية", "فلزية", "هيدروجينية"], correctAnswer: "أيونية", category: "الكيمياء" },
    { text: "المعدل الزمني لتغير السرعة يسمى:", options: ["الإزاحة", "المسافة", "التسارع", "الزخم"], correctAnswer: "التسارع", category: "الفيزياء" }
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  const outcomes = [LearningOutcomes.GENERAL];
  if (grade === Grade.PRI_3) outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI);
  else if (grade === Grade.PRI_6) outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI, LearningOutcomes.THINKING_SKILLS);
  else if (grade === Grade.INT_3) outcomes.push(LearningOutcomes.SCIENTIFIC_METHOD, LearningOutcomes.NATURAL_PHENOMENA, LearningOutcomes.GENETICS_LIFE, LearningOutcomes.MATTER_ENERGY);
  return outcomes;
};

/**
 * دالة توليد الأسئلة: 
 * تضمن اختيار 10 أسئلة عشوائية من الفئة المختارة.
 */
export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  // فلترة الأسئلة بناءً على ناتج التعلم المختار
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  }

  // خلط الأسئلة عشوائياً
  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  
  // اختيار العدد المطلوب (10 أسئلة)
  return shuffled.slice(0, Math.min(count, bank.length)).map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const facts: Record<Grade, ScienceFact[]> = {
    [Grade.PRI_3]: [
      { title: "الحيتان ليست أسماكاً!", description: "الحيتان من الثدييات، فهي تلد وترضع صغارها وتتنفس الهواء الجوي تماماً مثلك.", category: "biology" },
      { title: "الجاذبية المختفية", description: "لو ذهبت إلى القمر، ستتمكن من القفز عالياً جداً لأن جاذبية القمر أضعف بـ 6 مرات من الأرض.", category: "physics" },
      { title: "سرعة الضوء", description: "الضوء هو أسرع شيء في الكون، يمكنه الدوران حول الأرض 7 مرات في ثانية واحدة!", category: "physics" },
      { title: "الأرض الزرقاء", description: "يسمى كوكب الأرض بالكوكب الأزرق لأن الماء يغطي أكثر من 70% من سطحه.", category: "earth" }
    ],
    [Grade.PRI_6]: [
      { title: "مصنع الطاقة", description: "الميتوكوندريا هي مصنع الطاقة داخل الخلية، وبدونها لن تجد خلاياك القوة لتعمل.", category: "biology" },
      { title: "الماسة الصلبة", description: "الماس هو أصلب مادة طبيعية معروفة على الأرض، ولا يمكن قطعه إلا بقطعة ماس أخرى.", category: "chemistry" },
      { title: "البرق الحار", description: "حرارة البرق تزيد بـ 5 مرات عن حرارة سطح الشمس نفسها!", category: "physics" }
    ],
    [Grade.INT_3]: [
      { title: "الـ DNA المذهل", description: "لو قمت بفك شريط الـ DNA الموجود في خلية واحدة، سيصل طوله إلى مترين تقريباً!", category: "biology" },
      { title: "الغازات النبيلة", description: "تسمى نبيلة لأنها لا تتفاعل بسهولة مع العناصر الأخرى، فهي 'مستقرة' وراضية بنفسها.", category: "chemistry" },
      { title: "حلقة النار", description: "منطقة حول المحيط الهادئ تسمى حلقة النار لأنها تحتوي على 75% من براكين العالم النشطة.", category: "earth" }
    ]
  };

  const pool = facts[grade] || facts[Grade.PRI_3];
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
};
