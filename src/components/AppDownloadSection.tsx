import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  QrCode, 
  Zap, 
  WifiOff, 
  BellRing, 
  CheckCircle2,
  Lock,
  Radio,
  HardDrive,
  KeyRound
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface AppDownloadSectionProps {
  lang: Language;
  onOpenDownloadModal?: () => void;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ 
  lang,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(APK_DOWNLOAD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APK_DOWNLOAD_URL)}&bgcolor=ffffff&color=0a2351`;

  return (
    <section id="download-app" className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFF] via-white to-[#E6F0FF] relative overflow-hidden border-t border-b border-[#DBEAFE]">
      
      {/* Background soft blue circles */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-sm">
            <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>{isAr ? 'تطبيق الأندرويد الرسمي المعتمد' : 'Official Android Application'}</span>
            <span className="bg-[#22C55E] text-white text-[10px] px-2 py-0.2 rounded-full font-mono font-bold">v2.2</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            {t.appModalTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'احصل على جميع خدمات فك الشفرات، استرجاع الحسابات والبيانات المحذوفة، وتطوير البرمجيات والتسويق مباشرة على هاتفك الذكي بسرعة وسرية تامة وبدون أي إعلانات مزعجة.'
              : 'Access all unlocking tools, data and account recovery services, and high-impact digital marketing right from your Android device with zero lag and total confidentiality.'}
          </p>
        </div>

        {/* Bento / Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: App Features & Download Buttons */}
          <div className={`lg:col-span-7 space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            
            {/* Main Action Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DBEAFE] shadow-[0_4px_20px_rgba(37,99,235,0.08)] space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DBEAFE] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-[#DBEAFE] shadow-sm p-1 flex items-center justify-center shrink-0">
                    <img 
                      src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
                      alt="تطبيق رقيب" 
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#0F172A] flex items-center gap-2">
                      <span>{isAr ? 'تطبيق رَقِـيـب (نسخة APK)' : 'Raqeeb App (APK Release)'}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-mono">
                      <span>v2.2</span>
                      <span>•</span>
                      <span className="text-[#22C55E] font-bold">{isAr ? 'محدث ومفحوص أمنياً 100%' : 'Verified Secure'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-[#DBEAFE] text-[11px] text-[#2563EB] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{isAr ? 'سيرفر MediaFire المباشر' : 'Direct MediaFire Server'}</span>
                </div>
              </div>

              {/* Big CTA Download Button */}
              <div className="space-y-3">
                <a
                  href={APK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="section-download-apk-btn"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-black text-sm sm:text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] transition duration-300 transform active:scale-95 cursor-pointer min-h-[54px]"
                >
                  <Download className="w-5 h-5 animate-bounce" />
                  <span>{t.downloadApkNow}</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>

                {/* Secondary buttons: Copy link & QR code toggle */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={handleCopy}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F8FAFF] hover:bg-blue-50 text-[#0F172A] text-xs sm:text-sm font-bold border border-[#DBEAFE] transition cursor-pointer min-h-[44px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#22C55E]" />
                        <span className="text-[#22C55E]">{t.apkLinkCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#2563EB]" />
                        <span>{t.copyApkLink}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-xs sm:text-sm font-bold border border-[#DBEAFE] transition cursor-pointer min-h-[44px]"
                  >
                    <QrCode className="w-4 h-4 text-[#2563EB]" />
                    <span>{showQr ? (isAr ? 'إخفاء رمز الاستجابة (QR)' : 'Hide QR') : (isAr ? 'مسح رمز QR من الشاشة' : 'Scan QR Code')}</span>
                  </button>
                </div>
              </div>

              {/* QR Code container if opened */}
              {showQr && (
                <div className="p-4 bg-[#F8FAFF] rounded-xl border border-[#DBEAFE] text-center space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-xs font-semibold text-[#0F172A]">
                    {isAr ? 'وجّه كاميرا هاتفك إلى الرمز لبدء التنزيل الفوري على الهاتف:' : 'Point your smartphone camera at this code to begin instant download:'}
                  </p>
                  <div className="inline-block p-3 bg-white border border-[#DBEAFE] rounded-xl shadow-md">
                    <img 
                      src={qrCodeUrl} 
                      alt="Scan to Download Raqeeb APK" 
                      className="w-40 h-40 sm:w-44 sm:h-44 mx-auto rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 4 Steps Install & PIN Activation Guide */}
              <div className="pt-2 border-t border-[#DBEAFE] space-y-2">
                <div className="text-xs font-bold text-[#0F172A] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{t.howToInstallTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#64748B]">
                  <div className="bg-[#F8FAFF] p-3 rounded-xl border border-[#DBEAFE]">
                    <span className="font-bold text-[#2563EB] block mb-1">1. {isAr ? 'التنزيل' : 'Download'}</span>
                    <span>{isAr ? 'حمّل الملف مباشرة بصيغة APK' : 'Download raqeeb-v2.2.apk'}</span>
                  </div>
                  <div className="bg-[#F8FAFF] p-3 rounded-xl border border-[#DBEAFE]">
                    <span className="font-bold text-[#2563EB] block mb-1">2. {isAr ? 'تأكيد الاشتراك' : 'WhatsApp'}</span>
                    <span>{isAr ? 'أرسل الطلب للمالك عبر واتساب' : 'Submit order to owner on WhatsApp'}</span>
                  </div>
                  <div className="bg-[#F8FAFF] p-3 rounded-xl border border-[#DBEAFE]">
                    <span className="font-bold text-[#2563EB] block mb-1">3. {isAr ? 'رمز التفعيل' : '4-Digit PIN'}</span>
                    <span>{isAr ? 'أدخل الرمز السري (4 أرقام)' : 'Enter 4-digit PIN to activate app'}</span>
                  </div>
                </div>
              </div>

              {/* 4-Digit Activation Action Strip */}
              {onOpenPinModal && (
                <div className="p-4 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-right w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-[#DBEAFE] flex items-center justify-center shrink-0 text-[#3B82F6]">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span>{isAr ? 'تفعيل التطبيق برمز PIN (4 أرقام)' : '4-Digit PIN Activation'}</span>
                        {isAppUnlocked && <span className="text-[#22C55E] text-[10px]">({isAr ? 'مفعل ومصرح ✅' : 'Active'})</span>}
                      </div>
                      <p className="text-[11px] text-[#64748B]">
                        {isAr ? 'هل وصلك رمز التفعيل من المالك؟ انقر لإدخاله فوراً' : 'Have your 4-digit code? Click to activate now'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenPinModal}
                    id="section-pin-verify-btn"
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      isAppUnlocked
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                        : 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-md'
                    }`}
                  >
                    {isAppUnlocked 
                      ? (isAr ? 'التطبيق مفعل برمز PIN ✅' : 'App Active (PIN) ✅') 
                      : (isAr ? 'أدخل رمز التفعيل الآن 🔑' : 'Enter 4-Digit PIN 🔑')}
                  </button>
                </div>
              )}

            </div>

            {/* App Features 4-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>{isAr ? 'طلب فوري ومباشر' : 'Instant 1-Tap Requests'}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  {t.appFeature1}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  <span>{isAr ? 'استشارات مشفرة ومجانية' : 'Encrypted Free Consults'}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  {t.appFeature2}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                  <BellRing className="w-4 h-4 text-[#3B82F6]" />
                  <span>{isAr ? 'تتبع حالة جهازك' : 'Live Status Updates'}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  {t.appFeature3}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                  <WifiOff className="w-4 h-4 text-indigo-500" />
                  <span>{isAr ? 'دليل أوفلاين' : 'Offline Directory'}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  {t.appFeature4}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Phone Mockup Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              
              {/* Outer Phone Shell / Frame */}
              <div className="relative rounded-[42px] p-3 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 shadow-2xl border-4 border-slate-300">
                
                {/* Speaker & camera notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                  <div className="w-10 h-1.5 rounded-full bg-slate-700" />
                </div>

                {/* Phone Screen Mockup Content */}
                <div className="rounded-[32px] overflow-hidden bg-white border border-[#DBEAFE] p-4 pt-10 space-y-4 relative">
                  
                  {/* Mock App Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono px-1">
                    <span>12:45</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <div className="w-4 h-2 bg-[#22C55E] rounded-sm" />
                    </div>
                  </div>

                  {/* Mock App Header */}
                  <div className="flex items-center justify-between bg-[#0A2351] text-white p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-sm">
                        R
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-none">رَقِـيـب PRO</div>
                        <div className="text-[9px] text-blue-300 font-mono">v2.2 Verified</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  </div>

                  {/* Mock App Quick Services Cards */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-[#3B82F6]" />
                        <span className="text-xs font-bold text-[#0F172A]">فك شفرات الشبكات</span>
                      </div>
                      <span className="text-[10px] text-[#22C55E] font-bold">فوري ⚡</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#3B82F6]" />
                        <span className="text-xs font-bold text-[#0F172A]">تخطي قفل FRP وجوجل</span>
                      </div>
                      <span className="text-[10px] text-[#2563EB] font-bold">متاح</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-[#3B82F6]" />
                        <span className="text-xs font-bold text-[#0F172A]">استرجاع الصور والملفات</span>
                      </div>
                      <span className="text-[10px] text-[#22C55E] font-bold">آمن 100%</span>
                    </div>
                  </div>

                  {/* Mock App Action Button */}
                  <a
                    href={APK_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2.5 px-3 rounded-xl bg-[#22C55E] text-white font-black text-xs shadow-md"
                  >
                    {isAr ? 'اضغط لتحميل التطبيق الآن' : 'Download Raqeeb APK'}
                  </a>

                  {/* Bottom App Home Indicator */}
                  <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto mt-2" />

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
