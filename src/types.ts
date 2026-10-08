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
  xContentTypeOptions?: boolean;
  h2Count?: number;
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

export interface AeoMetrics {
  directAnswerReadiness: number;
  schemaCompleteness: number;
  faqSchemaDetected: boolean;
  citationPotential: number;
}

export interface GeoMetrics {
  brandEntityClarity: number;
  informationGainScore: number;
  llmContextRelevance: number;
  aiOverviewsEligibility: boolean;
}

export interface CrawlerBlockerMetrics {
  gptBotAllowed: boolean;
  claudeBotAllowed: boolean;
  googleExtendedAllowed: boolean;
  perplexityBotAllowed: boolean;
  ccBotAllowed: boolean;
  status: 'accessible' | 'partially_blocked' | 'fully_blocked';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
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
  aeo?: AeoMetrics;
  geo?: GeoMetrics;
  crawlerBlockers?: CrawlerBlockerMetrics;
  metrics: {
    title: MetricDetail;
    description: MetricDetail;
    h1: MetricDetail;
    h2?: MetricDetail;
    mobile: MetricDetail;
    speed: SpeedMetrics;
    ssl: MetricDetail;
    securityHeaders?: MetricDetail;
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
