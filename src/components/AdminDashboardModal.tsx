import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Smartphone, 
  Gamepad2, 
  ShieldCheck, 
  Settings, 
  Inbox, 
  Database, 
  Save, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Sparkles, 
  Layers, 
  Eye, 
  LogOut, 
  Phone, 
  MessageSquare,
  KeyRound,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Move,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { 
  SITE_DOMAIN, 
  SITE_URL, 
  BRAND_LOGO_PATH,
  getArticleCanonicalUrl, 
  getServiceCanonicalUrl, 
  getGoogleSearchConsoleInspectUrl, 
  getGoogleSearchConsoleDashboardUrl, 
  getGoogleRichResultsTestUrl, 
  generateSitemapXml 
} from '../utils/seoConfig';
import { 
  ArticleItem, 
  ServiceItem, 
  ApkItem, 
  CustomerOrder, 
  AdminSettings, 
  Language, 
  ServiceCategory,
  ApkCategory
} from '../types';
import { 
  getStoredArticles, 
  addArticle, 
  updateArticle, 
  deleteArticle, 
  getStoredApks, 
  addApk, 
  updateApk, 
  deleteApk, 
  moveApkUp,
  moveApkDown,
  setApkRank,
  getStoredServices, 
  addService, 
  updateService, 
  deleteService, 
  moveServiceUp,
  moveServiceDown,
  setServiceRank,
  getStoredCategories,
  moveCategoryUp,
  moveCategoryDown,
  setCategoryRank,
  resetCategoriesOrder,
  CategoryOrderItem,
  getStoredOrders, 
  updateOrderStatus, 
  deleteOrder, 
  getStoredSettings, 
  saveSettings, 
  exportAllDatabaseJSON, 
  importDatabaseJSON, 
  resetToDefaults,
  setAdminSession
} from '../utils/adminStorage';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  onDataChanged?: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
  onDataChanged
}) => {
  const isAr = lang === 'ar';

  // Active top navigation tab
  const [activeTab, setActiveTab] = useState<'apks' | 'articles' | 'categories' | 'services' | 'orders' | 'seo' | 'settings' | 'backup'>('apks');
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  // Loaded data lists
  const [apksList, setApksList] = useState<ApkItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryOrderItem[]>([]);
  const [articlesList, setArticlesList] = useState<ArticleItem[]>([]);
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [ordersList, setOrdersList] = useState<CustomerOrder[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(getStoredSettings());

  // Search queries within tabs
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications / Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals for editing / adding
  const [editingApk, setEditingApk] = useState<Partial<ApkItem> | null>(null);
  const [isApkFormOpen, setIsApkFormOpen] = useState(false);

  const [editingArticle, setEditingArticle] = useState<Partial<ArticleItem> | null>(null);
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);

  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);

  // Image upload preview helpers
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apkIconInputRef = useRef<HTMLInputElement>(null);

  // Load all data on open
  const refreshData = () => {
    setApksList(getStoredApks());
    setCategoriesList(getStoredCategories('ar'));
    setArticlesList(getStoredArticles());
    setServicesList(getStoredServices('ar'));
    setOrdersList(getStoredOrders());
    setSettings(getStoredSettings());
    if (onDataChanged) onDataChanged();
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reorder APKs
  const handleMoveApkUp = (id: string) => {
    const updated = moveApkUp(id);
    setApksList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تقديم التطبيق للأعلى ⬆️' : 'Moved APK up');
  };

  const handleMoveApkDown = (id: string) => {
    const updated = moveApkDown(id);
    setApksList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تأخير التطبيق للأسفل ⬇️' : 'Moved APK down');
  };

  const handleSetApkRank = (id: string, rank: number) => {
    const updated = setApkRank(id, rank);
    setApksList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? `تم تعيين الترتيب إلى #${rank} 🎯` : `Set rank to #${rank}`);
  };

  // Reorder Services
  const handleMoveServiceUp = (id: string) => {
    const updated = moveServiceUp(id, 'ar');
    setServicesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تقديم الخدمة للأعلى ⬆️' : 'Moved service up');
  };

  const handleMoveServiceDown = (id: string) => {
    const updated = moveServiceDown(id, 'ar');
    setServicesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تأخير الخدمة للأسفل ⬇️' : 'Moved service down');
  };

  const handleSetServiceRank = (id: string, rank: number) => {
    const updated = setServiceRank(id, rank, 'ar');
    setServicesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? `تم تعيين ترتيب الخدمة إلى #${rank} 🎯` : `Set service rank to #${rank}`);
  };

  // Reorder Categories
  const handleMoveCategoryUp = (id: ServiceCategory) => {
    const updated = moveCategoryUp(id, 'ar');
    setCategoriesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تقديم التصنيف للأعلى ⬆️' : 'Moved category up');
  };

  const handleMoveCategoryDown = (id: ServiceCategory) => {
    const updated = moveCategoryDown(id, 'ar');
    setCategoriesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? 'تم تأخير التصنيف للأسفل ⬇️' : 'Moved category down');
  };

  const handleSetCategoryRank = (id: ServiceCategory, rank: number) => {
    const updated = setCategoryRank(id, rank, 'ar');
    setCategoriesList(updated);
    if (onDataChanged) onDataChanged();
    showToast(isAr ? `تم تعيين ترتيب التصنيف إلى #${rank} 🎯` : `Set category rank to #${rank}`);
  };

  const handleResetCategories = () => {
    if (confirm(isAr ? 'هل أنت متأكد من استعادة الترتيب الافتراضي للتصنيفات؟' : 'Reset categories order?')) {
      const updated = resetCategoriesOrder('ar');
      setCategoriesList(updated);
      if (onDataChanged) onDataChanged();
      showToast(isAr ? 'تمت استعادة الترتيب الأصلي للتصنيفات' : 'Categories reset');
    }
  };

  if (!isOpen) return null;

  /* =========================================================================
     IMAGE FILE CONVERTER (File -> Base64)
     ========================================================================= */
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(isAr ? 'حجم الصورة كبير جداً! يرجى اختيار صورة أقل من 5 ميجابايت' : 'Image too large! Please choose an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onComplete(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  /* =========================================================================
     APK HANDLERS (Add, Edit, Delete, Save)
     ========================================================================= */
  const handleOpenAddApk = () => {
    setEditingApk({
      id: `apk-${Date.now()}`,
      title: '',
      category: 'apps',
      categoryName: 'تطبيقات الأندرويد',
      version: 'v1.0',
      size: '15 MB',
      downloadUrl: settings.apkDownloadUrl,
      icon: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=300&q=80',
      screenshots: [],
      description: '',
      features: ['تحميل سريع ومباشر', 'متوافق مع جميع أجهزة أندرويد', 'فحص أمني معتمد وخالٍ من الفيروسات'],
      downloadsCount: 1,
      rating: 5.0,
      isFeatured: true,
      dateAdded: new Date().toISOString().split('T')[0],
      packageType: 'apk'
    });
    setIsApkFormOpen(true);
  };

  const handleSaveApk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApk || !editingApk.title || !editingApk.downloadUrl) {
      alert(isAr ? 'يرجى كتابة اسم التطبيق ورابط التحميل' : 'Please provide app title and download link');
      return;
    }

    const fullApk: ApkItem = {
      id: editingApk.id || `apk-${Date.now()}`,
      title: editingApk.title,
      category: editingApk.category || 'apps',
      categoryName: editingApk.categoryName || (editingApk.category === 'games' ? 'ألعاب الأندرويد' : 'تطبيقات وأدوات'),
      version: editingApk.version || 'v1.0',
      size: editingApk.size || '20 MB',
      downloadUrl: editingApk.downloadUrl,
      icon: editingApk.icon || 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=300&q=80',
      screenshots: editingApk.screenshots || [],
      description: editingApk.description || '',
      features: editingApk.features || ['متوافق مع أندرويد', 'تحميل سريع ومباشر'],
      downloadsCount: editingApk.downloadsCount || 100,
      rating: editingApk.rating || 4.9,
      isFeatured: editingApk.isFeatured ?? true,
      dateAdded: editingApk.dateAdded || new Date().toISOString().split('T')[0],
      packageType: editingApk.packageType || 'apk'
    };

    updateApk(fullApk);
    setIsApkFormOpen(false);
    setEditingApk(null);
    refreshData();
    showToast(isAr ? 'تم حفظ التطبيق/اللعبة بنجاح ونشرها في المتجر!' : 'APK saved and published successfully!');
  };

  const handleDeleteApk = (id: string, title: string) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف (${title})؟` : `Delete APK (${title})?`)) {
      deleteApk(id);
      refreshData();
      showToast(isAr ? 'تم حذف التطبيق بنجاح' : 'APK deleted successfully');
    }
  };

  /* =========================================================================
     ARTICLE HANDLERS (Add, Edit, Delete, Save)
     ========================================================================= */
  const handleOpenAddArticle = () => {
    setEditingArticle({
      id: `art-${Date.now()}`,
      title: '',
      category: 'programming',
      categoryName: 'برمجة وتطوير الأنظمة',
      readTime: '4 دقائق',
      date: new Date().getFullYear().toString(),
      author: 'مشرف رقيب',
      summary: '',
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
      warningNote: '',
      stepsGuide: [
        {
          stepNumber: 1,
          stepTitle: 'الخطوة الأولى',
          stepDetail: 'شرح الخطوة الأولى بالتفصيل...',
          proTip: 'نصيحة تقنية مهمة'
        }
      ],
      contentSections: [
        {
          heading: 'مقدمة المقال',
          body: 'اكتب محتوى الفقرة هنا...'
        }
      ]
    });
    setIsArticleFormOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title || !editingArticle.summary) {
      alert(isAr ? 'يرجى كتابة عنوان المقال والملخص' : 'Please provide title and summary');
      return;
    }

    const fullArticle: ArticleItem = {
      id: editingArticle.id || `art-${Date.now()}`,
      title: editingArticle.title,
      category: editingArticle.category || 'programming',
      categoryName: editingArticle.categoryName || 'خدمات وحلول رقمية',
      readTime: editingArticle.readTime || '5 دقائق قراءة',
      date: editingArticle.date || `محدث لعام ${new Date().getFullYear()}`,
      author: editingArticle.author || 'فريق رقيب الهندسي',
      summary: editingArticle.summary,
      image: editingArticle.image || 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
      warningNote: editingArticle.warningNote || '',
      stepsGuide: editingArticle.stepsGuide || [],
      contentSections: editingArticle.contentSections || []
    };

    updateArticle(fullArticle);
    setIsArticleFormOpen(false);
    setEditingArticle(null);
    refreshData();
    showToast(isAr ? 'تم نشر وتحديث المقال بنجاح في الموقع!' : 'Article published successfully!');
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف المقال (${title})؟` : `Delete article (${title})?`)) {
      deleteArticle(id);
      refreshData();
      showToast(isAr ? 'تم حذف المقال بنجاح' : 'Article deleted successfully');
    }
  };

  /* =========================================================================
     SERVICE HANDLERS
     ========================================================================= */
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    const fullService: ServiceItem = {
      id: editingService.id || `serv-${Date.now()}`,
      title: editingService.title,
      category: editingService.category || 'programming',
      categoryName: editingService.categoryName || 'خدمات تقنية',
      shortDesc: editingService.shortDesc || '',
      fullDesc: editingService.fullDesc || '',
      icon: editingService.icon || 'Code',
      badge: editingService.badge || '',
      popular: editingService.popular ?? false,
      estimatedTime: editingService.estimatedTime || 'فوري',
      successRate: editingService.successRate || '99%',
      guarantee: editingService.guarantee || 'ضمان شامل 100%',
      steps: editingService.steps || [],
      requirements: editingService.requirements || [],
      features: editingService.features || []
    };

    updateService(fullService, 'ar');
    setIsServiceFormOpen(false);
    setEditingService(null);
    refreshData();
    showToast(isAr ? 'تم حفظ وتحديث الخدمة بنجاح' : 'Service updated successfully');
  };

  const handleDeleteService = (id: string, title: string) => {
    if (confirm(isAr ? `حذف الخدمة (${title})؟` : `Delete service (${title})?`)) {
      deleteService(id, 'ar');
      refreshData();
      showToast(isAr ? 'تم حذف الخدمة' : 'Service deleted');
    }
  };

  /* =========================================================================
     SETTINGS HANDLERS
     ========================================================================= */
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    refreshData();
    showToast(isAr ? 'تم حفظ وتطبيق الإعدادات بنجاح!' : 'Settings saved successfully!');
  };

  /* =========================================================================
     BACKUP & RESTORE HANDLERS
     ========================================================================= */
  const handleExportJSON = () => {
    const jsonStr = exportAllDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raqeeb-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isAr ? 'تم تحميل ملف النسخة الاحتياطية بنجاح!' : 'Backup exported successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importDatabaseJSON(content)) {
        refreshData();
        showToast(isAr ? 'تم استيراد واستعادة البيانات بنجاح!' : 'Data restored successfully!');
      } else {
        alert(isAr ? 'فشل استيراد الملف! تأكد من صحة تنسيق JSON.' : 'Failed to import JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm(isAr ? 'تحذير: هل أنت متأكد من استعادة بيانات الموقع الأصلية؟ سيتم مسح أي تعديلات غير محفوظة خارجياً.' : 'Reset all data to defaults?')) {
      resetToDefaults();
      refreshData();
      showToast(isAr ? 'تمت استعادة البيانات الافتراضية بنجاح' : 'Reset to defaults');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrlId(id);
      showToast(isAr ? 'تم نسخ رابط الأرشفة لجوجل كونسول!' : 'URL copied for Google Search Console!');
      setTimeout(() => setCopiedUrlId(null), 2500);
    }).catch(() => {
      // fallback
    });
  };

  const handleLogout = () => {
    setAdminSession(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-7xl h-[94vh] bg-slate-950 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/70 flex flex-col overflow-hidden text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Top Gradient Header Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-600 via-indigo-600 to-emerald-400 shrink-0" />

        {/* Dashboard Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          
          {/* Brand & Title */}
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 bg-white flex items-center justify-center shrink-0">
              <img 
                src={BRAND_LOGO_PATH} 
                alt="شعار رقيب" 
                className="w-full h-full object-contain rounded-[9px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white">
                  {isAr ? 'لوحة تحكم النظام الشاملة - رقيب' : 'Raqeeb Master Admin Panel'}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-600/50 text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isAr ? 'متصل (المالك)' : 'Owner Active'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isAr ? 'إدارة ونشر التطبيقات والألعاب APK، رفع الصور والمنشورات، تعديل الخدمات، وسجل الطلبات' : 'Manage APK apps & games, articles, images, services & orders'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              title={isAr ? 'تحديث البيانات' : 'Refresh'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-700/50 text-rose-300 text-xs font-bold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAr ? 'تسجيل خروج' : 'Logout'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-50 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Dashboard Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto shrink-0 no-scrollbar">
          
          <button
            onClick={() => { setActiveTab('apks'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'apks'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isAr ? 'متجر تطبيقات وألعاب APK' : 'APK Apps & Games'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 border border-slate-700">
              {apksList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('articles'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'المنشورات والمقالات والصور' : 'Articles & Images'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 border border-slate-700">
              {articlesList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('seo'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'أرشفة جوجل كونسول (SEO)' : 'Google Console (SEO)'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
              rqeebpro.store
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('categories'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{isAr ? 'ترتيب التصنيفات' : 'Categories Order'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 border border-slate-700">
              {categoriesList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'الخدمات وترتيبها' : 'Services & Order'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/80 border border-slate-700">
              {servicesList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>{isAr ? 'سجل الطلبات والاستفسارات' : 'Orders'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-950 border border-amber-600/50 text-amber-300">
              {ordersList.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isAr ? 'إعدادات النظام والـ PIN' : 'Settings & PIN'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('backup'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{isAr ? 'النسخ الاحتياطي JSON' : 'Backup & Restore'}</span>
          </button>

        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/70">
          
          {/* =================================================================
              TAB 1: APK APPS & GAMES STORE MANAGEMENT
              ================================================================= */}
          {activeTab === 'apks' && (
            <div className="space-y-6">
              
              {/* Actions Header Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'بحث في التطبيقات والألعاب...' : 'Search APKs and games...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddApk}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAr ? 'إضافة / رفع تطبيق أو لعبة APK جديدة' : 'Add / Upload New APK'}</span>
                  </button>
                </div>
              </div>

              {/* APKs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {apksList
                  .filter(apk => !searchQuery || apk.title.toLowerCase().includes(searchQuery.toLowerCase()) || apk.description.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(apk => (
                    <div 
                      key={apk.id}
                      className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 p-4 space-y-3 transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <img 
                            src={apk.icon} 
                            alt={apk.title} 
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-700 bg-slate-800 shrink-0 shadow-md"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                                {apk.category === 'games' ? '🎮 لعبة أندرويد' : '📱 تطبيق أندرويد'}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                                {apk.version}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white line-clamp-1">{apk.title}</h3>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                              <span>📦 {apk.size}</span>
                              <span>•</span>
                              <span>⭐ {apk.rating}</span>
                              <span>•</span>
                              <span>⬇️ {apk.downloadsCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {apk.description}
                        </p>

                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                          <div className="font-mono truncate text-[10px] text-cyan-400">
                            🔗 {apk.downloadUrl}
                          </div>
                        </div>

                        {/* Interactive Reordering Controls */}
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-700/60 text-cyan-300">
                              #{apksList.findIndex(a => a.id === apk.id) + 1}
                            </span>
                            <span className="text-[11px] text-slate-300 font-bold">{isAr ? 'الترتيب بالموقع' : 'Order'}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveApkUp(apk.id)}
                              title={isAr ? 'تقديم لأعلى' : 'Move Up'}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveApkDown(apk.id)}
                              title={isAr ? 'تأخير لأسفل' : 'Move Down'}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            
                            {/* Rank selector dropdown */}
                            <select
                              value={apksList.findIndex(a => a.id === apk.id) + 1}
                              onChange={(e) => handleSetApkRank(apk.id, Number(e.target.value))}
                              className="bg-slate-900 border border-cyan-700/50 text-cyan-200 rounded-lg px-2 py-1 text-xs cursor-pointer font-bold focus:outline-none"
                              title={isAr ? 'تحديد الترتيب بدقة' : 'Set rank'}
                            >
                              {apksList.map((_, rIdx) => (
                                <option key={rIdx + 1} value={rIdx + 1}>
                                  {isAr ? `ترتيب #${rIdx + 1}` : `Rank #${rIdx + 1}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <a
                          href={apk.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/50 text-cyan-300 text-[11px] font-bold transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isAr ? 'تجربة التحميل' : 'Download'}</span>
                        </a>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingApk({ ...apk });
                              setIsApkFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title={isAr ? 'تعديل' : 'Edit'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteApk(apk.id, apk.title)}
                            className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition cursor-pointer"
                            title={isAr ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* =================================================================
              TAB 2: ARTICLES, POSTS & IMAGE UPLOADS
              ================================================================= */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'بحث في المنشورات والمقالات...' : 'Search articles...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>

                <button
                  onClick={handleOpenAddArticle}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة منشور ومقال جديد (مع رفع الصور)' : 'Add New Article / Post'}</span>
                </button>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articlesList
                  .filter(art => !searchQuery || art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.summary.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(art => (
                    <div 
                      key={art.id}
                      className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 overflow-hidden flex flex-col justify-between transition"
                    >
                      <div>
                        <div className="relative h-44 bg-slate-950 overflow-hidden">
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            className="w-full h-full object-cover transition duration-300 hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-cyan-300 border border-cyan-800/50">
                            {art.categoryName}
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>✍️ {art.author}</span>
                            <span>•</span>
                            <span>⏱️ {art.readTime}</span>
                          </div>
                          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                            {art.summary}
                          </p>

                          {/* Google Search Console Direct Indexing URL */}
                          <div className="pt-2">
                            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className="flex items-center gap-1 text-cyan-400">
                                  <Globe className="w-3 h-3 text-cyan-400" />
                                  <span>{isAr ? 'رابط الأرشفة (Google Console):' : 'Indexing URL:'}</span>
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono">rqeebpro.store</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  readOnly
                                  value={getArticleCanonicalUrl(art.id)}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-cyan-200 select-all"
                                  onClick={(e) => (e.target as HTMLInputElement).select()}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleCopyUrl(getArticleCanonicalUrl(art.id), art.id)}
                                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0"
                                  title={isAr ? 'نسخ رابط المنشور' : 'Copy URL'}
                                >
                                  {copiedUrlId === art.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedUrlId === art.id ? (isAr ? 'تم!' : 'Done') : (isAr ? 'نسخ' : 'Copy')}</span>
                                </button>
                                <a
                                  href={getGoogleSearchConsoleInspectUrl(getArticleCanonicalUrl(art.id))}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0"
                                  title={isAr ? 'فحص وفهرسة الرابط في Google Search Console' : 'Inspect in Google Console'}
                                >
                                  <Search className="w-3 h-3" />
                                  <span>{isAr ? 'أرشفة' : 'Index'}</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          {art.stepsGuide?.length || 0} {isAr ? 'خطوات مصورة' : 'steps'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingArticle({ ...art });
                              setIsArticleFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title={isAr ? 'تعديل المقال' : 'Edit'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id, art.title)}
                            className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition cursor-pointer"
                            title={isAr ? 'حذف المقال' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* =================================================================
              TAB 3: SERVICES MANAGEMENT
              ================================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300">
                  {isAr ? 'إجمالي الخدمات المسجلة في الموقع:' : 'Registered Services:'} {servicesList.length}
                </span>
                <button
                  onClick={() => {
                    setEditingService({
                      id: `srv-${Date.now()}`,
                      title: '',
                      category: 'programming',
                      categoryName: 'خدمات برمجية',
                      shortDesc: '',
                      fullDesc: '',
                      estimatedTime: 'فوري',
                      successRate: '99%',
                      guarantee: 'ضمان شامل 100%',
                      steps: [
                        { title: 'الخطوة 1', description: 'تأكيد الطلب واستلام الهاتف' }
                      ],
                      requirements: ['رقم الجهاز IMEI'],
                      features: ['سرعة التنفيذ', 'سرية وأمان']
                    });
                    setIsServiceFormOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesList.map(srv => (
                  <div key={srv.id} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                          {srv.categoryName}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">{srv.successRate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{srv.shortDesc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">⏱️ {srv.estimatedTime}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingService({ ...srv });
                            setIsServiceFormOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id, srv.title)}
                          className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: CUSTOMER ORDERS & INQUIRIES
              ================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{isAr ? 'سجل طلبات واستفسارات العملاء' : 'Customer Service Requests'}</h3>
                  <p className="text-xs text-slate-400">{isAr ? 'الطلبات المرسلة عبر الموقع مع إمكانية الرد الفوري بالواتساب' : 'Track and reply to customer orders directly'}</p>
                </div>
              </div>

              <div className="space-y-3">
                {ordersList.map(ord => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">👤 {ord.clientName}</span>
                        <span className="text-xs font-mono text-cyan-400">📱 {ord.clientPhone}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ord.status === 'completed' 
                            ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                            : ord.status === 'in_progress'
                            ? 'bg-cyan-950 border border-cyan-800 text-cyan-300'
                            : 'bg-amber-950 border border-amber-800 text-amber-300'
                        }`}>
                          {ord.status === 'completed' ? 'مكتمل' : ord.status === 'in_progress' ? 'قيد التنفيذ' : 'جديد'}
                        </span>
                        <span className="text-[10px] text-slate-400">📅 {ord.date}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200">
                        🛠️ {ord.serviceTitle}
                      </div>
                      <p className="text-xs text-slate-400">
                        📝 {ord.details}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={`https://wa.me/967${ord.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`مرحباً أخي ${ord.clientName}، بخصوص طلبك في موقع رقيب (${ord.serviceTitle}):`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isAr ? 'رد واتساب' : 'WhatsApp'}</span>
                      </a>

                      <select
                        value={ord.status}
                        onChange={(e) => {
                          updateOrderStatus(ord.id, e.target.value as any);
                          refreshData();
                          showToast(isAr ? 'تم تحديث حالة الطلب' : 'Status updated');
                        }}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                      >
                        <option value="pending">{isAr ? 'قيد الانتظار' : 'Pending'}</option>
                        <option value="in_progress">{isAr ? 'جاري المعالجة' : 'In Progress'}</option>
                        <option value="completed">{isAr ? 'تم الإنجاز بنجاح' : 'Completed'}</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(isAr ? 'حذف هذا الطلب؟' : 'Delete order?')) {
                            deleteOrder(ord.id);
                            refreshData();
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-300 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* =================================================================
              TAB 5: APP & SYSTEM SETTINGS
              ================================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <form onSubmit={handleSaveSettings} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    {isAr ? 'إعدادات تطبيق رقيب وروابط التحميل الرئيسية' : 'Raqeeb App & Security Settings'}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'رابط تحميل تطبيق رقيب الأساسي APK (MediaFire أو غيره)' : 'Main Raqeeb APK Download URL'}
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={settings.apkDownloadUrl}
                    onChange={(e) => setSettings({ ...settings, apkDownloadUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-mono"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isAr ? 'هذا هو الرابط الرئيسي الذي يتم تحميل التطبيق منه عبر جميع أزرار الموقع وشاشات التحميل.' : 'This URL powers all download buttons across the entire website.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'رقم هاتف المالك وواتساب للتواصل' : 'Owner Phone & WhatsApp'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settings.ownerPhone}
                    onChange={(e) => setSettings({ ...settings, ownerPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'أكواد تفعيل التطبيق المصرحة (PIN المكون من 4 أرقام - مفصول بفاصلة)' : 'Valid 4-digit PIN codes (comma separated)'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settings.validPins.join(', ')}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      validPins: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono tracking-wider"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isAr ? 'الأكواد الحالية المعتمدة: 2029 (رئيسي للمالك) و 7855 (احتياطي)' : 'Current PINs: 2029 (Master) & 7855 (Backup)'}
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isAr ? 'حفظ وتطبيق جميع الإعدادات فوراً' : 'Save and Apply Settings'}</span>
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* =================================================================
              TAB 6: BACKUP & RESTORE
              ================================================================= */}
          {activeTab === 'backup' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center mx-auto text-cyan-400">
                  <Database className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{isAr ? 'تصدير واستيراد قاعدة بيانات الموقع' : 'Database Backup & Restore'}</h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'يمكنك تحميل نسخة كاملة من المقالات، التطبيقات، الألعاب، الخدمات والطلبات بصيغة JSON واستعادتها في أي وقت.' : 'Download complete JSON backup and restore it anytime.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="py-3 px-4 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'تصدير نسخة احتياطية (JSON)' : 'Export JSON Backup'}</span>
                  </button>

                  <label className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'استيراد نسخة احتياطية' : 'Import JSON Backup'}</span>
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImportJSON} 
                      className="hidden" 
                    />
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={handleResetDefaults}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer"
                  >
                    {isAr ? '⚠️ استعادة بيانات المصنع الافتراضية' : '⚠️ Reset to Factory Defaults'}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* =================================================================
              TAB 7: GOOGLE SEARCH CONSOLE & SEO HUB (rqeebpro.store)
              ================================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              
              {/* Header Hero Banner for rqeebpro.store Google Console */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/30">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-xl font-black text-white">
                          {isAr ? 'مركز أرشفة وفهرسة جوجل كونسول (Google Search Console)' : 'Google Search Console & SEO Hub'}
                        </h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500 text-emerald-300">
                          {isAr ? 'دومين رسمي معتمد' : 'Verified Domain'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {isAr 
                          ? 'إدارة وفحص روابط المنشورات والمقالات والخدمات لدومين rqeebpro.store لضمان تصدر نتائج بحث جوجل' 
                          : 'Manage and inspect canonical indexing URLs for rqeebpro.store in Google Search Console'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={getGoogleSearchConsoleDashboardUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>{isAr ? 'فتح لوحة Google Search Console' : 'Open Search Console'}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <a
                      href={`${SITE_URL}/sitemap.xml`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>sitemap.xml</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>

                {/* Domain Quick Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'النطاق الرسمي (Domain)' : 'Domain'}</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{SITE_DOMAIN}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'المقالات والمنشورات' : 'Indexed Articles'}</div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">{articlesList.length} {isAr ? 'منشور جاهز' : 'posts'}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'الخدمات التقنية' : 'Services'}</div>
                    <div className="text-xs sm:text-sm font-bold text-blue-400 font-mono">{servicesList.length} {isAr ? 'خدمة' : 'services'}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'حالة التوافق مع جوجل' : 'Google Readiness'}</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% SEO Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instruction Guide for the Owner */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'كيف تؤرشف أي منشور جديد في Google Search Console خلال 60 ثانية؟' : 'How to index any new post in Google Console in 60 seconds?'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-400">1. {isAr ? 'نسخ الرابط' : 'Copy URL'}</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isAr ? 'انقر على زر "نسخ" بجانب أي منشور في الجدول أدناه.' : 'Click Copy beside any post in the table below.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-400">2. {isAr ? 'فتح الفحص' : 'Open Inspection'}</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isAr ? 'انقر زر "فحص في Search Console" ليتم فتح أداة فحص العناوين لدومين rqeebpro.store.' : 'Click Inspect in Search Console to open URL inspection.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-400">3. {isAr ? 'اختبار الرابط' : 'Test Live URL'}</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isAr ? 'الصق الرابط واضغط Enter وانتظر ثوانٍ للتحقق من سلامة الصفحة وروبوت جوجل.' : 'Press Enter to test live page accessibility for Googlebot.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-400">4. {isAr ? 'طلب الفهرسة' : 'Request Indexing'}</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isAr ? 'انقر على زر "طلب الفهرسة (Request Indexing)" ليظهر المقال في بحث جوجل بسرعة.' : 'Click Request Indexing to submit the page to Google crawler.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table of All Articles & Posts for GSC Indexing */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>{isAr ? 'فهرس روابط المنشورات والمقالات (جاهزة للأرشفة بنقرة واحدة)' : 'Articles Indexing Directory'}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? `إجمالي ${articlesList.length} منشورات منشورة على دومين rqeebpro.store` : `Total ${articlesList.length} articles published on rqeebpro.store`}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const allUrls = [
                        `${SITE_URL}/`,
                        `${SITE_URL}/#services-section`,
                        `${SITE_URL}/#apk-store-section`,
                        `${SITE_URL}/#articles-section`,
                        ...articlesList.map(a => getArticleCanonicalUrl(a.id)),
                        ...servicesList.map(s => getServiceCanonicalUrl(s.id))
                      ].join('\n');
                      navigator.clipboard.writeText(allUrls).then(() => {
                        showToast(isAr ? 'تم نسخ كافة روابط الموقع دفعة واحدة!' : 'All site URLs copied to clipboard!');
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نسخ كافة روابط الموقع دفعة واحدة (Bulk Export)' : 'Copy All URLs'}</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">{isAr ? 'المنشور' : 'Article'}</th>
                        <th className="p-3.5">{isAr ? 'التصنيف' : 'Category'}</th>
                        <th className="p-3.5">{isAr ? 'رابط الأرشفة الرسمي (Canonical URL)' : 'Canonical URL'}</th>
                        <th className="p-3.5 text-center">{isAr ? 'الإجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {articlesList.map((art) => {
                        const url = getArticleCanonicalUrl(art.id);
                        const isCopied = copiedUrlId === art.id;

                        return (
                          <tr key={art.id} className="hover:bg-slate-950/50 transition">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={art.image} 
                                  alt="" 
                                  className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0" 
                                />
                                <div className="min-w-0 max-w-xs">
                                  <div className="font-bold text-white truncate" title={art.title}>
                                    {art.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    ID: {art.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-700 text-[10px] font-semibold text-cyan-300">
                                {art.categoryName}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5 max-w-md">
                                <input
                                  type="text"
                                  readOnly
                                  dir="ltr"
                                  value={url}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-emerald-300 select-all"
                                  onClick={(e) => (e.target as HTMLInputElement).select()}
                                />
                              </div>
                            </td>

                            <td className="p-3.5 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleCopyUrl(url, art.id)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                  title={isAr ? 'نسخ رابط المنشور' : 'Copy URL'}
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{isCopied ? (isAr ? 'تم!' : 'Done') : (isAr ? 'نسخ' : 'Copy')}</span>
                                </button>

                                <a
                                  href={getGoogleSearchConsoleInspectUrl(url)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer"
                                  title={isAr ? 'فحص وأرشفة الرابط في Google Search Console' : 'Inspect in Google Console'}
                                >
                                  <Search className="w-3.5 h-3.5" />
                                  <span>{isAr ? 'فحص في Search Console' : 'Inspect GSC'}</span>
                                  <ExternalLink className="w-3 h-3 opacity-70" />
                                </a>

                                <a
                                  href={getGoogleRichResultsTestUrl(url)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                                  title={isAr ? 'اختبار النتائج المنسقة' : 'Rich Results Test'}
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sitemap.xml Interactive Exporter */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'مولّد خريطة الموقع الحي (Sitemap.xml)' : 'Live Sitemap.xml Generator'}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isAr ? 'خريطة XML ديناميكية تشمل كافة المقالات والتطبيقات والصفحات جاهزة لتقديمها في Google Search Console > ملفات Sitemap' : 'Submit this sitemap URL in Google Search Console > Sitemaps'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const xml = generateSitemapXml(articlesList, servicesList);
                        navigator.clipboard.writeText(xml).then(() => {
                          showToast(isAr ? 'تم نسخ كود XML خريطة الموقع!' : 'Sitemap XML copied!');
                        });
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نسخ كود XML' : 'Copy XML'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const xml = generateSitemapXml(articlesList, servicesList);
                        const blob = new Blob([xml], { type: 'application/xml' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'sitemap.xml';
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast(isAr ? 'تم تحميل ملف sitemap.xml بنجاح!' : 'sitemap.xml downloaded!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تحميل sitemap.xml' : 'Download sitemap.xml'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-xs font-mono text-emerald-300 truncate" dir="ltr">
                    https://rqeebpro.store/sitemap.xml
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('https://rqeebpro.store/sitemap.xml').then(() => {
                        showToast(isAr ? 'تم نسخ رابط خريطة الموقع!' : 'Sitemap URL copied!');
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[10px] font-bold shrink-0 cursor-pointer"
                  >
                    {isAr ? 'نسخ الرابط' : 'Copy URL'}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* =====================================================================
          FORM MODAL: ADD / EDIT APK (APPS & GAMES)
          ===================================================================== */}
      {isApkFormOpen && editingApk && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-cyan-500/50 shadow-2xl p-6 sm:p-7 space-y-5 text-right my-auto max-h-[90vh] overflow-y-auto"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <span>{editingApk.title ? (isAr ? 'تعديل تطبيق / لعبة APK' : 'Edit APK') : (isAr ? 'إضافة ورفع تطبيق أو لعبة أندرويد APK' : 'Add New Android APK')}</span>
              </h3>
              <button
                onClick={() => setIsApkFormOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveApk} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'اسم التطبيق / اللعبة' : 'App / Game Title'} *</label>
                  <input
                    type="text"
                    value={editingApk.title || ''}
                    onChange={(e) => setEditingApk({ ...editingApk, title: e.target.value })}
                    placeholder={isAr ? 'مثال: تطبيق رقيب برو v2.3' : 'e.g. Raqeeb Pro v2.3'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'نوع التصنيف' : 'Category'} *</label>
                  <select
                    value={editingApk.category || 'apps'}
                    onChange={(e) => setEditingApk({ 
                      ...editingApk, 
                      category: e.target.value as ApkCategory,
                      categoryName: e.target.value === 'games' ? 'ألعاب الأندرويد' : e.target.value === 'tools' ? 'أدوات الصيانة والبرمجة' : e.target.value === 'security' ? 'أدوات الأمان والحماية' : 'تطبيقات الأندرويد'
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value="apps">{isAr ? '📱 تطبيق أندرويد أساسي' : 'Android App'}</option>
                    <option value="games">{isAr ? '🎮 لعبة أندرويد (APK Game)' : 'Android Game'}</option>
                    <option value="tools">{isAr ? '🛠️ أدوات صيانة وبرمجة وفك شفرات' : 'Tools & Unlock'}</option>
                    <option value="security">{isAr ? '🛡️ حماية وأمن سيبراني' : 'Security Tool'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'رقم الإصدار' : 'Version'}</label>
                  <input
                    type="text"
                    value={editingApk.version || 'v2.2'}
                    onChange={(e) => setEditingApk({ ...editingApk, version: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'حجم الملف' : 'File Size'}</label>
                  <input
                    type="text"
                    value={editingApk.size || '18 MB'}
                    onChange={(e) => setEditingApk({ ...editingApk, size: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'نوع الحزمة' : 'Package'}</label>
                  <select
                    value={editingApk.packageType || 'apk'}
                    onChange={(e) => setEditingApk({ ...editingApk, packageType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value="apk">APK (Direct Install)</option>
                    <option value="xapk">XAPK Bundle</option>
                  </select>
                </div>
              </div>

              {/* Download URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'رابط تحميل ملف الـ APK المباشر (MediaFire أو غيره)' : 'Direct APK Download URL'} *</label>
                <input
                  type="url"
                  dir="ltr"
                  value={editingApk.downloadUrl || ''}
                  onChange={(e) => setEditingApk({ ...editingApk, downloadUrl: e.target.value })}
                  placeholder="https://www.mediafire.com/file/.../app.apk/file"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-cyan-400 font-mono"
                  required
                />
              </div>

              {/* Icon Image Upload (File or URL) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  {isAr ? 'أيقونة التطبيق (رفع صورة من جهازك أو إدخال رابط)' : 'App Icon (Upload File or Enter URL)'}
                </label>
                
                <div className="flex items-center gap-3">
                  {editingApk.icon && (
                    <img 
                      src={editingApk.icon} 
                      alt="Icon Preview" 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700 bg-slate-800 shrink-0" 
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      dir="ltr"
                      value={editingApk.icon || ''}
                      onChange={(e) => setEditingApk({ ...editingApk, icon: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono"
                    />
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-bold cursor-pointer transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isAr ? 'اختر صورة من جهازك' : 'Upload Image File'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageFileUpload(e, (base64) => setEditingApk(prev => prev ? { ...prev, icon: base64 } : null))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'وصف التطبيق / اللعبة' : 'Description'}</label>
                <textarea
                  rows={3}
                  value={editingApk.description || ''}
                  onChange={(e) => setEditingApk({ ...editingApk, description: e.target.value })}
                  placeholder={isAr ? 'اكتب وصفاً جذاباً للتطبيق ومزاياه...' : 'Describe features...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              {/* Features list */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isAr ? 'أهم مميزات التطبيق (مفصولة بفاصلة)' : 'Features (Comma separated)'}
                </label>
                <input
                  type="text"
                  value={editingApk.features ? editingApk.features.join(', ') : ''}
                  onChange={(e) => setEditingApk({ 
                    ...editingApk, 
                    features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) 
                  })}
                  placeholder={isAr ? 'تحميل مباشر, مجاني بالكامل, يدعم أندرويد 14' : 'Direct download, free, Android 14'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsApkFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ ونشر في المتجر فوراً' : 'Save & Publish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          FORM MODAL: ADD / EDIT ARTICLE & IMAGE UPLOAD
          ===================================================================== */}
      {isArticleFormOpen && editingArticle && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-cyan-500/50 shadow-2xl p-6 sm:p-7 space-y-5 text-right my-auto max-h-[90vh] overflow-y-auto"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>{editingArticle.title ? (isAr ? 'تعديل المنشور / المقال' : 'Edit Article') : (isAr ? 'إضافة منشور جديد مع رفع الصور' : 'Add New Article with Image Upload')}</span>
              </h3>
              <button
                onClick={() => setIsArticleFormOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'عنوان المقال / المنشور' : 'Article Title'} *</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder={isAr ? 'اكتب عنواناً جذاباً ومعبراً...' : 'Enter title...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'التصنيف' : 'Category'}</label>
                  <select
                    value={editingArticle.category || 'programming'}
                    onChange={(e) => setEditingArticle({ 
                      ...editingArticle, 
                      category: e.target.value as ServiceCategory,
                      categoryName: e.target.value === 'data_recovery' ? 'استرداد البيانات والملفات' : e.target.value === 'unlocking' ? 'فك الشفرات والأجهزة' : e.target.value === 'screen_locks' ? 'فك الإقفال وحماية الهواتف' : 'برمجة وتطوير الأنظمة'
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value="data_recovery">{isAr ? 'استرداد البيانات والملفات' : 'Data Recovery'}</option>
                    <option value="unlocking">{isAr ? 'فك الشفرات والأجهزة' : 'Carrier Unlock'}</option>
                    <option value="screen_locks">{isAr ? 'فك الإقفال وحماية الهواتف' : 'Screen Locks'}</option>
                    <option value="programming">{isAr ? 'برمجة وتطوير الأنظمة' : 'Programming'}</option>
                    <option value="marketing">{isAr ? 'تسويق رقمي وإعلانات' : 'Marketing'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'اسم الكاتب' : 'Author'}</label>
                  <input
                    type="text"
                    value={editingArticle.author || 'مشرف رقيب'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD WITH PREVIEW */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{isAr ? 'صورة المقال (رفع صورة من الكمبيوتر/الهاتف أو رابط)' : 'Article Image (Upload or URL)'}</span>
                  <span className="text-[10px] text-cyan-400">{isAr ? 'صورة واضحة وذات جودة عالية' : 'High quality'}</span>
                </label>

                {editingArticle.image && (
                  <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img 
                      src={editingArticle.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                      {isAr ? 'معاينة الصورة الحالية' : 'Current preview'}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={editingArticle.image || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono"
                  />

                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold cursor-pointer transition shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isAr ? 'رفع صورة من جهازك' : 'Upload File'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageFileUpload(e, (base64) => setEditingArticle(prev => prev ? { ...prev, image: base64 } : null))}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'ملخص المقال' : 'Summary'} *</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  placeholder={isAr ? 'نبذة مختصرة تظهر في بطاقة المقال...' : 'Short summary...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'نص المقال الرئيسي' : 'Main Content'}</label>
                <textarea
                  rows={4}
                  value={editingArticle.contentSections?.[0]?.body || ''}
                  onChange={(e) => setEditingArticle({ 
                    ...editingArticle, 
                    contentSections: [{ heading: 'تفاصيل الموضوع', body: e.target.value }] 
                  })}
                  placeholder={isAr ? 'اكتب الشرح والمحتوى الكامل هنا...' : 'Full article body...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed"
                />
              </div>

              {/* Google Search Console & Canonical URL Settings */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">{isAr ? 'رابط الأرشفة المباشر في Google Search Console' : 'Google Console Indexing Link'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                    rqeebpro.store
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] text-slate-400">
                    {isAr ? 'معرف الرابط (Slug ID):' : 'Slug ID:'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editingArticle.id || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
                    placeholder="post-custom-slug"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300"
                  />
                </div>

                {editingArticle.id && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-[11px] text-slate-400 font-medium">
                      {isAr ? 'الرابط المعتمد النهائي للأرشفة:' : 'Final Canonical URL for GSC:'}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        dir="ltr"
                        value={getArticleCanonicalUrl(editingArticle.id)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-300 select-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(getArticleCanonicalUrl(editingArticle.id!), editingArticle.id!)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isAr ? 'نسخ' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      💡 {isAr ? 'انسخ هذا الرابط والصقه في Google Search Console > فحص العناوين، واضغط (طلب الفهرسة) ليظهر منشورك في بحث جوجل فوراً.' : 'Paste this URL in GSC URL Inspection and click Request Indexing.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'نشر وتحديث المقال' : 'Save & Publish'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          FORM MODAL: ADD / EDIT SERVICE
          ===================================================================== */}
      {isServiceFormOpen && editingService && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-cyan-500/50 shadow-2xl p-6 sm:p-7 space-y-4 text-right my-auto max-h-[90vh] overflow-y-auto"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>{editingService.title ? (isAr ? 'تعديل الخدمة' : 'Edit Service') : (isAr ? 'إضافة خدمة جديدة' : 'Add New Service')}</span>
              </h3>
              <button
                onClick={() => setIsServiceFormOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'عنوان الخدمة' : 'Title'} *</label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'الوصف المختصر' : 'Short Description'}</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'الوقت المقدر' : 'Time'}</label>
                  <input
                    type="text"
                    value={editingService.estimatedTime || 'فوري'}
                    onChange={(e) => setEditingService({ ...editingService, estimatedTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{isAr ? 'نسبة النجاح' : 'Success Rate'}</label>
                  <input
                    type="text"
                    value={editingService.successRate || '99%'}
                    onChange={(e) => setEditingService({ ...editingService, successRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold cursor-pointer"
                >
                  {isAr ? 'حفظ الخدمة' : 'Save Service'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
