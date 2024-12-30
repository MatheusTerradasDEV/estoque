export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  photoURL?: string;
  company?: string;
  position?: string;
  bio?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface Fabric {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  category: string;
  supplier: string;
  description?: string;
  minimumStock?: number;
  width?: number;
  composition?: string;
  weight?: number;
  pattern?: string;
  notes?: string;
  supplierCode?: string;
  createdAt: Date;
  updatedAt: Date;
}