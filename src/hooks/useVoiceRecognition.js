import { useState, useCallback } from 'react'

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)

  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const startListening = useCallback((onResult, onEnd) => {
    if (!isSupported) {
      setError('Voice input not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event) => {
      let final = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript
        } else {
          interim += event.results[i][0].transcript
        }
      }
      const text = final || interim
      setTranscript(text)
      if (final && onResult) onResult(final)
    }

    recognition.onerror = (event) => {
      setError(event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      if (onEnd) onEnd()
    }

    recognition.start()
    return recognition
  }, [isSupported])

  const stopListening = useCallback((recognition) => {
    if (recognition) recognition.stop()
    setIsListening(false)
  }, [])

  return { isListening, transcript, error, isSupported, startListening, stopListening, setTranscript }
}
