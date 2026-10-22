import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ShoppingCart, 
  Award, 
  Mail, 
  Download, 
  Menu,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface MobileBottomNavProps {
  lang: Language;
  onOpenDownloadModal: () => void;
  onOpenContactModal?: () => void;
  onOpenSidebar: () => void;
  phone: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  onOpenDownloadModal,
  onOpenContactModal,
  onOpenSidebar,
  phone
}) => {
  const isAr = lang === 'ar';
  const t = UI_TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'process' | 'contact'>('home');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Detect if already installed as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // For iOS Safari or browsers without beforeinstallprompt, open modal with direct APK and iOS instructions
      onOpenDownloadModal();
    }
  };

  const scrollTo = (elementId: string, tab: 'home' | 'store' | 'process' | 'contact') => {
    setActiveTab(tab);
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Install App Mini Bar for Mobile if not yet installed */}
      {!isInstalled && (
        <div 
          className="fixed bottom-[68px] left-3 right-3 z-30 md:hidden animate-in slide-in-from-bottom-2 duration-300"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-[#071838]/95 via-[#0A2351]/95 to-[#0e2c66]/95 border border-cyan-500/40 shadow-xl backdrop-blur-md flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-amber-500 shrink-0">
                <img 
                  src="/assets/aistudio/Rqeeb_unified_icons_gold_b927d66b.png" 
                  alt="رقيب" 
                  className="w-full h-full object-cover rounded-full bg-[#0A2351]"
                />
              </div>
              <div className="truncate">
                <div className="text-[11px] font-black text-white truncate">
                  {isAr ? 'تثبيت تطبيق رقيب على هاتفك' : 'Install Raqeeb App on Phone'}
                </div>
                <div className="text-[9px] text-cyan-300 truncate">
                  {isAr ? 'تصفح أسرع، بدون إنترنت، ووصول فوري' : 'Faster browsing, offline & instant access'}
                </div>
              </div>
            </div>

            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-[11px] font-black shadow-md shrink-0 cursor-pointer active:scale-95 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تثبيت الآن' : 'Install'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Native Bottom App Navigation Bar (Matches user screenshot) */}
      <nav 
        aria-label="Mobile Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A2351]/95 backdrop-blur-lg border-t border-blue-900/60 shadow-[0_-4px_25px_rgba(0,0,0,0.35)] select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        dir="ltr"
      >
        <div className="grid grid-cols-4 h-16 max-w-lg mx-auto px-2 items-center text-center">
          
          {/* Tab 1: Home */}
          <button
            onClick={() => scrollTo('home', 'home')}
            className={`flex flex-col items-center justify-center h-full transition cursor-pointer ${
              activeTab === 'home' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'home' ? 'bg-blue-900/40' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {isAr ? 'الرئيسية' : 'Home'}
            </span>
          </button>

          {/* Tab 2: Store */}
          <button
            onClick={() => scrollTo('apk-store-section', 'store')}
            className={`flex flex-col items-center justify-center h-full transition cursor-pointer ${
              activeTab === 'store' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'store' ? 'bg-blue-900/40' : ''}`}>
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {isAr ? 'المتجر' : 'Store'}
            </span>
          </button>

          {/* Tab 3: Process */}
          <button
            onClick={() => scrollTo('process-section', 'process')}
            className={`flex flex-col items-center justify-center h-full transition cursor-pointer ${
              activeTab === 'process' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'process' ? 'bg-blue-900/40' : ''}`}>
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {isAr ? 'الخطوات' : 'Process'}
            </span>
          </button>

          {/* Tab 4: Contact */}
          <button
            onClick={() => scrollTo('contact-section', 'contact')}
            className={`flex flex-col items-center justify-center h-full transition cursor-pointer ${
              activeTab === 'contact' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${activeTab === 'contact' ? 'bg-blue-900/40' : ''}`}>
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {isAr ? 'تواصل' : 'Contact'}
            </span>
          </button>

        </div>
      </nav>
    </>
  );
};
