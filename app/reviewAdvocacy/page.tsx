"use client"
import React from 'react';
import { Shield, Scale, FileText, Brain } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { redirect, useNavigate } from 'react-router-dom';
import { ProcessSteps } from '@/components/services/advocacy/ProcessSteps';
import { AdvocacyFeatures } from '@/components/services/advocacy/AdvocacyFeatures';
import { SuccessMetrics } from '@/components/services/advocacy/SuccessMetrics';

export default function ReviewAdvocacyPage() {
  // const navigate = useNavigate();

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional Review Advocacy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Expert representation to protect your business reputation through AI-powered review defense
          </p>
          <Button onClick={() => redirect('/free-trial')}>
            Start Free Trial
          </Button>
        </div>

        {/* Success Metrics */}
        <SuccessMetrics className="mb-24" />

        {/* Process Steps */}
        <ProcessSteps className="mb-24" />

        {/* Features Grid */}
        <AdvocacyFeatures />
      </div>
    </main>
  );
}