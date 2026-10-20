import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Send, 
  Radio, 
  HardDrive, 
  Lock, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Smartphone, 
  Download, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface HeroProps {
  phone: string;
  searchQuery: string;
  onSearchChange: (term: string) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onOpenOrderModal: () => void;
  lang: Language;
  onOpenDownloadModal?: () => void;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  phone,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenOrderModal,
  lang,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const servicesEl = document.getElementById('services-section');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickTags = isAr ? [
    { label: 'فك شفرات الشبكات', cat: 'unlocking' as ServiceCategory },
    { label: 'فك أقفال الشاشة وFRP', cat: 'screen_locks' as ServiceCategory },
    { label: 'استرجاع صور وملفات محذوفة', cat: 'data_recovery' as ServiceCategory },
    { label: 'استرداد حسابات واتساب وفيسبوك', cat: 'account_recovery' as ServiceCategory },
    { label: 'حملات تسويق ممولة', cat: 'marketing' as ServiceCategory },
  ] : [
    { label: 'Carrier Network Unlocking', cat: 'unlocking' as ServiceCategory },
    { label: 'Screen & FRP Bypass', cat: 'screen_locks' as ServiceCategory },
    { label: 'Deleted Data & Photo Recovery', cat: 'data_recovery' as ServiceCategory },
    { label: 'Account Restoration', cat: 'account_recovery' as ServiceCategory },
    { label: 'Digital Ads & Marketing', cat: 'marketing' as ServiceCategory },
  ];

  const stats = [
    { value: '+9,850', label: t.stat1 },
    { value: '99.5%', label: t.stat2 },
    { value: '24/7', label: t.stat3 },
    { value: '100%', label: t.stat4 },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      
      {/* Decorative soft blue circles for background */}
      <div className="absolute top-10 right-5 w-80 sm:w-96 h-80 sm:h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-80 sm:w-96 h-80 sm:h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Left/Right Text Column */}
          <div className={`lg:col-span-7 space-y-5 sm:space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
            
            {/* Top Verified Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold shadow-[0_2px_10px_rgba(37,99,235,0.06)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
              </span>
              <span className="truncate">{t.heroBadge}</span>
              <span className="text-slate-300 hidden xs:inline">•</span>
              <span className="text-[#64748B] font-mono hidden xs:inline" dir="ltr">{phone}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.2] sm:leading-[1.15]">
              {t.heroTitlePrefix}{' '}
              <span className="text-[#2563EB]">
                {t.heroTitleHighlight}
              </span>{' '}
              {t.heroTitleSuffix}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#64748B] max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Interactive Search Bar for all services */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl w-full">
              <div className="relative flex items-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] rounded-2xl overflow-hidden border border-[#DBEAFE] focus-within:border-[#2563EB] bg-white transition">
                <div className={`absolute ${isAr ? 'right-3.5' : 'left-3.5'} text-[#3B82F6] pointer-events-none`}>
                  <Search className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full py-3.5 sm:py-4 bg-transparent text-[#0F172A] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none ${
                    isAr ? 'pr-11 pl-24 sm:pl-28' : 'pl-11 pr-24 sm:pr-28'
                  }`}
                />
                <button
                  type="submit"
                  className={`absolute ${
                    isAr ? 'left-1.5' : 'right-1.5'
                  } px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md`}
                >
                  {t.searchBtn}
                </button>
              </div>
            </form>

            {/* Quick Filter Tags */}
            <div className="space-y-2 pt-1">
              <div className="text-xs text-[#64748B] font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.popularQuickSearch}:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCategory(tag.cat);
                      const el = document.getElementById('services-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-[#0F172A] hover:text-[#2563EB] text-[11px] sm:text-xs font-semibold border border-[#DBEAFE] shadow-sm transition cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2">
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/967${phone}?text=${encodeURIComponent(isAr ? 'السلام عليكم مركز رقيب، أود الاستفسار وطلب إحدى خدمات البرمجة أو التسويق' : 'Hello Raqeeb Tech, I would like to inquire about your programming and marketing services.')}`}
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] transition active:scale-95 cursor-pointer min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.whatsappOrderNow}</span>
              </a>

              {/* Direct Call CTA */}
              <a
                href={`tel:${phone}`}
                id="hero-phone-btn"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-blue-50 border border-[#DBEAFE] text-[#0F172A] font-bold text-sm shadow-sm transition active:scale-95 cursor-pointer min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <span>{t.directCallWithNum}</span>
                <span dir="ltr" className="font-mono text-xs font-extrabold text-[#2563EB]">({phone})</span>
              </a>

              {/* Custom Order Request Button */}
              <button
                onClick={onOpenOrderModal}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition cursor-pointer min-h-[48px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.requestCustomOrder}</span>
              </button>
            </div>

            {/* Official Android App APK v2.2 & 4-Digit PIN Status */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-download-app-btn"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition cursor-pointer group"
              >
                <Smartphone className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition" />
                <span>{isAr ? 'حمّل تطبيق رقيب للأندرويد' : 'Download Raqeeb Android App'}</span>
                <span className="text-[10px] bg-emerald-950/40 text-emerald-100 px-2 py-0.5 rounded-md font-mono font-bold">
                  v2.2 APK
                </span>
                <Download className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* 4-Digit PIN entry button */}
              {onOpenPinModal && (
                <button
                  onClick={onOpenPinModal}
                  id="hero-pin-activation-btn"
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer ${
                    isAppUnlocked
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-white border-[#DBEAFE] text-[#2563EB] hover:bg-blue-50'
                  }`}
                  title={isAr ? 'إدخال رمز التفعيل المكون من 4 أرقام' : 'Enter 4-Digit Activation PIN'}
                >
                  <KeyRound className="w-4 h-4 text-[#3B82F6]" />
                  <span>{isAppUnlocked ? (isAr ? 'التطبيق مفعل برمز PIN ✅' : 'App Active (PIN) ✅') : (isAr ? 'أدخل كود التفعيل (4 أرقام) 🔑' : 'Enter 4-Digit PIN 🔑')}</span>
                </button>
              )}

              {onOpenDownloadModal && (
                <button
                  onClick={onOpenDownloadModal}
                  className="text-xs text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 cursor-pointer font-bold"
                >
                  {isAr ? 'خطوات التثبيت والباركود' : 'Install Guide & QR'}
                </button>
              )}
            </div>

          </div>

          {/* Hero Visual Card / Tech Showcase */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="rounded-2xl bg-white border border-[#DBEAFE] p-6 shadow-[0_4px_20px_rgba(37,99,235,0.08)] space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#DBEAFE] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-[#0F172A] mr-2">منصة رقيب المركزية</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  متاح 24/7 ONLINE
                </span>
              </div>

              {/* Hero Image */}
              <div className="relative rounded-xl overflow-hidden aspect-video w-full bg-slate-100 border border-[#DBEAFE] group">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                  alt="Raqeeb Tech Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2351]/80 via-transparent to-transparent" />
                
                <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} left-3 text-right`}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/95 text-[#0F172A] text-xs font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{isAr ? 'مختبر رقيب الهندسي المتطور' : 'Raqeeb Advanced Engineering Lab'}</span>
                  </div>
                </div>
              </div>

              {/* 4 Feature Cards with Circular Blue Icons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                      <Radio className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] truncate">{isAr ? 'فك الشفرات' : 'Unlocking'}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {isAr ? 'سيرفرات رسمية فورية' : 'Instant Servers'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] truncate">{isAr ? 'تخطي FRP' : 'FRP Bypass'}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {isAr ? 'لكافة الأجهزة والأنظمة' : 'All Android & iOS'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                      <HardDrive className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] truncate">{isAr ? 'استرجاع البيانات' : 'Data Recovery'}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {isAr ? 'ذواكر تالفة وفورمات' : 'Damaged & Formatted'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] truncate">{isAr ? 'تسويق رقمي' : 'Marketing'}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {isAr ? 'حملات ممولة مستهدفة' : 'Targeted Campaigns'}
                  </div>
                </div>
              </div>

              {/* Instant Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-[#DBEAFE] text-xs text-[#0F172A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  <span className="font-bold">{isAr ? 'فريق المهندسين متاح حالياً لاستقبال الأجهزة' : 'Engineers team is online now'}</span>
                </div>
                <a
                  href={`https://wa.me/967${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  {isAr ? 'تواصل الآن' : 'Connect'}
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* =========================================================================
            SECTION 5: NUMBERS & METRICS SECTION (100% and 24/7)
            Instruction 5: قسم الأرقام 100% و 24/7 يكون بخلفية بيضاء ونص أزرق كبير
            ========================================================================= */}
        <div className="mt-12 sm:mt-16 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DBEAFE] text-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] transition duration-300"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-[#2563EB]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#64748B] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
