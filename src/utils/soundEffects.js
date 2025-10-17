// Sound Effects Utility for Quiz Interactions
// Lightweight and customizable sound system

import { soundEffects as generatedSounds } from './generateSounds.js'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.volume = 0.3 // Default volume (30%)
    this.useGeneratedSounds = true // Use Web Audio API sounds by default
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

  // Play a sound effect
  play(soundName) {
    if (!this.enabled) {
      return
    }

    // Try to use generated sounds first (Web Audio API)
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
          // Try generated sound as final fallback
          if (generatedSounds[soundName]) {
            try {
              generatedSounds[soundName]()
            } catch (fallbackError) {
              console.warn(`All sound methods failed for: ${soundName}`)
            }
          }
        })
      } catch (error) {
        console.warn(`Error playing sound: ${soundName}`, error)
        // Try generated sound as final fallback
        if (generatedSounds[soundName]) {
          try {
            generatedSounds[soundName]()
          } catch (fallbackError) {
            console.warn(`All sound methods failed for: ${soundName}`)
          }
        }
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
