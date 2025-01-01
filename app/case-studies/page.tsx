"use client"
import React from 'react';
import { FileText } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CaseStudyCard } from '@/components/cases/CaseStudyCard';
import { caseStudies } from '@/data/caseStudies';
import { redirect } from 'next/navigation';

export default function CasesPage() {
//   const navigate = useNavigate();

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <div className="group">
            <FileText className="h-16 w-16 text-primary mb-6 transform transition-transform group-hover:scale-110" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Case Studies
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Real success stories of businesses we've helped protect and improve.
            </p>
          </div>
          <Button 
            onClick={() => redirect('/free-trial')}
            className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Start Free Trial
          </Button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onClick={() => redirect(`/case-studies/${study.id}`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}