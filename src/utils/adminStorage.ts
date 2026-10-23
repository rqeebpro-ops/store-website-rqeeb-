import { ArticleItem, ServiceItem, ApkItem, CustomerOrder, AdminSettings, Language, ServiceCategory, ThemeSettings } from '../types';
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
  THEME: 'raqeeb_db_theme_settings_v1',
};

// Preset Themes for Owner Customization
export const THEME_PRESETS: Record<string, { name: string; nameEn: string; theme: ThemeSettings }> = {
  'royal-navy': {
    name: 'الكحلي الملكي الفخم (الافتراضي)',
    nameEn: 'Royal Navy & Blue (Default)',
    theme: {
      presetThemeId: 'royal-navy',
      primaryColor: '#2563EB',
      primaryGradientEnd: '#1D4ED8',
      headerFooterBg: '#0A2351',
      bodyBgStart: '#F8FAFF',
      bodyBgEnd: '#E6F0FF',
      secondaryAccent: '#3B82F6',
      androidGreen: '#22C55E',
      fontFamily: 'Cairo',
      cardRadius: 'rounded-2xl',
      cardShadow: 'soft'
    }
  },
  'emerald-tech': {
    name: 'الزمردي التقني والأخضر الذكي',
    nameEn: 'Emerald Tech & Forest',
    theme: {
      presetThemeId: 'emerald-tech',
      primaryColor: '#059669',
      primaryGradientEnd: '#047857',
      headerFooterBg: '#064E3B',
      bodyBgStart: '#F0FDF4',
      bodyBgEnd: '#DCFCE7',
      secondaryAccent: '#10B981',
      androidGreen: '#16A34A',
      fontFamily: 'Tajawal',
      cardRadius: 'rounded-2xl',
      cardShadow: 'soft'
    }
  },
  'cyber-purple': {
    name: 'السايبر البنفسجي والأرجواني الفضائي',
    nameEn: 'Cyber Indigo & Violet',
    theme: {
      presetThemeId: 'cyber-purple',
      primaryColor: '#7C3AED',
      primaryGradientEnd: '#6D28D9',
      headerFooterBg: '#1E1B4B',
      bodyBgStart: '#FAF5FF',
      bodyBgEnd: '#F3E8FF',
      secondaryAccent: '#8B5CF6',
      androidGreen: '#22C55E',
      fontFamily: 'Cairo',
      cardRadius: 'rounded-2xl',
      cardShadow: 'soft'
    }
  },
  'midnight-gold': {
    name: 'الأسود الملكي والذهبي الفاخر',
    nameEn: 'Midnight Black & Luxury Gold',
    theme: {
      presetThemeId: 'midnight-gold',
      primaryColor: '#D97706',
      primaryGradientEnd: '#B45309',
      headerFooterBg: '#18181B',
      bodyBgStart: '#FFFBEB',
      bodyBgEnd: '#FEF3C7',
      secondaryAccent: '#F59E0B',
      androidGreen: '#22C55E',
      fontFamily: 'Cairo',
      cardRadius: 'rounded-2xl',
      cardShadow: 'medium'
    }
  },
  'ocean-teal': {
    name: 'التركواز والبحري العصري',
    nameEn: 'Ocean Teal & Marine',
    theme: {
      presetThemeId: 'ocean-teal',
      primaryColor: '#0D9488',
      primaryGradientEnd: '#0F766E',
      headerFooterBg: '#0F2D37',
      bodyBgStart: '#F0FDFA',
      bodyBgEnd: '#CCFBF1',
      secondaryAccent: '#14B8A6',
      androidGreen: '#22C55E',
      fontFamily: 'Tajawal',
      cardRadius: 'rounded-2xl',
      cardShadow: 'soft'
    }
  },
  'ruby-crimson': {
    name: 'الياقوتي القرمزي والكحلي الداكن',
    nameEn: 'Ruby Crimson & Slate',
    theme: {
      presetThemeId: 'ruby-crimson',
      primaryColor: '#E11D48',
      primaryGradientEnd: '#BE123C',
      headerFooterBg: '#0F172A',
      bodyBgStart: '#FFF1F2',
      bodyBgEnd: '#FFE4E6',
      secondaryAccent: '#F43F5E',
      androidGreen: '#22C55E',
      fontFamily: 'Cairo',
      cardRadius: 'rounded-2xl',
      cardShadow: 'soft'
    }
  }
};

export const DEFAULT_THEME: ThemeSettings = THEME_PRESETS['royal-navy'].theme;

