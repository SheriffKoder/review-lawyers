export interface User {
  id: string;
  email: string;
  name: string;
  businessType: 'rental' | 'restaurant';
}