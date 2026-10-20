import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/servicesData';
import { Language } from '../types';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const testimonialsEn = [
    {
      id: '1',
      name: 'Eng. Tareq Al-Hemyari',
      role: 'Business Owner',
      serviceUsed: 'Hardware JTAG Data Recovery',
      comment: 'An iPhone with severe board water damage was restored with 100% of my business and personal photos. Unbelievable expertise and speed.',
      rating: 5,
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Sarah M.',
      role: 'Content Creator',
      serviceUsed: 'Instagram Account Recovery',
      comment: 'My verified 250k account was compromised with 2FA removed. The Raqeeb cyber team reclaimed it and restored full ownership within 6 hours.',
      rating: 5,
      date: '1 week ago'
    },
    {
      id: '3',
      name: 'Ahmed Bawazir',
      role: 'Contracting Manager',
      serviceUsed: 'Network Carrier & FRP Bypass',
      comment: 'Quick and official unlock without voiding device integrity. Phone operates seamlessly on all Yemen and global GSM/CDMA networks.',
      rating: 5,
      date: '2 weeks ago'
    },
    {
      id: '4',
      name: 'Faisal Al-Olofi',
      role: 'E-commerce Store Owner',
      serviceUsed: 'Targeted Marketing Campaigns',
      comment: 'Sales increased by 320% through their laser-targeted meta campaigns and optimized conversion funnels. Highly recommended partners.',
      rating: 5,
      date: '3 weeks ago'
    }
  ];

  const items = isAr ? TESTIMONIALS_DATA : testimonialsEn;

  return (
    <section className="py-16 sm:py-20 relative border-t border-[#DBEAFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{isAr ? 'ثقة وتجارب العملاء' : 'Client Reviews & Proof'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            {isAr ? 'ماذا يقول عملاؤنا عن رقيب؟' : 'What Our Clients Say About Raqeeb'}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {isAr ? 'قصص نجاح واقعية في استعادة الحسابات والبيانات وتطوير الأعمال' : 'Real success stories in account security, data extraction, and business scale'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-white border border-[#DBEAFE] shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between ${isAr ? 'text-right' : 'text-left'} space-y-4`}
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-blue-200" />
                </div>

                <div className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg border border-[#DBEAFE] inline-block">
                  {item.serviceUsed}
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#DBEAFE]">
                <div className="font-bold text-[#0F172A] text-xs">{item.name}</div>
                <div className="text-[11px] text-[#64748B]">{item.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