// Initial Seed APKs (Apps and Games)
export const INITIAL_APKS: ApkItem[] = [
  {
    id: 'raqeeb-mobile-app',
    title: 'تطبيق رقيب للهواتف (Raqeeb Mobile)',
    category: 'apps',
    categoryName: 'برمجة وصيانة الهواتف',
    version: 'v2.2',
    size: '15.4 MB',
    downloadUrl: 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file',
    icon: '/assets/aistudio/IMG_20260914_161520_ec3c04e4.jpg',
    screenshots: [
      '/assets/aistudio/IMG_20260914_161520_ec3c04e4.jpg',
      '/assets/aistudio/Rqeeb_unified_icons_gold_b927d66b.png'
    ],
    description: 'تطبيق رقيب الرسمي للهواتف الذكية المتخصص في صيانة وبرمجة الأجهزة، فك شفرات الشبكات المحلية والدولية (يمن موبايل، سبأفون، يو، فرايزون، AT&T)، تخطي حسابات جوجل (FRP) وإقفال الشاشة، إصلاح السوفت وير وتنزيل الرومات الرسمية، استرداد البيانات والملفات ومحادثات واتساب التالفة، وإدارة خدمات التسويق الرقمي وزيادة المتابعين بأمان وموثوقية عالية.',
    features: [
      'فك شفرات وتفعيل شبكات CDMA و GSM لجميع الهواتف بضغطة زر',
      'تخطي حسابات جوجل (FRP) وقفل الشاشة والنمط بدون فقدان البيانات إن أمكن',
      'إصلاح السوفت وير والتعليق على الشعار وتثبيت الرومات وتخطي الثغرات',
      'استرداد الصور ومقاطع الفيديو والملفات ومحادثات واتساب التالفة',
      'خدمات التسويق الرقمي المباشر وزيادة المتابعين وإدارة الحملات الإعلانية'
    ],
    downloadsCount: 14200,
    rating: 4.9,
    isFeatured: true,
    dateAdded: '2026-10-20',
    packageType: 'apk'
  },
  {
    id: 'raqeeb-secondary-education',
    title: 'تطبيق رقيب للتعليم الثانوي',
    category: 'apps',
    categoryName: 'تطبيقات تعليمية لطلاب الثانوي',
    version: 'v1.8',
    size: '22.3 MB',
    downloadUrl: 'https://www.mediafire.com/file/hateydm3wivolu9/rqeeb.3secondary.apk/file',
    icon: '/assets/aistudio/file_000000007cf4821197efb20b8d7b0701_8d345261.png',
    screenshots: [
      '/assets/aistudio/file_000000007cf4821197efb20b8d7b0701_8d345261.png'
    ],
    description: 'المنصة التعليمية المتكاملة لطلاب وطالبات الشهادة الثانوية العامة (القسم العلمي والأدبي) تحت شعار «افهم • حل • اختبر • تفوق». يقدم التطبيق بنك أسئلة وزارية شامل لجميع المواد، نماذج امتحانات وزارية مؤتمتة للأعوام السابقة، ملخصات مركزة وشروحات مبسطة لأصعب المفاهيم، واختبارات تجريبية تفاعلية تحاكي بيئة الاختبار الوزاري الحقيقي وتعمل بدون إنترنت.',
    features: [
      'بنك أسئلة وزاري شامل ومحدث مصنف حسب المواد والوحدات والدروس',
      'اختبارات تجريبية مؤقتة تحاكي الاختبارات الوزارية المؤتمتة بدقة',
      'تصحيح آلي فوري للامتحانات مع إظهار النتيجة والإجابات النموذجية والشرح',
      'ملخصات مركزة وشروحات وافية للقوانين والمفاهيم والنظريات المعقدة',
      'يعمل بدون الحاجة للاتصال بالإنترنت (Offline Mode) لتوفير مذاكرة متواصلة'
    ],
    downloadsCount: 9850,
    rating: 4.9,
    isFeatured: true,
    dateAdded: '2026-10-18',
    packageType: 'apk'
  },
  {
    id: 'raqeeb-smart-teacher-assistant',
    title: 'تطبيق رقيب مساعد المعلم الذكي',
    category: 'tools',
    categoryName: 'أدوات المعلمين والتعليم الذكي',
    version: 'v2.0',
    size: '18.6 MB',
    downloadUrl: 'https://www.mediafire.com/file/7frk82vb4ouj066/rqeeb.teacher.smart.apk/file',
    icon: '/assets/aistudio/file_0000000029c481f48a5065871c2ddba4_3a979215.png',
    screenshots: [
      '/assets/aistudio/file_0000000029c481f48a5065871c2ddba4_3a979215.png'
    ],
    description: 'المساعد الرقمي المبتكر والشامل للمعلمين والمعلمات لتيسير وإدارة العملية التعليمية بأحدث الأساليب الذكية. يتيح التطبيق تحضير الدروس إلكترونياً، توليد نماذج الاختبارات وبنوك الأسئلة تلقائياً بنماذج متعددة مع مفاتيح الإجابة، رصد درجات الطلاب وحساب المعدلات والنسب المئوية، ومتابعة الحضور والغياب مع تصدير تقارير PDF جاهزة للطباعة.',
    features: [
      'تحضير الدروس التلقائي ونماذج خطط دراسية أسبوعية وفصلية معتمدة',
      'توليد اختبارات بنماذج متعددة تلقائياً مع نماذج الإجابة وموازين الدرجات',
      'كشوف رصد إلكترونية وحساب تلقائي لدرجات ومعدلات والنسب المئوية للطلاب',
      'رصد الحضور والغياب وتتبع المشاركة الصفية والملاحظات السلوكية بسهولة',
      'تصدير التقارير الإحصائية والشهادات بصيغة PDF وطباعتها ومشاركتها فوراً'
    ],
    downloadsCount: 7600,
    rating: 4.8,
    isFeatured: true,
    dateAdded: '2026-10-15',
    packageType: 'apk'
  },
  {
    id: 'shaujin-travel-agency',
    title: 'تطبيق شجين وكاله سفريات',
    category: 'apps',
    categoryName: 'حجوزات السفر والسياحة',
    version: 'v1.5',
    size: '16.2 MB',
    downloadUrl: 'https://www.mediafire.com/file/g7b4swh1qp2n3ie/ShaujinTravelAgency.apk/file',
    icon: '/assets/aistudio/IMG_20260927_171456_fd248bb9.jpg',
    screenshots: [
      '/assets/aistudio/IMG_20260927_171456_fd248bb9.jpg'
    ],
    description: 'التطبيق الرسمي لوكالة شجين للسفريات والسياحة وخدمات الحج والعمرة. يوفر للمسافرين تجربة حجز سلسة تشمل البحث عن أفضل أسعار تذاكر الطيران على جميع الخطوط العالمية، حجز الرحلات البرية والبحرية، استخراج وتخليص التأشيرات السياحية والتجارية والإقامات، وتنظيم برامج العمرة الفاخرة والاقتصادية مع متابعة لحظية للحجوزات ودعم فني متاح 24/7.',
    features: [
      'حجز ومقارنة أسعار تذاكر الطيران لأكثر من 500 شركة طيران دولية ومحلية',
      'خدمات وبرامج الحج والعمرة المتكاملة (حجوزات فنادق مكة والمدينة والنقل)',
      'تخليص وتسهيل التأشيرات السياحية وتأشيرات العمل والزيارات العائلية',
      'حجز رحلات النقل البري الدولي والداخلي بأحدث أساطيل الحافلات',
      'دعم واستشارات السفر المباشرة مع موظفي الوكالة على مدار 24 ساعة'
    ],
    downloadsCount: 5900,
    rating: 4.8,
    isFeatured: true,
    dateAdded: '2026-10-12',
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
    isFeatured: false,
    dateAdded: '2026-09-01',
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
    isFeatured: false,
    dateAdded: '2026-08-20',
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
  appName: 'رقيب للبرمجة والتسويق',
  appSlogan: 'خدمات فك الشفرات، استرداد البيانات والحسابات والتسويق الرقمي المعتمد',
  whatsappGreeting: 'السلام عليكم مركز رقيب، أود الاستفسار وطلب إحدى خدمات البرمجة أو التسويق',
  heroBadgeText: 'المركز البرمجي والتقني الأول في اليمن',
  statsSuccessRate: '100%',
  statsOrdersCompleted: '+9,850',
  statsSupportAvailability: '24/7',
  themeSettings: DEFAULT_THEME
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

// Reorder Articles Functions
export const moveArticleUp = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  const index = current.findIndex(a => a.id === id);
  if (index <= 0) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index - 1, 0, item);
  saveArticlesList(updated);
  return updated;
};

