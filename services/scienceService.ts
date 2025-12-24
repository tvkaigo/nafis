
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
  if (["خلية", "وراثة", "جين", "dna", "أجهزة", "جسم", "دم", "هضم", "تنفس", "مناعة", "نبات", "حيوان", "أحياء", "انقسام", "تكاثر", "إخصاب", "غدد", "عين", "أذن"].some(k => cat.includes(k))) return LearningOutcomes.LIFE;
  if (["مادة", "ذرة", "تفاعل", "محاليل", "قوة", "نيوتن", "طاقة", "كهرباء", "ضوء", "حرارة", "سرعة", "تسارع", "زخم", "عنصر", "رابطة", "صوت", "تردد", "موجات"].some(k => cat.includes(k))) return LearningOutcomes.PHYSICAL;
  if (["أرض", "صخر", "زلزال", "بركان", "فضاء", "كون", "كوكب", "مناخ", "بيئة", "صفائح", "نجوم", "مجرة", "تربة", "موارد", "أوزون", "احتباس"].some(k => cat.includes(k))) return LearningOutcomes.EARTH_SPACE;
  return LearningOutcomes.LIFE;
};

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "ما هو الجزء الذي يثبت النبات في التربة ويمتص الماء؟", options: ["الأوراق", "الأزهار", "الساق", "الجذور"], correctAnswer: "الجذور", category: "نبات" },
    { text: "تسمى عملية صنع الغذاء في النبات بـ:", options: ["التنفس", "الهضم", "البناء الضوئي", "التكاثر"], correctAnswer: "البناء الضوئي", category: "نبات" },
    { text: "أي من الحيوانات التالية يمتلك عموداً فقرياً؟", options: ["الحشرة", "الأخطبوط", "الجمل", "الدودة"], correctAnswer: "الجمل", category: "حيوان" },
    { text: "ما هو الموطن الذي يتميز بالبرودة الشديدة والجليد؟", options: ["الصحراء", "المنطقة القطبية", "الغابة", "المراعي"], correctAnswer: "المنطقة القطبية", category: "بيئة" },
  ],
  [Grade.PRI_6]: [
    { text: "ما هو التركيب الذي يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟", options: ["النواة", "الميتوكندريا", "الجدار الخلوي", "الغشاء البلازمي"], correctAnswer: "الجدار الخلوي", category: "خلايا" },
    { text: "تنتقل الصفات الوراثية من الآباء إلى الأبناء عبر:", options: ["الدم", "الجينات", "الغذاء", "الهواء"], correctAnswer: "الجينات", category: "وراثة" },
  ],
  [Grade.INT_3]: [
    { text: "ما الذي يتكون في الدم لمحاربة مولدات الضد؟", options: ["الهرمونات", "المواد المسببة للحساسية", "مسببات المرض", "الأجسام المضادة"], correctAnswer: "الأجسام المضادة", category: "دم ومناعة" },
    { text: "أي الأمراض التالية سببه فيروس يهاجم خلايا الدم البيضاء؟", options: ["الإيدز", "الحصبة", "الإنفلونزا", "شلل الأطفال"], correctAnswer: "الإيدز", category: "أجهزة الجسم" },
  ]
};

