import { ArticleItem, ServiceItem, ApkItem, CustomerOrder, AdminSettings, Language, ServiceCategory } from '../types';
import { ARTICLES_DATA } from '../data/articlesData';
import { SERVICES_DATA, CATEGORIES_LIST } from '../data/servicesData';
import { SERVICES_DATA_EN, CATEGORIES_LIST_EN } from '../data/servicesDataEn';
import { APK_DOWNLOAD_URL } from '../components/AppDownloadModal';
import { MASTER_OWNER_PIN, BACKUP_OWNER_PIN } from './securityConfig';

// Master Admin Password specified by the user
export const ADMIN_MASTER_PASSWORD = '@#Abasabfarag1';

// Owner Authorized Phones
export const AUTHORIZED_OWNER_PHONES = ['785502919', '967785502919', '+967785502919', '0785502919'];

// Storage Keys
const STORAGE_KEYS = {
  ADMIN_AUTH: 'raqeeb_admin_authenticated_session',
  ARTICLES: 'raqeeb_db_articles_v1',
  SERVICES: 'raqeeb_db_services_v1',
  APKS: 'raqeeb_db_apks_v1',
  CATEGORIES: 'raqeeb_db_categories_v1',
  ORDERS: 'raqeeb_db_orders_v1',
  SETTINGS: 'raqeeb_db_settings_v1',
};

// Initial Seed APKs (Apps and Games)
export const INITIAL_APKS: ApkItem[] = [
  {
    id: 'raqeeb-pro-app',
    title: 'تطبيق رقيب الذكي للخدمات والإنقاذ (Raqeeb Pro)',
    category: 'apps',
    categoryName: 'تطبيقات الأندرويد الأساسية',
    version: 'v2.2',
    size: '14.8 MB',
    downloadUrl: APK_DOWNLOAD_URL,
    icon: '/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png',
    screenshots: [
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80'
    ],
    description: 'تطبيق رقيب الرسمي للوصول المباشر إلى خدمات فك الشفرات، استرداد البيانات، حماية الهواتف وإدارتها بأعلى درجات الأمان.',
    features: [
      'طلب فوري لخدمات فك الشفرات والحسابات',
      'تشفير اتصالات وفحص أمني للجهاز',
      'إشعارات بحالة الطلبات ورموز التفعيل (PIN)',
      'دعم كامل لنظام أندرويد 8 إلى أندرويد 15'
    ],
    downloadsCount: 12450,
    rating: 4.9,
    isFeatured: true,
    dateAdded: '2026-09-15',
    packageType: 'apk'
  },
  {
    id: 'raqeeb-unlocker-tool',
    title: 'أداة رقيب لفحص وتخطي الحسابات (Raqeeb Unlocker)',
    category: 'tools',
    categoryName: 'أدوات الصيانة والبرمجة',
    version: 'v1.4',
    size: '28.5 MB',
    downloadUrl: 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file',
    icon: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80',
    description: 'أداة مساعدة للفحص السريع لمنافذ USB ووضع Fastboot/EDL لتجهيز الهاتف لعمليات فك الشفرات واسترداد الأجهزة.',
    features: [
      'فحص وضع تصحيح الأخطاء USB Debugging',
      'قراءة معلومات المعالج ونوع التشفير',
      'تحقق من حالة Knox وبوت لودر الجهاز'
    ],
    downloadsCount: 8920,
    rating: 4.8,
    isFeatured: true,
    dateAdded: '2026-08-20',
    packageType: 'apk'
  },
  {
    id: 'cyber-shield-defender-game',
    title: 'لعبة درع الأمن السيبراني (Cyber Shield Defender)',
    category: 'games',
    categoryName: 'ألعاب الذكاء والأمان',
    version: 'v1.2',
    size: '42.1 MB',
    downloadUrl: 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file',
    icon: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80',
    description: 'لعبة أندرويد ممتعة وتثقيفية تتحدى فيها فيروسات القرصنة وتدافع عن قواعد البيانات وخوادم الشبكة بذكاء وتكتيك وسرعة.',
    features: [
      'أكثر من 30 مرحلة لحماية الخوادم والبيانات',
      'ترقيات دفاعية وبرمجية للأجهزة',
      'تعمل بدون إنترنت (Offline Game)',
      'رسوميات وتأثيرات سايبربانك مشوقة'
    ],
    downloadsCount: 6430,
    rating: 4.7,
    isFeatured: true,
    dateAdded: '2026-09-01',
    packageType: 'apk'
  },
  {
    id: 'deep-data-scanner-app',
    title: 'مستكشف الملفات المفقودة (Deep Data Scanner)',
    category: 'security',
    categoryName: 'أدوات فحص البيانات',
    version: 'v3.0',
    size: '19.3 MB',
    downloadUrl: 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file',
    icon: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80',
    description: 'تطبيق فحص سريع للهواتف لقراءة القطاعات التالفة والتعرف على صور الكاش المصغرة قبل البدء بعملية الاسترداد الجنائي.',
    features: [
      'فحص سريع لذاكرة التخزين الداخلية والخارجية',
      'عرض معاينة للصور المحفوظة في ذاكرة التخزين المؤقت',
      'آمن بالكامل للقراءة فقط Read-Only'
    ],
    downloadsCount: 5120,
    rating: 4.8,
    isFeatured: false,
    dateAdded: '2026-09-10',
    packageType: 'apk'
  }
];

