import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';
import { ARTICLES_DATA_EN } from '../data/articlesDataEn';
import { ArticleItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { getStoredArticles } from '../utils/adminStorage';

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

  const [showArchived, setShowArchived] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(() => {
    if (selectedArticleId) {
      return articlesList.find(a => a.id === selectedArticleId) || articlesList[0];
    }
    return null;
  });

  const isAr = lang === 'ar';

  const publishedArticles = articlesList.filter(a => !a.isArchived);
  const archivedArticles = articlesList.filter(a => a.isArchived);
  const displayedArticles = showArchived ? archivedArticles : (publishedArticles.length > 0 ? publishedArticles : archivedArticles);

  return (
    <section id="articles-section" className="py-16 sm:py-24 relative border-t border-[#DBEAFE]">
      
      {/* Decorative soft blue circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{t.articlesBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            {t.articlesTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {t.articlesDesc}
          </p>

          {/* Archive Status / View Toggle if archived articles exist */}
          {archivedArticles.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setShowArchived(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  !showArchived && publishedArticles.length > 0
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md'
                    : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#DBEAFE]'
                }`}
              >
                {isAr ? 'المنشورات النشطة' : 'Active Posts'} ({publishedArticles.length})
              </button>
              <button
                onClick={() => setShowArchived(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  showArchived || publishedArticles.length === 0
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#DBEAFE]'
                }`}
              >
                <span>📦</span>
                <span>{isAr ? 'أرشيف المقالات والدروس' : 'Archived Articles'} ({archivedArticles.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Notice if all articles are archived and user is viewing active */}
        {publishedArticles.length === 0 && !showArchived && (
          <div className="p-6 mb-8 rounded-2xl bg-amber-50 border border-amber-200 text-center max-w-lg mx-auto space-y-2">
            <p className="text-xs font-bold text-amber-900">
              {isAr ? 'جميع المقالات والمنشورات محفوظة حالياً في الأرشيف بواسطة المالك.' : 'All articles are currently archived by the owner.'}
            </p>
            <button
              onClick={() => setShowArchived(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'استعراض المقالات المؤرشفة' : 'Browse Archived Posts'} ({archivedArticles.length})
            </button>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {displayedArticles.map((article) => {
            const isSelected = activeArticle?.id === article.id;
            return (
              <div
                key={article.id}
                className={`flex flex-col justify-between rounded-2xl overflow-hidden bg-white border transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.14)] hover:-translate-y-1 ${
                  isSelected ? 'border-[#2563EB] ring-2 ring-blue-500/20' : 'border-[#DBEAFE]'
                }`}
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-blue-50 group">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2351]/70 via-transparent to-transparent" />
                    
                    {/* Category badge & Archive badge */}
                    <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} flex items-center gap-1.5`}>
                      <div className="bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#2563EB] border border-[#DBEAFE] shadow-sm">
                        {article.categoryName}
                      </div>
                      {article.isArchived && (
                        <div className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1">
                          <span>📦</span>
                          <span>{isAr ? 'مؤرشف' : 'Archived'}</span>
                        </div>
                      )}
                    </div>

                    {/* Read time */}
                    <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} flex items-center gap-1.5 text-xs text-white bg-[#0A2351]/80 px-2.5 py-1 rounded-lg backdrop-blur-sm`}>
                      <Clock className="w-3.5 h-3.5 text-blue-300" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={`p-6 space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="text-xs font-semibold text-[#64748B]">
                      {isAr ? 'بواسطة: ' : 'By: '}{article.author}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#2563EB] transition line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Step pills preview */}
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
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setActiveArticle(article);
                      const viewer = document.getElementById('article-full-viewer');
                      if (viewer) viewer.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md'
                        : 'bg-[#F8FAFF] hover:bg-blue-50 text-[#0F172A] border border-[#DBEAFE]'
                    }`}
                  >
                    <span>{isSelected ? (isAr ? 'المقال مفتوح أدناه' : 'Article Open Below') : (isAr ? 'قراءة الدليل التفصيلي والخطوات' : 'Read Full Guide & Steps')}</span>
                    {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
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

            {/* Step-by-Step Interactive Timeline */}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Warnings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DBEAFE]">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-800">
                    {isAr ? 'تنبيه أمني هام' : 'Important Security Notice'}
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {activeArticle.warning}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#1D4ED8]">
                    {isAr ? 'نصيحة خبراء رقيب' : 'Raqeeb Experts Tip'}
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {activeArticle.tip}
                  </p>
                </div>
              </div>
            </div>

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
