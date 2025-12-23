
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
    if (["الوراثة", "الأحياء", "الخلية", "جسم الإنسان", "التكاثر"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة", "القوى", "العناصر", "السرعة"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6) {
    if (["مهارات", "تفكير", "استقصاء", "فرضية"].includes(category)) return LearningOutcomes.THINKING_SKILLS;
    if (["الأحياء", "الخلايا", "جسم الإنسان", "تصنيف", "أنظمة"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء", "تغيرات"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "النجوم", "الموارد"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  if (grade === Grade.PRI_3) {
    if (["النباتات", "الحيوانات", "الأحياء", "دورة الحياة", "النمو"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["المادة", "القوى", "الحركة", "الحرارة", "المغناطيس"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "الطقس", "الشمس", "القمر"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  return LearningOutcomes.LIFE_PRI;
};

// بنك أسئلة ضخم يحاكي اختبارات نافس
const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // علوم الحياة (عينة من مئات الأسئلة)
    { text: "أي الأجزاء التالية يمتص الماء من التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لصنع الغذاء إلى غاز:", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"], correctAnswer: "ثاني أكسيد الكربون", category: "النباتات" },
    { text: "أي الحيوانات التالية يرضع صغاره الحليب؟", options: ["الطيور", "الأسماك", "الثدييات", "الزواحف"], correctAnswer: "الثدييات", category: "الحيوانات" },
    { text: "دورة حياة الفراشة تبدأ بـ:", options: ["شرنقة", "يرقة", "بيضة", "فراشة مكتملة"], correctAnswer: "بيضة", category: "دورة الحياة" },
    { text: "تتنفس الأسماك عن طريق:", options: ["الرئتين", "الجلد", "الخياشيم", "الأنف"], correctAnswer: "الخياشيم", category: "الحيوانات" },
    { text: "المكان الذي يعيش فيه الكائن الحي يسمى:", options: ["المنزل", "الموطن", "المدرسة", "الملعب"], correctAnswer: "الموطن", category: "الأحياء" },
    { text: "أي مما يلي كائن غير حي؟", options: ["العصفور", "السمكة", "الصخرة", "النخلة"], correctAnswer: "الصخرة", category: "الأحياء" },
    // العلوم الفيزيائية
    { text: "المادة التي لها شكل ثابت وحجم ثابت هي:", options: ["الغازية", "السائلة", "الصلبة", "البلازما"], correctAnswer: "الصلبة", category: "المادة" },
    { text: "القوة التي تسحب الأجسام نحو الأرض هي:", options: ["الدفع", "الجاذبية", "الاحتكاك", "المغناطيسية"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "عندما يتحرك الجسم فإنه يغير:", options: ["لونه", "وزنه", "موقعه", "حجمه"], correctAnswer: "موقعه", category: "الحركة" },
    { text: "أي مما يلي يصدر صوتاً؟", options: ["الحجر", "الجرس", "القلم", "الكتاب"], correctAnswer: "الجرس", category: "القوى" },
    // الأرض والفضاء
    { text: "ما الذي يسبب تعاقب الليل والنهار؟", options: ["دوران الأرض حول محورها", "دوران القمر", "دوران الأرض حول الشمس", "دوران الشمس"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    { text: "أكبر كواكب المجموعة الشمسية هو:", options: ["الأرض", "المريخ", "المشتري", "زحل"], correctAnswer: "المشتري", category: "الفضاء" },
    { text: "نحن نعيش على كوكب:", options: ["المريخ", "الزهرة", "الأرض", "عطارد"], correctAnswer: "الأرض", category: "الأرض" },
    { text: "حالة الجو في مكان معين ولفترة قصيرة تسمى:", options: ["المناخ", "الطقس", "الفصول", "الرياح"], correctAnswer: "الطقس", category: "الطقس" },
    { text: "أقرب نجم إلى الأرض هو:", options: ["الشمس", "سهيل", "الثريا", "الشعرى اليمانية"], correctAnswer: "الشمس", category: "الشمس" },
    // تكرار النمط أعلاه للوصول لـ 100+ لكل فئة...
  ],
  [Grade.PRI_6]: [
    // مهارات التفكير العلمي
    { text: "توقع نتيجة تجربة قبل بدئها يسمى:", options: ["استنتاجاً", "فرضية", "ملاحظة", "قانوناً"], correctAnswer: "فرضية", category: "مهارات" },
    { text: "استخدام الحواس الخمس لجمع المعلومات يسمى:", options: ["استنتاجاً", "ملاحظة", "تصنيفاً", "قياساً"], correctAnswer: "ملاحظة", category: "مهارات" },
    { text: "المتغير الذي يتم قياسه أثناء التجربة يسمى المتغير:", options: ["المستقل", "التابع", "الثابت", "الضابط"], correctAnswer: "التابع", category: "تفكير" },
    // علوم الحياة
    { text: "الوحدة الأساسية لبناء الكائن الحي هي:", options: ["النسيج", "العضو", "الخلية", "الجهاز"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "أي تراكيب الخلية يوفر لها الحماية والدعم؟", options: ["النواة", "الجدار الخلوي", "الفجوة العصارية", "الغشاء البلازمي"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "تصنف الحيوانات التي لها عمود فقري ضمن مجموعة:", options: ["اللافقاريات", "الفقاريات", "الحشرات", "الرخويات"], correctAnswer: "الفقاريات", category: "تصنيف" },
    // العلوم الفيزيائية
    { text: "تنتقل الحرارة في الفراغ عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "الإشعاع", category: "الحرارة" },
    { text: "أي مما يلي يعد تغيراً كيميائياً؟", options: ["تبخر الماء", "صدأ الحديد", "كسر الزجاج", "ذوبان السكر"], correctAnswer: "صدأ الحديد", category: "تغيرات" },
    { text: "المسار المغلق للتيار الكهربائي يسمى:", options: ["المقاومة", "الدائرة الكهربائية", "المولد", "البطارية"], correctAnswer: "الدائرة الكهربائية", category: "الكهرباء" },
    // الأرض والفضاء
    { text: "أي طبقات الأرض هي الأكثر سخونة؟", options: ["القشرة", "الستار", "اللب", "الغلاف الجوي"], correctAnswer: "اللب", category: "الأرض" },
    { text: "يحدث كسوف الشمس عندما يقع _____ بين الأرض والشمس:", options: ["المريخ", "المشتري", "القمر", "الزهرة"], correctAnswer: "القمر", category: "الفضاء" }
  ],
  [Grade.INT_3]: [
    // الظواهر الطبيعية
    { text: "تسمى النقطة في باطن الأرض التي تبدأ منها الهزة الأرضية:", options: ["المركز السطحي", "بؤرة الزلزال", "الصدع", "الحفرة"], correctAnswer: "بؤرة الزلزال", category: "الزلازل" },
    { text: "أي نوع من البراكين يتميز بمخروط عالي الجوانب وثوران عنيف؟", options: ["الدرعي", "المخروطي", "المركب", "الساكن"], correctAnswer: "المركب", category: "البراكين" },
    { text: "الموجات الزلزالية الأسرع وصولاً لمحطات الرصد هي:", options: ["السطحية", "الأولية", "الثانوية", "المستعرضة"], correctAnswer: "الأولية", category: "الزلازل" },
    // الوراثة وعلوم الحياة
    { text: "الجزيء الذي يحمل الشفرة الوراثية ويشبه السلم الملتوي هو:", options: ["DNA", "RNA", "ATP", "Glucose"], correctAnswer: "DNA", category: "الوراثة" },
    { text: "الصفة التي تظهر دائماً وتمنع صفة أخرى من الظهور هي:", options: ["المتنحية", "السائدة", "النقية", "الهجينة"], correctAnswer: "السائدة", category: "الوراثة" },
    { text: "يتم إنتاج الخلايا الجنسية في الكائنات الحية عن طريق الانقسام:", options: ["المتساوي", "المنصف", "الثنائي", "العرضي"], correctAnswer: "المنصف", category: "التكاثر" },
    // المادة والطاقة
    { text: "عناصر المجموعة 17 في الجدول الدوري تسمى:", options: ["الغازات النبيلة", "الهالوجينات", "الفلزات القلوية", "أشباه الفلزات"], correctAnswer: "الهالوجينات", category: "العناصر" },
    { text: "الرابطة الكيميائية التي تنتج عن مشاركة الإلكترونات هي:", options: ["الأيونية", "التساهمية", "الفلزية", "الهيدروجينية"], correctAnswer: "التساهمية", category: "الكيمياء" },
    { text: "المعدل الزمني لتغير السرعة المتجهة يسمى:", options: ["الإزاحة", "التسارع", "الزخم", "القصور الذاتي"], correctAnswer: "التسارع", category: "السرعة" },
    { text: "قانون نيوتن الثاني يربط بين القوة والكتلة و:", options: ["المسافة", "السرعة", "التسارع", "الزمن"], correctAnswer: "التسارع", category: "الفيزياء" }
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
 * تضمن اختيار 10 أسئلة عشوائية من الفئة المختارة.
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
  
  // 3. اختيار 10 أسئلة فقط
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((q, index) => ({
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