export const moveArticleDown = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  const index = current.findIndex(a => a.id === id);
  if (index === -1 || index >= current.length - 1) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(index + 1, 0, item);
  saveArticlesList(updated);
  return updated;
};

export const setArticleRank = (id: string, targetRank: number): ArticleItem[] => {
  const current = getStoredArticles();
  const index = current.findIndex(a => a.id === id);
  if (index === -1) return current;
  const targetIndex = Math.max(0, Math.min(current.length - 1, targetRank - 1));
  if (targetIndex === index) return current;
  const updated = [...current];
  const [item] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, item);
  saveArticlesList(updated);
  return updated;
};

export const moveArticleToTop = (id: string): ArticleItem[] => {
  return setArticleRank(id, 1);
};

export const moveArticleToBottom = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  return setArticleRank(id, current.length);
};

// Article Archiving Functions
export const toggleArchiveArticle = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, isArchived: !item.isArchived };
    }
    return item;
  });
  saveArticlesList(updated);
  return updated;
};

export const archiveAllArticles = (): ArticleItem[] => {
  const current = getStoredArticles();
  const updated = current.map(item => ({ ...item, isArchived: true }));
  saveArticlesList(updated);
  return updated;
};

export const unarchiveAllArticles = (): ArticleItem[] => {
  const current = getStoredArticles();
  const updated = current.map(item => ({ ...item, isArchived: false }));
  saveArticlesList(updated);
  return updated;
};

