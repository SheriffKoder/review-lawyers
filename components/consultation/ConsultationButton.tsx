import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { ConsultationModal } from './ConsultationModal';
import { cn } from '@/utils/cn';

interface ConsultationButtonProps {
  className?: string;
}

export function ConsultationButton({ className }: ConsultationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        className={cn(
          "group relative overflow-hidden",
          "hover:shadow-lg hover:shadow-primary/20",
          className
        )}
      >
        <MessageSquare className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
        Schedule Consultation
      </Button>

      <ConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}