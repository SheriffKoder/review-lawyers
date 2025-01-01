"use client"
import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton 
        onClick={() => setIsOpen(true)} 
        isOpen={isOpen}
      />
      <ChatWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}