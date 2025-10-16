import QRCode from 'qrcode.react'

function QRCodeGenerator({ gameId, className = "" }) {
  // Create the URL that students will scan
  const gameUrl = `${window.location.origin}/join/${gameId}`
  
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg text-center ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4">📱 انضم إلى اللعبة</h3>
      
      <div className="mb-4">
        <QRCode 
          value={gameUrl}
          size={200}
          level="M"
          includeMargin={true}
          renderAs="svg"
        />
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600 mb-2">رقم اللعبة:</p>
        <p className="text-2xl font-bold text-primary">{gameId}</p>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        اطلب من الطلاب مسح الكود أو الدخول على الرابط:
      </p>
      
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-800 break-all">
          {gameUrl}
        </p>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>📱 يمسح الطالب الكود بالهاتف</p>
        <p>✍️ يدخل اسمه</p>
        <p>🎮 يبدأ اللعب!</p>
      </div>
    </div>
  )
}

export default QRCodeGenerator
