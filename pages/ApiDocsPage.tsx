import React from 'react';
import { FileText, Code, Key, Lock, Zap } from 'lucide-react';
import { QuickLinks } from '@/components/docs/QuickLinks';

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/reviews',
      description: 'List all reviews',
      authentication: 'Bearer Token'
    },
    {
      method: 'POST',
      path: '/api/v1/reviews/analyze',
      description: 'Analyze review content',
      authentication: 'Bearer Token'
    },
    {
      method: 'POST',
      path: '/api/v1/reviews/report',
      description: 'Report a review',
      authentication: 'Bearer Token'
    }
  ];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">API Documentation</h1>
              <p className="text-xl text-gray-400">
                Integrate our review management platform into your applications
              </p>
            </div>

            {/* Authentication */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-primary" />
                Authentication
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <p className="text-gray-300 mb-4">
                  All API requests require authentication using a Bearer token. You can generate an API key from your dashboard.
                </p>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-400">Authorization: Bearer YOUR_API_KEY</p>
                </div>
              </div>
            </div>

            {/* Endpoints */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                Endpoints
              </h2>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-mono text-sm">
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-white">{endpoint.path}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{endpoint.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Lock className="w-4 h-4" />
                      Authentication: {endpoint.authentication}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rate Limits */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Rate Limits
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <p className="text-gray-300">
                  API rate limits vary by plan:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Starter: 100 requests/minute
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Professional: 500 requests/minute
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Enterprise: Unlimited requests
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 sticky top-24">
            <QuickLinks />
          </div>
        </div>
      </div>
    </main>
  );
}