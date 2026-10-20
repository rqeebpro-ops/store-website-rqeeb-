import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface ContactSectionProps {
  phone: string;
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ phone, lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = isAr 
      ? `السلام عليكم ورحمة الله، أنا ${name || 'عميل رقيب'}.\nرسالتي: ${message || 'أود الاستفسار عن خدمات البرمجة والتسويق واسترجاع البيانات'}`
      : `Hello, I am ${name || 'Customer'}.\nMessage: ${message || 'I would like to inquire about Raqeeb technical & marketing services'}`;
    window.open(`https://wa.me/967${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-12 sm:py-20 lg:py-24 relative border-t border-[#DBEAFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold shadow-sm">
            <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isAr ? 'تواصل مباشر وخدمة سريعة' : 'Direct Contact & Fast Response'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
            {isAr ? 'تواصل مع فريق رقيب للبرمجة والتسويق' : 'Contact Raqeeb Programming & Marketing Team'}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {isAr ? 'فريق المهندسين والمبرمجين وخبراء التسويق جاهزون للإجابة على استفساراتكم وتنفيذ طلباتكم بأعلى كفاءة.' : 'Our engineers and marketing experts are ready 24/7 to solve your inquiries with verified precision.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Contact Details & Cards */}
          <div className={`lg:col-span-5 space-y-4 ${isAr ? 'text-right' : 'text-left'} flex flex-col justify-between`} dir={isAr ? 'rtl' : 'ltr'}>
            
            {/* Primary Phone Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#DBEAFE] space-y-4 shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold border border-[#DBEAFE]">
                  {isAr ? 'الرقم المعتمد والمباشر' : 'Official Direct Line'}
                </span>
                <Phone className="w-5 h-5 text-[#2563EB]" />
              </div>

              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  {isAr ? 'اتصال ومحادثات واتساب:' : 'Call & WhatsApp:'}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${phone}`}
                    dir="ltr"
                    className="text-2xl sm:text-3xl font-black font-mono text-[#0F172A] hover:text-[#2563EB] transition tracking-wider truncate"
                  >
                    {phone}
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8FAFF] hover:bg-blue-50 text-[#0F172A] text-xs font-bold transition border border-[#DBEAFE] cursor-pointer shrink-0 min-h-[40px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-[#22C55E]">{isAr ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{t.copyNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold transition shadow-md cursor-pointer min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'اتصال هاتفي' : 'Phone Call'}</span>
                </a>

                <a
                  href={`https://wa.me/967${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold transition shadow-md cursor-pointer min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'واتساب فوري' : 'Instant WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* Additional info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] space-y-1 shadow-sm">
                <Clock className="w-5 h-5 text-amber-500 mb-1" />
                <div className="text-xs font-bold text-[#0F172A]">{isAr ? 'ساعات العمل والجاهزية' : 'Operating Hours'}</div>
                <div className="text-[11px] text-[#64748B]">{isAr ? 'على مدار 24 ساعة للحالات المستعجلة والطارئة' : '24/7 readiness for emergency technical inquiries'}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] space-y-1 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#22C55E] mb-1" />
                <div className="text-xs font-bold text-[#0F172A]">{isAr ? 'السرية والأمان التام' : '100% Confidential'}</div>
                <div className="text-[11px] text-[#64748B]">{isAr ? 'تشفير كامل للبيانات والصور بنسبة 100%' : 'Encrypted workflows & privacy non-disclosure guarantees'}</div>
              </div>
            </div>

            {/* Social Media Links Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#DBEAFE] space-y-2 shadow-sm">
              <div className="text-xs font-bold text-[#0F172A]">
                {isAr ? 'حسابات التواصل الاجتماعي الرسمية لرقيب:' : 'Official Raqeeb Social Networks:'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/967${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition text-xs font-bold min-h-[40px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </a>

                <a
                  href="https://t.me/raqeeb_tech"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-[#2563EB] border border-[#DBEAFE] hover:bg-blue-100 transition text-xs font-bold min-h-[40px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تيليجرام' : 'Telegram'}</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition text-xs font-bold min-h-[40px]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'فيسبوك' : 'Facebook'}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className={`h-full rounded-2xl bg-white border border-[#DBEAFE] p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_rgba(37,99,235,0.08)] ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1">
                  {isAr ? 'أرسل رسالة مباشرة وسريعة للمهندس المناوب' : 'Send a Direct Message to Duty Engineer'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {isAr ? 'سيتم تحويل رسالتك فورا عبر واتساب المعتمد لتلقي الرد المباشر' : 'Your message is directed instantly to our verified engineer WhatsApp'}
                </p>
              </div>

              <form onSubmit={handleDirectWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                    {isAr ? 'الاسم الكريم:' : 'Your Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: أحمد عبد الله' : 'e.g. John Doe'}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] text-[#0F172A] text-xs sm:text-sm placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                    {isAr ? 'تفاصيل طلبك أو المشكلة التقنية:' : 'Inquiry Details or Technical Issue:'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isAr ? 'اكتب نوع جهازك، نوع القفل أو الشفرة، أو الخدمة البرمجية والتسويقية المطلوبة...' : 'Describe device model, lock type, or desired marketing / coding project...'}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border border-[#DBEAFE] text-[#0F172A] text-xs sm:text-sm placeholder-[#64748B] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isAr ? 'إرسال الرسالة عبر واتساب الآن' : 'Send Message via WhatsApp Now'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] pt-1 text-center">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{isAr ? 'يتم حفظ جميع المعلومات بسرية تامة ولا يتم مشاركتها مطلقاً' : 'All consultations are strictly confidential.'}</span>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
