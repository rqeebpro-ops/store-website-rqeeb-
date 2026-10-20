import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert, 
  Lightbulb, 
  Share2, 
  CheckCircle, 
  MessageSquare,
  Sparkles,
  Globe,
  Copy,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';
import { ARTICLES_DATA_EN } from '../data/articlesDataEn';
import { ArticleItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { getStoredArticles } from '../utils/adminStorage';
import { 
  getArticleCanonicalUrl, 
  getGoogleSearchConsoleInspectUrl, 
  getGoogleRichResultsTestUrl 
} from '../utils/seoConfig';

interface ArticlesSectionProps {
  phone: string;
  selectedArticleId?: string | null;
  lang: Language;
  articles?: ArticleItem[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ 
  phone,
  selectedArticleId,
  lang,
  articles
}) => {
  const t = UI_TRANSLATIONS[lang];
  const articlesList = articles || (lang === 'ar' ? getStoredArticles() : ARTICLES_DATA_EN);

  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  // Sync external selection from Navigation or Deep Link
  useEffect(() => {
    if (selectedArticleId) {
      const found = articlesList.find(a => a.id === selectedArticleId);
      if (found) {
        setActiveArticle(found);
        const viewer = document.getElementById('article-full-viewer');
        if (viewer) {
          viewer.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [selectedArticleId, articlesList]);

  const isAr = lang === 'ar';

  const handleCopyArticleUrl = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getArticleCanonicalUrl(articleId);
    navigator.clipboard.writeText(url).then(() => {
      setCopiedArticleId(articleId);
      setTimeout(() => setCopiedArticleId(null), 2500);
    }).catch(() => {
      // ignore
    });
  };

  return (
    <section id="articles-section" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#DBEAFE]">
      
      {/* Background Soft Blue Circles */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isAr ? 'المقالات والأدلة الهندسية المعتمدة' : 'Official Technical Guides & Case Studies'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            {t.articlesSectionTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            {t.articlesSectionDesc}
          </p>
        </div>

        {/* Articles Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {articlesList.map((article) => {
            const isSelected = activeArticle?.id === article.id;
            const articleCanonical = getArticleCanonicalUrl(article.id);

            return (
              <div 
                key={article.id}
                id={`article-card-${article.id}`}
                className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#2563EB] shadow-[0_8px_30px_rgba(37,99,235,0.15)] ring-2 ring-[#2563EB]/20' 
                    : 'border-[#DBEAFE] hover:border-blue-400 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.12)]'
                }`}
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2351]/80 via-transparent to-transparent" />
                    
                    {/* Category pill */}
                    <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#2563EB] border border-[#DBEAFE] shadow-sm`}>
                      {article.categoryName}
                    </div>

                    {/* Read time */}
                    <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} flex items-center gap-1.5 text-xs text-white bg-[#0A2351]/80 px-2.5 py-1 rounded-lg backdrop-blur-sm`}>
                      <Clock className="w-3.5 h-3.5 text-blue-300" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={`p-6 space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <span className="font-semibold">{isAr ? 'بواسطة: ' : 'By: '}{article.author}</span>
                      <span className="text-[11px] font-mono text-slate-400">{article.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#2563EB] transition line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Step pills preview */}
                    {article.stepsGuide && article.stepsGuide.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-[#2563EB] block mb-2">
                          {isAr ? `ملخص خطوات الإنجاز (${article.stepsGuide.length} مراحل):` : `Process Summary (${article.stepsGuide.length} Stages):`}
                        </span>
                        <div className="space-y-1.5">
                          {article.stepsGuide.slice(0, 2).map((st) => (
                            <div key={st.stepNumber} className="flex items-center gap-2 text-xs text-[#64748B]">
                              <span className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] border border-[#DBEAFE] text-[10px] font-bold flex items-center justify-center shrink-0">
                                {st.stepNumber}
                              </span>
                              <span className="line-clamp-1">{st.stepTitle}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer CTA & Google Index URL quick copy */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveArticle(article);
                        const viewer = document.getElementById('article-full-viewer');
                        if (viewer) viewer.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-sm min-h-[42px] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md'
                          : 'bg-[#F8FAFF] hover:bg-blue-50 text-[#0F172A] border border-[#DBEAFE]'
                      }`}
                    >
                      <span>{isSelected ? (isAr ? 'المقال مفتوح أدناه' : 'Article Open Below') : (isAr ? 'قراءة الدليل التفصيلي' : 'Read Full Guide')}</span>
                      {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => handleCopyArticleUrl(article.id, e)}
                      title={isAr ? 'نسخ رابط أرشفة المنشور لجوجل كونسول' : 'Copy indexing link for Google Console'}
                      className="px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-[#DBEAFE] text-[#2563EB] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer min-h-[42px]"
                    >
                      {copiedArticleId === article.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copiedArticleId === article.id ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'رابط الأرشفة' : 'URL')}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Full Guide Viewer */}
        {activeArticle && (
          <div 
            id="article-full-viewer" 
            className={`rounded-2xl bg-white border border-[#DBEAFE] p-6 sm:p-10 ${isAr ? 'text-right' : 'text-left'} space-y-8 shadow-[0_8px_30px_rgba(37,99,235,0.1)] animate-in fade-in duration-300`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            
            {/* Guide Header */}
            <div className="border-b border-[#DBEAFE] pb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-[#DBEAFE] text-xs font-bold">
                  {activeArticle.categoryName} • {activeArticle.readTime}
                </span>
                <span className="text-xs text-[#64748B] font-medium">
                  {activeArticle.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-[#0F172A]">
                {activeArticle.title}
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-4xl">
                {activeArticle.summary}
              </p>
            </div>

            {/* Google Search Console & SEO Indexing Toolbar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-emerald-50/30 border border-blue-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                      <span>{isAr ? 'رابط الأرشفة المباشر (Google Search Console)' : 'Canonical Indexing URL (Google Search Console)'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">rqeebpro.store</span>
                    </h5>
                    <p className="text-[11px] text-[#64748B]">
                      {isAr ? 'رابط المنشور المعتمد للفهرسة الرسمية في محرك بحث جوجل ومواقع التواصل' : 'Permanent indexing URL for Google Search and social sharing'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleCopyArticleUrl(activeArticle.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#2563EB] border border-blue-200 text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    {copiedArticleId === activeArticle.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedArticleId === activeArticle.id ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ رابط الأرشفة' : 'Copy Index URL')}</span>
                  </button>

                  <a
                    href={getGoogleSearchConsoleInspectUrl(getArticleCanonicalUrl(activeArticle.id))}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
                    title={isAr ? 'فتح أداة فحص العناوين في جوجل كونسول' : 'Inspect URL in Google Search Console'}
                  >
                    <Search className="w-4 h-4" />
                    <span>{isAr ? 'فحص وفهرسة في Google Console' : 'Inspect in Google Console'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href={getGoogleRichResultsTestUrl(getArticleCanonicalUrl(activeArticle.id))}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#64748B] hover:text-[#0F172A] border border-slate-200 text-xs font-medium transition cursor-pointer"
                    title={isAr ? 'اختبار النتائج المنسقة (Rich Results)' : 'Google Rich Results Test'}
                  >
                    <span>{isAr ? 'نتائج منسقة' : 'Rich Results'}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>

              {/* URL preview pill */}
              <div className="p-2.5 bg-white rounded-xl border border-blue-100 flex items-center justify-between gap-2 overflow-hidden shadow-inner">
                <span className="text-xs font-mono text-blue-700 font-bold truncate select-all" dir="ltr">
                  {getArticleCanonicalUrl(activeArticle.id)}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                  Canonical URL
                </span>
              </div>
            </div>

            {/* Step-by-Step Interactive Timeline */}
            {activeArticle.stepsGuide && activeArticle.stepsGuide.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                  <span>{isAr ? 'خطوات العمل الفنية والهندسية المتبعة:' : 'Technical Engineering Steps Applied:'}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeArticle.stepsGuide.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-5 rounded-2xl bg-[#F8FAFF] border border-[#DBEAFE] space-y-2 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] border border-[#DBEAFE] text-xs font-black flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h5 className="text-sm font-bold text-[#0F172A]">
                          {step.stepTitle}
                        </h5>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed pr-11">
                        {step.stepDetail}
                      </p>
                      {step.proTip && (
                        <div className="text-[11px] text-[#2563EB] font-semibold pr-11 flex items-center gap-1.5 pt-1">
                          <Lightbulb className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          <span>{step.proTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections */}
            {activeArticle.contentSections && activeArticle.contentSections.length > 0 && (
              <div className="space-y-4 pt-2">
                {activeArticle.contentSections.map((sec, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-[#DBEAFE] space-y-2">
                    <h5 className="text-sm sm:text-base font-bold text-[#0F172A]">
                      {sec.heading}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tips & Warnings */}
            {activeArticle.warningNote && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-800">
                    {isAr ? 'تنبيه أمني هام' : 'Important Security Notice'}
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {activeArticle.warningNote}
                  </p>
                </div>
              </div>
            )}

            {/* Direct Assistance CTA */}
            <div className="p-5 rounded-2xl bg-[#F8FAFF] border border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-right">
                <div className="text-sm font-bold text-[#0F172A]">
                  {isAr ? 'هل تواجه هذه المشكلة وتريد من خبير رقيب حلها فوراً؟' : 'Facing this issue and need a Raqeeb expert to solve it immediately?'}
                </div>
                <div className="text-xs text-[#64748B]">
                  {isAr ? 'نقدم استشارة وفحص أولي مجاني، مع ضمان استرجاع الرسوم حال عدم النجاح' : 'We offer free initial inspection with a money-back guarantee.'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/967${phone}?text=${encodeURIComponent(isAr ? `مرحباً رقيب، قرأت مقال (${activeArticle.title}) وأحتاج لمساعدتكم الفورية في حل المشكلة` : `Hello Raqeeb, I read the article (${activeArticle.title}) and need immediate assistance.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'طلب استشارة واتساب' : 'WhatsApp Consultation'}</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
