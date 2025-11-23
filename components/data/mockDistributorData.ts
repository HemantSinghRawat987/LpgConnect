import { 
    InventoryItem, 
    CylinderStatus, 
    CylinderType, 
    DeliveryVehicle, 
    RegionStat,
    SafetyIncident,
    ComplianceDocument,
    GeoMetric
} from '../../types';

export const MOCK_VEHICLES: DeliveryVehicle[] = [
    { id: 'V-01', driverName: 'Rajesh Kumar', plateNumber: 'MH-12-AB-1234', status: 'DELIVERING', location: 'Sector 4, North', load: 85, eta: '15 mins' },
    { id: 'V-02', driverName: 'Sunil Singh', plateNumber: 'MH-12-XY-9876', status: 'RETURNING', location: 'Main Highway', load: 10, eta: '45 mins' },
    { id: 'V-03', driverName: 'Vikram Malhotra', plateNumber: 'MH-14-ZZ-5555', status: 'DELIVERING', location: 'Industrial Area', load: 60, eta: '30 mins' },
    { id: 'V-04', driverName: 'Amit Patel', plateNumber: 'MH-14-AA-1111', status: 'IDLE', location: 'Depot', load: 0, eta: '-' },
    { id: 'V-05', driverName: 'Suresh Reddy', plateNumber: 'MH-12-BB-2222', status: 'DELIVERING', location: 'East Market', load: 45, eta: '1 hour' },
];

export const MOCK_REGIONS: RegionStat[] = [
    { id: 'R1', name: 'North Zone', totalDistributed: 1200, idleCount: 45, healthScore: 92 },
    { id: 'R2', name: 'East Market', totalDistributed: 850, idleCount: 120, healthScore: 65 },
    { id: 'R3', name: 'Ind. Sector', totalDistributed: 2000, idleCount: 80, healthScore: 88 },
    { id: 'R4', name: 'Old City', totalDistributed: 1500, idleCount: 300, healthScore: 45 },
    { id: 'R5', name: 'West Suburbs', totalDistributed: 900, idleCount: 20, healthScore: 95 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
    ...Array(320).fill(null).map((_, i) => ({ id: `CYL-${1000+i}`, type: CylinderType.DOMESTIC_14KG, status: CylinderStatus.FILLED, lastUpdated: '2023-10-26', expiryDate: '2028-01-01', location: 'Warehouse A' })),
    ...Array(145).fill(null).map((_, i) => ({ id: `CYL-${2000+i}`, type: CylinderType.DOMESTIC_14KG, status: CylinderStatus.EMPTY, lastUpdated: '2023-10-25', expiryDate: '2028-01-01', location: 'Warehouse B' })),
    ...Array(50).fill(null).map((_, i) => ({ id: `CYL-${3000+i}`, type: CylinderType.COMMERCIAL_19KG, status: CylinderStatus.FILLED, lastUpdated: '2023-10-26', expiryDate: '2026-05-15', location: 'Warehouse A' })),
    ...Array(15).fill(null).map((_, i) => ({ id: `CYL-${4000+i}`, type: CylinderType.DOMESTIC_14KG, status: CylinderStatus.DEFECTIVE, lastUpdated: '2023-10-20', expiryDate: '2022-01-01', location: 'Repair Bay' })),
    ...Array(20).fill(null).map((_, i) => ({ id: `CYL-${5000+i}`, type: CylinderType.INDUSTRIAL_47KG, status: CylinderStatus.FILLED, lastUpdated: '2023-10-26', expiryDate: '2027-08-20', location: 'Warehouse C' })),
    ...Array(5).fill(null).map((_, i) => ({ id: `CYL-${6000+i}`, type: CylinderType.INDUSTRIAL_47KG, status: CylinderStatus.EMPTY, lastUpdated: '2023-10-24', expiryDate: '2027-08-20', location: 'Warehouse C' })),
];

export const MOCK_SALES_HISTORY = [
    { day: 'Mon', domestic: 145, commercial: 42 },
    { day: 'Tue', domestic: 152, commercial: 38 },
    { day: 'Wed', domestic: 148, commercial: 45 },
    { day: 'Thu', domestic: 160, commercial: 35 },
    { day: 'Fri', domestic: 175, commercial: 50 },
    { day: 'Sat', domestic: 210, commercial: 65 },
    { day: 'Sun', domestic: 195, commercial: 55 },
];

export const MOCK_SAFETY_INCIDENTS: SafetyIncident[] = [
    {
        id: 'INC-001',
        date: '2023-10-15',
        type: 'LEAKAGE',
        severity: 'HIGH',
        description: 'Minor valve leakage detected during pre-delivery check.',
        status: 'RESOLVED',
        location: 'Warehouse A',
        reportedBy: 'Supervisor Sharma'
    },
    {
        id: 'INC-002',
        date: '2023-10-20',
        type: 'NEAR_MISS',
        severity: 'LOW',
        description: 'Cylinder stack unstable, corrected immediately.',
        status: 'RESOLVED',
        location: 'Loading Bay 2',
        reportedBy: 'Operator Singh'
    },
    {
        id: 'INC-003',
        date: '2023-10-27',
        type: 'ACCIDENT',
        severity: 'MEDIUM',
        description: 'Delivery vehicle minor scrape in narrow lane.',
        status: 'INVESTIGATING',
        location: 'Sector 4',
        reportedBy: 'Driver Rajesh'
    }
];

export const MOCK_COMPLIANCE_DOCS: ComplianceDocument[] = [
    {
        id: 'DOC-001',
        title: 'PESO Storage License',
        type: 'LICENSE',
        issueDate: '2023-01-01',
        expiryDate: '2023-12-31',
        status: 'EXPIRING_SOON',
        url: '#'
    },
    {
        id: 'DOC-002',
        title: 'Fire Safety Certificate',
        type: 'CERTIFICATE',
        issueDate: '2023-06-15',
        expiryDate: '2024-06-14',
        status: 'VALID',
        url: '#'
    },
    {
        id: 'DOC-003',
        title: 'Vehicle Insurance Policy (Fleet)',
        type: 'INSURANCE',
        issueDate: '2023-03-01',
        expiryDate: '2024-02-29',
        status: 'VALID',
        url: '#'
    }
];

export const MOCK_GEO_METRICS: GeoMetric[] = [
    {
        regionId: 'R1',
        regionName: 'North Zone',
        coordinates: [18.5204, 73.8567],
        activeCustomers: 450,
        demandDensity: 0.8,
        deliveryEfficiency: 92
    },
    {
        regionId: 'R2',
        regionName: 'East Market',
        coordinates: [18.5304, 73.8667],
        activeCustomers: 320,
        demandDensity: 0.6,
        deliveryEfficiency: 78
    },
    {
        regionId: 'R3',
        regionName: 'Ind. Sector',
        coordinates: [18.5104, 73.8467],
        activeCustomers: 150,
        demandDensity: 0.9,
        deliveryEfficiency: 88
    }
];