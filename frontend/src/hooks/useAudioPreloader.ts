import { useEffect } from 'react'

export function useAudioPreloader() {
  useEffect(() => {
    const audioFiles = [
      '/audio/matrix.mp3',
      '/audio/flow.mp3',
      '/audio/alarmsound.m4a'
    ]

    // Preload audio files by creating Audio objects and forcing a load
    // This ensures they are in the browser cache and ready to play instantly
    audioFiles.forEach(file => {
      const audio = new Audio(file)
      audio.preload = 'auto'
      audio.load()
      
      // Optional: fetch to ensure it's in disk cache if Audio() doesn't trigger it aggressively enough
      fetch(file).then(response => response.blob()).catch(() => {})
    })
  }, [])
}
