import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Gamepad2, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Search, 
  Layers, 
  ExternalLink,
  Flame,
  KeyRound
} from 'lucide-react';
import { ApkItem, Language, ApkCategory } from '../types';
import { getStoredApks, incrementApkDownloads } from '../utils/adminStorage';

interface ApkStoreSectionProps {
  lang: Language;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const ApkStoreSection: React.FC<ApkStoreSectionProps> = ({
  lang,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const isAr = lang === 'ar';
  
  const [apks, setApks] = useState<ApkItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'apps' | 'games' | 'tools'>('all');
  const [search, setSearch] = useState('');

  const loadApks = () => {
    setApks(getStoredApks());
  };

  useEffect(() => {
    loadApks();
    const handleStorageChange = () => loadApks();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDownloadClick = (item: ApkItem) => {
    incrementApkDownloads(item.id);
    loadApks();
  };

  const filteredApks = apks.filter(apk => {
    const matchesFilter = activeFilter === 'all' || apk.category === activeFilter;
    if (!search.trim()) return matchesFilter;
    const q = search.toLowerCase();
    return matchesFilter && (
      apk.title.toLowerCase().includes(q) ||
      apk.description.toLowerCase().includes(q) ||
      apk.categoryName.toLowerCase().includes(q)
    );
  });

  return (
    <section id="apk-store-section" className="py-16 sm:py-24 bg-[#F8FAFF] relative overflow-hidden border-t border-[#DBEAFE]">
      
      {/* Background Soft Blue Circles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-blue-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
        
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs sm:text-sm font-bold shadow-sm">
            <Gamepad2 className="w-4 h-4 text-[#3B82F6]" />
            <span>{isAr ? 'متجر تطبيقات وألعاب رقيب APK للأندرويد' : 'Raqeeb Android APK & Games Store'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            {isAr ? 'حمّل أحدث تطبيقات وألعاب الأندرويد بروابط مباشرة' : 'Download Android Apps & Games with Direct Links'}
          </h2>

          <p className="text-xs sm:text-base text-[#64748B] leading-relaxed">
            {isAr 
              ? 'تطبيقات فك الشفرات، أدوات الصيانة واسترداد الملفات، بالإضافة لألعاب الأندرويد الحصرية والمفحوصة أمنياً بنسبة 100%.' 
              : 'Download carrier unlocking tools, data recovery utilities, and exclusive tested Android games safely.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 bg-white p-3 sm:p-4 rounded-2xl border border-[#DBEAFE] shadow-[0_4px_20px_rgba(37,99,235,0.06)]">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/25'
                  : 'bg-[#F8FAFF] text-[#0F172A] hover:bg-blue-50 border border-[#DBEAFE]'
              }`}
            >
              {isAr ? 'جميع الملفات' : 'All APKs'} ({apks.length})
            </button>

            <button
              onClick={() => setActiveFilter('apps')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'apps'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/25'
                  : 'bg-[#F8FAFF] text-[#0F172A] hover:bg-blue-50 border border-[#DBEAFE]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{isAr ? 'التطبيقات' : 'Apps'}</span>
            </button>

            <button
              onClick={() => setActiveFilter('games')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'games'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/25'
                  : 'bg-[#F8FAFF] text-[#0F172A] hover:bg-blue-50 border border-[#DBEAFE]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{isAr ? 'الألعاب (APK Games)' : 'Games'}</span>
            </button>

            <button
              onClick={() => setActiveFilter('tools')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'tools'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/25'
                  : 'bg-[#F8FAFF] text-[#0F172A] hover:bg-blue-50 border border-[#DBEAFE]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>{isAr ? 'أدوات الصيانة' : 'Tools'}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث عن تطبيق أو لعبة...' : 'Search apps or games...'}
              className="w-full bg-[#F8FAFF] border border-[#DBEAFE] focus:border-[#2563EB] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#64748B] pr-10 focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#3B82F6] absolute right-3.5 top-3" />
          </div>

        </div>

        {/* APK Cards Grid */}
        {filteredApks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApks.map((apk, index) => (
              <div 
                key={apk.id}
                className="group relative bg-white hover:bg-white rounded-2xl border border-[#DBEAFE] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.14)] hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Title + Version Badge */}
                  <div className="flex items-start gap-4">
                    <img 
                      src={apk.icon} 
                      alt={apk.title} 
                      className="w-16 h-16 rounded-2xl object-cover border border-[#DBEAFE] bg-blue-50 shadow-md group-hover:scale-105 transition shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 border border-[#DBEAFE] text-[#2563EB]">
                          {apk.categoryName}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#22C55E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {apk.version}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition line-clamp-1">
                        {apk.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1">
                        <span>📦 {apk.size}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{apk.rating}</span>
                        </span>
                        <span>•</span>
                        <span>⬇️ {apk.downloadsCount.toLocaleString()} {isAr ? 'تحميل' : 'dl'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                    {apk.description}
                  </p>

                  {/* Key Features Pill List */}
                  {apk.features && apk.features.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {apk.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Download & Info Actions */}
                <div className="pt-4 mt-4 border-t border-[#DBEAFE] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#22C55E] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>{isAr ? 'آمن ومفحوص 100%' : '100% Safe APK'}</span>
                  </div>

                  <a
                    href={apk.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleDownloadClick(apk)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'تحميل APK' : 'Download APK'}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#DBEAFE] p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <Smartphone className="w-10 h-10 text-[#64748B] mx-auto" />
            <h4 className="text-sm font-bold text-[#0F172A]">{isAr ? 'لم يتم العثور على نتائج' : 'No APKs found'}</h4>
            <p className="text-xs text-[#64748B]">{isAr ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً' : 'Try searching for different terms'}</p>
          </div>
        )}

        {/* PIN Activation Notice in Store */}
        {onOpenPinModal && (
          <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-[#DBEAFE] shadow-[0_4px_20px_rgba(37,99,235,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-[#DBEAFE] flex items-center justify-center shrink-0 text-[#3B82F6]">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  {isAr ? 'هل تحتاج إلى كود تفعيل (4 أرقام) بعد تثبيت التطبيقات؟' : 'Need 4-digit PIN activation after install?'}
                </h4>
                <p className="text-xs text-[#64748B]">
                  {isAr ? 'أدخل الرمز السري المصرح لفتح كامل ميزات التطبيق على جهازك' : 'Enter your 4-digit activation code to unlock features'}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPinModal}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                isAppUnlocked
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                  : 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-md'
              }`}
            >
              {isAppUnlocked ? (isAr ? 'مفعل ومصرح ✅' : 'Unlocked ✅') : (isAr ? 'إدخال رمز التفعيل (PIN) 🔑' : 'Enter PIN 🔑')}
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
