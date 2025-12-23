
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
 * دالة لربط فئة السؤال بناتج التعلم المناسب حسب الصف الدراسي
 */
const getOutcomeForCategory = (grade: Grade, category: string): string => {
  // دمج المجالات للصف السادس والثالث المتوسط
  if (grade === Grade.INT_3 || grade === Grade.PRI_6) {
    // 1. علوم الحياة
    if ([
      "الخلية", "الخلايا", "جسم الإنسان", "الجهاز الهضمي", "أجهزة", "الأحياء",
      "التصنيف", "الممالك", "البدائيات", "شوكيات الجلد", "الفطريات", "أنظمة بيئية",
      "الوراثة", "DNA", "مندل", "انقسام", "كروموسومات", "جينات", "دورة الحياة"
    ].includes(category)) return LearningOutcomes.LIFE;

    // 2. العلوم الفيزيائية
    if ([
      "كيمياء", "فيزياء", "ذرة", "روابط", "عناصر", "تفاعل", "محفزات", "المادة",
      "سرعة", "تسارع", "زخم", "نيوتن", "احتكاك", "جاذبية", "قوى", "القوى", "الحركة",
      "كهرباء", "مغناطيس", "تيار", "مولد", "محرك", "الكهرومغناطيسية",
      "طاقة حرارية", "حرارة", "توصيل", "طاقة حركية", "طاقة وضع", "الطاقة",
      "صوت", "ضوء", "موجات", "صدى", "انعكاس", "انكسار", "الموجات"
    ].includes(category)) return LearningOutcomes.PHYSICAL;

    // 3. علوم الأرض والفضاء
    if ([
      "تلسكوب", "مجرات", "كواكب", "فضاء", "القمر", "الشمس", "الفصول",
      "احتباس حراري", "كربون", "نيتروجين", "صخور", "زلازل", "براكين", "صفائح",
      "تلوث", "بيئة", "نفايات", "موارد", "نشاط بشري", "الغلاف الجوي", "الطقس", "معالم الأرض"
    ].includes(category)) return LearningOutcomes.EARTH_SPACE;
  }

  // الصف الثالث الابتدائي
  if (grade === Grade.PRI_3) {
    if (["النباتات", "الحيوانات", "الأحياء"].includes(category)) return LearningOutcomes.LIFE;
    if (["المادة", "القوى"].includes(category)) return LearningOutcomes.PHYSICAL;
    return LearningOutcomes.EARTH_SPACE;
  }

  return LearningOutcomes.LIFE;
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "ما هو الجزء الذي يثبت النبات في التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الثمار"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لتنمو إلى الضوء و الماء و:", options: ["الحليب", "الهواء", "العصير", "الظل"], correctAnswer: "الهواء", category: "النباتات" }
  ],
  [Grade.PRI_6]: [
    // --- علوم الحياة (سادس) ---
    { text: "الوحدة الأساسية للحياة، وأصغر جزء في المخلوق الحي قادر على الحياة هي:", options: ["النسيج", "الخلية", "الجهاز الحيوي", "الخاصية الأسموزية"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "يوجد في الخلية بين النواة والغشاء البلازمي مادة تشبه الهلام تسمى:", options: ["الغشاء الخلوي", "الجدار الخلوي", "السيتوبلازم", "الكروموسوم"], correctAnswer: "السيتوبلازم", category: "الخلايا" },
    { text: "وظيفة الجدار الخلوي هي:", options: ["تخزين الماء والغذاء", "تحويل المواد الكيميائية لطاقة", "يدعم الخلية النباتية ويعطيها شكلها", "يقوم بنقل المواد للخلية"], correctAnswer: "يدعم الخلية النباتية ويعطيها شكلها", category: "الخلايا" },
    { text: "أي من التراكيب التالية تتواجد في الخلية النباتية ولا تتواجد في الخلية الحيوانية؟", options: ["الجدار الخلوي", "الكلوروفيل", "البلاستيدات الخضراء", "الغشاء الخلوي"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "تسمى عملية انتقال المواد عبر الغشاء البلازمي من منطقة التركيز المرتفع إلى المنخفض:", options: ["البناء الضوئي", "الانتشار", "الخاصية الأسموزية", "التنفس الخلوي"], correctAnswer: "الانتشار", category: "الخلايا" },
    { text: "أي الحيوانات التالية تدخل أثناء دورة حياتها في عملية التحول الناقص؟", options: ["الذباب", "الجراد", "اليعسوب", "النمل الأبيض"], correctAnswer: "الجراد", category: "دورة الحياة" },
    { text: "أي من الحيوانات التالية لا يُصنف ضمن الزواحف؟", options: ["الحرباء", "السلحفاة", "الثعبان", "الضفدع"], correctAnswer: "الضفدع", category: "تصنيف" },
    { text: "أي المخلوقات الآتية يُعد من المحللات في السلسلة الغذائية؟", options: ["النباتات", "المواشي", "الديدان", "الطيور"], correctAnswer: "الديدان", category: "أنظمة بيئية" },
    { text: "في أي أجزاء النبات تحدث عملية البناء الضوئي؟", options: ["في الأدمة", "في الخلايا الحارسة", "في الورقة", "في العرق"], correctAnswer: "في الورقة", category: "الأحياء" },
    { text: "أي من الصفات التالية لا تعد صفة موروثة؟", options: ["لون الشعر", "لون العيون", "طريقة الضحك", "لعب الكرة"], correctAnswer: "لعب الكرة", category: "الوراثة" },

    // --- العلوم الفيزيائية (سادس) ---
    { text: "من الوحدات التي يقاس بها حجم جسم صلب منتظم الشكل هي:", options: ["المللتر", "السنتيمتر المكعب", "الجرام", "النيوتن"], correctAnswer: "السنتيمتر المكعب", category: "المادة" },
    { text: "ما الخاصية التي تحدد إمكانية انغمار جسم صلب في سائل؟", options: ["اللون", "الحجم", "الكثافة", "القساوة"], correctAnswer: "الكثافة", category: "المادة" },
    { text: "أي مما يلي يعد من العوازل؟", options: ["الزجاج", "الذهب", "النحاس", "الألومنيوم"], correctAnswer: "الزجاج", category: "المادة" },
    { text: "ما نوع مخلوط الشاي بالسكر؟", options: ["الغروي", "المعلق", "المحلول", "مخلوط غير متجانس"], correctAnswer: "المحلول", category: "المادة" },
    { text: "تتميز القوى غير المتزنة بأنها:", options: ["تغير حركة الجسم", "تؤثر في الجسم دون تغيير حركته", "تعمل في اتجاهات متعاكسة", "توقف الجسم ولا تغير اتجاهه"], correctAnswer: "تغير حركة الجسم", category: "القوى" },
    { text: "وحدة قياس السرعة هي:", options: ["الثانية", "المتر", "المتر لكل ثانية", "نيوتن"], correctAnswer: "المتر لكل ثانية", category: "الحركة" },
    { text: "تتحول الطاقة من طاقة ........ إلى طاقة ........ عند خبز العجين:", options: ["حرارية، كيميائية", "حرارية، حركية", "كهربائية، حرارية", "حركية، كهربائية"], correctAnswer: "حرارية، كيميائية", category: "الطاقة" },
    { text: "ارتداد الضوء عن السطوح هو:", options: ["انكساره", "انعكاسه", "امتصاصه", "تفريقه"], correctAnswer: "انعكاسه", category: "الموجات" },
    { text: "متى يحدث تنافر الأجسام المشحونة؟", options: ["عند اختلاف نوع الشحنات", "عند تماثل نوع الشحنات", "عندما يكون الجسم مشحوناً", "عندما يصبح الجسم متعادلاً"], correctAnswer: "عند تماثل نوع الشحنات", category: "الكهرومغناطيسية" },
    { text: "ما الذي يحدث عندما يُغلق المفتاح الكهربائي الدائرة الكهربائية؟", options: ["تندفع البروتونات", "تندفع الالكترونات بسبب اختلاف الشحنات", "تتوقف الالكترونات", "تندفع النيوترونات"], correctAnswer: "تندفع الالكترونات بسبب اختلاف الشحنات", category: "الكهرومغناطيسية" },

    // --- علوم الأرض والفضاء (سادس) ---
    { text: "يسمى شكل القمر الذي نراه في السماء ليلاً في اليوم الأول:", options: ["محاقاً", "هلالاً أول", "تربيعاً أول", "أحدب أول"], correctAnswer: "محاقاً", category: "القمر" },
    { text: "ما الذي ينتج عن دورة الأرض السنوية حول الشمس؟", options: ["النيازك", "الليل والنهار", "الفصول الأربعة", "أطوار القمر"], correctAnswer: "الفصول الأربعة", category: "الفصول" },
    { text: "يحدث خسوف القمر عندما:", options: ["تقع الأرض بين الشمس والقمر", "تمر الأرض في ظل القمر", "يدور القمر حول الأرض", "تسقط أشعة الشمس عليه"], correctAnswer: "تقع الأرض بين الشمس والقمر", category: "الفضاء" },
    { text: "يميز طبقة الستراتوسفير في الغلاف الجوي أنها:", options: ["تحدث فيها تغيرات الطقس", "يوجد فيها الأوزون", "تكون دقائق الغازات فيها قليلة", "تكون خالية من الغازات"], correctAnswer: "يوجد فيها الأوزون", category: "الغلاف الجوي" },
    { text: "يتكون الغلاف الصخري للأرض من القشرة الأرضية وجزء من:", options: ["الغلاف الحيوي", "الستار العلوي", "الغلاف الجوي", "الغلاف المائي"], correctAnswer: "الستار العلوي", category: "معالم الأرض" },
    { text: "ما الذي يحرك الصفائح الأرضية؟", options: ["الماجما", "الغلاف المائع", "البراكين", "الرياح"], correctAnswer: "الماجما", category: "معالم الأرض" },
    { text: "أين تحدث البراكين عادة؟", options: ["بمحاذاة حدود الصفائح الأرضية", "في مناطق الصدوع", "في الصخور", "في أماكن الأمطار الغزيرة"], correctAnswer: "بمحاذاة حدود الصفائح الأرضية", category: "براكين" },
    { text: "عندما يدخل الماء في شقوق الصخور ويتجمد يؤدي لتفتتها، تسمى العملية:", options: ["الترسيب", "التجوية", "التعرية", "البركان"], correctAnswer: "التجوية", category: "معالم الأرض" }
  ],
  [Grade.INT_3]: [
    // --- علوم الحياة (ثالث متوسط) ---
    { text: "ما هي أصغر وحدة تركيبية ووظيفية في جسم الكائن الحي؟", options: ["الكرموسوم", "جهاز كولجي", "النسيج", "الخلية"], correctAnswer: "الخلية", category: "الخلية" },
    { text: "في أي من أجزاء الخلية التالية يخزن الغذاء والماء والأملاح والفضلات؟", options: ["النواة", "الفجوة", "السيتوبلازم", "الميتوكندريا"], correctAnswer: "الفجوة", category: "الخلية" },
    { text: "عدد الكروموسومات في الخلايا الجنسية للإنسان تساوي:", options: ["46 كرموسوما", "23 كرموسوما", "8 كرموسومات", "92 كرموسوما"], correctAnswer: "23 كرموسوما", category: "كروموسومات" },
    { text: "العالم الذي وضع حجر الأساس لعلم الوراثة هو:", options: ["نيوتن", "أينشتاين", "مندل", "باستير"], correctAnswer: "مندل", category: "الوراثة" },

    // --- العلوم الفيزيائية (ثالث متوسط) ---
    { text: "الرابطة التي تنتج عن تشارك زوج من الإلكترونات هي الرابطة:", options: ["الأيونية", "التساهمية", "الفلزية", "الهيدروجينية"], correctAnswer: "التساهمية", category: "روابط" },
    { text: "إن مقياس صعوبة إيقاف الجسم هو:", options: ["التسارع", "الزخم", "القوة", "الحركة"], correctAnswer: "الزخم", category: "زخم" },
    { text: "سم جهازا يحول الطاقة الكهربائية إلى حركية:", options: ["المولد", "المحرك الكهربائي", "البطارية", "المصباح"], correctAnswer: "المحرك الكهربائي", category: "محرك" },

    // --- علوم الأرض والفضاء (ثالث متوسط) ---
    { text: "ما هو الغاز الذي يسبب ظاهرة الاحتباس الحراري؟", options: ["النتروجين", "الهيدروجين", "ثاني أكسيد الكربون", "الأكسجين"], correctAnswer: "ثاني أكسيد الكربون", category: "احتباس حراري" },
    { text: "أكبر أنواع البراكين هي البراكين:", options: ["الدرعية", "المخروطية", "المركبة", "ثوران الشقوق"], correctAnswer: "الدرعية", category: "براكين" },
    { text: "يحتوي الكون تقريبا على:", options: ["مليار مجرة", "عشرة مليارات مجرة", "مائة مليار مجرة", "مائة مليون مجرة"], correctAnswer: "مائة مليار مجرة", category: "مجرات" }
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  const outcomes = [LearningOutcomes.GENERAL];
  // توحيد المجالات الثلاثة لطلاب سادس وثالث متوسط
  if (grade === Grade.INT_3 || grade === Grade.PRI_6 || grade === Grade.PRI_3) {
    outcomes.push(LearningOutcomes.LIFE, LearningOutcomes.PHYSICAL, LearningOutcomes.EARTH_SPACE);
  }
  return outcomes;
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  const fullBank = scienceBank[grade] || [];
  
  let primaryPool: Omit<Question, 'id'>[] = [];
  let fallbackPool: Omit<Question, 'id'>[] = [];

  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    primaryPool = fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
    fallbackPool = fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") !== outcomeFilter);
  } else {
    primaryPool = [...fullBank];
  }

  const shuffle = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffledPrimary = shuffle(primaryPool);
  const shuffledFallback = shuffle(fallbackPool);

  const finalSelection = [
    ...shuffledPrimary.slice(0, count),
    ...shuffledFallback.slice(0, Math.max(0, count - shuffledPrimary.length))
  ];

  return finalSelection.map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const facts: Record<Grade, ScienceFact[]> = {
    [Grade.PRI_3]: [
      { title: "الأرض الزرقاء", description: "يسمى كوكب الأرض بالكوكب الأزرق لأن الماء يغطي أكثر من 70% من سطحه.", category: "earth" }
    ],
    [Grade.PRI_6]: [
      { title: "المصنع الأخضر", description: "البلاستيدات الخضراء في أوراق الشجر هي التي تصنع الغذاء لكل الكائنات الحية تقريباً!", category: "biology" },
      { title: "سر القمر", description: "نحن نرى دائماً وجهاً واحداً فقط للقمر لأن سرعة دورانه حول نفسه تساوي سرعة دورانه حول الأرض.", category: "space" }
    ],
    [Grade.INT_3]: [
      { title: "الـ DNA المذهل", description: "لو قمت بفك شريط الـ DNA الموجود في خلية واحدة، سيصل طوله إلى مترين تقريباً!", category: "biology" },
      { title: "حلقة النار", description: "منطقة حول المحيط الهادئ تسمى حلقة النار لأنها تحتوي على 75% من براكين العالم النشطة.", category: "earth" }
    ]
  };

  const pool = facts[grade] || facts[Grade.PRI_3];
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
};
