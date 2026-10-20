/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesFilter } from './components/CategoriesFilter';
import { ServiceCard } from './components/ServiceCard';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { RequestServiceModal } from './components/RequestServiceModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { AppDownloadSection } from './components/AppDownloadSection';
import { PinActivationModal } from './components/PinActivationModal';
import { ArticlesSection } from './components/ArticlesSection';
import { ApkStoreSection } from './components/ApkStoreSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WorkflowSection } from './components/WorkflowSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SocialFloatingBar } from './components/SocialFloatingBar';
import { SERVICES_DATA } from './data/servicesData';
import { SERVICES_DATA_EN } from './data/servicesDataEn';
import { ARTICLES_DATA_EN } from './data/articlesDataEn';
import { ServiceCategory, ServiceItem, Language, ArticleItem } from './types';
import { UI_TRANSLATIONS } from './i18n/translations';
import { checkIsAppUnlocked } from './utils/securityConfig';
import { 
  isAdminAuthenticated, 
  getStoredServices, 
  getStoredArticles, 
  getStoredSettings,
  getStoredCategories 
} from './utils/adminStorage';
import { getArticleCanonicalUrl, SITE_URL } from './utils/seoConfig';
import { Sparkles, SearchX } from 'lucide-react';

export default function App() {
  const [dataVersion, setDataVersion] = useState<number>(0);
  const settings = useMemo(() => getStoredSettings(), [dataVersion]);
  const PHONE_NUMBER = settings.ownerPhone || '785502919';

  const [lang, setLang] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceForDetails, setSelectedServiceForDetails] = useState<ServiceItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isAppUnlocked, setIsAppUnlocked] = useState<boolean>(() => checkIsAppUnlocked());
  
  // Admin State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminAuthenticated());

  const [orderModalServiceTitle, setOrderModalServiceTitle] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[lang];
  
  // Dynamic Services, Articles, and Categories loaded with localStorage persistence
  const allServices = useMemo(() => {
    return getStoredServices(lang);
  }, [lang, dataVersion]);

  const allArticles = useMemo(() => {
    return lang === 'ar' ? getStoredArticles() : ARTICLES_DATA_EN;
  }, [lang, dataVersion]);

  const categoriesList = useMemo(() => {
    return getStoredCategories(lang);
  }, [lang, dataVersion]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Filtered services calculation based on active language and search
  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesText = 
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.fullDesc.toLowerCase().includes(q) ||
        service.categoryName.toLowerCase().includes(q) ||
        service.features.some(f => f.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [allServices, activeCategory, searchQuery]);

  const handleOpenOrderModal = (serviceTitle?: string) => {
    setOrderModalServiceTitle(serviceTitle || '');
    setIsOrderModalOpen(true);
  };

  const handleSelectArticleFromNav = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  // Deep linking and Google Search Console URL inspection support (?article=... or ?service=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const articleParam = params.get('article');
      const serviceParam = params.get('service');
      const sectionParam = params.get('section');

      if (articleParam) {
        setSelectedArticleId(articleParam);
        const article = allArticles.find(a => a.id === articleParam);
        if (article) {
          document.title = `${article.title} | رقيب للبرمجة والتسويق`;
          setTimeout(() => {
            const el = document.getElementById('articles-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      } else if (serviceParam) {
        const service = allServices.find(s => s.id === serviceParam);
        if (service) {
          setSelectedServiceForDetails(service);
          document.title = `${service.title} | رقيب للبرمجة والتسويق`;
        }
      } else if (sectionParam) {
        setTimeout(() => {
          const el = document.getElementById(sectionParam);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    } catch {
      // ignore
    }
  }, [allArticles, allServices]);

  return (
    <div 
      className={`min-h-screen bg-gradient-to-b from-[#F8FAFF] via-white to-[#E6F0FF] text-[#0F172A] flex flex-col font-['Cairo','Tajawal',sans-serif] selection:bg-blue-600 selection:text-white`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Top Navigation Bar with dropdowns, language switch, and contact */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onSelectArticle={handleSelectArticleFromNav}
        onOpenOrderModal={handleOpenOrderModal}
        phone={PHONE_NUMBER}
        lang={lang}
        onToggleLanguage={toggleLanguage}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        isAppUnlocked={isAppUnlocked}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        categoriesList={categoriesList}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          phone={PHONE_NUMBER}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenOrderModal={handleOpenOrderModal}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          isAppUnlocked={isAppUnlocked}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('services-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          lang={lang}
        />

        {/* Services Section with Categories & Filter */}
        <section id="services-section" className="py-16 sm:py-20 relative overflow-hidden">
          {/* Decorative soft blue circles for background */}
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#2563EB] text-xs font-bold border border-[#DBEAFE] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>{t.servicesDirectory}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {t.allServicesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {t.allServicesSubtitle}
              </p>
            </div>

            {/* Categories Filter Tabs */}
            <div className="mb-10">
              <CategoriesFilter
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat)}
                lang={lang}
                categoriesList={categoriesList}
              />
            </div>

            {/* Search active notice if typing */}
            {searchQuery && (
              <div className="mb-6 p-3.5 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm flex items-center justify-between text-xs text-[#64748B]">
                <div>
                  {t.searchResultsFor}: <strong className="text-[#2563EB]">"{searchQuery}"</strong> ({filteredServices.length} {t.servicesCountSuffix})
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#2563EB] hover:underline font-bold cursor-pointer"
                >
                  {t.cancelSearch}
                </button>
              </div>
            )}

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onViewDetails={(s) => setSelectedServiceForDetails(s)}
                    onOrderNow={(s) => handleOpenOrderModal(s.title)}
                    lang={lang}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-[#DBEAFE] space-y-4 max-w-md mx-auto shadow-[0_4px_20px_rgba(37,99,235,0.06)]">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center mx-auto border border-[#DBEAFE]">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{t.noServicesFound}</h3>
                <p className="text-xs text-[#64748B]">
                  {t.tryDifferentQuery}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-xs font-bold cursor-pointer shadow-md hover:from-[#1D4ED8] hover:to-[#1E40AF] transition"
                >
                  {t.showAllServices}
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Dedicated APK Android Apps & Games Store Section */}
        <ApkStoreSection 
          lang={lang}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          isAppUnlocked={isAppUnlocked}
        />

        {/* Workflow 4-Step Process Section */}
        <WorkflowSection lang={lang} />

        {/* Illustrated Articles & Workflow Step Guides Section */}
        <ArticlesSection
          phone={PHONE_NUMBER}
          selectedArticleId={selectedArticleId}
          lang={lang}
          articles={allArticles}
        />

        {/* Dedicated Official Android App Download Section (APK v2.2) */}
        <AppDownloadSection
          lang={lang}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          isAppUnlocked={isAppUnlocked}
        />

        {/* Testimonials and Trust Stories */}
        <TestimonialsSection lang={lang} />

        {/* Contact and Direct Consultation Section */}
        <ContactSection phone={PHONE_NUMBER} lang={lang} />

      </main>

      {/* Footer with links, phone number and copyright */}
      <Footer
        phone={PHONE_NUMBER}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('services-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Floating Action Bar with Phone & WhatsApp 785502919 */}
      <SocialFloatingBar 
        phone={PHONE_NUMBER} 
        lang={lang} 
        onOpenPinModal={() => setIsPinModalOpen(true)}
        isAppUnlocked={isAppUnlocked}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Service Details & Step-by-step Modal */}
      <ServiceDetailsModal
        service={selectedServiceForDetails}
        onClose={() => setSelectedServiceForDetails(null)}
        phone={PHONE_NUMBER}
        onOpenOrderModal={handleOpenOrderModal}
        lang={lang}
      />

      {/* Interactive Request & WhatsApp Order Modal */}
      <RequestServiceModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        phone={PHONE_NUMBER}
        initialServiceTitle={orderModalServiceTitle}
        lang={lang}
      />

      {/* Official Android App Download & QR Modal */}
      <AppDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        lang={lang}
      />

      {/* 4-Digit PIN Security & Activation Modal */}
      <PinActivationModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        phone={PHONE_NUMBER}
        lang={lang}
        onActivatedSuccess={() => {
          setIsAppUnlocked(true);
        }}
      />

      {/* Secret Admin Login Modal (Triggered by 10 clicks on App Logo) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminDashboardOpen(true);
        }}
        lang={lang}
      />

      {/* Master Admin Dashboard Modal with Full Privileges */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        lang={lang}
        onDataChanged={() => {
          setDataVersion(v => v + 1);
        }}
      />

    </div>
  );
}
