import { useState } from 'react'
import soundManager from '../utils/soundEffects'

function SoundTest() {
  const [isVisible, setIsVisible] = useState(false)

  const testSounds = [
    { name: 'Correct Answer', sound: 'correct', emoji: '✅' },
    { name: 'Incorrect Answer', sound: 'incorrect', emoji: '❌' },
    { name: 'Click Sound', sound: 'click', emoji: '👆' },
    { name: 'Success Sound', sound: 'success', emoji: '🎉' }
  ]

  const playTestSound = (soundType) => {
    console.log(`Testing sound: ${soundType}`)
    soundManager.play(soundType)
  }

  const toggleSound = () => {
    soundManager.setEnabled(!soundManager.isEnabled())
    console.log('Sound enabled:', soundManager.isEnabled())
  }

  const adjustVolume = (volume) => {
    soundManager.setVolume(volume / 100)
    console.log('Volume set to:', volume + '%')
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Test Sounds"
      >
        🔊
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border z-50 max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800">Sound Test</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        {testSounds.map((test, index) => (
          <button
            key={index}
            onClick={() => playTestSound(test.sound)}
            className="w-full flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <span className="text-lg">{test.emoji}</span>
            <span className="text-sm font-medium">{test.name}</span>
          </button>
        ))}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">Volume:</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              onChange={(e) => adjustVolume(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <button
            onClick={toggleSound}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            {soundManager.isEnabled() ? '🔇 Disable Sounds' : '🔊 Enable Sounds'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SoundTest
