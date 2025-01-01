"use client"
import React, { useState } from 'react';
import { Link2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const INTEGRATIONS = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    description: 'Connect your Airbnb account to manage reviews',
    status: 'connected',
    lastSync: '2 hours ago'
  },
  {
    id: 'vrbo',
    name: 'VRBO',
    description: 'Sync your VRBO listings and reviews',
    status: 'disconnected'
  },
  {
    id: 'booking',
    name: 'Booking.com',
    description: 'Manage Booking.com property reviews',
    status: 'connected',
    lastSync: '1 hour ago'
  },
  {
    id: 'google',
    name: 'Google Business',
    description: 'Monitor and respond to Google reviews',
    status: 'error',
    error: 'Authentication expired'
  },
  {
    id: 'yelp',
    name: 'Yelp',
    description: 'Track and manage Yelp business reviews',
    status: 'disconnected'
  }
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const handleConnect = (id: string) => {
    // @ts-ignore
    setIntegrations(prev => prev.map(integration => 
      integration.id === id
        ? { ...integration, status: 'connected', lastSync: 'Just now' }
        : integration
    ));
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id
        ? { ...integration, status: 'disconnected', lastSync: undefined, error: undefined }
        : integration
    ));
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
            <p className="text-gray-400 mt-2">
              Connect your accounts to manage reviews across all platforms
            </p>
          </div>
          <Link2 className="w-8 h-8 text-primary animate-pulse" />
        </div>

        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={cn(
                "group relative bg-white/5 backdrop-blur-sm rounded-xl p-6",
                "border transition-all duration-300",
                integration.status === 'connected' && "border-green-500/50",
                integration.status === 'error' && "border-red-500/50",
                integration.status === 'disconnected' && "border-white/10 hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-gray-400">{integration.description}</p>
                </div>

                {integration.status === 'connected' ? (
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Last sync: {integration.lastSync}
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => handleDisconnect(integration.id)}
                      className="mt-4"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : integration.status === 'error' ? (
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{integration.error}</span>
                    </div>
                    <Button
                      onClick={() => handleConnect(integration.id)}
                      className="mt-4"
                    >
                      Reconnect
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleConnect(integration.id)}>
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}