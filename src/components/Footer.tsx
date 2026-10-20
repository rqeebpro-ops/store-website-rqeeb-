import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Send, 
  Share2, 
  Radio, 
  Lock, 
  UserCheck, 
  HardDrive, 
  Code, 
  TrendingUp, 
  Smartphone, 
  Download
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface FooterProps {
  phone: string;
  onSelectCategory: (cat: ServiceCategory) => void;
  lang: Language;
  onOpenDownloadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  phone, 
  onSelectCategory, 
  lang,
  onOpenDownloadModal 
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  return (
    <footer className={`bg-[#0A2351] text-white border-t border-blue-900/50 ${isAr ? 'text-right' : 'text-left'} pt-16 pb-12`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-blue-900/50">
          
          {/* Col 1: Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-md bg-white shrink-0">
                <img 
                  src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
                  alt="شعار رقيب" 
                  className="w-full h-full object-contain rounded-[9px]"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white">{t.brandName}</span>
                <span className="text-xs text-blue-200 block font-medium">{t.brandSub}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-sm">
              {t.heroDesc}
            </p>

            <div className="pt-2">
              <div className="text-xs text-blue-200 mb-1 font-semibold">
                {isAr ? 'للتواصل المباشر والاستفسارات:' : 'Direct Contact & Inquiries:'}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${phone}`}
                  dir="ltr"
                  className="text-lg font-black font-mono text-white hover:text-blue-300"
                >
                  {phone}
                </a>
                <span className="text-blue-400">|</span>
                <a
                  href={`https://wa.me/967${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#22C55E] hover:underline"
                >
                  {isAr ? 'محادثة واتساب سريعة' : 'Instant WhatsApp'}
                </a>
              </div>
            </div>

            {/* Android App Download button in footer */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold transition cursor-pointer shadow-md"
              >
                <Smartphone className="w-4 h-4 text-white" />
                <span>{isAr ? 'تحميل تطبيق رقيب (v2.2 APK)' : 'Download Raqeeb App (APK)'}</span>
                <Download className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenDownloadModal}
                className="text-blue-200 hover:text-white text-xs underline cursor-pointer"
              >
                {isAr ? 'الباركود' : 'QR'}
              </button>
            </div>
          </div>

          {/* Col 2: Security & Unlocking Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#3B82F6]" />
              <span>{isAr ? 'خدمات فك الشفرات والأجهزة' : 'Carrier & Device Unlocks'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <button 
                  onClick={() => onSelectCategory('unlocking')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك شفرات الشبكات (Carrier Unlock)' : 'Carrier Network Unlocking'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('unlocking')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'إصلاح المودم وفقدان السيريال IMEI' : 'Modem & IMEI Repair'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('screen_locks')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تخطي قفل حساب جوجل (FRP Bypass)' : 'Google FRP Lock Bypass'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('screen_locks')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك رمز الشاشة ونمط الأجهزة' : 'Screen Passcode & Pattern Unlock'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Data & Account Recovery */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#3B82F6]" />
              <span>{isAr ? 'استرجاع البيانات والحسابات' : 'Data & Account Recovery'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <button 
                  onClick={() => onSelectCategory('account_recovery')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استرجاع حسابات فيسبوك وانستغرام' : 'Facebook & Instagram Recovery'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('account_recovery')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك حظر أرقام الواتساب (Spam Ban)' : 'WhatsApp Unban (Spam Recovery)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('data_recovery')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استرداد الصور والمحادثات المحذوفة' : 'Deleted Photos & Chats Retrieval'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('data_recovery')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استخراج البيانات من الهواتف التالفة' : 'Damaged Phone Data Recovery'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Programming & Marketing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
              <span>{isAr ? 'البرمجة والتسويق الرقمي' : 'Software & Digital Marketing'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <button 
                  onClick={() => onSelectCategory('programming')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تطوير المواقع والمتاجر الإلكترونية' : 'Web & E-Commerce Development'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('programming')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'برمجة البوتات الذكية والـ APIs' : 'AI Automation Bots & APIs'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('marketing')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'الحملات الإعلانية الممولة' : 'Sponsored Paid Ads'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('marketing')}
                  className="hover:text-white transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تهيئة محركات البحث (SEO)' : 'Search Engine Optimization (SEO)'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <div>
            {isAr 
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} - رَقِـيـب للبرمجة والتسويق.`
              : `All Rights Reserved © ${new Date().getFullYear()} - Raqeeb for Programming & Marketing.`
            }
          </div>
          <div className="flex items-center gap-4">
            <span>{isAr ? 'سرية تامة 100%' : '100% Confidential'}</span>
            <span>•</span>
            <span>{isAr ? 'رقم الاتصال: ' : 'Direct Tel: '}{phone}</span>
            <span>•</span>
            <span className="text-blue-100">
              {isAr ? 'صُنع بحرفية وأمان تقني' : 'Engineered with Precision & Security'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
