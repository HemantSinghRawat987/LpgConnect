export enum UserRole {
  DISTRIBUTOR = 'DISTRIBUTOR',
  CUSTOMER = 'CUSTOMER',
  LANDING = 'LANDING'
}

export enum CylinderStatus {
  FILLED = 'FILLED',
  EMPTY = 'EMPTY',
  DEFECTIVE = 'DEFECTIVE',
  WITH_CUSTOMER = 'WITH_CUSTOMER',
  IN_TRANSIT = 'IN_TRANSIT'
}

export enum CylinderType {
  DOMESTIC_14KG = '14.2kg Domestic',
  COMMERCIAL_19KG = '19kg Commercial',
  INDUSTRIAL_47KG = '47.5kg Industrial'
}

export interface InventoryItem {
  id: string;
  type: CylinderType;
  status: CylinderStatus;
  lastUpdated: string;
  expiryDate: string;
  location: string;
}

export interface CustomerAsset {
  customerId: string;
  name: string;
  activeCylinders: number;
  lastRefillDate: string;
  regulatorExpiryDate: string;
  safetyCheckDue: boolean;
  address: string;
  credits: number;
  phone: string;
}

export interface DemandPrediction {
  prediction: string;
  suggestedOrder: number;
  confidence: string;
}

export interface DeliveryVehicle {
  id: string;
  driverName: string;
  plateNumber: string;
  status: 'DELIVERING' | 'RETURNING' | 'IDLE';
  location: string;
  load: number; // percentage
  eta: string;
}

export interface RegionStat {
  id: string;
  name: string;
  totalDistributed: number;
  idleCount: number;
  healthScore: number; // 0-100
}

export interface Transaction {
  id: string;
  date: string;
  type: 'REFILL' | 'RETURN' | 'SERVICE';
  amount: number;
  status: 'COMPLETED' | 'PENDING';
}

export interface SafetyIncident {
  id: string;
  date: string;
  type: 'LEAKAGE' | 'FIRE' | 'ACCIDENT' | 'NEAR_MISS';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  location: string;
  reportedBy: string;
}

export interface ComplianceDocument {
  id: string;
  title: string;
  type: 'LICENSE' | 'CERTIFICATE' | 'AUDIT_REPORT' | 'INSURANCE';
  issueDate: string;
  expiryDate: string;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
  url?: string;
}

export interface GeoMetric {
  regionId: string;
  regionName: string;
  coordinates: [number, number]; // [lat, lng]
  activeCustomers: number;
  demandDensity: number; // 0-1 scale
  deliveryEfficiency: number; // percentage
}