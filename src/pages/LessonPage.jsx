import { useParams, Link, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'
import NumberLine from '../components/NumberLine'
import jsPDF from 'jspdf'

function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))

  const generateFractionPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4')
    
    // Set font for Arabic (using a basic approach)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(20)
    
    // Title
    doc.text('كراسة تمارين الكسور العادية - الصف الخامس', 105, 20, { align: 'center' })
    
    doc.setFontSize(14)
    let yPos = 40
    
    // Add content
    const content = [
      '📚 المفاهيم الأساسية:',
      '• الكسر العادي يتكون من بسط ومقام',
      '• البسط: عدد الأجزاء المأخوذة',  
      '• المقام: عدد الأجزاء الكلية',
      '',
      '🎨 التمرين الأول: تلوين الكسور',
      '1. لوّن 1/2 (نصف) الدائرة',
      '2. لوّن 3/4 (ثلاثة أرباع) المربعات', 
      '3. لوّن 2/3 (ثلثين) المثلثات',
      '',
      '✍️ التمرين الثاني: كتابة الكسور',
      '4. قسمت تفاحة إلى 8 قطع وأكلت 3 قطع. ما الكسر؟',
      '5. في الصف 20 طالباً، 12 منهم بنات. ما نسبة البنات؟',
      '6. شرب سامر 3 أكواب من 5 أكواب عصير. ما شربه؟',
      '',
      '🔢 التمرين الثالث: العمليات على الكسور',
      '7. 1/4 + 1/4 = ؟',
      '8. 3/5 - 1/5 = ؟', 
      '9. 1/2 + 1/3 = ؟',
      '10. 5/6 - 1/3 = ؟',
      '',
      '📖 التمرين الرابع: مسائل كلامية',
      '11. أكل أحمد 1/3 قطعة حلوى، وأكل محمد 1/4 قطعة. من أكل أكثر؟',
      '12. قرأت فاطمة 3/4 كتاب في الأسبوع الأول، و1/8 في الثاني. كم المجموع؟',
      '13. كان مع سارة كعكة. أعطت 2/5 لأختها، و1/4 لأمها. كم بقي؟',
      '14. في بستان، 1/3 الأشجار ليمون، 1/4 برتقال، والباقي تفاح. ما نسبة التفاح؟',
      '',
      '🎯 التمرين الخامس: المقارنة والترتيب',
      '15. أي كسر أكبر: 3/4 أم 2/3؟',
      '16. رتب الكسور تصاعدياً: 1/2، 1/3، 2/3',
      '17. أكمل الناقص: □/8 + 3/8 = 7/8'
    ]
    
    content.forEach((line) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      
      if (line.includes('التمرين')) {
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
      } else if (line.includes('المفاهيم')) {
        doc.setFontSize(16) 
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
      }
      
      doc.text(line, 20, yPos)
      yPos += line === '' ? 5 : 8
    })
    
    // Add answers page
    doc.addPage()
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('📋 ورقة الإجابات', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    yPos = 40
    
    const answers = [
      '4. 3/8',
      '5. 12/20 = 3/5', 
      '6. 3/5',
      '7. 2/4 = 1/2',
      '8. 2/5',
      '9. 5/6',
      '10. 1/2',
      '11. أحمد',
      '12. 7/8',
      '13. 7/20',
      '14. 5/12',
      '15. 3/4',
      '16. 1/3، 1/2، 2/3',
      '17. 4'
    ]
    
    answers.forEach((answer) => {
      doc.text(answer, 20, yPos)
      yPos += 10
    })
    
    // Save the PDF
    doc.save('كراسة-تمارين-الكسور-الصف-الخامس.pdf')
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-2xl text-red-500 mb-4">❌ الدرس غير موجود</p>
          <Link to="/" className="btn-primary">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto w-full">
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          الرئيسية
        </button>

        {/* Lesson Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-4 border-primary px-2">
            <div className="text-3xl sm:text-5xl md:text-6xl mb-4 transition-transform duration-300 hover:scale-110">{lesson.icon}</div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-800 mb-2 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">{lesson.description}</p>
          </div>

          {/* Explanation Section */}
          <div className="mb-6 sm:mb-8 bg-blue-50 p-4 sm:p-6 md:p-8 rounded-xl border-r-4 sm:border-r-8 border-primary">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <span>📚</span>
              الشرح
            </h2>
            <div className="text-sm sm:text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {lesson.content.explanation}
            </div>
          </div>

          {/* Example Section */}
          <div className="mb-6 sm:mb-8 bg-yellow-50 p-4 sm:p-6 md:p-8 rounded-xl border-r-4 sm:border-r-8 border-secondary">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <span>💡</span>
              مثال عملي
            </h2>
            <div className="text-sm sm:text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {lesson.content.example}
            </div>
          </div>

          {/* Number Line - للدرس الأول فقط */}
          {lesson.id === 1 && <NumberLine />}

          {/* Download PDF for Lesson 3 - Fractions */}
          {lesson.id === 3 && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-emerald-300 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-emerald-700 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2 sm:gap-3">
                <span>📁</span>
                كراسة تمارين إضافية
                <span>📁</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 text-center px-2">
                حمّل كراسة تمارين شاملة تحتوي على أكثر من 17 تمرين متنوع على الكسور مع الحلول! 📚
              </p>
              <div className="text-center">
                <button
                  onClick={generateFractionPDF}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-lg md:text-xl mr-3"
                >
                  <span>📥</span>
                  <span className="whitespace-nowrap">تحميل PDF</span>
                  <span>📄</span>
                </button>
                <a
                  href="/fraction-workbook.html"
                  target="_blank"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-lg md:text-xl"
                >
                  <span>📖</span>
                  <span className="whitespace-nowrap">عرض في المتصفح</span>
                  <span>🌐</span>
                </a>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  💡 اضغط "تحميل PDF" لتحميل ملف PDF مباشرة، أو "عرض في المتصفح" للمشاهدة أولاً
                </p>
              </div>
            </div>
          )}

          {/* Interactive Games and Quiz Cards - Side by Side Layout for lessons with interactive content */}
          {[1, 2, 3, 4, 6, 7, 8].includes(lesson.id) ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Interactive Games Card */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-orange-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-orange-700 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2 sm:gap-3">
                  <span>🎮</span>
                  ألعاب تفاعلية
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 text-center px-2">
                  تعلّم بطريقة ممتعة! تفاعل مع التمارين والأنشطة التفاعلية 🎨
                </p>
                <div className="text-center">
                  <Link
                    to={`/interactive/${lesson.id}`}
                    className="btn-secondary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-lg md:text-xl w-full justify-center py-3 sm:py-4 px-2"
                  >
                    <span>🎨</span>
                    <span className="whitespace-nowrap">ابدأ الألعاب التفاعلية</span>
                    <span>🎨</span>
                  </Link>
                </div>
              </div>

              {/* Quiz Card */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-purple-300 hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-700 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2 sm:gap-3">
                  <span>🎯</span>
                  اختبر نفسك
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 text-center px-2">
                  الآن حان وقت تطبيق ما تعلمته! اختبر مهاراتك واجمع النجوم ⭐
                </p>
                <div className="text-center">
                  <Link
                    to={`/quiz/${lesson.id}`}
                    className="btn-secondary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-lg md:text-xl w-full justify-center py-3 sm:py-4 px-2"
                  >
                    <span>🚀</span>
                    <span className="whitespace-nowrap">ابدأ الاختبار</span>
                    <span>🚀</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Default Practice Section for lessons without interactive content */
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-purple-300">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-700 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2 sm:gap-3">
                <span>🎯</span>
                هل أنت جاهز للاختبار؟
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 text-center px-2">
                الآن حان وقت تطبيق ما تعلمته! اختبر مهاراتك واجمع النجوم ⭐
              </p>
              <div className="text-center">
                <Link
                  to={`/quiz/${lesson.id}`}
                  className="btn-secondary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-lg md:text-xl py-3 px-4 sm:px-6"
                >
                  <span>🚀</span>
                  ابدأ الاختبار
                  <span>🚀</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonPage

