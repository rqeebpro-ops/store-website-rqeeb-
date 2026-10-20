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

export interface AdminSettings {
  apkDownloadUrl: string;
  ownerPhone: string;
  validPins: string[];
  appName: string;
}
