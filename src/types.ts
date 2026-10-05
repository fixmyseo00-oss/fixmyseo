export type AuditStatus = 'good' | 'warning' | 'error';
export type ImpactLevel = 'High' | 'Medium' | 'Low';
export type AuditCategory = 'meta' | 'speed' | 'mobile' | 'structure' | 'security';

export interface AuditItem {
  id: string;
  category: AuditCategory;
  status: AuditStatus;
  title: string;
  explanation: string;
  recommendation: string;
  fixSnippet?: string;
  impact: ImpactLevel;
}

export interface MetricDetail {
  text?: string;
  count?: number;
  length?: number;
  viewportFound?: boolean;
  enabled?: boolean;
  total?: number;
  missingAlt?: number;
  status: AuditStatus;
  message: string;
}

export interface SpeedMetrics {
  fcp: string;
  lcp: string;
  cls: string;
  tti: string;
  score: number;
  status: AuditStatus;
}

export interface HinglishRoast {
  siteNickname: string;
  savageRoast: string;
  punchlines: string[];
  desiPrescription: string[];
  roastScore: string;
  shareableQuote: string;
  burnLevel: string;
  language?: 'english' | 'hinglish';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AuditResult {
  url: string;
  analyzedAt: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  roastLanguage?: 'english' | 'hinglish';
  scores: {
    pageSpeed: number;
    metaData: number;
    mobileReadiness: number;
    contentStructure: number;
    security: number;
  };
  metrics: {
    title: MetricDetail;
    description: MetricDetail;
    h1: MetricDetail;
    mobile: MetricDetail;
    speed: SpeedMetrics;
    ssl: MetricDetail;
    images: MetricDetail;
    canonical?: MetricDetail;
  };
  auditItems: AuditItem[];
  hinglishRoast: HinglishRoast;
  groundingSources: GroundingSource[];
  isDemoFallback?: boolean;
}

export type PlanType = 'free' | 'pro' | 'agency';

export interface PricingPlan {
  id: PlanType;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
}