// Initial Customer Orders for display and tracking
const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-101',
    clientName: 'أحمد صالح المهدي',
    clientPhone: '771234567',
    serviceTitle: 'استرداد الصور ومحادثات واتساب المحذوفة',
    urgency: 'urgent',
    details: 'هاتف سامسونج S22 تم عمل فورمات له بالخطأ وأرغب باسترجاع صور العائلة.',
    date: '2026-10-18 14:30',
    status: 'in_progress'
  },
  {
    id: 'ord-102',
    clientName: 'خالد عبد الرحمن',
    clientPhone: '739876543',
    serviceTitle: 'فك شفرة شبكة سامسونج مقفل أمريكي Verizon',
    urgency: 'emergency',
    details: 'الجهاز لا يقبل شريحة يمن موبايل ويطلب كود فك الشبكة.',
    date: '2026-10-19 10:15',
    status: 'pending'
  }
];

// Default Admin Settings
export const DEFAULT_SETTINGS: AdminSettings = {
  apkDownloadUrl: APK_DOWNLOAD_URL,
  ownerPhone: '785502919',
  validPins: [MASTER_OWNER_PIN, BACKUP_OWNER_PIN],
  appName: 'رقيب للبرمجة والتسويق'
};

/* ==========================================================================
   AUTHENTICATION & SESSION
   ========================================================================== */

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true' ||
           localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminSession = (authenticated: boolean, remember: boolean = true): void => {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  } catch {
    // ignore
  }
};

// Method 1: Verify Password
export const verifyAdminPassword = (password: string): boolean => {
  return password.trim() === ADMIN_MASTER_PASSWORD;
};

// Method 2: Verify Phone (Authorized owner phone or PIN match)
export const verifyAdminPhone = (phoneInput: string, pinInput?: string): boolean => {
  const cleanPhone = phoneInput.replace(/[\s\-\+]/g, '');
  const isAuthorizedPhone = AUTHORIZED_OWNER_PHONES.some(p => p.replace(/[\s\-\+]/g, '') === cleanPhone);

  if (!isAuthorizedPhone) return false;

  // If a pin is provided, verify it too
  if (pinInput && pinInput.trim()) {
    return pinInput.trim() === MASTER_OWNER_PIN || pinInput.trim() === BACKUP_OWNER_PIN;
  }

  return true;
};

/* ==========================================================================
   ARTICLES & POSTS MANAGEMENT
   ========================================================================== */

export const getStoredArticles = (): ArticleItem[] => {
  if (typeof window === 'undefined') return ARTICLES_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(ARTICLES_DATA));
      return ARTICLES_DATA;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ARTICLES_DATA;
  } catch {
    return ARTICLES_DATA;
  }
};

export const saveArticlesList = (articles: ArticleItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save articles to storage', e);
  }
};

export const addArticle = (newArticle: ArticleItem): ArticleItem[] => {
  const current = getStoredArticles();
  const updated = [newArticle, ...current.filter(a => a.id !== newArticle.id)];
  saveArticlesList(updated);
  return updated;
};

export const updateArticle = (updatedArticle: ArticleItem): ArticleItem[] => {
  const current = getStoredArticles();
  const index = current.findIndex(a => a.id === updatedArticle.id);
  let updated: ArticleItem[];
  if (index !== -1) {
    updated = [...current];
    updated[index] = updatedArticle;
  } else {
    updated = [updatedArticle, ...current];
  }
  saveArticlesList(updated);
  return updated;
};

export const deleteArticle = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  const updated = current.filter(a => a.id !== id);
  saveArticlesList(updated);
  return updated;
};

/* ==========================================================================
   APK APPS & GAMES STORE MANAGEMENT
   ========================================================================== */

export const getStoredApks = (): ApkItem[] => {
  if (typeof window === 'undefined') return INITIAL_APKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APKS, JSON.stringify(INITIAL_APKS));
      return INITIAL_APKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item: ApkItem) => {
        if (item.id === 'raqeeb-pro-app') {
          return { ...item, icon: '/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png' };
        }
        return item;
      });
    }
    return INITIAL_APKS;
  } catch {
    return INITIAL_APKS;
  }
};

