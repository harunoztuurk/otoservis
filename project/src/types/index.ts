// Authentication types
export interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'personnel';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  registrationDate: Date;
  vehicles: Vehicle[];
}

// Vehicle types
export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  chassisNumber: string;
  engineNumber: string;
  customerId: string;
  serviceRecords: ServiceRecord[];
}

// Service types
export interface ServiceItem {
  id: string;
  description: string;
  cost: number;
  type: 'labor' | 'part';
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  description: string;
  serviceDate: Date;
  serviceItems: ServiceItem[];
  totalCost: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  invoice?: Invoice;
}

// Invoice types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  serviceId: string;
  customerId: string;
  vehicleId: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentPlan: PaymentPlan;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
}

export type PaymentMethod = 'cash' | 'credit_card' | 'bank_transfer' | 'installment';

// Payment types
export interface PaymentPlan {
  type: PaymentMethod;
  totalAmount: number;
  installments: Installment[];
}

export interface Installment {
  id: string;
  invoiceId: string;
  amount: number;
  dueDate: Date;
  paymentDate?: Date;
  status: 'paid' | 'unpaid' | 'overdue';
}

// Reporting types
export interface MonthlyReport {
  month: string;
  revenue: number;
  serviceCount: number;
  receivables: number;
}

export interface YearlyReport {
  year: number;
  months: MonthlyReport[];
  totalRevenue: number;
  totalServiceCount: number;
  totalReceivables: number;
}