export const duplicateArticle = (id: string): ArticleItem[] => {
  const current = getStoredArticles();
  const source = current.find(a => a.id === id);
  if (!source) return current;
  const copy: ArticleItem = {
    ...source,
    id: `art-${Date.now()}`,
    title: `${source.title} (نسخة جديدة)`,
    date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    isArchived: false
  };
  const updated = [copy, ...current];
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
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.APKS, JSON.stringify(INITIAL_APKS));
      return INITIAL_APKS;
    }

    // Required priority IDs in exact order requested by the user
    const priorityIds = [
      'raqeeb-mobile-app',
      'raqeeb-secondary-education',
      'raqeeb-smart-teacher-assistant',
      'shaujin-travel-agency'
    ];

    // Check if the current cached list already begins with these 4 IDs in order
    const isFirstFourMatching = priorityIds.every((id, idx) => parsed[idx]?.id === id);

    if (!isFirstFourMatching) {
      // Re-order and merge: place the 4 required apps at the top with their seed assets and links
      const topApps = priorityIds.map(id => {
        const seed = INITIAL_APKS.find(a => a.id === id);
        const existing = parsed.find((a: ApkItem) => a.id === id);
        return existing ? { ...seed, ...existing, icon: seed?.icon || existing.icon, downloadUrl: seed?.downloadUrl || existing.downloadUrl } : seed!;
      }).filter(Boolean) as ApkItem[];

      const remainingApps = parsed.filter((a: ApkItem) => !priorityIds.includes(a.id) && a.id !== 'raqeeb-pro-app');
      const merged = [...topApps, ...remainingApps];
      localStorage.setItem(STORAGE_KEYS.APKS, JSON.stringify(merged));
      return merged;
    }

    return parsed;
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
    if (!Array.isArray(parsed) || parsed.length === 0) return defaults;
    
    // Automatically merge any newly introduced default services
    const existingIds = new Set(parsed.map((s: ServiceItem) => s.id));
    const missingDefaults = defaults.filter(d => !existingIds.has(d.id));
    if (missingDefaults.length > 0) {
      const merged = [...parsed, ...missingDefaults];
      localStorage.setItem(`${STORAGE_KEYS.SERVICES}_${lang}`, JSON.stringify(merged));
      return merged;
    }
    return parsed;
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
   THEME & DESIGN APPEARANCE CUSTOMIZATION
   ========================================================================== */

export const getStoredTheme = (): ThemeSettings => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME);
    if (!raw) return DEFAULT_THEME;
    return { ...DEFAULT_THEME, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_THEME;
  }
};

export const applyThemeToDocument = (theme: ThemeSettings): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--primary-gradient-end', theme.primaryGradientEnd);
  root.style.setProperty('--header-footer-bg', theme.headerFooterBg);
  root.style.setProperty('--body-bg-start', theme.bodyBgStart);
  root.style.setProperty('--body-bg-end', theme.bodyBgEnd);
  root.style.setProperty('--secondary-accent', theme.secondaryAccent);
  root.style.setProperty('--android-green', theme.androidGreen);
  const font = `'${theme.fontFamily || 'Cairo'}', 'Tajawal', sans-serif`;
  root.style.setProperty('--theme-font-family', font);
  if (document.body) {
    document.body.style.fontFamily = font;
  }
};

export const saveTheme = (theme: ThemeSettings): ThemeSettings => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
    applyThemeToDocument(theme);
  }
  return theme;
};

export const resetThemeToDefault = (): ThemeSettings => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.THEME);
    applyThemeToDocument(DEFAULT_THEME);
  }
  return DEFAULT_THEME;
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
    settings: getStoredSettings(),
    theme: getStoredTheme()
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
    if (data.theme && typeof data.theme === 'object') {
      saveTheme(data.theme);
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
    localStorage.removeItem(STORAGE_KEYS.THEME);
    applyThemeToDocument(DEFAULT_THEME);
  } catch {
    // ignore
  }
};
