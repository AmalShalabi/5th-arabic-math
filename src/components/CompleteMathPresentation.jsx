import { useNavigate } from 'react-router-dom'
import NumberLine from './NumberLine'

function CompleteMathPresentation() {
  const navigate = useNavigate()

  const topics = [
    {
      id: 1,
      title: "الأعداد الطبيعية والموجهة",
      icon: "🔢",
      historicalContext: "اكتُشفت الأعداد الطبيعية في العصور القديمة للعد والتجارة، بينما ظهرت الأعداد السالبة في القرن السابع الميلادي لدى الرياضيين الهنود والعرب.",
      explanation: "الأعداد الطبيعية هي الأعداد الموجبة التي نستخدمها للعد (1، 2، 3، ...)\nالأعداد الموجهة تشمل الأعداد الموجبة والسالبة والصفر\nالأعداد السالبة أقل من الصفر والأعداد الموجبة أكبر من الصفر",
      visualElements: [
        { type: "number-line", content: "خط الأعداد يوضح ترتيب الأعداد من السالب إلى الموجب" },
        { type: "temperature", content: "مقياس الحرارة: +25°C فوق الصفر، -5°C تحت الصفر" },
        { type: "elevation", content: "الارتفاع: جبل +1000م، بحر -50م تحت سطح الأرض" }
      ],
      stepByStepExamples: [
        {
          title: "🌡️ درجات الحرارة",
          steps: [
            "الخطوة 1: فهم المقارنة\n+25°C (خمس وعشرون درجة فوق الصفر)\n-5°C (خمس درجات تحت الصفر)",
            "الخطوة 2: ترتيب الأعداد\n-5 < 0 < +25\nأي أن -5 أقل من +25",
            "الخطوة 3: التطبيق العملي\nفي الشتاء: -3°C (بارد جداً)\nفي الصيف: +35°C (حار)"
          ]
        },
        {
          title: "💰 الأرباح والخسائر",
          steps: [
            "الخطوة 1: تحديد النتيجة\nربح: +150 ريال\nخسارة: -80 ريال",
            "الخطوة 2: حساب الرصيد\nالرصيد = +150 + (-80)\nالرصيد = +150 - 80 = +70 ريال",
            "الخطوة 3: التحليل\nالنتيجة موجبة = ربح صافي\nالنتيجة سالبة = خسارة صافية"
          ]
        }
      ],
      practiceQuestions: {
        easy: [
          "ما هو العدد الأكبر: +5 أم -3؟",
          "إذا كانت درجة الحرارة -2°C، هل الجو بارد أم حار؟"
        ],
        medium: [
          "رجل خسر 50 ريالاً ثم ربح 30 ريالاً. ما رصيده النهائي؟",
          "رتب هذه الأعداد من الأصغر للأكبر: +3، -1، +7، -5"
        ],
        hard: [
          "في يوم شتوي، كانت درجة الحرارة -8°C في الصباح، وارتفعت 12 درجة في الظهيرة. ما درجة الحرارة في الظهيرة؟",
          "إذا كان رصيد أحمد -25 ريالاً، ودفع 15 ريالاً، فما رصيده الجديد؟"
        ]
      }
    },
    {
      id: 2,
      title: "العمليات الحسابية",
      icon: "➕➖✖️➗",
      historicalContext: "العمليات الحسابية الأربع كانت معروفة لدى البابليين والمصريين القدماء منذ 4000 عام، وتم تطويرها بشكل كامل في الحضارة العربية الإسلامية.",
      explanation: "الجمع (+): إضافة أعداد للحصول على المجموع\nالطرح (-): إزالة عدد من آخر للحصول على الفرق\nالضرب (×): تكرار الجمع للحصول على الناتج\nالقسمة (÷): تقسيم عدد على آخر للحصول على الناتج",
      visualElements: [
        { type: "operations", content: "رموز العمليات: + (الجمع)، - (الطرح)، × (الضرب)، ÷ (القسمة)" },
        { type: "order", content: "ترتيب العمليات: الأقواس أولاً، ثم الضرب والقسمة، ثم الجمع والطرح" },
        { type: "calculator", content: "آلة حاسبة تظهر العمليات بالترتيب الصحيح" }
      ],
      stepByStepExamples: [
        {
          title: "🛒 التسوق - الضرب",
          steps: [
            "الخطوة 1: فهم المسألة\nاشترى أحمد 3 أقلام بسعر 5 ريالات لكل قلم",
            "الخطوة 2: تحديد العملية\nهذه مسألة ضرب: 3 × 5",
            "الخطوة 3: الحل\n3 × 5 = 15 ريال\nإذن التكلفة الإجمالية = 15 ريال"
          ]
        },
        {
          title: "📚 توزيع الكتب - القسمة",
          steps: [
            "الخطوة 1: فهم المسألة\nلدى المعلم 24 كتاباً يريد توزيعها على 6 طلاب",
            "الخطوة 2: تحديد العملية\nهذه مسألة قسمة: 24 ÷ 6",
            "الخطوة 3: الحل\n24 ÷ 6 = 4 كتب\nإذن كل طالب يحصل على 4 كتب"
          ]
        }
      ],
      practiceQuestions: {
        easy: [
          "ما نتيجة: 8 + 7؟",
          "ما نتيجة: 15 - 9؟",
          "ما نتيجة: 4 × 3؟",
          "ما نتيجة: 20 ÷ 5؟"
        ],
        medium: [
          "احسب: 5 + 3 × 2",
          "اشترى سعد 4 أقلام بسعر 6 ريالات لكل قلم. كم دفع؟",
          "تريد فاطمة تقسيم 18 قطعة حلوى على 3 أصدقاء. كم قطعة لكل صديق؟"
        ],
        hard: [
          "احسب: (12 + 8) ÷ (7 - 3)",
          "اشترى أحمد 3 أقلام و 2 دفاتر. سعر القلم 5 ريالات وسعر الدفتر 8 ريالات. كم دفع أحمد؟",
          "في متجر، هناك خصم 20% على كل قميص سعره 50 ريال. كم سعر القميص بعد الخصم؟"
        ]
      }
    },
    {
      id: 3,
      title: "الكسور العادية",
      icon: "🍕",
      historicalContext: "استخدم المصريون القدماء الكسور منذ 4000 عام، وطور العرب نظام الكسور العشرية في القرن التاسع الميلادي، مما ساهم في تقدم الرياضيات.",
      explanation: "الكسر يتكون من جزأين:\nالبسط: العدد العلوي يوضح عدد الأجزاء المأخوذة\nالمقام: العدد السفلي يوضح عدد الأجزاء الكلية\nمثال: 3/4 يعني 3 أجزاء من أصل 4 أجزاء متساوية",
      visualElements: [
        { type: "pie-chart", content: "دائرة مقسمة إلى أجزاء متساوية تمثل الكسور المختلفة" },
        { type: "fraction-bar", content: "شريط مقسم يوضح البسط والمقام في الكسر" },
        { type: "pizza", content: "بيتزا مقسمة إلى 8 أجزاء متساوية، كل جزء = 1/8" }
      ],
      stepByStepExamples: [
        {
          title: "🍰 تقسيم الكعكة",
          steps: [
            "الخطوة 1: فهم الكسر\nكعكة مقسمة إلى 8 أجزاء متساوية",
            "الخطوة 2: حساب ما أُكل\nأكل أحمد 3 أجزاء = 3/8 من الكعكة",
            "الخطوة 3: حساب ما بقي\nبقي: 8 - 3 = 5 أجزاء = 5/8 من الكعكة"
          ]
        },
        {
          title: "📖 قراءة الكتب",
          steps: [
            "الخطوة 1: فهم المسألة\nكتاب من 120 صفحة، قرأت سارة 1/3 الكتاب",
            "الخطوة 2: حساب ما قرأته\nعدد الصفحات المقروءة = 120 × 1/3 = 40 صفحة",
            "الخطوة 3: حساب ما بقي\nعدد الصفحات المتبقية = 120 - 40 = 80 صفحة = 2/3 الكتاب"
          ]
        }
      ],
      practiceQuestions: {
        easy: [
          "ما معنى الكسر 2/5؟",
          "إذا قسمت بيتزا إلى 6 أجزاء متساوية، فما قيمة كل جزء؟",
          "أي كسر أكبر: 1/3 أم 1/4؟"
        ],
        medium: [
          "كتاب من 90 صفحة، قرأ أحمد 2/5 منه. كم صفحة قرأ؟",
          "في صف من 30 طالباً، 3/5 منهم بنات. كم عدد البنات؟",
          "ما الكسر الذي يمثل 25%؟"
        ],
        hard: [
          "اشترى سعد 3/4 كيلو من التفاح، واشترى فاطمة 2/3 كيلو. كم كيلو اشتروا معاً؟",
          "في حفلة، أُكل 5/8 من الكعكة. بقي 1/4 كعكة. ما حجم الكعكة الأصلية؟",
          "إذا كان 3/7 من الطلاب يحبون الرياضة، و 2/7 يحبون القراءة، فكم نسبة من لا يحبون أي منهما؟"
        ]
      },
      {
        id: 4,
        title: "النسبة والتناسب",
        icon: "⚖️",
        historicalContext: "استخدم المصريون القدماء النسبة والتناسب في بناء الأهرامات، وطور اليونانيون مفهوم النسبة الذهبية، بينما طور العرب المسلمون علم الجبر المتقدم.",
        explanation: "النسبة: مقارنة بين كميتين من نفس النوع\nالتناسب: تساوي نسبتين\nمثال: 2:3 = 4:6 (نسبة إلى نسبة)",
        visualElements: [
          { type: "scale", content: "ميزان يوضح تساوي النسبتين في التناسب" },
          { type: "recipe", content: "وصفة طبخ تظهر النسبة بين المكونات" },
          { type: "map", content: "خريطة تظهر مقياس الرسم والنسبة" }
        ],
        stepByStepExamples: [
          {
            title: "🍳 الطبخ - التناسب",
            steps: [
              "الخطوة 1: فهم النسبة\nلـ 6 أشخاص: 2 كوب دقيق\nالنسبة: 2:6",
              "الخطوة 2: حساب للعدد الجديد\nلـ 12 شخص: ؟ كوب دقيق\nالنسبة: 2:6 = ؟:12",
              "الخطوة 3: الحل\n2:6 = ؟:12\n؟ = (2 × 12) ÷ 6 = 4 أكواب"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["ما النسبة بين 3 و 9؟", "إذا كانت النسبة 2:5، فما النسبة المكافئة لها؟"],
          medium: ["إذا كان 4:8 = ؟:16، فما قيمة ؟؟", "في وصفة، النسبة بين الدقيق والسكر 3:1. كم كوب سكر لـ 6 أكواب دقيق؟"],
          hard: ["إذا كان 2:3 = 6:؟، فما قيمة ؟؟", "مزرعة مساحتها 1200 متر مربع، 3/5 منها للزراعة. كم متر مربع للزراعة؟"]
        }
      },
      {
        id: 5,
        title: "المسافة والزمن والسرعة",
        icon: "🚗",
        historicalContext: "اكتشف العلماء المسلمون في العصور الوسطى قوانين الحركة والسرعة، وطور إسحاق نيوتن قوانين الحركة في القرن السابع عشر.",
        explanation: "السرعة = المسافة ÷ الزمن\nالمسافة = السرعة × الزمن\nالزمن = المسافة ÷ السرعة\nالوحدة الأساسية: متر/ثانية أو كم/ساعة",
        visualElements: [
          { type: "speedometer", content: "عداد السرعة يظهر كم/ساعة" },
          { type: "clock", content: "ساعة تظهر الزمن المنقضي" },
          { type: "road", content: "طريق مستقيم يوضح المسافة" }
        ],
        stepByStepExamples: [
          {
            title: "🚌 رحلة المدرسة",
            steps: [
              "الخطوة 1: جمع البيانات\nالمسافة = 5 كم\nالسرعة = 50 كم/ساعة",
              "الخطوة 2: اختيار القانون\nالزمن = المسافة ÷ السرعة",
              "الخطوة 3: الحساب\nالزمن = 5 ÷ 50 = 0.1 ساعة = 6 دقائق"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["سيارة تسير 60 كم في ساعة، ما سرعتها؟", "عداء يجري 100 متر في 10 ثواني، ما سرعته؟"],
          medium: ["طائرة تحلق 800 كم في ساعتين، ما سرعتها؟", "قطار يسير بسرعة 120 كم/ساعة، كم مسافة يقطع في 3 ساعات؟"],
          hard: ["سيارة تسير بسرعة 80 كم/ساعة، كم وقت تحتاج لقطع 400 كم؟", "عداء يجري بسرعة 5 متر/ثانية، كم مسافة يقطع في 2 دقيقة؟"]
        }
      },
      {
        id: 6,
        title: "الزوايا وأنواعها",
        icon: "📐",
        historicalContext: "درس البابليون والمصريون القدماء الزوايا في بناء المعابد والأهرامات، وطور إقليدس علم الهندسة في القرن الثالث قبل الميلاد.",
        explanation: "الزاوية الحادة: أقل من 90°\nالزاوية القائمة: تساوي 90°\nالزاوية المنفرجة: أكثر من 90° وأقل من 180°\nالزاوية المستقيمة: تساوي 180°",
        visualElements: [
          { type: "protractor", content: "منقلة لقياس الزوايا بالدرجات" },
          { type: "clock", content: "عقارب الساعة تشكل زوايا مختلفة" },
          { type: "triangle", content: "مثلث يوضح مجموع الزوايا = 180°" }
        ],
        stepByStepExamples: [
          {
            title: "🕐 الساعة والزوايا",
            steps: [
              "الخطوة 1: فهم الدائرة\nالساعة مقسمة إلى 12 جزء = 360°",
              "الخطوة 2: حساب الزاوية\nكل ساعة = 360° ÷ 12 = 30°",
              "الخطوة 3: التطبيق\nالساعة 3:00 = 3 × 30° = 90° (زاوية قائمة)"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["ما نوع الزاوية 45°؟", "ما نوع الزاوية 90°؟", "ما نوع الزاوية 120°؟"],
          medium: ["ما الزاوية التي تشكلها الساعة عند 6:00؟", "إذا كان مجموع زوايا مثلث 180°， وزاويتان 60° و 70°， فما الزاوية الثالثة؟"],
          hard: ["ما الزاوية التي تشكلها الساعة عند 2:30؟", "في مثلث قائم الزاوية، إحدى الزوايا 30°. ما الزاوية الثالثة؟"]
        }
      },
      {
        id: 7,
        title: "الأشكال الهندسية",
        icon: "🔷",
        historicalContext: "استخدم المصريون القدماء الأشكال الهندسية في بناء الأهرامات، وطور الإغريق علم الهندسة الإقليدية، بينما طور العرب المسلمون الهندسة التحليلية.",
        explanation: "المثلث: 3 أضلاع و 3 زوايا\nالمربع: 4 أضلاع متساوية و 4 زوايا قائمة\nالمستطيل: 4 أضلاع، الأضلاع المتقابلة متساوية و 4 زوايا قائمة\nالدائرة: منحنى مغلق جميع نقاطه على بعد متساو من المركز",
        visualElements: [
          { type: "shapes", content: "مجموعة من الأشكال: مثلث، مربع، دائرة، مستطيل" },
          { type: "pattern", content: "نمط متكرر من الأشكال الهندسية" },
          { type: "building", content: "مبنى يوضح استخدام الأشكال في البناء" }
        ],
        stepByStepExamples: [
          {
            title: "🏠 تصميم المنازل",
            steps: [
              "الخطوة 1: تحديد الشكل\nالغرف: مستطيلة الشكل\nالسقف: مثلثي الشكل",
              "الخطوة 2: فهم الخصائص\nالمستطيل: زوايا قائمة، أضلاع متقابلة متساوية",
              "الخطوة 3: التطبيق\nالنوافذ: مربعة أو دائرية\nالأبواب: مستطيلة"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["كم ضلع للمثلث؟", "كم زاوية للمربع؟", "ما شكل العجلة؟"],
          medium: ["ما الفرق بين المربع والمستطيل؟", "كم زاوية قائمة في المستطيل؟"],
          hard: ["إذا كان ضلع مربع 5 سم، فما محيطه؟", "إذا كان طول مستطيل 8 سم وعرضه 6 سم، فما مساحته؟"]
        }
      },
      {
        id: 8,
        title: "المحيط والمساحة",
        icon: "📏",
        historicalContext: "اكتشف المصريون القدماء طرق حساب المساحة لضريبة الأراضي، وطور أرخميدس طرق حساب المساحة والمحيط في القرن الثالث قبل الميلاد.",
        explanation: "المحيط: مجموع أطوال جميع أضلاع الشكل\nمساحة المربع = الضلع × الضلع\nمساحة المستطيل = الطول × العرض\nمحيط المربع = 4 × الضلع\nمحيط المستطيل = 2 × (الطول + العرض)",
        visualElements: [
          { type: "ruler", content: "مسطرة لقياس الأطوال والمحيط" },
          { type: "grid", content: "شبكة مربعات لحساب المساحة" },
          { type: "field", content: "حقل زراعي يوضح المحيط والمساحة" }
        ],
        stepByStepExamples: [
          {
            title: "🏠 غرفة النوم",
            steps: [
              "الخطوة 1: جمع البيانات\nالطول = 4 متر، العرض = 3 متر",
              "الخطوة 2: حساب المحيط\nالمحيط = 2 × (4 + 3) = 2 × 7 = 14 متر",
              "الخطوة 3: حساب المساحة\nالمساحة = 4 × 3 = 12 متر مربع"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["ما محيط مربع طول ضلعه 4 سم؟", "ما مساحة مربع طول ضلعه 5 سم؟"],
          medium: ["ما محيط مستطيل طوله 6 سم وعرضه 4 سم؟", "ما مساحة مستطيل طوله 8 سم وعرضه 5 سم؟"],
          hard: ["إذا كان محيط مربع 24 سم، فما طول ضلعه؟", "إذا كانت مساحة مستطيل 30 سم مربع، وطوله 6 سم، فما عرضه؟"]
        }
      },
      {
        id: 9,
        title: "الحجم والسعة",
        icon: "🧊",
        historicalContext: "استخدم المصريون القدماء الحجم والسعة في التجارة والبناء، وطور أرخميدس قانون الطفو وحساب حجم الأجسام في القرن الثالث قبل الميلاد.",
        explanation: "الحجم = الطول × العرض × الارتفاع\nوحدة الحجم: متر مكعب، سنتيمتر مكعب\nالسعة: مقدار السائل الذي يمكن للوعاء احتواؤه\nوحدة السعة: لتر، ملليلتر",
        visualElements: [
          { type: "cube", content: "مكعب يوضح الأبعاد الثلاثة: الطول والعرض والارتفاع" },
          { type: "container", content: "وعاء يوضح السعة والسائل" },
          { type: "graduated", content: "أسطوانة مدرجة لقياس الحجم" }
        ],
        stepByStepExamples: [
          {
            title: "📦 صندوق الهدايا",
            steps: [
              "الخطوة 1: جمع البيانات\nالطول = 20 سم، العرض = 15 سم، الارتفاع = 10 سم",
              "الخطوة 2: تطبيق القانون\nالحجم = الطول × العرض × الارتفاع",
              "الخطوة 3: الحساب\nالحجم = 20 × 15 × 10 = 3000 سم مكعب"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["ما حجم مكعب طول ضلعه 3 سم؟", "كم لتر في 1000 ملليلتر؟"],
          medium: ["ما حجم صندوق أبعاده 5×4×3 سم؟", "إذا كان حجم صندوق 60 سم مكعب، وطوله 5 سم وعرضه 4 سم، فما ارتفاعه؟"],
          hard: ["صندوق حجمه 120 سم مكعب، طوله 6 سم وعرضه 5 سم. ما ارتفاعه؟", "كم زجاجة سعة 250 مل تحتاج لملء وعاء سعة 2 لتر؟"]
        }
      },
      {
        id: 10,
        title: "المسائل الكلامية",
        icon: "📝",
        historicalContext: "طور العرب المسلمون علم الجبر وحل المسائل الكلامية في القرن التاسع الميلادي، وكان الخوارزمي أول من وضع قواعد حل المسائل الرياضية.",
        explanation: "خطوات حل المسائل الكلامية:\n1. قراءة المسألة بعناية\n2. تحديد المعطيات والمطلوب\n3. اختيار العملية المناسبة\n4. تنفيذ الحل خطوة بخطوة\n5. التحقق من الإجابة",
        visualElements: [
          { type: "problem", content: "مسألة مكتوبة بالكلمات" },
          { type: "equation", content: "معادلة رياضية لحل المسألة" },
          { type: "solution", content: "الحل النهائي مع الخطوات" }
        ],
        stepByStepExamples: [
          {
            title: "🛒 التسوق المتعدد",
            steps: [
              "الخطوة 1: قراءة المسألة\nاشترى أحمد 3 أقلام و 2 دفاتر",
              "الخطوة 2: تحديد المعطيات\nسعر القلم = 5 ريالات، سعر الدفتر = 8 ريالات",
              "الخطوة 3: الحساب\nتكلفة الأقلام = 3 × 5 = 15 ريال\nتكلفة الدفاتر = 2 × 8 = 16 ريال\nالمجموع = 15 + 16 = 31 ريال"
            ]
          }
        ],
        practiceQuestions: {
          easy: ["اشترى سعد 4 أقلام بسعر 3 ريالات لكل قلم. كم دفع؟", "في الصف 25 طالباً، غاب 3 طلاب. كم طالب حضر؟"],
          medium: ["اشترت فاطمة 3 كيلو تفاح بسعر 8 ريالات للكيلو، و 2 كيلو برتقال بسعر 6 ريالات للكيلو. كم دفعت؟", "قطار يسير بسرعة 80 كم/ساعة. كم مسافة يقطع في 4 ساعات؟"],
          hard: ["في متجر، خصم 20% على كل قميص. إذا كان سعر القميص 60 ريال، فكم سعره بعد الخصم؟", "اشترى أحمد سيارة بـ 50000 ريال، ودفع 30% نقداً والباقي أقساط على 24 شهر. كم قيمة كل قسط؟"]
        }
      }
    ]

  const getVisualIcon = (type) => {
    const icons = {
      'number-line': '📏', 'temperature': '🌡️', 'elevation': '🏔️',
      'operations': '🔢', 'order': '📋', 'calculator': '🧮',
      'pie-chart': '📊', 'fraction-bar': '📏', 'pizza': '🍕',
      'scale': '⚖️', 'recipe': '🍳', 'map': '🗺️',
      'speedometer': '🚗', 'clock': '🕐', 'road': '🛣️',
      'protractor': '📐', 'triangle': '🔺', 'shapes': '🔷',
      'pattern': '🎨', 'building': '🏗️', 'ruler': '📏',
      'grid': '📋', 'field': '🌾', 'cube': '🧊',
      'container': '🥤', 'graduated': '🧪', 'problem': '📝',
      'equation': '🧮', 'solution': '✅'
    }
    return icons[type] || '📊'
  }

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
          >
            🏠 الرئيسية
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-800">دليل الرياضيات الشامل</h1>
            <p className="text-sm text-gray-600">جميع المواضيع في مكان واحد</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/quiz/1')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              🎯 الاختبار
            </button>
          </div>
        </div>

        {/* Main Presentation */}
        <div className="space-y-8">
          
          {topics.map((topic, index) => (
            <div key={topic.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                <div className="text-5xl mb-3">{topic.icon}</div>
                <h2 className="text-2xl font-black mb-2">{topic.title}</h2>
                <div className="text-sm opacity-90">الموضوع {index + 1} من {topics.length}</div>
              </div>

              <div className="p-6">
                
                {/* Historical Context */}
                <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-l-4 border-amber-400">
                  <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
                    📜 <span>لمحة تاريخية</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{topic.historicalContext}</p>
                </div>

                {/* Visual Elements */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    👁️ <span>التمثيل البصري</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topic.visualElements.map((element, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                        <div className="text-2xl mb-2">{getVisualIcon(element.type)}</div>
                        <p className="text-sm text-gray-700">{element.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    📚 <span>الشرح المفصل</span>
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {topic.explanation}
                  </div>
                </div>

                {/* Step-by-Step Examples */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    💡 <span>أمثلة خطوة بخطوة</span>
                  </h3>
                  <div className="space-y-4">
                    {topic.stepByStepExamples.map((example, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-400">
                        <h4 className="text-lg font-bold text-green-800 mb-3">{example.title}</h4>
                        <div className="space-y-3">
                          {example.steps.map((step, stepIdx) => (
                            <div key={stepIdx} className="bg-white/70 p-3 rounded-lg border-r-2 border-green-300">
                              <div className="flex items-start gap-3">
                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-fit">
                                  {stepIdx + 1}
                                </span>
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                  {step}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Components */}
                {topic.id === 1 && (
                  <div className="mb-6">
                    <NumberLine />
                  </div>
                )}

                {/* Practice Questions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                    🎯 <span>أسئلة التدريب</span>
                  </h3>
                  
                  {/* Easy Questions */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-green-600 mb-2 flex items-center gap-2">
                      🟢 <span>سهل</span>
                    </h4>
                    <div className="space-y-2">
                      {topic.practiceQuestions.easy.map((question, idx) => (
                        <div key={idx} className="bg-white/70 p-3 rounded-lg border border-green-200">
                          <p className="text-gray-700 text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medium Questions */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-yellow-600 mb-2 flex items-center gap-2">
                      🟡 <span>متوسط</span>
                    </h4>
                    <div className="space-y-2">
                      {topic.practiceQuestions.medium.map((question, idx) => (
                        <div key={idx} className="bg-white/70 p-3 rounded-lg border border-yellow-200">
                          <p className="text-gray-700 text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hard Questions */}
                  <div>
                    <h4 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                      🔴 <span>صعب</span>
                    </h4>
                    <div className="space-y-2">
                      {topic.practiceQuestions.hard.map((question, idx) => (
                        <div key={idx} className="bg-white/70 p-3 rounded-lg border border-red-200">
                          <p className="text-gray-700 text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 تهانينا! أكملت الدليل الشامل</h2>
          <p className="text-gray-600 mb-6">الآن يمكنك اختبار فهمك من خلال الاختبارات التفاعلية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/quiz/1')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              🎯 ابدأ الاختبار
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              🏠 العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompleteMathPresentation
