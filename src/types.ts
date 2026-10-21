export type Language = 'ar' | 'en';

export type ServiceCategory = 
  | 'all'
  | 'unlocking'        // فك الشفرات والأجهزة
  | 'screen_locks'     // فك الإقفال وحماية الهواتف
  | 'account_recovery' // استرجاع الحسابات المخترقة والمعطلة
  | 'data_recovery'    // استرداد البيانات والصور والملفات
  | 'programming'      // خدمات البرمجة وتطوير الأنظمة
  | 'marketing';       // خدمات التسويق الرقمي والإعلانات

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryName: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  badge?: string;
  popular?: boolean;
  estimatedTime: string;
  successRate: string;
  guarantee: string;
  steps: {
    title: string;
    description: string;
  }[];
  requirements: string[];
  features: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryName: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: string;
  isArchived?: boolean;
  order?: number;
  stepsGuide: {
    stepNumber: number;
    stepTitle: string;
    stepDetail: string;
    proTip?: string;
  }[];
  contentSections: {
    heading: string;
    body: string;
  }[];
  warningNote?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  serviceUsed: string;
  comment: string;
  rating: number;
  date: string;
}

export type ApkCategory = 'apps' | 'games' | 'tools' | 'security';

export interface ApkItem {
  id: string;
  title: string;
  category: ApkCategory;
  categoryName: string;
  version: string;
  size: string;
  downloadUrl: string;
  icon: string;
  screenshots?: string[];
  description: string;
  features: string[];
  downloadsCount: number;
  rating: number;
  isFeatured?: boolean;
  dateAdded: string;
  packageType: 'apk' | 'xapk';
}

export interface CustomerOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceTitle: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  details: string;
  date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export interface ThemeSettings {
  presetThemeId: 'royal-navy' | 'emerald-tech' | 'cyber-purple' | 'midnight-gold' | 'ocean-teal' | 'ruby-crimson' | 'custom';
  primaryColor: string;          // Main action button start (e.g. #2563EB)
  primaryGradientEnd: string;    // Main action button end (e.g. #1D4ED8)
  headerFooterBg: string;        // Header & footer background (e.g. #0A2351)
  bodyBgStart: string;           // Page background gradient top (e.g. #F8FAFF)
  bodyBgEnd: string;             // Page background gradient bottom (e.g. #E6F0FF)
  secondaryAccent: string;       // Circular icon background / highlight (e.g. #3B82F6)
  androidGreen: string;          // Android APK badge button (e.g. #22C55E)
  fontFamily: 'Cairo' | 'Tajawal' | 'Almarai';
  cardRadius: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  cardShadow: 'soft' | 'medium' | 'elevated';
}

export interface AdminSettings {
  apkDownloadUrl: string;
  ownerPhone: string;
  validPins: string[];
  appName: string;
  appSlogan?: string;
  whatsappGreeting?: string;
  heroBadgeText?: string;
  statsSuccessRate?: string;
  statsOrdersCompleted?: string;
  statsSupportAvailability?: string;
  themeSettings?: ThemeSettings;
}