export const saveApksList = (apks: ApkItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.APKS, JSON.stringify(apks));
  } catch (e) {
    console.error('Failed to save APKs to storage', e);
  }
};

export const addApk = (newApk: ApkItem): ApkItem[] => {
  const current = getStoredApks();
  const updated = [newApk, ...current.filter(a => a.id !== newApk.id)];
  saveApksList(updated);
  return updated;
};

export const updateApk = (updatedApk: ApkItem): ApkItem[] => {
  const current = getStoredApks();
  const index = current.findIndex(a => a.id === updatedApk.id);
  let updated: ApkItem[];
  if (index !== -1) {
    updated = [...current];
    updated[index] = updatedApk;
  } else {
    updated = [updatedApk, ...current];
  }
  saveApksList(updated);
  return updated;
};

export const deleteApk = (id: string): ApkItem[] => {
  const current = getStoredApks();
  const updated = current.filter(a => a.id !== id);
  saveApksList(updated);
  return updated;
};

export const incrementApkDownloads = (id: string): ApkItem[] => {
  const current = getStoredApks();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, downloadsCount: (item.downloadsCount || 0) + 1 };
    }
    return item;
  });
  saveApksList(updated);
  return updated;
};

// Reorder APKs
export const moveApkUp = (id: string): ApkItem[] => {
  const current = getStoredApks();
  const index = current.findIndex(a => a.id === id);
  if (index <= 0) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index - 1, 0, item);
  saveApksList(updated);
  return updated;
};

export const moveApkDown = (id: string): ApkItem[] => {
  const current = getStoredApks();
  const index = current.findIndex(a => a.id === id);
  if (index === -1 || index >= current.length - 1) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index + 1, 0, item);
  saveApksList(updated);
  return updated;
};

export const setApkRank = (id: string, targetRank: number): ApkItem[] => {
  const current = getStoredApks();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return current;
  const targetIndex = Math.max(0, Math.min(current.length - 1, targetRank - 1));
  if (targetIndex === index) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, item);
  saveApksList(updated);
  return updated;
};

/* ==========================================================================
   SERVICES MANAGEMENT & REORDERING
   ========================================================================== */

export const getStoredServices = (lang: Language = 'ar'): ServiceItem[] => {
  const defaults = lang === 'ar' ? SERVICES_DATA : SERVICES_DATA_EN;
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.SERVICES}_${lang}`);
    if (!raw) {
      localStorage.setItem(`${STORAGE_KEYS.SERVICES}_${lang}`, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaults;
  } catch {
    return defaults;
  }
};

export const saveServicesList = (services: ServiceItem[], lang: Language = 'ar'): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEYS.SERVICES}_${lang}`, JSON.stringify(services));
  } catch (e) {
    console.error('Failed to save services', e);
  }
};

export const addService = (newService: ServiceItem, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const updated = [newService, ...current.filter(s => s.id !== newService.id)];
  saveServicesList(updated, lang);
  return updated;
};

export const updateService = (updatedService: ServiceItem, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const index = current.findIndex(s => s.id === updatedService.id);
  let updated: ServiceItem[];
  if (index !== -1) {
    updated = [...current];
    updated[index] = updatedService;
  } else {
    updated = [updatedService, ...current];
  }
  saveServicesList(updated, lang);
  return updated;
};

export const deleteService = (id: string, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const updated = current.filter(s => s.id !== id);
  saveServicesList(updated, lang);
  return updated;
};

export const moveServiceUp = (id: string, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const index = current.findIndex(s => s.id === id);
  if (index <= 0) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index - 1, 0, item);
  saveServicesList(updated, lang);
  return updated;
};

export const moveServiceDown = (id: string, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const index = current.findIndex(s => s.id === id);
  if (index === -1 || index >= current.length - 1) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index + 1, 0, item);
  saveServicesList(updated, lang);
  return updated;
};

export const setServiceRank = (id: string, targetRank: number, lang: Language = 'ar'): ServiceItem[] => {
  const current = getStoredServices(lang);
  const index = current.findIndex(s => s.id === id);
  if (index === -1) return current;
  const targetIndex = Math.max(0, Math.min(current.length - 1, targetRank - 1));
  if (targetIndex === index) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, item);
  saveServicesList(updated, lang);
  return updated;
};

/* ==========================================================================
   CATEGORIES MANAGEMENT & REORDERING
   ========================================================================== */

export interface CategoryOrderItem {
  id: ServiceCategory;
  name: string;
  icon: string;
  count: number;
}

