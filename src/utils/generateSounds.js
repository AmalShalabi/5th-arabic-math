// Generate lightweight sound effects using Web Audio API
// This creates simple, short sound effects without external files

export const generateSoundEffect = (type, duration = 0.2) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  // Connect nodes
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // Configure sound based on type
  switch (type) {
    case 'correct':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + duration)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      break
      
    case 'incorrect':
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + duration)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      break
      
    case 'click':
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      duration = 0.1
      break
      
    case 'success':
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G5
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      duration = 0.3
      break
      
    default:
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  }
  
  // Play the sound
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
  
  // Clean up
  setTimeout(() => {
    audioContext.close()
  }, duration * 1000 + 100)
}

// Simple sound effects using Web Audio API
export const soundEffects = {
  correct: () => generateSoundEffect('correct', 0.2),
  incorrect: () => generateSoundEffect('incorrect', 0.3),
  click: () => generateSoundEffect('click', 0.1),
  success: () => generateSoundEffect('success', 0.3)
}
