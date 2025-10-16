import { useState } from 'react'

function QuestionEditor({ onSave, onCancel, initialQuestion = null }) {
  const [question, setQuestion] = useState({
    id: initialQuestion?.id || Date.now(),
    question: initialQuestion?.question || '',
    options: initialQuestion?.options || ['', '', '', ''],
    correct: initialQuestion?.correct || 0,
    explanation: initialQuestion?.explanation || '',
    difficulty: initialQuestion?.difficulty || 'medium',
    category: initialQuestion?.category || 'arithmetic',
    timeLimit: initialQuestion?.timeLimit || 30,
    points: initialQuestion?.points || 100
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setQuestion(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options]
    newOptions[index] = value
    setQuestion(prev => ({
      ...prev,
      options: newOptions
    }))
  }

  const validateQuestion = () => {
    const newErrors = {}
    
    if (!question.question.trim()) {
      newErrors.question = 'السؤال مطلوب'
    }
    
    if (question.options.filter(opt => opt.trim()).length < 2) {
      newErrors.options = 'يجب أن يكون هناك خياران على الأقل'
    }
    
    if (question.options[question.correct]?.trim() === '') {
      newErrors.correct = 'يجب تحديد الإجابة الصحيحة'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateQuestion()) {
      // Filter out empty options
      const filteredOptions = question.options.filter(opt => opt.trim())
      const adjustedCorrect = Math.min(question.correct, filteredOptions.length - 1)
      
      onSave({
        ...question,
        options: filteredOptions,
        correct: adjustedCorrect
      })
    }
  }

  const addOption = () => {
    if (question.options.length < 6) {
      setQuestion(prev => ({
        ...prev,
        options: [...prev.options, '']
      }))
    }
  }

  const removeOption = (index) => {
    if (question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== index)
      setQuestion(prev => ({
        ...prev,
        options: newOptions,
        correct: Math.min(prev.correct, newOptions.length - 1)
      }))
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {initialQuestion ? '✏️ تعديل السؤال' : '➕ إضافة سؤال جديد'}
      </h3>
      
      <div className="space-y-6">
        {/* Question Text */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            📝 نص السؤال
          </label>
          <textarea
            value={question.question}
            onChange={(e) => handleInputChange('question', e.target.value)}
            className={`w-full p-4 border-2 rounded-lg focus:outline-none ${
              errors.question ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
            rows={3}
            placeholder="اكتب السؤال هنا..."
            dir="rtl"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">{errors.question}</p>
          )}
        </div>

        {/* Options */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            🔤 خيارات الإجابة
          </label>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correct"
                  checked={question.correct === index}
                  onChange={() => handleInputChange('correct', index)}
                  className="w-5 h-5 text-primary"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={`flex-1 p-3 border-2 rounded-lg focus:outline-none ${
                    question.correct === index ? 'border-green-500 bg-green-50' : 'border-gray-300 focus:border-primary'
                  }`}
                  placeholder={`الخيار ${index + 1}...`}
                  dir="rtl"
                />
                {question.options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.options && (
            <p className="text-red-500 text-sm mt-1">{errors.options}</p>
          )}
          {errors.correct && (
            <p className="text-red-500 text-sm mt-1">{errors.correct}</p>
          )}
          
          {question.options.length < 6 && (
            <button
              onClick={addOption}
              className="mt-3 text-primary hover:text-blue-600 font-semibold"
            >
              ➕ إضافة خيار جديد
            </button>
          )}
        </div>

        {/* Explanation */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            💡 شرح الإجابة
          </label>
          <textarea
            value={question.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            rows={2}
            placeholder="اكتب شرح الإجابة الصحيحة..."
            dir="rtl"
          />
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🎯 الصعوبة
            </label>
            <select
              value={question.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="easy">سهل</option>
              <option value="medium">متوسط</option>
              <option value="hard">صعب</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📚 التصنيف
            </label>
            <select
              value={question.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="arithmetic">حساب</option>
              <option value="geometry">هندسة</option>
              <option value="fractions">كسور</option>
              <option value="measurement">قياسات</option>
            </select>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⏱️ الوقت (ثانية)
            </label>
            <input
              type="number"
              min="10"
              max="120"
              value={question.timeLimit}
              onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏆 النقاط
            </label>
            <input
              type="number"
              min="50"
              max="500"
              step="50"
              value={question.points}
              onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-3">👁️ معاينة السؤال</h4>
          <div className="space-y-3">
            <p className="font-semibold text-gray-800">{question.question || 'نص السؤال...'}</p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    question.correct === index ? 'bg-green-100 border-2 border-green-300' : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className="font-medium">
                    {option || `الخيار ${index + 1}...`}
                  </span>
                  {question.correct === index && (
                    <span className="text-green-600 font-bold mr-2">✅</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            {initialQuestion ? '💾 حفظ التعديلات' : '➕ إضافة السؤال'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionEditor
