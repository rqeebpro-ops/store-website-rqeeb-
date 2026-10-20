import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Share2, 
  Copy, 
  Check, 
  X,
  Smartphone,
  Download,
  KeyRound
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface SocialFloatingBarProps {
  phone: string;
  lang: Language;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
}

export const SocialFloatingBar: React.FC<SocialFloatingBarProps> = ({ 
  phone, 
  lang,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAr = lang === 'ar';
  const t = UI_TRANSLATIONS[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${isAr ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-40 flex flex-col items-start gap-2.5 sm:gap-3`}>
      {/* Expanded quick contact popup */}
      {isOpen && (
        <div 
          className={`bg-white border border-[#DBEAFE] p-4 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.15)] w-[calc(100vw-2rem)] max-w-xs sm:w-72 ${isAr ? 'text-right' : 'text-left'} space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-[#0F172A]`} 
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center justify-between border-b border-[#DBEAFE] pb-2">
            <span className="text-xs font-bold text-[#0F172A]">
              {isAr ? 'تواصل مباشر مع رقيب' : 'Direct Contact with Raqeeb'}
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg hover:bg-slate-100"
              aria-label="Close social panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Phone copy/call */}
          <div className="bg-[#F8FAFF] p-2.5 rounded-xl border border-[#DBEAFE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
              <a href={`tel:${phone}`} dir="ltr" className="text-xs font-mono font-bold text-[#0F172A] hover:text-[#2563EB]">
                {phone}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white border border-[#DBEAFE] hover:bg-blue-50 text-[#0F172A] transition cursor-pointer"
              title={t.copyNumber}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Social & App Quick Links (No Admin link!) */}
          <div className="space-y-2 text-xs">
            {/* Raqeeb Android App APK link */}
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 transition font-bold"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#22C55E]" />
                <span>{isAr ? 'تطبيق رقيب (APK v2.2)' : 'Raqeeb App (APK v2.2)'}</span>
              </div>
              <Download className="w-3.5 h-3.5 text-[#22C55E]" />
            </a>

            {/* 4-Digit Activation PIN button */}
            {onOpenPinModal && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPinModal();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition font-bold cursor-pointer ${
                  isAppUnlocked
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-blue-50 border-[#DBEAFE] text-[#2563EB] hover:bg-blue-100/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#3B82F6]" />
                  <span>{isAppUnlocked ? (isAr ? 'التطبيق مفعل برمز PIN' : 'App Active (PIN)') : (isAr ? 'كود التفعيل (4 أرقام)' : 'Enter 4-Digit PIN')}</span>
                </div>
                <span>{isAppUnlocked ? '✅' : '🔑'}</span>
              </button>
            )}

            <a
              href={`https://wa.me/967${phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white transition font-bold shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'محادثة واتساب سريعة' : 'Instant WhatsApp Chat'}</span>
            </a>

            <a
              href="https://t.me/raqeeb_tech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F172A] border border-[#DBEAFE] transition font-semibold"
            >
              <Send className="w-4 h-4 text-[#2563EB]" />
              <span>{isAr ? 'قناة تيليجرام للشروحات' : 'Telegram Channel'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main floating buttons */}
      <div className="flex items-center gap-2">
        {/* Floating WhatsApp with live badge */}
        <a
          href={`https://wa.me/967${phone}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full shadow-[0_8px_25px_rgba(34,197,94,0.35)] transition-all duration-300 transform active:scale-95 cursor-pointer min-h-[48px]"
          title={t.whatsapp}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <div className={`${isAr ? 'text-right' : 'text-left'} hidden sm:block`}>
            <div className="text-[11px] leading-tight font-bold text-emerald-50">{isAr ? 'واتساب 24/7' : 'WhatsApp 24/7'}</div>
            <div className="text-xs font-black font-mono tracking-tight" dir="ltr">{phone}</div>
          </div>
        </a>

        {/* Quick Social Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white hover:bg-blue-50 text-[#0F172A] rounded-full border border-[#DBEAFE] shadow-[0_8px_20px_rgba(37,99,235,0.12)] transition active:scale-95 cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="Social contact options"
          title="Social contact options"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5 text-[#2563EB]" />}
        </button>
      </div>
    </div>
  );
};
