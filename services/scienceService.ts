
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

const scienceBank: Record<Grade, Omit<Question, 'id'>[]> = {
  [Grade.PRI_3]: [
    { text: "أي أجزاء النبات تمتص الماء والأملاح من التربة؟", options: ["الأوراق", "الساق", "الجذور", "الأزهار"], correctAnswer: "الجذور", category: LearningOutcomes.LIFE },
    { text: "ماذا تسمى العملية التي يصنع بها النبات غذاءه؟", options: ["الهضم", "التنفس", "البناء الضوئي", "النمو"], correctAnswer: "البناء الضوئي", category: LearningOutcomes.LIFE },
    { text: "ما المادة التي تعطي الأوراق لونها الأخضر؟", options: ["الأكسجين", "الكلوروفيل", "الماء", "السكر"], correctAnswer: "الكلوروفيل", category: LearningOutcomes.LIFE },
    { text: "الحيوانات التي تأكل النباتات فقط تسمى:", options: ["آكلات لحوم", "آكلات أعشاب", "حيوانات قارتة", "مفترسات"], correctAnswer: "آكلات أعشاب", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي يعد من الثدييات؟", options: ["السمكة", "التمساح", "الحوت", "الضفدع"], correctAnswer: "الحوت", category: LearningOutcomes.LIFE },
    { text: "أي حالة من حالات المادة لها شكل ثابت وحجم ثابت؟", options: ["الصلبة", "السائلة", "الغازية", "البلازما"], correctAnswer: "الصلبة", category: LearningOutcomes.PHYSICAL },
    { text: "ما هي الأداة المستخدمة لقياس درجة الحرارة؟", options: ["المسطرة", "الميزان", "الثرمومتر", "الساعة"], correctAnswer: "الثرمومتر", category: LearningOutcomes.PHYSICAL },
    { text: "ما هي القوة التي تسحب الأجسام نحو الأرض؟", options: ["المغناطيسية", "الاحتكاك", "الجاذبية", "الدفع"], correctAnswer: "الجاذبية", category: LearningOutcomes.PHYSICAL },
    { text: "يحدث الليل والنهار بسبب دوران الأرض حول:", options: ["الشمس", "نفسها", "القمر", "المشتري"], correctAnswer: "نفسها", category: LearningOutcomes.EARTH_SPACE },
    { text: "أي الكواكب هو الأقرب إلى الشمس؟", options: ["المريخ", "عطارد", "الزهرة", "الأرض"], correctAnswer: "عطارد", category: LearningOutcomes.EARTH_SPACE }
  ],
  [Grade.PRI_6]: [
    { text: "ما هي وحدة بناء أجسام الكائنات الحية؟", options: ["النسيج", "العضو", "الخلية", "الجهاز"], correctAnswer: "الخلية", category: LearningOutcomes.LIFE },
    { text: "أي الأجزاء التالية يوجد في الخلية النباتية ولا يوجد في الحيوانية؟", options: ["الغشاء البلازمي", "السيتوبلازم", "الجدار الخلوي", "النواة"], correctAnswer: "الجدار الخلوي", category: LearningOutcomes.LIFE },
    { text: "تنتقل المعلومات الوراثية من الآباء إلى الأبناء عبر:", options: ["البروتينات", "الدهون", "الكروموسومات", "الأملاح"], correctAnswer: "الكروموسومات", category: LearningOutcomes.LIFE },
    { text: "ما هي الصيغة الكيميائية للماء؟", options: ["CO2", "O2", "H2O", "NaCl"], correctAnswer: "H2O", category: LearningOutcomes.PHYSICAL },
    { text: "أكبر كواكب المجموعة الشمسية حجماً هو:", options: ["زحل", "المشتري", "نبتون", "الأرض"], correctAnswer: "المشتري", category: LearningOutcomes.EARTH_SPACE },
    { text: "تسمى حركة صفائح القشرة الأرضية التي تسبب اهتزازات بـ:", options: ["البراكين", "الزلازل", "الأعاصير", "الفيضانات"], correctAnswer: "الزلازل", category: LearningOutcomes.EARTH_SPACE },
    { text: "ما الغاز الأكثر توافراً في الغلاف الجوي؟", options: ["الأكسجين", "النيتروجين", "الهيدروجين", "ثاني أكسيد الكربون"], correctAnswer: "النيتروجين", category: LearningOutcomes.EARTH_SPACE },
    { text: "قوة تجاذب بين جسمين تعتمد على الكتلة والمسافة:", options: ["الاحتكاك", "الجاذبية", "المغناطيسية", "الكهرباء"], correctAnswer: "الجاذبية", category: LearningOutcomes.PHYSICAL },
    { text: "عملية تحول السائل إلى غاز تسمى:", options: ["الانصهار", "التكثف", "التبخر", "التجمد"], correctAnswer: "التبخر", category: LearningOutcomes.PHYSICAL },
    { text: "ما وظيفة الميتوكوندريا في الخلية؟", options: ["صنع البروتين", "إنتاج الطاقة", "التخلص من الفضلات", "تخزين الماء"], correctAnswer: "إنتاج الطاقة", category: LearningOutcomes.LIFE }
  ],
  [Grade.INT_3]: [
    // --- علوم الحياة (LIFE) ---
    { text: "ما الذي يتكون في الدم لمحاربة مولدات الضد؟", options: ["الهرمونات", "المواد المسببة للحساسية", "مسببات المرض", "الأجسام المضادة"], correctAnswer: "الأجسام المضادة", category: LearningOutcomes.LIFE },
    { text: "أي الأمراض التالية سببه فيروس يهاجم خلايا الدم البيضاء؟", options: ["الإيدز", "الحصبة", "الإنفلونزا", "شلل الأطفال"], correctAnswer: "الإيدز", category: LearningOutcomes.LIFE },
    { text: "أي المواد الغذائية التالية تصنعها البكتيريا في الأمعاء الغليظة؟", options: ["الدهون", "الفيتامينات", "الأملاح المعدنية", "البروتينات"], correctAnswer: "الفيتامينات", category: LearningOutcomes.LIFE },
    { text: "إلى أي المجموعات الغذائية ينتمي اللبن والحليب؟", options: ["الأطعمة الغنية بالكالسيوم", "البروتينات", "الحبوب", "الفواكه"], correctAnswer: "الأطعمة الغنية بالكالسيوم", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي ينقبض عند الشهيق ويتحرك إلى أسفل؟", options: ["الشعب الهوائية", "الحويصلات الهوائية", "الحجاب الحاجز", "القصبة الهوائية"], correctAnswer: "الحجاب الحاجز", category: LearningOutcomes.LIFE },
    { text: "التراكيب التي تحدث بينها وبين الشعيرات الدموية عملية تبادل الغازات هي:", options: ["الحويصلات", "الشعب الهوائية", "القصبات", "الشعيبات"], correctAnswer: "الحويصلات", category: LearningOutcomes.LIFE },
    { text: "أي المواد التالية لا يتم إعادة امتصاصها بعد مرورها في الكلية؟", options: ["الأملاح", "الفضلات", "الماء", "السكر"], correctAnswer: "الفضلات", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي يسبب أمراض جهاز الدوران؟", options: ["التدخين", "استخدام مادة الأسبست", "الجري", "التعرض للأشعة"], correctAnswer: "التدخين", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي يعد من وظائف الدم؟", options: ["إفراز الأملاح", "إفراز اللعاب", "نقل المواد الغذائية للخلايا", "التخلص من اللمف"], correctAnswer: "نقل المواد الغذائية للخلايا", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي يسببه التدخين؟", options: ["سرطان الرئة", "السكري", "الإنفلونزا", "التهاب المثانة"], correctAnswer: "سرطان الرئة", category: LearningOutcomes.LIFE },
    { text: "أي الأمراض التالية يعد مرضاً غير معدٍ؟", options: ["التيتانوس", "الإنفلونزا", "الملاريا", "السكري"], correctAnswer: "السكري", category: LearningOutcomes.LIFE },
    { text: "أين تنتج خلايا الدم الحمراء؟", options: ["العظم الكثيف", "الغضروف", "السمحاق", "نخاع العظم"], correctAnswer: "نخاع العظم", category: LearningOutcomes.LIFE },
    { text: "ماذا يغلف أطراف العظم؟", options: ["الغضروف", "العضلات", "السمحاق", "الأوتار"], correctAnswer: "الغضروف", category: LearningOutcomes.LIFE },
    { text: "توجد المفاصل غير المتحركة في الإنسان في:", options: ["المرفق", "العنق", "الرسغ", "الجمجمة"], correctAnswer: "الجمجمة", category: LearningOutcomes.LIFE },
    { text: "أي الفيتامينات التالية تصنع في الجلد؟", options: ["فيتامين أ", "فيتامين ج", "فيتامين د", "فيتامين ك"], correctAnswer: "فيتامين د", category: LearningOutcomes.LIFE },
    { text: "أي جزء من العين يتجمع عليه الضوء؟", options: ["العدسة", "الشبكية", "البؤبؤ", "القرنية"], correctAnswer: "الشبكية", category: LearningOutcomes.LIFE },
    { text: "أي الأجزاء التالية جزء من الأذن الداخلية؟", options: ["السندان", "المطرقة", "طبلة الأذن", "القوقعة"], correctAnswer: "القوقعة", category: LearningOutcomes.LIFE },
    { text: "أين تحدث عملية الإخصاب؟", options: ["قناة البيض", "المهبل", "المبيض", "الرحم"], correctAnswer: "قناة البيض", category: LearningOutcomes.LIFE },
    { text: "ما المادة الكيميائية التي تفرزها الغدد الصماء؟", options: ["الإنزيم", "الهرمون", "الحمض", "اللعاب"], correctAnswer: "الهرمون", category: LearningOutcomes.LIFE },
    { text: "أين ينمو الجنين ويتطور؟", options: ["الرحم", "قناة البيض", "المبيض", "المهبل"], correctAnswer: "الرحم", category: LearningOutcomes.LIFE },
    { text: "ماذا يسمى اتحاد البويضة والحيوان المنوي؟", options: ["الإخصاب", "دورة الحيض", "الانقسام المنصف", "التبويض"], correctAnswer: "الإخصاب", category: LearningOutcomes.LIFE },
    { text: "في أي مرحلة يتكون الغشاء الرهلي؟", options: ["البويضة المخصبة", "المرحلة الجنينية المتأخرة", "المرحلة الجنينية الأولى", "حديث الولادة"], correctAnswer: "المرحلة الجنينية الأولى", category: LearningOutcomes.LIFE },
    { text: "إحدى الغدد الآتية ليست غدة صماء:", options: ["اللعابية", "النخامية", "الزعترية", "الصنوبرية"], correctAnswer: "اللعابية", category: LearningOutcomes.LIFE },
    { text: "أي العبارات التالية غير صحيحة فيما يتعلق بالتوائم المتماثلة؟", options: ["ينتجان عن بويضة واحدة", "يحتويان على المادة الوراثية نفسها", "قد يختلفان في الجنس", "لهما الصفات نفسها"], correctAnswer: "قد يختلفان في الجنس", category: LearningOutcomes.LIFE },
    { text: "في أي شهر يمكن معرفة جنس الجنين؟", options: ["الثاني", "الخامس", "الرابع", "السابع"], correctAnswer: "الرابع", category: LearningOutcomes.LIFE },
    { text: "الغدة التي تسيطر على معظم النشاطات الحيوية في الجسم هي:", options: ["الغدة النخامية", "الغدة الدرقية", "الخصيتان", "الغدة الكظرية"], correctAnswer: "الغدة النخامية", category: LearningOutcomes.LIFE },
    { text: "أي مما يلي لا تفرزه الغدد العرقية؟", options: ["الماء", "الدهون", "الفضلات", "الأملاح"], correctAnswer: "الدهون", category: LearningOutcomes.LIFE },
    { text: "أي الغدد الآتية توجد في العنق؟", options: ["النخامية", "الكظرية", "الدرقية", "البنكرياس"], correctAnswer: "الدرقية", category: LearningOutcomes.LIFE },
    { text: "يتم إنتاج البويضات في:", options: ["المبيض", "الرحم", "قناة البيض", "المهبل"], correctAnswer: "المبيض", category: LearningOutcomes.LIFE },
    { text: "ما الفتحات الصغيرة الموجودة على سطح الورقة ومحاطة بخلايا حارسة؟", options: ["الثغور", "الكيوتيكل", "البذور", "الريزومات"], correctAnswer: "الثغور", category: LearningOutcomes.LIFE },
    { text: "أي أجزاء النبات يعمل على تثبيته في التربة؟", options: ["الساق", "الجذر", "الأوراق", "الأزهار"], correctAnswer: "الجذر", category: LearningOutcomes.LIFE },
    { text: "يتكون معظم اللحاء والخشب الجديد للنباتات في:", options: ["الكامبيوم", "الثغور", "الكيوتيكل", "الخلايا الحارسة"], correctAnswer: "الكامبيوم", category: LearningOutcomes.LIFE },
    { text: "أي النباتات التالية لها تراكيب تنقل عن طريقها الماء والمواد الأخرى؟", options: ["الوعائية", "اللاوعائية", "الحزازيات", "حشيشة الكبد"], correctAnswer: "الوعائية", category: LearningOutcomes.LIFE },
    { text: "أي أجزاء الورقة يحدث فيها معظم مراحل عملية البناء الضوئي؟", options: ["البشرة", "الثغور", "الكيوتيكل", "الطبقة العمادية"], correctAnswer: "الطبقة العمادية", category: LearningOutcomes.LIFE },
    { text: "أي المخلوقات الآتية متعددة الخلايا؟", options: ["الطحالب النارية", "الفطريات الدعامية", "البكتيريا", "الأميبا"], correctAnswer: "الفطريات الدعامية", category: LearningOutcomes.LIFE },
    { text: "أي أعضاء الجهاز البولي يجتمع فيه البول؟", options: ["المثانة", "الكلية", "الحالب", "الإحليل"], correctAnswer: "المثانة", category: LearningOutcomes.LIFE },
    { text: "أي الأمراض التالية يسببها فيروس؟", options: ["القرحة", "الملاريا", "السل", "الإنفلونزا"], correctAnswer: "الإنفلونزا", category: LearningOutcomes.LIFE },
    { text: "ما هي أصغر وحدة تركيبية ووظيفية في جسم الكائن الحي؟", options: ["النسيج", "الكروموسوم", "الخلية", "العضو"], correctAnswer: "الخلية", category: LearningOutcomes.LIFE },
    { text: "أي الممالك الآتية يعيش أفرادها في ظروف قاسية جداً؟", options: ["البدائيات", "الطلائيات", "الفطريات", "الحيوانات"], correctAnswer: "البدائيات", category: LearningOutcomes.LIFE },
    { text: "أي من المخلوقات التالية تمتاز بأنها ذات تماثل شعاعي؟", options: ["الرخويات", "الديدان الحلقية", "شوكيات الجلد", "المفصليات"], correctAnswer: "شوكيات الجلد", category: LearningOutcomes.LIFE },

    // --- العلوم الفيزيائية (PHYSICAL) ---
    { text: "أي مما يلي يستطيع تحويل الطاقة الضوئية إلى طاقة كهربائية؟", options: ["الضباب الدخاني", "محطات الطاقة النووية", "طاقة الحرارة الجوفية", "الخلايا الشمسية"], correctAnswer: "الخلايا الشمسية", category: LearningOutcomes.PHYSICAL },
    { text: "ماذا يحدث لمعظم المواد عندما يتم تسخينها؟", options: ["تتقلص", "تتمدد", "تطفو", "تتبخر"], correctAnswer: "تتمدد", category: LearningOutcomes.PHYSICAL },
    { text: "انتقال الحرارة من الشمس إلى الأرض مثال على:", options: ["الإشعاع", "الحمل الحراري", "التمدد", "التوصيل الحراري"], correctAnswer: "الإشعاع", category: LearningOutcomes.PHYSICAL },
    { text: "مجموع طاقتي الوضع والحركة يسمى:", options: ["درجة الحرارة", "طاقة حركية", "حرارة نوعية", "طاقة حرارية"], correctAnswer: "طاقة حرارية", category: LearningOutcomes.PHYSICAL },
    { text: "متوسط الطاقة الحركية للجزيئات المكونة للجسم هو:", options: ["الطاقة الحرارية", "طاقة الوضع", "درجة الحرارة", "الضوئية"], correctAnswer: "درجة الحرارة", category: LearningOutcomes.PHYSICAL },
    { text: "يقاس التردد بوحدة:", options: ["هرتز", "ديسبل", "متر / ثانية", "نيوتن"], correctAnswer: "هرتز", category: LearningOutcomes.PHYSICAL },
    { text: "ينتقل الصوت أسرع في:", options: ["الفراغ", "الماء", "الفولاذ", "الهواء"], correctAnswer: "الفولاذ", category: LearningOutcomes.PHYSICAL },
    { text: "ما الذي يولد الموجات؟", options: ["الاهتزازات", "الصوت", "الحرارة", "نقل الطاقة"], correctAnswer: "الاهتزازات", category: LearningOutcomes.PHYSICAL },
    { text: "سبب تغير شكل المثلجات بعد مرور فترة من الزمن خارج المجمد هو:", options: ["ارتفاع درجة الحرارة", "تغير لونها", "تأثرها بشكل الإناء", "انخفاض درجة الحرارة"], correctAnswer: "ارتفاع درجة الحرارة", category: LearningOutcomes.PHYSICAL },
    { text: "أي التحولات يحدث في محرك السيارة عندما تبدأ بالحركة؟", options: ["كيميائية - حرارية", "كيميائية - ميكانيكية", "كيميائية - ضوئية", "كيميائية - صوتية"], correctAnswer: "كيميائية - ميكانيكية", category: LearningOutcomes.PHYSICAL },
    { text: "سلط خالد كشاف ضوئي على منشور زجاجي، أي لون ينحرف بشكل أكبر؟", options: ["الأحمر (طول كبير)", "الأزرق (طول كبير)", "الأحمر (طول صغير)", "الأزرق (طول صغير)"], correctAnswer: "الأزرق (طول صغير)", category: LearningOutcomes.PHYSICAL },
    { text: "عند سقوط حجر على الأرض والحجر يجذب كل منهما الآخر، التفسير هو:", options: ["قانون نيوتن الثالث", "قانون نيوتن الأول", "محصلة القوى صفر", "أحد القوى صفر"], correctAnswer: "قانون نيوتن الثالث", category: LearningOutcomes.PHYSICAL },
    { text: "على ماذا نحصل عند مزج الملح في الماء؟", options: ["عنصر", "مركب", "جزيء", "محلول"], correctAnswer: "محلول", category: LearningOutcomes.PHYSICAL },
    { text: "ما المحلول غير المتجانس من المحاليل التالية؟", options: ["الأسيتون في الماء", "السكر في الماء", "الطباشير في الماء", "الكحول في الماء"], correctAnswer: "الطباشير في الماء", category: LearningOutcomes.PHYSICAL },

    // --- علوم الأرض والفضاء (EARTH_SPACE) ---
    { text: "أي الموارد التالية متجدد؟", options: ["الفحم", "الألومنيوم", "ضوء الشمس", "النفط"], correctAnswer: "ضوء الشمس", category: LearningOutcomes.EARTH_SPACE },
    { text: "أي مما يلي يسهم في تحلل الأوزون؟", options: ["ثاني أكسيد الكربون", "الرادون", "الكلوروفلوروكربون", "أول أكسيد الكربون"], correctAnswer: "الكلوروفلوروكربون", category: LearningOutcomes.EARTH_SPACE },
    { text: "لو لم تكن هناك ظاهرة الاحتباس الحراري، فما هي النتيجة المتوقعة؟", options: ["الأرض أكثر سخونة", "الأرض أكثر برودة", "الحرارة متساوية", "انصهار الجليد"], correctAnswer: "الأرض أكثر برودة", category: LearningOutcomes.EARTH_SPACE },
    { text: "ماذا تسمى الصخور المنصهرة التي تتدفق على سطح الأرض؟", options: ["الحمم", "اللابة", "الصدع", "التحلل"], correctAnswer: "اللابة", category: LearningOutcomes.EARTH_SPACE },
    { text: "يعد القطن من الموارد المتجددة لأنه:", options: ["ينمو بكميات كبيرة", "يحصد كل عام", "يصنع صناعياً", "لا يحتاج للشمس"], correctAnswer: "يحصد كل عام", category: LearningOutcomes.EARTH_SPACE }
  ]
};

const factsBank: Record<Grade, ScienceFact[]> = {
  [Grade.PRI_3]: [
    { title: "عجائب الجذور", description: "جذور النباتات لا تثبته فقط، بل هي أنابيب ذكية تبحث عن الماء في أعماق التربة.", category: "biology" },
    { title: "الكوكب المائي", description: "الأرض هي الكوكب الوحيد المعروف الذي يحتوي على ماء سائل، وهذا ما يجعل الحياة ممكنة.", category: "earth" }
  ],
  [Grade.PRI_6]: [
    { title: "سر الخلية", description: "داخل كل خلية في جسمك يوجد (نواة) تعمل كغرفة تحكم تدير كل العمليات الحيوية.", category: "biology" },
    { title: "سرعة الضوء", description: "ينتقل الضوء بسرعة 300 ألف كيلومتر في الثانية، وهذا أسرع شيء في الكون!", category: "physics" }
  ],
  [Grade.INT_3]: [
    { title: "خلايا الدم البيضاء", description: "تعمل خلايا الدم البيضاء كجيش مدرب يهاجم أي فيروس أو بكتيريا تحاول دخول جسمك.", category: "biology" },
    { title: "الروابط الكيميائية", description: "الذرات ترتبط معاً لتكوين جزيئات جديدة تماماً، مثل الهيدروجين والأكسجين اللذين يكونان الماء.", category: "chemistry" },
    { title: "الصفائح الأرضية", description: "القارات التي نعيش عليها تتحرك ببطء شديد، بنفس سرعة نمو أظافر يدك!", category: "earth" },
    { title: "الثقوب السوداء", description: "هي مناطق في الفضاء ذات جاذبية قوية جداً لدرجة أن الضوء نفسه لا يستطيع الهروب منها.", category: "space" },
    { title: "الإنزيمات السريعة", description: "بدون الإنزيمات، قد يستغرق هضم وجبة واحدة في معدتك عشرات السنين!", category: "biology" },
    { title: "الوراثة المندلية", description: "اكتشف مندل قوانين الوراثة من خلال نبات البازلاء، وهو ما مهد الطريق لعلوم الهندسة الوراثية.", category: "biology" }
  ]
};

export const getOutcomesByGrade = (grade: Grade): string[] => {
  return [LearningOutcomes.GENERAL, LearningOutcomes.LIFE, LearningOutcomes.PHYSICAL, LearningOutcomes.EARTH_SPACE];
};

export const generateScienceQuestions = (grade: Grade, count: number = 10, outcomeFilter?: string): Question[] => {
  const fullBank = scienceBank[grade] || scienceBank[Grade.PRI_3];
  
  // 1. تصفية الأسئلة بناءً على المجال المختار
  let filteredPool = (outcomeFilter && outcomeFilter !== LearningOutcomes.GENERAL)
    ? fullBank.filter(q => q.category === outcomeFilter)
    : fullBank;

  // 2. خلط الأسئلة المصفاة عشوائياً
  let shuffledPool = shuffleArray(filteredPool);

  // 3. التحقق من العدد: إذا كان أقل من المطلوب (مثلاً اختيار مجال محدد أسئلته قليلة)
  // نقوم بإضافة أسئلة عشوائية من باقي البنك لنفس الصف لإكمال العدد لـ 10
  if (shuffledPool.length < count) {
    const remainingQuestions = shuffleArray(fullBank.filter(q => !shuffledPool.includes(q)));
    shuffledPool = [...shuffledPool, ...remainingQuestions];
  }

  // 4. إرجاع العدد المطلوب (10 أسئلة) مع خلط الخيارات لكل سؤال
  return shuffledPool.slice(0, count).map((q, i) => ({
    ...q,
    id: i + 1,
    options: shuffleArray(q.options || [])
  }));
};

export const getEnrichingFacts = (grade: Grade, count: number = 6): ScienceFact[] => {
  const pool = factsBank[grade] || factsBank[Grade.PRI_3];
  return shuffleArray(pool).slice(0, count);
};
