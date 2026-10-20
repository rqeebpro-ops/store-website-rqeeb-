import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  QrCode, 
  CheckCircle2, 
  Zap, 
  WifiOff, 
  BellRing 
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const APK_DOWNLOAD_URL = 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file';

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(APK_DOWNLOAD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadClick = () => {
    window.open(APK_DOWNLOAD_URL, '_blank');
  };

  // SVG QR Code pointing to the download URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APK_DOWNLOAD_URL)}&bgcolor=ffffff&color=0a2351`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0A2351]/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-white border border-[#DBEAFE] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(10,35,81,0.2)] p-4 sm:p-6 md:p-8 ${isAr ? 'text-right' : 'text-left'} space-y-5 scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button - 44px touch target */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] hover:text-[#0F172A] transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-[#DBEAFE] shadow-sm p-1 shrink-0 flex items-center justify-center">
            <img 
              src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
              alt="تطبيق رقيب" 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-xs font-bold border border-emerald-200">
              <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{isAr ? 'تطبيق الأندرويد المعتمد v2.2' : 'Official Android App v2.2'}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-[#0F172A] leading-snug">
              {t.appModalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {t.appModalSubtitle}
            </p>
          </div>
        </div>

        {/* App Meta Specifications Badges */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="bg-[#F8FAFF] p-2.5 sm:p-3 rounded-xl border border-[#DBEAFE] text-center space-y-1">
            <div className="text-[10px] text-[#64748B] font-semibold">{isAr ? 'الإصدار' : 'Version'}</div>
            <div className="text-xs sm:text-sm font-bold text-[#2563EB] font-mono">v2.2 (APK)</div>
          </div>
          <div className="bg-[#F8FAFF] p-2.5 sm:p-3 rounded-xl border border-[#DBEAFE] text-center space-y-1">
            <div className="text-[10px] text-[#64748B] font-semibold">{isAr ? 'التوافق' : 'Compatibility'}</div>
            <div className="text-xs sm:text-sm font-bold text-[#16A34A]">Android 7.0+</div>
          </div>
          <div className="bg-[#F8FAFF] p-2.5 sm:p-3 rounded-xl border border-[#DBEAFE] text-center space-y-1">
            <div className="text-[10px] text-[#64748B] font-semibold">{isAr ? 'الأمان' : 'Security'}</div>
            <div className="text-xs sm:text-sm font-bold text-[#2563EB] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{isAr ? 'آمن 100%' : '100% Safe'}</span>
            </div>
          </div>
        </div>

        {/* Direct Download Call to Action */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent border border-emerald-300 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-xs font-bold text-[#0F172A]">{isAr ? 'رابط مباشر وسريع من MediaFire' : 'Direct Fast MediaFire Link'}</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#64748B]">APK • ~15 MB</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleDownloadClick}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white font-black text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] transition cursor-pointer min-h-[46px]"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadDirectBtn}</span>
            </button>

            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#DBEAFE] font-bold text-xs transition cursor-pointer min-h-[46px]"
            >
              <QrCode className="w-4 h-4 text-[#3B82F6]" />
              <span>{showQr ? (isAr ? 'إخفاء الباركود' : 'Hide QR') : (isAr ? 'مسح الباركود' : 'Scan QR')}</span>
            </button>
          </div>
        </div>

        {/* QR Code Reveal */}
        {showQr && (
          <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DBEAFE] flex flex-col items-center justify-center space-y-2 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 bg-white rounded-xl shadow-md border border-[#DBEAFE]">
              <img 
                src={qrCodeUrl} 
                alt="Raqeeb App Download QR Code" 
                className="w-36 h-36 mx-auto rounded"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-[#64748B]">
              {isAr ? 'وجّه كاميرا هاتفك لمسح الكود والتحميل مباشرة' : 'Scan with your phone camera to download instantly'}
            </p>
          </div>
        )}

        {/* Link Copy Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#64748B]">
            {isAr ? 'رابط التحميل المباشر للنسخ والمشاركة:' : 'Direct Download Link:'}
          </label>
          <div className="flex items-center gap-2 bg-[#F8FAFF] p-2 sm:p-2.5 rounded-xl border border-[#DBEAFE]">
            <input
              type="text"
              readOnly
              value={APK_DOWNLOAD_URL}
              className="flex-1 bg-transparent text-xs text-[#0F172A] font-mono focus:outline-none select-all truncate"
              dir="ltr"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-[#2563EB] border border-[#DBEAFE] text-xs font-bold transition shrink-0 cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{isAr ? 'نسخ الرابط' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 pt-2 border-t border-[#DBEAFE]">
          <div className="text-xs font-bold text-[#0F172A]">{t.appFeaturesTitle}:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748B]">
            <div className="flex items-center gap-2 bg-[#F8FAFF] p-2 rounded-lg border border-[#DBEAFE]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              <span>{t.appFeature1}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFF] p-2 rounded-lg border border-[#DBEAFE]">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.appFeature2}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFF] p-2 rounded-lg border border-[#DBEAFE]">
              <BellRing className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
              <span>{t.appFeature3}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F8FAFF] p-2 rounded-lg border border-[#DBEAFE]">
              <WifiOff className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{t.appFeature4}</span>
            </div>
          </div>
        </div>

        {/* Installation Guide Steps */}
        <div className="bg-[#F8FAFF] border border-[#DBEAFE] rounded-2xl p-4 space-y-2">
          <h4 className="text-xs font-bold text-[#0F172A]">
            {t.howToInstallTitle}
          </h4>
          <ol className="space-y-1.5 text-[11px] sm:text-xs text-[#64748B] list-decimal list-inside leading-relaxed">
            <li>{t.installStep1}</li>
            <li>{t.installStep2}</li>
            <li>{t.installStep3}</li>
          </ol>
        </div>

      </div>
    </div>
  );
};
