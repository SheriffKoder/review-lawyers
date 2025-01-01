"use client"
import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { caseStudies } from '@/data/caseStudies';
import { redirect, useParams } from 'next/navigation';

export default function CaseStudyDetail() {
  const params = useParams();
//   console.log(params?.id);
//   const navigate = useNavigate();
  const study = caseStudies.find(s => s.id === params?.id);

  if (!study) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Case Study Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="secondary"
          onClick={() => redirect('/case-studies')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Case Studies
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{study.title}</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {study.business}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {study.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <MetricCard
                icon={Star}
                label="Rating Improved"
                value={`+${study.metrics.ratingImprovement}`}
              />
              <MetricCard
                icon={MessageSquare}
                label="Reviews Removed"
                value={study.metrics.reviewsRemoved}
              />
              <MetricCard
                icon={TrendingUp}
                label="Response Rate"
                value={`${study.metrics.responseRate}%`}
              />
            </div>

            <div className="space-y-6">
              <Section title="Challenge">
                <p className="text-gray-300">{study.challenge}</p>
              </Section>

              <Section title="Solution">
                <p className="text-gray-300">{study.solution}</p>
              </Section>

              <Section title="Result">
                <p className="text-gray-300">{study.result}</p>
              </Section>

              <Section title="Key Takeaways">
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {study.takeaways.map((takeaway, index) => (
                    <li key={index}>{takeaway}</li>
                  ))}
                </ul>
              </Section>
            </div>

            <Button onClick={() => redirect('/free-trial')} className="w-full">
              Start Your Success Story
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
    </div>
  );
}