const factsBank: Record<Grade, ScienceFact[]> = {
  [Grade.PRI_3]: [
    { title: "عجائب الجذور", description: "جذور النباتات لا تثبته فقط، بل هي أنابيب ذكية تبحث عن الماء في أعماق التربة.", category: "biology" },
    { title: "الكوكب المائي", description: "الأرض هي الكوكب الوحيد المعروف الذي يحتوي على ماء سائل، وهذا ما يجعل الحياة ممكنة.", category: "earth" },
    { title: "صناعة الغذاء", description: "الأوراق هي مصانع صغيرة تستخدم ضوء الشمس لتحويل الهواء والماء إلى سكر مغذٍ.", category: "biology" },
    { title: "البرودة القطبية", description: "الحيوانات القطبية تمتلك طبقات دهن سميكة تعمل كمعطف دافئ يحميها من الجليد.", category: "biology" },
    { title: "قوة المغناطيس", description: "المغناطيس يجذب المعادن مثل الحديد، والأرض نفسها تعمل كمغناطيس عملاق!", category: "physics" },
    { title: "دورة الماء", description: "الماء الذي تشربه اليوم قد يكون هو نفسه الذي شربه الديناصورات قديماً، لأنه يتجدد دائماً.", category: "earth" },
    { title: "عجائب النحل", description: "النحلة تزور آلاف الأزهار يومياً لتصنع ملعقة واحدة من العسل.", category: "biology" },
    { title: "الظل المتحرك", description: "يتغير طول ظلك خلال النهار بسبب دوران الأرض حول نفسها أمام الشمس.", category: "earth" }
  ],
  [Grade.PRI_6]: [
    { title: "سر الخلية", description: "داخل كل خلية في جسمك يوجد (نواة) تعمل كغرفة تحكم تدير كل العمليات الحيوية.", category: "biology" },
    { title: "الميتوكندريا", description: "تسمى محطات توليد الطاقة في الخلية، فهي تحول الغذاء إلى طاقة تجعلك تتحرك وتفكر.", category: "biology" },
    { title: "الجينات المذهلة", description: "الجينات هي كتيب التعليمات الذي يحدد لون عينيك وطول قامتك وحتى شكل ابتسامتك.", category: "biology" },
    { title: "سرعة الضوء", description: "ينتقل الضوء بسرعة 300 ألف كيلومتر في الثانية، وهذا أسرع شيء في الكون!", category: "physics" },
    { title: "الغلاف الجوي", description: "طبقة الأوزون تعمل كدرع واقي للأرض من أشعة الشمس الضارة.", category: "earth" },
    { title: "الكهرباء الساكنة", description: "البرق هو مجرد تفريغ هائل للكهرباء الساكنة التي تتجمع في السحب.", category: "physics" },
    { title: "وزنك في الفضاء", description: "إذا ذهبت للقمر، سيقل وزنك لأن جاذبية القمر أضعف من جاذبية الأرض بـ 6 مرات.", category: "space" },
    { title: "عجائب الـ DNA", description: "لو قمت بفك خيط الـ DNA في خلية واحدة، سيصل طوله إلى مترين!", category: "biology" }
  ],
  [Grade.INT_3]: [
    // FIX: changed 'text' to 'title' to match ScienceFact interface and fix type error
    { title: "خلايا الدم البيضاء", description: "تعمل خلايا الدم البيضاء كجيش مدرب يهاجم أي فيروس أو بكتيريا تحاول دخول جسمك.", category: "biology" },
    { title: "دورة الكربون", description: "الكربون ينتقل بين الهواء والنباتات والحيوانات في دورة مستمرة تضمن توازن الحياة.", category: "earth" },
    { title: "الصفائح الأرضية", description: "القارات التي نعيش عليها تتحرك ببطء شديد، بنفس سرعة نمو أظافر يدك!", category: "earth" },
    { title: "قوانين نيوتن", description: "لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه، وهذا سر انطلاق الصواريخ.", category: "physics" },
    { title: "عجائب النجوم", description: "النجوم التي تراها ليلاً قد تكون اختفت منذ ملايين السنين، لكن ضوءها وصل إلينا الآن فقط.", category: "space" },
    { title: "الروابط الكيميائية", description: "الذرات ترتبط معاً لتكوين جزيئات جديدة تماماً، مثل الهيدروجين والأكسجين اللذين يكونان الماء.", category: "chemistry" },
    { title: "الإنزيمات السريعة", description: "بدون الإنزيمات، قد يستغرق هضم وجبة واحدة في معدتك عشرات السنين!", category: "biology" },
    { title: "الثقوب السوداء", description: "هي مناطق في الفضاء ذات جاذبية قوية جداً لدرجة أن الضوء نفسه لا يستطيع الهروب منها.", category: "space" },
    { title: "الوراثة المندلية", description: "اكتشف مندل قوانين الوراثة من خلال نبات البازلاء، وهو ما مهد الطريق لعلوم الهندسة الوراثية.", category: "biology" },
    { title: "الموصلات الفائقة", description: "هناك مواد تنقل الكهرباء بدون أي مقاومة، مما يفتح آفاقاً لقطارات طائرة مستقبلاً.", category: "physics" }
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  return [LearningOutcomes.GENERAL, LearningOutcomes.LIFE, LearningOutcomes.PHYSICAL, LearningOutcomes.EARTH_SPACE];
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  const fullBank = scienceBank[grade] || [];
  let pool = outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL 
    ? fullBank.filter(q => getOutcomeForCategory(grade, q.category || "") === outcomeFilter) 
    : fullBank;

  if (pool.length < count) {
    const additional = count - pool.length;
    const remaining = fullBank.filter(q => !pool.includes(q));
    pool = [...pool, ...shuffleArray(remaining).slice(0, additional)];
  }

  return shuffleArray(pool).slice(0, count).map((q, i) => ({
    ...q,
    id: i + 1,
    options: shuffleArray(q.options || [])
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const pool = factsBank[grade] || factsBank[Grade.PRI_3];
  return shuffleArray(pool).slice(0, count);
};
