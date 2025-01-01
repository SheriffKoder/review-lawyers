import React, { useState } from 'react';
import { Calendar, Clock, X, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cn } from '@/utils/cn';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-black/90 rounded-2xl border border-white/10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Schedule a Consultation</h2>
          <p className="text-gray-400">Speak with a review management specialist to learn how we can help protect your reputation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="col-span-2 md:col-span-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="col-span-2 md:col-span-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <select
              required
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              value={formData.businessType}
              onChange={e => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
            >
              <option value="">Select Business Type</option>
              <option value="rental">Rental Property</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          <textarea
            placeholder="Tell us about your review management needs..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
            value={formData.message}
            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Preferred Contact Time</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <select
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                value={formData.preferredTime}
                onChange={e => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
              >
                <option value="">Select Time</option>
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Scheduling...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Schedule Consultation
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}