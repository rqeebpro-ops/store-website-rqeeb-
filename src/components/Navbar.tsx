import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  ShieldCheck, 
  Radio, 
  Lock, 
  UserCheck, 
  HardDrive, 
  Code, 
  TrendingUp, 
  Menu, 
  X, 
  Copy, 
  Check, 
  Layers,
  Globe,
  Download,
  Smartphone,
  KeyRound,
  Gamepad2,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { ARTICLES_DATA } from '../data/articlesData';
import { ARTICLES_DATA_EN } from '../data/articlesDataEn';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';
import { getStoredCategories, CategoryOrderItem } from '../utils/adminStorage';

interface NavbarProps {
  activeCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  onSelectArticle: (articleId: string) => void;
  onOpenOrderModal: (serviceTitle?: string) => void;
  phone: string;
  lang: Language;
  onToggleLanguage: () => void;
  onOpenDownloadModal: () => void;
  onOpenPinModal: () => void;
  isAppUnlocked: boolean;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
  categoriesList?: CategoryOrderItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onSelectArticle,
  onOpenOrderModal,
  phone,
  lang,
  onToggleLanguage,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked,
  onOpenAdminLogin,
  isAdminLoggedIn = false,
  onOpenAdminDashboard,
  categoriesList
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const categories = categoriesList && categoriesList.length > 0 
    ? categoriesList 
    : getStoredCategories(lang);
  const articles = isAr ? ARTICLES_DATA : ARTICLES_DATA_EN;

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [articlesDropdownOpen, setArticlesDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 10-clicks secret trigger on the logo (No visible button on the site)
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setLogoClicks(0);
    }, 4000);

    if (nextCount >= 10) {
      setLogoClicks(0);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (isAdminLoggedIn && onOpenAdminDashboard) {
        onOpenAdminDashboard();
      } else {
        onOpenAdminLogin();
      }
    }
  };

  const servicesRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (articlesRef.current && !articlesRef.current.contains(event.target as Node)) {
        setArticlesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'unlocking': return <Radio className="w-4 h-4 text-[#3B82F6]" />;
      case 'screen_locks': return <Lock className="w-4 h-4 text-[#3B82F6]" />;
      case 'account_recovery': return <UserCheck className="w-4 h-4 text-[#3B82F6]" />;
      case 'data_recovery': return <HardDrive className="w-4 h-4 text-[#3B82F6]" />;
      case 'programming': return <Code className="w-4 h-4 text-[#3B82F6]" />;
      case 'marketing': return <TrendingUp className="w-4 h-4 text-[#3B82F6]" />;
      default: return <Layers className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A2351] text-white shadow-xl border-b border-blue-900/50 transition-all select-none">
      
      {/* Top Mini Contact Ribbon */}
      <div className="bg-[#071838] border-b border-blue-900/40 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-blue-100/90">
          
          {/* Guarantee / Title Badge */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1.5 text-blue-300 font-bold truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 animate-pulse" />
              <span className="text-[11px] sm:text-xs truncate">{t.topRibbon}</span>
            </span>
          </div>

          {/* Quick Contact & PIN Activation Button in Ribbon */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Phone Number */}
            <div className="hidden sm:flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800/40">
              <Phone className="w-3 h-3 text-[#3B82F6]" />
              <a 
                href={`tel:${phone}`} 
                dir="ltr"
                className="font-mono font-bold text-white hover:text-blue-300 transition text-[11px]"
              >
                {phone}
              </a>
              <button 
                onClick={handleCopyPhone}
                className="hover:text-white text-blue-300 transition cursor-pointer p-0.5"
                title={t.copyNumber}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Direct WhatsApp */}
            <a 
              href={`https://wa.me/967${phone}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 bg-[#22C55E]/90 hover:bg-[#16A34A] text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] transition shadow-sm"
            >
              <MessageSquare className="w-3 h-3" />
              <span className="hidden xs:inline">{t.whatsapp}</span>
            </a>

            {/* 4-Digit Activation PIN Quick Button */}
            <button
              onClick={onOpenPinModal}
              id="navbar-pin-ribbon-btn"
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
                isAppUnlocked
                  ? 'bg-emerald-950/80 border-emerald-600/50 text-emerald-300'
                  : 'bg-blue-900/60 hover:bg-blue-800 border-blue-600/40 text-blue-200'
              }`}
            >
              <KeyRound className="w-3 h-3 text-blue-300" />
              <span>{isAppUnlocked ? (isAr ? 'مفعل ✅' : 'Unlocked ✅') : (isAr ? 'كود التفعيل (4 أرقام)' : 'PIN (4 Digits)')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo with 10-Clicks Secret Admin Trigger (No visible admin button!) */}
          <div className="relative flex items-center gap-3">
            <button
              onClick={handleLogoSecretClick}
              type="button"
              className="flex items-center gap-3 group text-right cursor-pointer select-none bg-transparent border-none p-0 focus:outline-none"
              title={isAr ? 'شعار منصة رقيب الرسمية' : 'Raqeeb Brand Logo'}
            >
              {/* Official Brand Logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition shrink-0 bg-white flex items-center justify-center">
                <img 
                  src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
                  alt="شعار رقيب" 
                  className="w-full h-full object-contain rounded-[9px]"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-blue-200 transition truncate">
                    {t.brandName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 shrink-0">
                    {t.brandBadge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-blue-200/80 font-medium truncate hidden xs:block">
                  {t.brandSub}
                </span>
              </div>
            </button>

            {/* Discreet countdown badge when owner taps 4 or more times */}
            {logoClicks >= 4 && (
              <div className="absolute -bottom-8 right-0 z-50 bg-[#071838] border border-blue-400 text-blue-200 px-3 py-1 rounded-full text-[10px] font-bold shadow-xl animate-bounce flex items-center gap-1.5 whitespace-nowrap">
                <Lock className="w-3 h-3 text-[#3B82F6]" />
                <span>{isAr ? `متبقي ${10 - logoClicks} ضغطات للدخول` : `${10 - logoClicks} clicks left`}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links & Dropdowns (Clean White Links) */}
          <nav className="hidden lg:flex items-center gap-1">
            <a 
              href="#home" 
              className="px-3 py-2 text-sm font-bold text-white hover:text-blue-300 rounded-lg hover:bg-blue-900/30 transition"
            >
              {t.home}
            </a>

            {/* APK Apps & Games Store Navigation Link */}
            <a 
              href="#apk-store-section" 
              className="px-3 py-2 text-sm font-bold text-blue-200 hover:text-white rounded-lg hover:bg-blue-900/40 transition flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-[#3B82F6]" />
              <span>{isAr ? 'متجر تطبيقات وألعاب APK' : 'APK Store'}</span>
              <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-bold">APK</span>
            </a>

            {/* Dropdown 1: Categories & Services */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setArticlesDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-white hover:text-blue-300 rounded-lg hover:bg-blue-900/30 transition group cursor-pointer"
              >
                <span>{t.serviceCategories}</span>
                <ChevronDown className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-2 w-80 bg-white border border-[#DBEAFE] rounded-2xl shadow-2xl p-2 z-50 text-[#0F172A]`}>
                  <div className="text-[11px] font-bold text-[#64748B] px-3 py-1.5 border-b border-[#DBEAFE]">
                    {t.serviceCategories}
                  </div>
                  <div className="mt-1 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setServicesDropdownOpen(false);
                          const el = document.getElementById('services-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-[#0F172A] hover:bg-blue-50 rounded-xl transition ${isAr ? 'text-right' : 'text-left'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-blue-50 text-[#3B82F6]">
                            {getCategoryIcon(cat.id)}
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-bold">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Articles and Guides */}
            <div className="relative" ref={articlesRef}>
              <button
                onClick={() => {
                  setArticlesDropdownOpen(!articlesDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-white hover:text-blue-300 rounded-lg hover:bg-blue-900/30 transition group cursor-pointer"
              >
                <span>{t.articlesAndGuides}</span>
                <ChevronDown className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${articlesDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {articlesDropdownOpen && (
                <div className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-2 w-80 bg-white border border-[#DBEAFE] rounded-2xl shadow-2xl p-2 z-50 text-[#0F172A]`}>
                  <div className="text-[11px] font-bold text-[#64748B] px-3 py-1.5 border-b border-[#DBEAFE]">
                    {t.articlesAndGuides}
                  </div>
                  <div className="mt-1 space-y-1 max-h-72 overflow-y-auto">
                    {articles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art.id);
                          setArticlesDropdownOpen(false);
                          const el = document.getElementById('articles-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full p-2.5 rounded-xl hover:bg-blue-50 transition ${isAr ? 'text-right' : 'text-left'}`}
                      >
                        <div className="text-xs font-bold text-[#0F172A] line-clamp-1">{art.title}</div>
                        <div className="text-[10px] text-[#64748B] mt-0.5">{art.category} • {art.readTime}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="#process-section" 
              className="px-3 py-2 text-sm font-bold text-white hover:text-blue-300 rounded-lg hover:bg-blue-900/30 transition"
            >
              {t.howWeWork}
            </a>

            <a 
              href="#contact-section" 
              className="px-3 py-2 text-sm font-bold text-white hover:text-blue-300 rounded-lg hover:bg-blue-900/30 transition"
            >
              {t.contactUs}
            </a>
          </nav>

          {/* Right Header Controls (Language + Download APK + Sidebar Drawer Toggle for Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-blue-900/50 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700/50 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Official Android APK Download Button */}
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold shadow-md shadow-emerald-900/30 transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isAr ? 'تحميل APK' : 'Download APK'}</span>
              <span className="text-[9px] bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono font-bold">v2.2</span>
            </a>

            {/* Direct Order Modal CTA */}
            <button
              onClick={() => onOpenOrderModal()}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition cursor-pointer"
            >
              <span>{t.requestService}</span>
            </button>

            {/* UNIFIED SIDEBAR TOGGLE BUTTON: WORKS ON MOBILE AND DESKTOP! */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-white border border-blue-700/60 text-xs font-bold transition cursor-pointer shadow-sm"
              title={isAr ? 'فتح القائمة الجانبية الشاملة' : 'Open Comprehensive Sidebar'}
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5 text-blue-200" />
              <span className="hidden sm:inline">{isAr ? 'القائمة' : 'Menu'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* =========================================================================
          COMPREHENSIVE SIDEBAR DRAWER (WORKS ON BOTH MOBILE & DESKTOP)
          Contains everything EXCEPT the Control Panel!
          ========================================================================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          
          {/* Backdrop overlay */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Slide-over Panel */}
          <div 
            className={`relative w-full max-w-md sm:max-w-lg h-full bg-[#0A2351] text-white border-l border-blue-900/50 shadow-2xl flex flex-col z-10 overflow-y-auto ${isAr ? 'text-right' : 'text-left'}`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-[#071838] border-b border-blue-900/40 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] flex items-center justify-center shrink-0 bg-white">
                  <img 
                    src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
                    alt="شعار رقيب" 
                    className="w-full h-full object-contain rounded-[9px]"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{t.brandName}</h3>
                  <p className="text-xs text-blue-200/80">{t.brandSub}</p>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-200 hover:text-white transition cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-4 sm:p-6 space-y-6 flex-1">
              
              {/* Quick Action Buttons Card */}
              <div className="p-4 rounded-2xl bg-[#0e2c66] border border-blue-800/50 space-y-3">
                <div className="text-xs font-bold text-blue-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                  <span>{isAr ? 'إجراءات سريعة ومباشرة' : 'Quick Actions'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      onOpenOrderModal();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold text-center shadow-md cursor-pointer"
                  >
                    {t.requestService}
                  </button>

                  <a
                    href={`https://wa.me/967${phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold text-center shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.whatsapp}</span>
                  </a>
                </div>
              </div>

              {/* Official Raqeeb Android APK App Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-[#0e2c66] to-[#0A2351] border border-emerald-600/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white font-bold">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{isAr ? 'تطبيق رقيب الرسمي للأندرويد' : 'Official Raqeeb Android App'}</div>
                      <div className="text-[10px] text-emerald-300 font-mono font-bold">APK Version v2.2</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 font-bold">
                    MediaFire
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={APK_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSidebarOpen(false)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تحميل مباشر APK' : 'Download APK'}</span>
                  </a>
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      onOpenDownloadModal();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-blue-200 text-xs font-bold border border-blue-700/50 cursor-pointer"
                  >
                    {isAr ? 'الباركود' : 'QR Code'}
                  </button>
                </div>
              </div>

              {/* 4-Digit Activation PIN Status & Action */}
              <div className="p-4 rounded-2xl bg-[#0e2c66] border border-blue-800/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-950 text-[#3B82F6]">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'كود التفعيل السري (PIN)' : 'Secret Activation PIN'}
                    </div>
                    <div className="text-[11px] text-blue-200/80">
                      {isAppUnlocked ? (isAr ? 'الحالة: مفعل ومرخص بالكامل ✅' : 'Status: Unlocked & Verified') : (isAr ? 'الحالة: يتطلب إدخال رمز 4 أرقام' : 'Status: Requires 4-Digit PIN')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    onOpenPinModal();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                    isAppUnlocked
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm'
                  }`}
                >
                  {isAppUnlocked ? (isAr ? 'تأكيد الرمز' : 'View') : (isAr ? 'إدخال الرمز' : 'Enter PIN')}
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-300 px-2 py-1">
                  {isAr ? 'أقسام وصفحات الموقع' : 'Main Pages & Sections'}
                </div>

                <a
                  href="#home"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0e2c66] transition text-sm font-bold text-white"
                >
                  <span>{t.home}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 text-blue-300" /> : <ArrowRight className="w-4 h-4 text-blue-300" />}
                </a>

                <a
                  href="#apk-store-section"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-700/50 hover:bg-blue-800 transition text-sm font-bold text-white"
                >
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-[#3B82F6]" />
                    <span>{isAr ? 'متجر تطبيقات وألعاب APK' : 'APK Apps & Games Store'}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">APK</span>
                </a>

                <a
                  href="#services-section"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0e2c66] transition text-sm font-bold text-white"
                >
                  <span>{t.servicesDirectory}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 text-blue-300" /> : <ArrowRight className="w-4 h-4 text-blue-300" />}
                </a>

                <a
                  href="#process-section"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0e2c66] transition text-sm font-bold text-white"
                >
                  <span>{t.howWeWork}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 text-blue-300" /> : <ArrowRight className="w-4 h-4 text-blue-300" />}
                </a>

                <a
                  href="#articles-section"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0e2c66] transition text-sm font-bold text-white"
                >
                  <span>{t.articlesAndGuides}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 text-blue-300" /> : <ArrowRight className="w-4 h-4 text-blue-300" />}
                </a>

                <a
                  href="#contact-section"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0e2c66] transition text-sm font-bold text-white"
                >
                  <span>{t.contactUs}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 text-blue-300" /> : <ArrowRight className="w-4 h-4 text-blue-300" />}
                </a>
              </div>

              {/* Dynamic Categories Grid in the Owner's Custom Order! */}
              <div className="p-4 rounded-2xl bg-[#0e2c66] border border-blue-800/50 space-y-3">
                <div className="text-xs font-bold text-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#3B82F6]" />
                    <span>{t.serviceCategories}:</span>
                  </div>
                  <span className="text-[11px] text-blue-300">({categories.length})</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setSidebarOpen(false);
                        const el = document.getElementById('services-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`p-2.5 rounded-xl bg-[#0A2351] hover:bg-blue-900/80 text-white flex items-center justify-between border border-blue-800/50 transition cursor-pointer text-xs font-semibold ${isAr ? 'text-right' : 'text-left'}`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-blue-300 font-mono font-bold shrink-0 ml-1">
                        ({cat.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Tel Card at bottom of drawer */}
              <div className="pt-2 pb-6">
                <a
                  href={`tel:${phone}`}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 border border-blue-700/60 text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4 text-[#3B82F6]" />
                  <span>{t.callDirectWithNum} <strong dir="ltr" className="font-mono">{phone}</strong></span>
                </a>
              </div>

            </div>

          </div>

        </div>
      )}

    </header>
  );
};
