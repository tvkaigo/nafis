
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
    if (["الزلازل", "البراكين", "الأرض"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "الخلية"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6 && category === "مهارات") return LearningOutcomes.THINKING_SKILLS;
  if (["النباتات", "الحيوانات", "الأحياء", "الخلايا", "جسم الإنسان"].includes(category)) return LearningOutcomes.LIFE_PRI;
  if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
  if (["الأرض", "الفضاء", "الطقس", "النظام الشمسي"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  return LearningOutcomes.LIFE_PRI;
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "أي الأجزاء التالية يمتص الماء من التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الساق"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لصنع الغذاء إلى الماء وضوء الشمس وغاز:", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"], correctAnswer: "ثاني أكسيد الكربون", category: "النباتات" },
    { text: "أي الحيوانات التالية يرضع صغاره الحليب؟", options: ["الطيور", "الأسماك", "الثدييات", "الزواحف"], correctAnswer: "الثدييات", category: "الحيوانات" },
    { text: "المادة التي تأخذ شكل الإناء الذي توضع فيه هي المادة:", options: ["الصلبة", "السائلة", "الخشبية", "الصخرية"], correctAnswer: "السائلة", category: "المادة" },
    { text: "القوة التي تسحب الأجسام نحو الأرض تسمى:", options: ["المغناطيسية", "الجاذبية", "الاحتكاك", "الدفع"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "ما الذي يسبب تعاقب الليل والنهار؟", options: ["دوران الأرض حول محورها", "دوران القمر", "دوران الشمس", "ميل محور القمر"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    { text: "تعتبر الشمس:", options: ["كوكباً", "قمراً", "نجماً", "نيزكاً"], correctAnswer: "نجماً", category: "الفضاء" },
    { text: "أي مما يلي يعتبر كائناً حياً؟", options: ["الصخرة", "الشجرة", "الماء", "الهواء"], correctAnswer: "الشجرة", category: "الأحياء" },
    { text: "الحيوان الذي يغطي جسمه الريش هو:", options: ["التمساح", "العصفور", "الأرنب", "السمكة"], correctAnswer: "العصفور", category: "الحيوانات" },
    { text: "المكان الذي يعيش فيه الكائن الحي يسمى:", options: ["المنزل", "الموطن", "المدرسة", "الملعب"], correctAnswer: "الموطن", category: "الأحياء" },
    { text: "تنمو البذرة لتصبح:", options: ["ثمرة", "نباتاً جديداً", "تربة", "ماء"], correctAnswer: "نباتاً جديداً", category: "النباتات" }
  ],
  [Grade.PRI_6]: [
    { text: "أي تراكيب الخلية يوفر لها الحماية والدعم؟", options: ["النواة", "الجدار الخلوي", "الفجوة", "السيتوبلازم"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "أي مما يلي يعد تغيراً كيميائياً؟", options: ["قص الورق", "صدأ الحديد", "تبخر الماء", "كسر الزجاج"], correctAnswer: "صدأ الحديد", category: "المادة" },
    { text: "تنتقل الحرارة في السوائل والغازات عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "الحمل", category: "الحرارة" },
    { text: "المواد التي تسمح بمرور التيار الكهربائي تسمى مواد:", options: ["عازلة", "موصلة", "شفافة", "خشنة"], correctAnswer: "موصلة", category: "الكهرباء" },
    { text: "أقرب الكواكب إلى الشمس هو كوكب:", options: ["الأرض", "المريخ", "عطارد", "المشتري"], correctAnswer: "عطارد", category: "الفضاء" },
    { text: "يحدث خسوف القمر عندما تقع _____ بين الشمس والقمر:", options: ["الأرض", "الزهرة", "النيازك", "المجرات"], correctAnswer: "الأرض", category: "الفضاء" },
    { text: "عندما تقوم بتوقع نتيجة تجربة قبل بدئها، فأنت تضع:", options: ["استنتاجاً", "فرضية", "ملاحظة", "بيانات"], correctAnswer: "فرضية", category: "مهارات" },
    { text: "أي طبقات الأرض هي الأكثر سخونة؟", options: ["القشرة", "الستار", "اللب", "الغلاف الجوي"], correctAnswer: "اللب", category: "الأرض" },
    { text: "الوحدة الأساسية لبناء الكائن الحي هي:", options: ["النسيج", "العضو", "الخلية", "الجهاز"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "تحول المادة من الحالة السائلة إلى الغازية يسمى:", options: ["تجمد", "تبخر", "تكثف", "انصهار"], correctAnswer: "تبخر", category: "المادة" }
  ],
  [Grade.INT_3]: [
    { text: "الموجات التي تسبب الدمار الأكبر أثناء الزلزال هي الموجات:", options: ["الأولية", "الثانوية", "السطحية", "الضوئية"], correctAnswer: "السطحية", category: "الزلازل" },
    { text: "أي نوع من البراكين يتميز بثوران هادئ وانسكاب لافا؟", options: ["المخروطية", "الدرعية", "المركبة", "المنفجرة"], correctAnswer: "الدرعية", category: "البراكين" },
    { text: "تتحكم الجينات في صفات الكائن الحي وتوجد على:", options: ["الميتوكوندريا", "الكروموسومات", "الغشاء", "السيتوبلازم"], correctAnswer: "الكروموسومات", category: "الوراثة" },
    { text: "عناصر المجموعة 17 في الجدول الدوري تسمى:", options: ["هالوجينات", "غازات نبيلة", "فلزات قلوية", "لانثنيدات"], correctAnswer: "هالوجينات", category: "الكيمياء" },
    { text: "سرعة الجسم في لحظة معينة تسمى السرعة:", options: ["المتوسطة", "اللحظية", "المتجهة", "الثابتة"], correctAnswer: "اللحظية", category: "الفيزياء" },
    { text: "أي الجزيئات التالية يحمل الشفرة الوراثية؟", options: ["RNA", "ATP", "DNA", "البروتين"], correctAnswer: "DNA", category: "الوراثة" },
    { text: "المعدل الزمني لتغير السرعة يسمى:", options: ["الإزاحة", "التسارع", "الزخم", "المسافة"], correctAnswer: "التسارع", category: "الفيزياء" },
    { text: "الرابطة التي تنشأ عن مشاركة الإلكترونات تسمى رابطة:", options: ["أيونية", "فلزية", "تساهمية", "مغناطيسية"], correctAnswer: "تساهمية", category: "الكيمياء" },
    { text: "استخدام الحواس لجمع المعلومات يسمى مهارة:", options: ["الاستنتاج", "الملاحظة", "القياس", "التصنيف"], correctAnswer: "الملاحظة", category: "مهارات" },
    { text: "تنشأ الزلازل نتيجة اهتزاز صخور القشرة الأرضية عند:", options: ["خط الاستواء", "الصدوع", "البحار", "الجبال"], correctAnswer: "الصدوع", category: "الزلازل" }
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  const outcomes = [LearningOutcomes.GENERAL];
  if (grade === Grade.PRI_3) outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI);
  else if (grade === Grade.PRI_6) outcomes.push(LearningOutcomes.LIFE_PRI, LearningOutcomes.PHYSICAL_PRI, LearningOutcomes.EARTH_SPACE_PRI, LearningOutcomes.THINKING_SKILLS);
  else if (grade === Grade.INT_3) outcomes.push(LearningOutcomes.SCIENTIFIC_METHOD, LearningOutcomes.NATURAL_PHENOMENA, LearningOutcomes.GENETICS_LIFE, LearningOutcomes.MATTER_ENERGY);
  return outcomes;
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  let bank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    bank = bank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
  }
  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  // إذا كان عدد الأسئلة المتاحة أقل من المطلوب، نعرض المتاح
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
      { title: "الأرض الزرقاء", description: "يسمى كوكب الأرض بالكوكب الأزرق لأن الماء يغطي أكثر من 70% من سطحه.", category: "earth" },
      { title: "عمر الأشجار", description: "يمكننا معرفة عمر الشجرة من خلال عد الحلقات الموجودة داخل جذعها.", category: "biology" },
      { title: "النجوم المتلألئة", description: "الشمس نجم قريب منا جداً، بينما النجوم الأخرى بعيدة لدرجة أنها تظهر كنقاط صغيرة.", category: "space" }
    ],
    [Grade.PRI_6]: [
      { title: "مصنع الطاقة", description: "الميتوكوندريا هي مصنع الطاقة داخل الخلية، وبدونها لن تجد خلاياك القوة لتعمل.", category: "biology" },
      { title: "الماسة الصلبة", description: "الماس هو أصلب مادة طبيعية معروفة على الأرض، ولا يمكن قطعه إلا بقطعة ماس أخرى.", category: "chemistry" },
      { title: "البرق الحار", description: "حرارة البرق تزيد بـ 5 مرات عن حرارة سطح الشمس نفسها!", category: "physics" },
      { title: "الغلاف الجوي", description: "الأكسجين يمثل 21% فقط من الهواء، بينما يمثل النيتروجين الجزء الأكبر بنسبة 78%.", category: "earth" },
      { title: "الجاذبية والمشتري", description: "كوكب المشتري ضخم جداً لدرجة أن جاذبيته تحمي الأرض من الكثير من النيازك.", category: "space" },
      { title: "البكتيريا الصديقة", description: "في جسمك تريليونات من البكتيريا، ومعظمها مفيد جداً للهضم وحمايتك من الأمراض.", category: "biology" }
    ],
    [Grade.INT_3]: [
      { title: "الـ DNA المذهل", description: "لو قمت بفك شريط الـ DNA الموجود في خلية واحدة، سيصل طوله إلى مترين تقريباً!", category: "biology" },
      { title: "الغازات النبيلة", description: "تسمى نبيلة لأنها لا تتفاعل بسهولة مع العناصر الأخرى، فهي 'مستقرة' وراضية بنفسها.", category: "chemistry" },
      { title: "سرعة الصوت", description: "ينتقل الصوت في الماء أسرع بـ 4 مرات من انتقاله في الهواء.", category: "physics" },
      { title: "حلقة النار", description: "منطقة حول المحيط الهادئ تسمى حلقة النار لأنها تحتوي على 75% من براكين العالم النشطة.", category: "earth" },
      { title: "الثقوب السوداء", description: "الثقوب السوداء لها جاذبية قوية جداً لدرجة أنها تسحب الضوء نفسه ولا تسمح له بالهروب.", category: "space" },
      { title: "عناصر جسمك", description: "أكثر من 96% من كتلة جسمك تتكون من أربعة عناصر فقط: الأكسجين، الكربون، الهيدروجين، والنيتروجين.", category: "chemistry" }
    ]
  };

  const pool = facts[grade] || facts[Grade.PRI_3];
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
};
