import React from 'react';
import { 
  Radio, 
  Cpu, 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  UserCheck, 
  MessageSquare, 
  FileSpreadsheet, 
  HardDrive, 
  Code, 
  Bot, 
  TrendingUp, 
  Sparkles, 
  Search,
  Clock,
  CheckCircle2,
  Shield,
  ArrowLeft,
  ArrowRight,
  Send
} from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface ServiceCardProps {
  service: ServiceItem;
  onViewDetails: (service: ServiceItem) => void;
  onOrderNow: (service: ServiceItem) => void;
  lang: Language;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
  onOrderNow,
  lang
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-6 h-6 text-[#3B82F6]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#3B82F6]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-[#3B82F6]" />;
      case 'Lock': return <Lock className="w-6 h-6 text-[#3B82F6]" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-[#3B82F6]" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#3B82F6]" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-[#3B82F6]" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6 text-[#3B82F6]" />;
      case 'HardDrive': return <HardDrive className="w-6 h-6 text-[#3B82F6]" />;
      case 'Code': return <Code className="w-6 h-6 text-[#3B82F6]" />;
      case 'Bot': return <Bot className="w-6 h-6 text-[#3B82F6]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#3B82F6]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#3B82F6]" />;
      case 'Search': return <Search className="w-6 h-6 text-[#3B82F6]" />;
      default: return <Shield className="w-6 h-6 text-[#3B82F6]" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#DBEAFE] p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.14)] hover:-translate-y-1">
      
      {/* Top Header with Circular Icon & Badge */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-[#DBEAFE] flex items-center justify-center text-[#3B82F6] shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            {getIcon(service.icon)}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className="text-xs font-semibold text-[#64748B]">
              {service.categoryName}
            </span>
            {service.badge && (
              <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-[#DBEAFE]">
                {service.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-2">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3 mb-4">
          {service.shortDesc}
        </p>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2 py-2.5 mb-4 border-y border-[#DBEAFE] text-[11px]">
          <div className="flex items-center gap-1.5 text-[#64748B]">
            <Clock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            <span className="truncate">{t.timeEst}{service.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="truncate">{t.successRate}{service.successRate}</span>
          </div>
        </div>

        {/* Key Features */}
        <ul className="space-y-1.5 mb-5">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons - Royal Blue gradient button + Small Green Android button beside it */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(service)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#F8FAFF] hover:bg-blue-50 text-[#0F172A] border border-[#DBEAFE] text-xs font-bold transition cursor-pointer min-h-[42px]"
          title={isAr ? 'عرض كامل تفاصيل الخدمة والخطوات' : 'View Service Details'}
        >
          <span>{t.serviceDetails}</span>
          {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onOrderNow(service)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer min-h-[42px]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{t.orderService}</span>
        </button>

        {/* Small Green Android Badge/Button beside Service Button */}
        <button
          onClick={() => onOrderNow(service)}
          className="w-10 h-[42px] shrink-0 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white flex items-center justify-center shadow-md shadow-emerald-500/20 transition active:scale-95 cursor-pointer"
          title={isAr ? 'طلب الخدمة لهواتف الأندرويد' : 'Order for Android'}
          aria-label="Android service request"
        >
          <Smartphone className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