export const getStoredCategories = (lang: Language = 'ar'): CategoryOrderItem[] => {
  const defaults = lang === 'ar' ? CATEGORIES_LIST : CATEGORIES_LIST_EN;
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.CATEGORIES}_${lang}`);
    if (!raw) {
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return defaults;
    
    // Dynamically calculate latest services count per category
    const services = getStoredServices(lang);
    return parsed.map((cat: CategoryOrderItem) => {
      const actualCount = cat.id === 'all' 
        ? services.length 
        : services.filter(s => s.category === cat.id).length;
      return { ...cat, count: actualCount };
    });
  } catch {
    return defaults;
  }
};

export const saveCategoriesOrder = (categories: CategoryOrderItem[], lang: Language = 'ar'): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEYS.CATEGORIES}_${lang}`, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories order', e);
  }
};

export const moveCategoryUp = (id: ServiceCategory, lang: Language = 'ar'): CategoryOrderItem[] => {
  const current = getStoredCategories(lang);
  const index = current.findIndex(c => c.id === id);
  if (index <= 0) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index - 1, 0, item);
  saveCategoriesOrder(updated, lang);
  return updated;
};

export const moveCategoryDown = (id: ServiceCategory, lang: Language = 'ar'): CategoryOrderItem[] => {
  const current = getStoredCategories(lang);
  const index = current.findIndex(c => c.id === id);
  if (index === -1 || index >= current.length - 1) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index + 1, 0, item);
  saveCategoriesOrder(updated, lang);
  return updated;
};

export const setCategoryRank = (id: ServiceCategory, targetRank: number, lang: Language = 'ar'): CategoryOrderItem[] => {
  const current = getStoredCategories(lang);
  const index = current.findIndex(c => c.id === id);
  if (index === -1) return current;
  const targetIndex = Math.max(0, Math.min(current.length - 1, targetRank - 1));
  if (targetIndex === index) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, item);
  saveCategoriesOrder(updated, lang);
  return updated;
};

export const resetCategoriesOrder = (lang: Language = 'ar'): CategoryOrderItem[] => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${STORAGE_KEYS.CATEGORIES}_${lang}`);
  }
  return getStoredCategories(lang);
};

/* ==========================================================================
   CUSTOMER ORDERS MANAGEMENT
   ========================================================================== */

export const getStoredOrders = (): CustomerOrder[] => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
};

export const addCustomerOrder = (order: CustomerOrder): CustomerOrder[] => {
  const current = getStoredOrders();
  const updated = [order, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  return updated;
};

export const updateOrderStatus = (id: string, status: CustomerOrder['status']): CustomerOrder[] => {
  const current = getStoredOrders();
  const updated = current.map(ord => ord.id === id ? { ...ord, status } : ord);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  return updated;
};

export const deleteOrder = (id: string): CustomerOrder[] => {
  const current = getStoredOrders();
  const updated = current.filter(ord => ord.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  return updated;
};

/* ==========================================================================
   SETTINGS & APK CONFIG
   ========================================================================== */

export const getStoredSettings = (): AdminSettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (newSettings: Partial<AdminSettings>): AdminSettings => {
  const current = getStoredSettings();
  const updated = { ...current, ...newSettings };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  }
  return updated;
};

/* ==========================================================================
   BACKUP & RESTORE
   ========================================================================== */

export const exportAllDatabaseJSON = (): string => {
  const data = {
    exportDate: new Date().toISOString(),
    articles: getStoredArticles(),
    apks: getStoredApks(),
    categoriesAr: getStoredCategories('ar'),
    categoriesEn: getStoredCategories('en'),
    servicesAr: getStoredServices('ar'),
    servicesEn: getStoredServices('en'),
    orders: getStoredOrders(),
    settings: getStoredSettings()
  };
  return JSON.stringify(data, null, 2);
};

export const importDatabaseJSON = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.articles && Array.isArray(data.articles)) saveArticlesList(data.articles);
    if (data.apks && Array.isArray(data.apks)) saveApksList(data.apks);
    if (data.categoriesAr && Array.isArray(data.categoriesAr)) saveCategoriesOrder(data.categoriesAr, 'ar');
    if (data.categoriesEn && Array.isArray(data.categoriesEn)) saveCategoriesOrder(data.categoriesEn, 'en');
    if (data.servicesAr && Array.isArray(data.servicesAr)) saveServicesList(data.servicesAr, 'ar');
    if (data.servicesEn && Array.isArray(data.servicesEn)) saveServicesList(data.servicesEn, 'en');
    if (data.orders && Array.isArray(data.orders)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(data.orders));
    }
    if (data.settings && typeof data.settings === 'object') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    return true;
  } catch (e) {
    console.error('Import failed', e);
    return false;
  }
};

export const resetToDefaults = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.APKS);
    localStorage.removeItem(`${STORAGE_KEYS.CATEGORIES}_ar`);
    localStorage.removeItem(`${STORAGE_KEYS.CATEGORIES}_en`);
    localStorage.removeItem(`${STORAGE_KEYS.SERVICES}_ar`);
    localStorage.removeItem(`${STORAGE_KEYS.SERVICES}_en`);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  } catch {
    // ignore
  }
};
