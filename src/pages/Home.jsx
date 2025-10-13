import { Link } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function Home() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl">
            🎓 تعلّم الرياضيات مع جمانة
          </h1>
          <p className="text-3xl text-white font-semibold drop-shadow-lg">
            الصف الخامس الابتدائي
          </p>
          <div className="mt-6 text-2xl text-white">
            اختر موضوعاً لتبدأ رحلة التعلم! 🚀
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessonsData.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="lesson-card group animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {lesson.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {lesson.description}
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📖 ابدأ التعلم
                  </Link>
                  <Link
                    to={`/quiz/${lesson.id}`}
                    className="bg-secondary hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🎯 اختبر نفسك
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white text-xl">
          <p className="mb-2">✨ استمتع بالتعلم واجمع أكبر عدد من النجوم! ✨</p>
          <p>💪 كل إجابة صحيحة = نجمة جديدة!</p>
        </div>
      </div>
    </div>
  )
}

export default Home

