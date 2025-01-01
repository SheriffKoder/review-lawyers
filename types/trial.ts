export interface Trial {
  businessName: string;
  businessType: 'rental' | 'restaurant';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'converted';
}

export interface TrialSignupData {
  email: string;
  password: string;
  businessName: string;
  businessType: 'rental' | 'restaurant';
  fullName: string;
}