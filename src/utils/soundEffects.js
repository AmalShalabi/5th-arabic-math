// Sound Effects Utility for Quiz Interactions
// Lightweight and customizable sound system

import { soundEffects as generatedSounds } from './generateSounds.js'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.volume = 0.5 // Increased default volume (50%)
    this.useGeneratedSounds = true // Use Web Audio API sounds by default
    this.htmlAudioFallback = true // Enable HTML5 audio fallback
    this.loadSounds()
  }

  // Load sound files (with fallback to generated sounds)
  loadSounds() {
    const soundFiles = {
      correct: '/assets/sounds/correct.mp3',
      incorrect: '/assets/sounds/incorrect.mp3',
      click: '/assets/sounds/click.mp3',
      success: '/assets/sounds/success.mp3'
    }

    Object.entries(soundFiles).forEach(([key, path]) => {
      this.sounds[key] = new Audio(path)
      this.sounds[key].volume = this.volume
      this.sounds[key].preload = 'auto'
      
      // Handle loading errors gracefully
      this.sounds[key].onerror = () => {
        console.warn(`Failed to load sound file: ${key}, will use generated sound`)
        this.useGeneratedSounds = true
      }
    })
  }

  // Create simple HTML5 audio fallback
  createSimpleAudio(type) {
    if (!this.htmlAudioFallback) return null
    
    const frequencies = {
      correct: [523, 659, 784], // Gentle C-E-G chord (same as success but softer)
      incorrect: [440, 392], // Soft A-G descending tone
      click: [1000],
      success: [523, 659, 784] // C-E-G chord
    }
    
    const freqs = frequencies[type] || [440]
    let duration = 0.2
    if (type === 'click') duration = 0.1
    else if (type === 'correct') duration = 0.4
    else if (type === 'incorrect') duration = 0.3
    
    // Create a simple beep using data URI
    const sampleRate = 44100
    const length = sampleRate * duration
    const buffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(buffer)
    
    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }
    
    writeString(0, 'RIFF')
    view.setUint32(4, 36 + length * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length * 2, true)
    
    // Generate audio data with softer volume
    const volume = type === 'correct' || type === 'incorrect' ? 0.2 : 0.3
    for (let i = 0; i < length; i++) {
      let sample = 0
      freqs.forEach(freq => {
        sample += Math.sin(2 * Math.PI * freq * i / sampleRate) * volume
      })
      sample = Math.max(-1, Math.min(1, sample))
      view.setInt16(44 + i * 2, sample * 0x7FFF, true)
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' })
    return URL.createObjectURL(blob)
  }

  // Play a sound effect
  play(soundName) {
    if (!this.enabled) {
      return
    }

    // Try HTML5 audio fallback first (most reliable)
    if (this.htmlAudioFallback) {
      try {
        const audioUrl = this.createSimpleAudio(soundName)
        if (audioUrl) {
          const audio = new Audio(audioUrl)
          audio.volume = this.volume
          audio.play().catch(error => {
            console.warn(`HTML5 audio failed for ${soundName}:`, error)
            // Try generated sounds as fallback
            if (generatedSounds[soundName]) {
              generatedSounds[soundName]()
            }
          })
          // Clean up the blob URL after a delay
          setTimeout(() => URL.revokeObjectURL(audioUrl), 1000)
          return
        }
      } catch (error) {
        console.warn(`HTML5 audio creation failed for ${soundName}:`, error)
      }
    }

    // Try to use generated sounds (Web Audio API)
    if (this.useGeneratedSounds && generatedSounds[soundName]) {
      try {
        generatedSounds[soundName]()
        return
      } catch (error) {
        console.warn(`Failed to play generated sound: ${soundName}`, error)
      }
    }

    // Fallback to audio files
    if (this.sounds[soundName]) {
      try {
        // Reset audio to beginning and play
        this.sounds[soundName].currentTime = 0
        this.sounds[soundName].play().catch(error => {
          console.warn(`Failed to play sound file: ${soundName}`, error)
        })
      } catch (error) {
        console.warn(`Error playing sound: ${soundName}`, error)
      }
    }
  }

  // Play success sound (correct answer)
  playCorrect() {
    this.play('correct')
  }

  // Play error sound (incorrect answer)
  playIncorrect() {
    this.play('incorrect')
  }

  // Play click sound (button interactions)
  playClick() {
    this.play('click')
  }

  // Play success sound (general success)
  playSuccess() {
    this.play('success')
  }

  // Enable/disable sound effects
  setEnabled(enabled) {
    this.enabled = enabled
  }

  // Set volume (0.0 to 1.0)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume
    })
  }

  // Get current volume
  getVolume() {
    return this.volume
  }

  // Check if sound is enabled
  isEnabled() {
    return this.enabled
  }

  // Set whether to use generated sounds or audio files
  setUseGeneratedSounds(useGenerated) {
    this.useGeneratedSounds = useGenerated
  }

  // Get current sound generation preference
  getUseGeneratedSounds() {
    return this.useGeneratedSounds
  }
}

// Create global instance
const soundManager = new SoundManager()

// Export for use in components
export default soundManager

// Export class for custom instances if needed
export { SoundManager }
