/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Organization {
  id: string;
  name: string;
  code: string;
  type: 'city_polyclinic' | 'district_hospital' | 'specialized_center' | 'primary_health';
  region: string;
  bedCount?: number;
  patientsCount: number;
}

export type DocumentType =
  | 'services_registry'       // Қызметтер реестрі (МИС)
  | 'outsourcing_spend'       // Сыртқы шығыстар реестрі
  | 'work_acts'               // Орындалған жұмыс актілері
  | 'social_fund_payments'    // ӘМСҚ төлем реестрі
  | 'staffing_table'          // Штаттық кесте
  | 'tariffs_workload'        // Тарификациялық тізім
  | 'equipment_registry'      // Құрал-жабдықтар реестрі
  | 'maintenance_downtime'    // Жөндеу және downtime журналы
  | 'slots_schedule'          // Кезек / Слот кестесі
  | 'referrals_registry'      // Жолдама реестрі
  | 'medicine_inventory'      // Дәрілік қойма қалдықтары
  | 'procurement_contracts'   // Сатып алу және келісімшарттар
  | 'debts_credits'           // Кредиторлық/дебиторлық берешек
  | 'staff_movement'          // Кадрлар қозғалысы
  | 'quality_audit'           // Сапа және ішкі аудит
  | 'pdf_archive';            // Қосымша құжаттар архиві

export interface DocumentImport {
  id: string;
  type: DocumentType;
  fileName: string;
  fileSize?: string;
  importDate: string;
  status: 'pending' | 'success' | 'warning' | 'error';
  recordedBy: string;
  rowCount: number;
  mappedFields: Record<string, string>;
  errorDetails?: string;
}

export interface DataQualityReport {
  orgId: string;
  completenessRate: number; // % of non-empty rows
  matchingRate: number;     // % match with references
  duplicateRate: number;    // % duplicates found
  invalidMkb10Count: number;
  unmappedFieldsCount: number;
  outlierCount: number;
}

export interface SubcontractorAnalytics {
  id: string;
  name: string;
  category: 'Laboratory' | 'Imaging' | 'Clinical' | 'Consultation';
  totalPaid: number;
  registeredServicesCount: number;
  actVsRegistryMismatch: number;
  concentrationIndex: number; // HHI contribution
  qualityScore: number;
}

export interface FraudCase {
  id: string;
  code: string;
  ruleId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'approved' | 'dismissed';
  detectedAt: string;
  patientId: string;
  doctorName: string;
  department: string;
  flaggedAmount: number;
  assignedTo?: string;
  notes?: string;
}

export interface StaffAnalytics {
  totalPositions: number;
  filledPositions: number;
  vacanciesCount: number;
  maternityLeaveCount: number;
  retirementRiskCount: number; // zeynetke шығу тәуекелі (age > 58 for women, > 63 for men)
  criticalSpecialistsNeeded: { specialty: string; count: number }[];
  loadFactor: number; // average appointments per shift
}

export interface EquipmentItem {
  id: string;
  inventoryNo: string;
  name: string;
  department: string;
  purchaseYear: number;
  purchaseCost: number;
  depreciationPercent: number;
  repairCount: number;
  downtimeDays: number;
  status: 'usable' | 'repair_needed' | 'downtime' | 'decommissioned' | 'warning' | 'broken';
}

export interface RoiPlannerItem {
  id: string;
  equipmentName: string;
  category: string;
  monthlyOutsourceCost: number;
  internalPurchasePrice: number;
  monthlyInternalRunningCost: number;
  projectedMonthlyVolume: number;
  paybackPeriodMonths: number;
  avoidedSpendYearly: number;
  recommendation: 'internalize' | 'keep_outsource' | 'lease';
}

export interface DashboardSummary {
  totalOutsourceSpend: number;
  privateSharePercent: number; // Жекеменшік сектор үлесі
  hhiIndex: number;            // Concentration index (Herfindahl-Hirschman)
  duplicateRate: number;
  flaggedFraudTotal: number;
  staffCoveragePercent: number;
  equipmentDowntimeTotal: number;
  projectedAnnualSavings: number;
}
