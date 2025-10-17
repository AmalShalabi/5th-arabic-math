import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import lessonsData from '../data/lessons.json'
import NumberLine from '../components/NumberLine'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessonsData.lessons.find(l => l.id === parseInt(id))
  const [generatingPDF, setGeneratingPDF] = useState(false)

  const generateFractionPDF = async () => {
    setGeneratingPDF(true)
    try {
      // Create a temporary iframe to load the HTML content
      const iframe = document.createElement('iframe')
      iframe.src = '/fraction-workbook.html'
      iframe.style.position = 'fixed'
      iframe.style.left = '-9999px'
      iframe.style.width = '794px' // A4 width in pixels (at 96 DPI)
      iframe.style.height = '1123px' // A4 height in pixels
      document.body.appendChild(iframe)

      // Wait for iframe to load
      await new Promise((resolve) => {
        iframe.onload = resolve
      })

      // Wait a bit more for content to render
      await new Promise(resolve => setTimeout(resolve, 1000))

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      const body = iframeDoc.body

      // Configure html2canvas options for better quality
      const canvas = await html2canvas(body, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: body.scrollHeight
      })

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content is longer
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Clean up
      document.body.removeChild(iframe)

      // Save the PDF
      pdf.save('كراسة-تمارين-الكسور-الصف-الخامس.pdf')
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('حدث خطأ في إنشاء ملف PDF. يرجى المحاولة مرة أخرى.')
    } finally {
      setGeneratingPDF(false)
    }
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
          className="mb-6 bg-white/90 backdrop-blur-sm text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm border-2 border-primary/20 hover:border-primary/40 relative z-50"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          الرئيسية
        </button>

        {/* Lesson Card */}
        <div className="card animate-fadeIn relative z-10">
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

          {/* Kahoot Quiz Button */}
          {lesson.kahootLink && (
            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8 rounded-xl border-2 sm:border-4 border-purple-300">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-700 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2 sm:gap-3">
                <span>🎮</span>
                اختبار تفاعلي
                <span>🎮</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 text-center px-2">
                العب اختبار كاهوت تفاعلي لاختبار فهمك لهذا الدرس مع أصدقائك! 🎯
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => window.open(lesson.kahootLink, '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
                >
                  <span>🎮</span>
                  العب اختبار كاهوت
                  <span className="text-xs sm:text-sm">↗️</span>
                </button>
              </div>
            </div>
          )}

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
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <button
                  onClick={generateFractionPDF}
                  disabled={generatingPDF}
                  className={`w-full sm:w-auto font-bold py-4 px-8 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-2xl inline-flex items-center justify-center gap-3 text-lg min-w-0 ${
                    generatingPDF 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:scale-105'
                  } text-white`}
                >
                  {generatingPDF ? (
                    <>
                      <span className="animate-spin text-xl">⏳</span>
                      <span className="whitespace-nowrap font-bold">جاري إنشاء PDF...</span>
                      <span className="animate-pulse text-xl">📄</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">📥</span>
                      <span className="whitespace-nowrap font-bold">تحميل ملف PDF</span>
                      <span className="text-xl">💾</span>
                    </>
                  )}
                </button>
                
                <a
                  href="/fraction-workbook.html"
                  target="_blank"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl inline-flex items-center justify-center gap-3 text-lg min-w-0"
                >
                  <span className="text-xl">👁️</span>
                  <span className="whitespace-nowrap font-bold">معاينة الكراسة</span>
                  <span className="text-xl">🌐</span>
                </a>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border-r-4 border-blue-400">
                  💡 <strong>تحميل ملف PDF:</strong> تحميل مباشر للكراسة كملف PDF • <strong>معاينة الكراسة:</strong> عرض المحتوى في المتصفح أولاً
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

