
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
    if (["الزلازل", "البراكين", "الأرض", "البيئة", "الصفائح", "التجوية", "التعرية", "طبقات الأرض"].includes(category)) return LearningOutcomes.NATURAL_PHENOMENA;
    if (["الوراثة", "الأحياء", "الخلية", "جسم الإنسان", "التكاثر", "DNA", "انقسام", "جينات", "مندل", "مربع بانيت"].includes(category)) return LearningOutcomes.GENETICS_LIFE;
    if (["الكيمياء", "الفيزياء", "المادة", "الطاقة", "القوى", "العناصر", "السرعة", "التسارع", "نيوتن", "الذرة", "روابط", "شغل"].includes(category)) return LearningOutcomes.MATTER_ENERGY;
    return LearningOutcomes.SCIENTIFIC_METHOD;
  }
  if (grade === Grade.PRI_6) {
    if (["مهارات", "تفكير", "استقصاء", "فرضية", "ملاحظة", "تجربة", "متغيرات", "استنتاج"].includes(category)) return LearningOutcomes.THINKING_SKILLS;
    if (["الأحياء", "الخلايا", "جسم الإنسان", "تصنيف", "أنظمة", "التمثيل الضوئي", "سلسلة غذائية", "دورة حياة"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["القوى", "الحركة", "المادة", "الحرارة", "الكهرباء", "تغيرات", "مغناطيس", "آلات", "طاقة"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "النجوم", "الموارد", "مناخ", "المجموعة الشمسية", "كسوف", "خسوف"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  if (grade === Grade.PRI_3) {
    if (["النباتات", "الحيوانات", "الأحياء", "دورة الحياة", "النمو", "حواس", "أعضاء"].includes(category)) return LearningOutcomes.LIFE_PRI;
    if (["المادة", "القوى", "الحركة", "الحرارة", "المغناطيس", "الكهرباء", "صوت", "ضوء", "آلات بسيطة"].includes(category)) return LearningOutcomes.PHYSICAL_PRI;
    if (["الأرض", "الفضاء", "الطقس", "الشمس", "القمر", "الصخور", "تربة", "فصول"].includes(category)) return LearningOutcomes.EARTH_SPACE_PRI;
  }
  return LearningOutcomes.LIFE_PRI;
};

// بنك أسئلة ضخم يهدف لتوفير 50 سؤالاً لكل مجال
const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    // علوم الحياة (مجموعة عينة مكثفة)
    { text: "ما هو الجزء الذي يثبت النبات في التربة؟", options: ["الأوراق", "الجذور", "الأزهار", "الثمار"], correctAnswer: "الجذور", category: "النباتات" },
    { text: "تحتاج النباتات لتنمو إلى الضوء و الماء و:", options: ["الحليب", "الهواء", "العصير", "الظل"], correctAnswer: "الهواء", category: "النباتات" },
    { text: "أي الحيوانات التالية يزحف على بطنه؟", options: ["الأرنب", "الثعبان", "العصفور", "السمكة"], correctAnswer: "الثعبان", category: "الحيوانات" },
    { text: "صغار الطيور تخرج من:", options: ["البطون", "البيوض", "الأعشاش", "الماء"], correctAnswer: "البيوض", category: "الحيوانات" },
    { text: "الحاسة التي نستخدمها لتمييز طعم السكر هي:", options: ["الشم", "اللمس", "التذوق", "البصر"], correctAnswer: "التذوق", category: "حواس" },
    { text: "الكائن الذي يصنع غذاءه بنفسه هو:", options: ["الإنسان", "النبات", "الأسد", "القط"], correctAnswer: "النبات", category: "الأحياء" },
    { text: "تبدأ دورة حياة الفراشة بـ:", options: ["يرقة", "بيضة", "شرنقة", "فراشة"], correctAnswer: "بيضة", category: "دورة الحياة" },
    { text: "أي مما يلي ليس من احتياجات الكائن الحي؟", options: ["الماء", "الغذاء", "الألعاب", "الهواء"], correctAnswer: "الألعاب", category: "الأحياء" },
    { text: "عضو الجسم المسؤول عن التنفس هو:", options: ["القلب", "المعدة", "الرئتان", "الدماغ"], correctAnswer: "الرئتان", category: "أعضاء" },
    { text: "الحيوان الذي يغطي جسمه الوبر هو:", options: ["الجمل", "السمك", "الحمام", "التمساح"], correctAnswer: "الجمل", category: "الحيوانات" },
    { text: "تنمو البذرة لتصبح:", options: ["صخرة", "نباتاً صغيراً", "ماءً", "هواءً"], correctAnswer: "نباتاً صغيراً", category: "النمو" },
    { text: "أي الأجزاء التالية ينقل الماء للأوراق؟", options: ["الجذر", "الساق", "الزهرة", "البذرة"], correctAnswer: "الساق", category: "النباتات" },
    { text: "مكان يعيش فيه الكائن الحي ويجد فيه حاجاته:", options: ["الموطن", "المصنع", "المكتب", "الشارع"], correctAnswer: "الموطن", category: "الأحياء" },
    { text: "حيوان يعيش في الماء ويتنفس بالخياشيم:", options: ["الكلب", "السمك", "الغراب", "الأسد"], correctAnswer: "السمك", category: "الحيوانات" },
    { text: "الأوراق الخضراء تستخدم ____ لصنع الغذاء:", options: ["ضوء الشمس", "القمر", "النجوم", "المصباح"], correctAnswer: "ضوء الشمس", category: "النباتات" },
    // العلوم الفيزيائية
    { text: "المادة التي لها شكل ثابت وحجم ثابت هي:", options: ["السائلة", "الصلبة", "الغازية", "الماء"], correctAnswer: "الصلبة", category: "المادة" },
    { text: "عندما يتحرك الجسم فإنه يغير:", options: ["لونه", "موقعه", "وزنه", "اسمه"], correctAnswer: "موقعه", category: "الحركة" },
    { text: "القوة التي تجذب الأشياء نحو الأرض هي:", options: ["الاحتكاك", "الجاذبية", "الدفع", "المغناطيسية"], correctAnswer: "الجاذبية", category: "القوى" },
    { text: "صوت الطبل ينتج عن:", options: ["النوم", "الاهتزاز", "التوقف", "الضوء"], correctAnswer: "الاهتزاز", category: "صوت" },
    { text: "المغناطيس يجذب:", options: ["الخشب", "المشابك الحديدية", "الممحاة", "الورق"], correctAnswer: "المشابك الحديدية", category: "المغناطيس" },
    { text: "تحول السائل إلى صلب بالتبريد يسمى:", options: ["تبخراً", "تجمداً", "انصهاراً", "تكثفاً"], correctAnswer: "تجمداً", category: "المادة" },
    { text: "أي مما يلي يضيء في الليل؟", options: ["الكتاب", "المصباح الكهربائي", "الكرسي", "الطاولة"], correctAnswer: "المصباح الكهربائي", category: "ضوء" },
    { text: "نستخدم ____ لرفع الأشياء الثقيلة بسهولة:", options: ["الآلات البسيطة", "الألوان", "الماء", "الأقلام"], correctAnswer: "الآلات البسيطة", category: "آلات بسيطة" },
    { text: "الحرارة تجعل الثلج:", options: ["يتجمد أكثر", "ينصهر", "يكبر", "يختفي"], correctAnswer: "ينصهر", category: "حرارة" },
    { text: "الكهرباء تجعل المذياع:", options: ["يتحرك", "يعمل ويصدر صوتاً", "ينام", "يسقط"], correctAnswer: "يعمل ويصدر صوتاً", category: "الكهرباء" },
    // الأرض والفضاء
    { text: "ما الذي يسبب تعاقب الليل والنهار؟", options: ["دوران الأرض حول محورها", "دوران القمر", "دوران الشمس", "الغيوم"], correctAnswer: "دوران الأرض حول محورها", category: "الفضاء" },
    { text: "الأرض كوكب شكله يشبه:", options: ["المربع", "المثلث", "الكرة", "المستطيل"], correctAnswer: "الكرة", category: "الأرض" },
    { text: "نحن نعيش على كوكب:", options: ["المريخ", "عطارد", "الأرض", "زحل"], correctAnswer: "الأرض", category: "الأرض" },
    { text: "حالة الجو في وقت قصير تسمى:", options: ["المناخ", "الطقس", "السنة", "الشهر"], correctAnswer: "الطقس", category: "الطقس" },
    { text: "تشرق الشمس من جهة:", options: ["الغرب", "الشمال", "الشرق", "الجنوب"], correctAnswer: "الشرق", category: "الشمس" },
    { text: "عدد فصول السنة هو:", options: ["فصلان", "ثلاثة فصول", "أربعة فصول", "خمسة فصول"], correctAnswer: "أربعة فصول", category: "فصول" },
    { text: "الجزء الصلب من الأرض يسمى:", options: ["الماء", "الهواء", "الصخور", "السحاب"], correctAnswer: "الصخور", category: "الصخور" },
    { text: "التربة تتكون من تفتت:", options: ["الماء", "الصخور", "الخشب", "البلاستيك"], correctAnswer: "الصخور", category: "تربة" },
    { text: "أكبر كواكب المجموعة الشمسية:", options: ["الأرض", "المريخ", "المشتري", "عطارد"], correctAnswer: "المشتري", category: "الفضاء" },
    { text: "نرى القمر ساطعاً لأنه يعكس ضوء:", options: ["النجوم", "المريخ", "الشمس", "الأرض"], correctAnswer: "الشمس", category: "القمر" },
    // تكرار الأسئلة لضمان الوصول للعدد المطلوب...
  ],
  [Grade.PRI_6]: [
    // مهارات التفكير العلمي
    { text: "الخطوة الأولى في الطريقة العلمية هي:", options: ["وضع فرضية", "الملاحظة وسؤال", "استخلاص نتائج", "تحليل بيانات"], correctAnswer: "الملاحظة وسؤال", category: "مهارات" },
    { text: "تخمين علمي لنتيجة تجربة يسمى:", options: ["قانوناً", "فرضية", "ملاحظة", "حقيقة"], correctAnswer: "فرضية", category: "فرضية" },
    { text: "المتغير الذي نقيسه في التجربة هو المتغير:", options: ["المستقل", "التابع", "الثابت", "العشوائي"], correctAnswer: "التابع", category: "متغيرات" },
    { text: "استخدام الحواس لجمع المعلومات يسمى:", options: ["القياس", "التصنيف", "الملاحظة", "التواصل"], correctAnswer: "الملاحظة", category: "ملاحظة" },
    { text: "أي أداة تستخدم لقياس كتلة جسم؟", options: ["المسطرة", "الميزان ذو الكفتين", "المخبر المدرج", "ساعة التوقف"], correctAnswer: "الميزان ذو الكفتين", category: "تجربة" },
    { text: "عندما نضع الأشياء في مجموعات بناء على صفاتها فنحن نقوم بـ:", options: ["التجريب", "التصنيف", "التوقع", "الاستنتاج"], correctAnswer: "التصنيف", category: "استنتاج" },
    // علوم الحياة
    { text: "الوحدة الأساسية لبناء الكائن الحي هي:", options: ["النسيج", "العضو", "الخلية", "الجهاز"], correctAnswer: "الخلية", category: "الخلايا" },
    { text: "أي جزء في الخلية النباتية يعطيها الشكل والدعم؟", options: ["النواة", "الجدار الخلوي", "الفجوة", "الميتوكوندريا"], correctAnswer: "الجدار الخلوي", category: "الخلايا" },
    { text: "الحيوانات التي لها عمود فقري تسمى:", options: ["لا فقاريات", "فقاريات", "حشرات", "رخويات"], correctAnswer: "فقاريات", category: "تصنيف" },
    { text: "الجهاز المسؤول عن هضم الطعام وتحويله لطاقة:", options: ["الدوري", "التنفسي", "الهضمي", "العصبي"], correctAnswer: "الهضمي", category: "جسم الإنسان" },
    { text: "عملية صنع النبات لغذاءه تسمى:", options: ["التنفس", "البناء الضوئي", "الهضم", "النتح"], correctAnswer: "البناء الضوئي", category: "التمثيل الضوئي" },
    { text: "انتقال الطاقة من كائن لآخر يسمى:", options: ["دورة الماء", "سلسلة غذائية", "دورة الكربون", "البناء الضوئي"], correctAnswer: "سلسلة غذائية", category: "سلسلة غذائية" },
    { text: "أين توجد المادة الوراثية في الخلية؟", options: ["السيتوبلازم", "النواة", "الغشاء", "الفجوة"], correctAnswer: "النواة", category: "الخلايا" },
    { text: "مجموعة الخلايا المتشابهة التي تؤدي وظيفة معينة تسمى:", options: ["عضواً", "نسيجاً", "جهازاً", "كائناً"], correctAnswer: "نسيجاً", category: "الخلايا" },
    // العلوم الفيزيائية
    { text: "تنتقل الحرارة في السوائل والغازات عن طريق:", options: ["التوصيل", "الحمل", "الإشعاع", "الاحتكاك"], correctAnswer: "الحمل", category: "الحرارة" },
    { text: "المسار المغلق للتيار الكهربائي يسمى:", options: ["المقاومة", "الدائرة الكهربائية", "المولد", "البطارية"], correctAnswer: "الدائرة الكهربائية", category: "الكهرباء" },
    { text: "وحدة قياس القوة هي:", options: ["المتر", "الجرام", "النيوتن", "الثانية"], correctAnswer: "النيوتن", category: "القوى" },
    { text: "المواد التي لا تسمح بمرور الكهرباء تسمى مواد:", options: ["موصلة", "عازلة", "معدنية", "سائلة"], correctAnswer: "عازلة", category: "الكهرباء" },
    { text: "تغير حالة المادة من غاز إلى سائل يسمى:", options: ["تبخراً", "تجمداً", "تكثفاً", "انصهاراً"], correctAnswer: "تكثفاً", category: "المادة" },
    { text: "الطاقة الناتجة عن حركة الأجسام تسمى طاقة:", options: ["كامنة", "حركية", "كيميائية", "نووية"], correctAnswer: "حركية", category: "طاقة" },
    { text: "أي مما يلي يعتبر تغيراً فيزيائياً؟", options: ["احتراق الخشب", "صدأ الحديد", "قص الورق", "طبخ البيض"], correctAnswer: "قص الورق", category: "تغيرات" },
    // الأرض والفضاء
    { text: "أقرب كوكب للشمس هو:", options: ["الأرض", "عطارد", "الزهرة", "المريخ"], correctAnswer: "عطارد", category: "المجموعة الشمسية" },
    { text: "تسمى عملية نقل فتات الصخور من مكان لآخر:", options: ["التجوية", "الترسيب", "التعرية", "الزلازل"], correctAnswer: "التعرية", category: "الأرض" },
    { text: "يحدث خسوف القمر عندما تقع ____ بين الشمس والقمر:", options: ["الزهرة", "الأرض", "المريخ", "المشتري"], correctAnswer: "الأرض", category: "خسوف" },
    { text: "طبقة الغلاف الجوي الأقرب للأرض هي:", options: ["الستراتوسفير", "التروبوسفير", "الميزوسفير", "الثيرموسفير"], correctAnswer: "التروبوسفير", category: "مناخ" },
    { text: "كوكب له حلقات واضحة حوله هو:", options: ["المريخ", "زحل", "عطارد", "الأرض"], correctAnswer: "زحل", category: "المجموعة الشمسية" },
  ],
  [Grade.INT_3]: [
    // الطريقة العلمية
    { text: "أي من التالي يعد بياناً كمياً؟", options: ["اللون أحمر", "الطول 5 سم", "الملمس ناعم", "الرائحة زكية"], correctAnswer: "الطول 5 سم", category: "مهارات" },
    { text: "المتغير الذي يتم تغييره عمداً في التجربة هو المتغير:", options: ["التابع", "المستقل", "الثابت", "الضابط"], correctAnswer: "المستقل", category: "مهارات" },
    { text: "تكرار التجربة عدة مرات يهدف إلى:", options: ["تضييع الوقت", "زيادة دقة النتائج", "تغيير الفرضية", "إرضاء المعلم"], correctAnswer: "زيادة دقة النتائج", category: "استقصاء" },
    // الظواهر الطبيعية
    { text: "الجهاز المستخدم لقياس قوة الزلزال يسمى:", options: ["مقياس ريختر", "الترمومتر", "البارومتر", "الساعة"], correctAnswer: "مقياس ريختر", category: "الزلازل" },
    { text: "أكثر أنواع البراكين ثوراناً وعنفاً هي البراكين:", options: ["الدرعية", "المخروطية", "المركبة", "الهادئة"], correctAnswer: "المركبة", category: "البراكين" },
    { text: "تتكون القشرة الأرضية من قطع ضخمة تسمى:", options: ["صخوراً", "صفائح", "جبالاً", "قارات"], correctAnswer: "صفائح", category: "الصفائح" },
    { text: "الموجات الزلزالية التي تنتقل في باطن الأرض وتصل أولاً هي:", options: ["الأولية", "الثانوية", "السطحية", "المستعرضة"], correctAnswer: "الأولية", category: "الزلازل" },
    { text: "تفتت الصخور بفعل تجمد الماء في الشقوق يسمى تجوية:", options: ["كيميائية", "ميكانيكية", "حيوية", "شمسية"], correctAnswer: "ميكانيكية", category: "التجوية" },
    // الوراثة وعلوم الحياة
    { text: "الجزيء الذي يشبه السلم الملتوي ويحمل المعلومات الوراثية هو:", options: ["DNA", "RNA", "البروتين", "الدهون"], correctAnswer: "DNA", category: "DNA" },
    { text: "الصفة التي تمنع صفة أخرى من الظهور تسمى صفة:", options: ["متنحية", "سائدة", "نقية", "هجينة"], correctAnswer: "سائدة", category: "الوراثة" },
    { text: "العالم الذي وضع حجر الأساس لعلم الوراثة هو:", options: ["نيوتن", "أينشتاين", "مندل", "باستير"], correctAnswer: "مندل", category: "مندل" },
    { text: "عدد الكروموسومات في الخلية الجسمية للإنسان هو:", options: ["23 كروموسوماً", "46 كروموسوماً", "92 كروموسوماً", "12 كروموسوماً"], correctAnswer: "46 كروموسوماً", category: "انقسام" },
    { text: "الانقسام الذي ينتج عنه خلايا جنسية (أمساج) هو الانقسام:", options: ["المتساوي", "المنصف", "الثنائي", "العشوائي"], correctAnswer: "المنصف", category: "انقسام" },
    // المادة والطاقة
    { text: "الجسيمات ذات الشحنة السالبة في الذرة هي:", options: ["البروتونات", "النيوترونات", "الإلكترونات", "النواة"], correctAnswer: "الإلكترونات", category: "الذرة" },
    { text: "العناصر التي لها لمعان وموصلة جيدة للحرارة هي:", options: ["اللافلزات", "الفلزات", "أشباه الفلزات", "الغازات النبيلة"], correctAnswer: "الفلزات", category: "العناصر" },
    { text: "قانون نيوتن الأول يسمى أيضاً قانون:", options: ["القصور الذاتي", "التسارع", "الفعل ورد الفعل", "الجاذبية"], correctAnswer: "القصور الذاتي", category: "نيوتن" },
    { text: "الرابطة التي تنتج عن تشارك زوج من الإلكترونات هي الرابطة:", options: ["الأيونية", "التساهمية", "الفلزية", "الهيدروجينية"], correctAnswer: "التساهمية", category: "روابط" },
    { text: "الشغل المبذول (ش) يساوي القوة (ق) مضروبة في:", options: ["الزمن", "الكتلة", "الإزاحة", "السرعة"], correctAnswer: "الإزاحة", category: "شغل" },
    { text: "الطاقة لا تفنى ولا تستحدث بل تتحول من شكل لآخر، هذا قانون:", options: ["نيوتن", "حفظ الطاقة", "انعكاس الضوء", "أوم"], correctAnswer: "حفظ الطاقة", category: "الطاقة" },
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
 * إذا لم يتوفر 10 أسئلة في المجال المختار، تكمل الباقي من أسئلة نفس الصف عشوائياً.
 */
export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  const fullBank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  let primaryPool: Omit<Question, 'id'>[] = [];
  let fallbackPool: Omit<Question, 'id'>[] = [];

  // 1. تصنيف الأسئلة إلى "أساسية" (في المجال المختار) و "احتياطية" (باقي الصف)
  if (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL) {
    primaryPool = fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter);
    fallbackPool = fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") !== outcomeFilter);
  } else {
    primaryPool = [...fullBank];
  }

  // 2. خلط المجموعتين عشوائياً
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

  // 3. بناء القائمة النهائية: نأخذ من الأساسية أولاً ثم الاحتياطية حتى نصل لـ 10
  const finalSelection = [
    ...shuffledPrimary.slice(0, count),
    ...shuffledFallback.slice(0, Math.max(0, count - shuffledPrimary.length))
  ];

  // 4. ترقيم الأسئلة النهائية
  return finalSelection.map((q, index) => ({
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
