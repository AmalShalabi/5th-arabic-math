// Generate lightweight sound effects using Web Audio API
// This creates simple, short sound effects without external files

let audioContext = null
let isAudioInitialized = false

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      isAudioInitialized = true
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
      return false
    }
  }
  
  // Resume audio context if suspended (required by some browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  
  return true
}

export const generateSoundEffect = (type, duration = 0.2) => {
  // Initialize audio context if needed
  if (!initAudioContext()) {
    console.warn('Audio context initialization failed')
    return
  }
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Connect nodes
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Configure sound based on type
    switch (type) {
      case 'correct':
        // Gentle, uplifting sound - soft bell-like tone
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.15) // G5
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime) // Softer volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
        duration = 0.4
        break
        
      case 'incorrect':
        // Gentle, soft tone - not harsh or discouraging
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
        oscillator.frequency.exponentialRampToValueAtTime(392, audioContext.currentTime + 0.2) // G4
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime) // Softer volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        duration = 0.3
        break
        
      case 'click':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime) // Increased volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        duration = 0.1
        break
        
      case 'success':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime) // Increased volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        duration = 0.3
        break
        
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime) // Increased volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    }
    
    // Play the sound
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
    
  } catch (error) {
    console.warn(`Error generating sound effect: ${type}`, error)
  }
}

// Simple sound effects using Web Audio API
export const soundEffects = {
  correct: () => generateSoundEffect('correct', 0.2),
  incorrect: () => generateSoundEffect('incorrect', 0.3),
  click: () => generateSoundEffect('click', 0.1),
  success: () => generateSoundEffect('success', 0.3)
}
