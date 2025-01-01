// @ts-nocheck
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/utils/cn';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

export function VoiceInput({ onVoiceInput }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onVoiceInput(text);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={cn(
        "p-2 rounded-xl",
        "transition-all duration-200",
        isListening ? [
          "bg-red-500/20 text-red-500",
          "animate-pulse"
        ] : [
          "bg-white/5 text-gray-400",
          "hover:bg-white/10 hover:text-white"
        ]
      )}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
}