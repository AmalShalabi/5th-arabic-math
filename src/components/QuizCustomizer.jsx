import { useState } from 'react'
import lessonsData from '../data/lessons.json'

function QuizCustomizer({ onSave, initialSettings = {} }) {
  const [settings, setSettings] = useState({
    gameMode: initialSettings.gameMode || 'classic',
    timePerQuestion: initialSettings.timePerQuestion || 30,
    selectedLesson: initialSettings.selectedLesson || 1,
    questionCount: initialSettings.questionCount || 5,
    showLeaderboard: initialSettings.showLeaderboard !== false,
    allowMultipleAttempts: initialSettings.allowMultipleAttempts || false,
    difficulty: initialSettings.difficulty || 'mixed',
    ...initialSettings
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    onSave(settings)
  }

  const getGameModeDescription = (mode) => {
    const descriptions = {
      classic: 'لعبة كلاسيكية - وقت محدد لكل سؤال',
      speed: 'لعبة السرعة - وقت قصير وتركيز على السرعة',
      team: 'لعبة جماعية - فرق تتنافس مع بعضها',
      survival: 'لعبة البقاء - خطأ واحد ينتهي اللعبة'
    }
    return descriptions[mode] || descriptions.classic
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">⚙️ إعدادات اللعبة</h3>
      
      <div className="space-y-6">
        {/* Game Mode */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            🎮 نوع اللعبة
          </label>
          <select
            value={settings.gameMode}
            onChange={(e) => handleSettingChange('gameMode', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          >
            <option value="classic">كلاسيكية</option>
            <option value="speed">سرعة</option>
            <option value="team">جماعية</option>
            <option value="survival">بقاء</option>
          </select>
          <p className="text-sm text-gray-600 mt-2">
            {getGameModeDescription(settings.gameMode)}
          </p>
        </div>

        {/* Lesson Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            📚 اختر الدرس
          </label>
          <select
            value={settings.selectedLesson}
            onChange={(e) => handleSettingChange('selectedLesson', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          >
            {lessonsData.lessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>

        {/* Time Per Question */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            ⏱️ الوقت لكل سؤال (ثانية)
          </label>
          <input
            type="range"
            min="10"
            max="60"
            value={settings.timePerQuestion}
            onChange={(e) => handleSettingChange('timePerQuestion', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>10 ثانية</span>
            <span className="font-bold text-primary">
              <span className="number-ltr">{settings.timePerQuestion}</span> ثانية
            </span>
            <span>60 ثانية</span>
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            ❓ عدد الأسئلة
          </label>
          <select
            value={settings.questionCount}
            onChange={(e) => handleSettingChange('questionCount', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          >
            <option value={3}>3 أسئلة</option>
            <option value={5}>5 أسئلة</option>
            <option value={10}>10 أسئلة</option>
            <option value={15}>15 سؤال</option>
            <option value={20}>20 سؤال</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            🎯 مستوى الصعوبة
          </label>
          <select
            value={settings.difficulty}
            onChange={(e) => handleSettingChange('difficulty', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          >
            <option value="easy">سهل</option>
            <option value="medium">متوسط</option>
            <option value="hard">صعب</option>
            <option value="mixed">مختلط</option>
          </select>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">🔧 خيارات إضافية</h4>
          
          <div className="flex items-center justify-between">
            <label className="text-gray-700">عرض لوحة المتصدرين</label>
            <input
              type="checkbox"
              checked={settings.showLeaderboard}
              onChange={(e) => handleSettingChange('showLeaderboard', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">السماح بمحاولات متعددة</label>
            <input
              type="checkbox"
              checked={settings.allowMultipleAttempts}
              onChange={(e) => handleSettingChange('allowMultipleAttempts', e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          💾 حفظ الإعدادات
        </button>
      </div>
    </div>
  )
}

export default QuizCustomizer
