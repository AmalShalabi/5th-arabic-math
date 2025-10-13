function NumberLine() {
  // الأعداد من -10 إلى +10
  const numbers = Array.from({ length: 21 }, (_, i) => i - 10);
  
  // النقاط المميزة
  const highlightedPoints = [-8, -3, 0, 4, 9];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-4 border-primary mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📏 مستقيم الأعداد
      </h3>
      
      {/* محور الأعداد */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg overflow-x-auto">
        {/* الخط الرئيسي */}
        <div className="relative h-20 mb-8">
          {/* خط المحور */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-1/2"></div>
          
          {/* السهم الأيسر (الأعداد السالبة) */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-red-500">
                <path d="M15 10 L5 10 M5 10 L9 6 M5 10 L9 14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-xs text-red-600 font-bold mr-1">سالب</span>
            </div>
          </div>
          
          {/* السهم الأيمن (الأعداد الموجبة) */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <div className="flex items-center">
              <span className="text-xs text-blue-600 font-bold ml-1">موجب</span>
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
                <path d="M5 10 L15 10 M15 10 L11 6 M15 10 L11 14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* النقاط والأرقام */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
            {numbers.map((num) => {
              const isHighlighted = highlightedPoints.includes(num);
              const isZero = num === 0;
              const isPositive = num > 0;
              const isNegative = num < 0;
              
              return (
                <div key={num} className="flex flex-col items-center">
                  {/* النقطة */}
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isZero
                        ? 'bg-green-500 w-4 h-4'
                        : isHighlighted
                        ? isPositive
                          ? 'bg-blue-600 w-4 h-4'
                          : 'bg-red-600 w-4 h-4'
                        : 'bg-gray-300'
                    } shadow-lg transition-all duration-300 hover:scale-150`}
                  ></div>
                  
                  {/* الرقم */}
                  {(num % 2 === 0 || isHighlighted) && (
                    <span
                      className={`text-xs mt-2 font-bold ${
                        isZero
                          ? 'text-green-700 text-base'
                          : isPositive
                          ? 'text-blue-600'
                          : 'text-red-600'
                      }`}
                    >
                      {num > 0 ? `+${num}` : num}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* النقاط المميزة - شرح */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
          {highlightedPoints.map((point) => (
            <div
              key={point}
              className={`p-3 rounded-lg text-center ${
                point === 0
                  ? 'bg-green-100 border-2 border-green-500'
                  : point > 0
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-red-100 border-2 border-red-500'
              }`}
            >
              <div
                className={`text-2xl font-black ${
                  point === 0
                    ? 'text-green-700'
                    : point > 0
                    ? 'text-blue-700'
                    : 'text-red-700'
                }`}
              >
                {point > 0 ? `+${point}` : point}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {point === 0 ? 'الصفر' : point > 0 ? 'موجب' : 'سالب'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الملاحظة الأسفل */}
      <div className="mt-6 bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-lg">
        <p className="text-lg text-gray-800 font-semibold text-center">
          💡 ملاحظة: الأعداد الموجبة تقع يمين الصفر، والسالبة تقع يساره
        </p>
        <p className="text-sm text-gray-600 text-center mt-2">
          🔵 الأعداد الزرقاء = موجبة | 🔴 الأعداد الحمراء = سالبة | 🟢 الصفر = لا موجب ولا سالب
        </p>
      </div>
    </div>
  );
}

export default NumberLine;

