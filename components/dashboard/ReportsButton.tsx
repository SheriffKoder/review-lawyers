import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { ReportsModal } from './reports/ReportsModal';
import { cn } from '@/utils/cn';

export function ReportsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        className={cn(
          "group relative overflow-hidden",
          "hover:shadow-lg hover:shadow-primary/20"
        )}
      >
        <FileDown className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
        Generate Report
      </Button>

      <ReportsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}