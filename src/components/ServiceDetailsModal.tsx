import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { ServiceItem, Language } from '../types';

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  phone: string;
  onOpenOrderModal: (serviceTitle: string) => void;
  lang: Language;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  phone,
  onOpenOrderModal,
  lang
}) => {
  if (!service) return null;

  const isAr = lang === 'ar';
  const whatsappMessage = isAr 
    ? `السلام عليكم، أرغب في طلب خدمة (${service.title}) من مركز رقيب للبرمجة والتسويق. أرجو تزويدي بالتفاصيل والتكلفة والبدء بالتنفيذ.`
    : `Hello, I would like to request the service (${service.title}) from Raqeeb Tech & Marketing. Please provide details, pricing, and execution steps.`;

  const whatsappUrl = `https://wa.me/967${phone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-3xl my-auto max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 ${isAr ? 'text-right' : 'text-left'} space-y-5 sm:space-y-6 scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button - 44px touch target */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          aria-label={isAr ? 'إغلاق النافذة' : 'Close window'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800/50">
            <span>{service.categoryName}</span>
            {service.badge && <span>• {service.badge}</span>}
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white leading-snug">
            {service.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Highlight strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-white">{isAr ? 'المدة المتوقعة' : 'Estimated Time'}</div>
              <div className="text-slate-400">{service.estimatedTime}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">{isAr ? 'نسبة النجاح' : 'Success Rate'}</div>
              <div className="text-slate-400">{service.successRate}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">{isAr ? 'الضمان والاعتماد' : 'Guarantee'}</div>
              <div className="text-slate-400">{service.guarantee}</div>
            </div>
          </div>
        </div>

        {/* Steps Guide */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{isAr ? 'خطوات ومراحل تنفيذ الخدمة في رقيب:' : 'Execution Workflow Steps at Raqeeb:'}</span>
          </h3>

          <div className="space-y-2.5 sm:space-y-3">
            {service.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-cyan-800/40 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-cyan-500/30">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'المطلوب من العميل لتنفيذ الخدمة:' : 'Requirements from Customer:'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {service.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'مميزات الخدمة وضمانات رقيب:' : 'Service Features & Guarantees:'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-cyan-400">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Action Buttons - Fully responsive on mobile & desktop */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span dir="ltr">{phone}</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenOrderModal(service.title);
              }}
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAr ? 'إرسال طلب مخصص' : 'Custom Request'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition cursor-pointer min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'طلب الخدمة عبر واتساب الآن' : 'Order via WhatsApp Now'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
