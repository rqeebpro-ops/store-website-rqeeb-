import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  AlertCircle,
  Download,
  Lock,
  ExternalLink
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { SERVICES_DATA_EN } from '../data/servicesDataEn';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { 
  verifyPinCode, 
  setAppUnlockedStatus, 
  checkIsAppUnlocked,
  MASTER_OWNER_PIN 
} from '../utils/securityConfig';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';
import { addCustomerOrder } from '../utils/adminStorage';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  initialServiceTitle?: string;
  lang: Language;
}

export const RequestServiceModal: React.FC<RequestServiceModalProps> = ({
  isOpen,
  onClose,
  phone,
  initialServiceTitle = '',
  lang
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const services = isAr ? SERVICES_DATA : SERVICES_DATA_EN;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceTitle || services[0].title);
  const [deviceOrAccountDetails, setDeviceOrAccountDetails] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('urgent');
  const [submitted, setSubmitted] = useState(false);

  // 4-digit PIN state after WhatsApp submission
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '']);
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinSuccess, setPinSuccess] = useState<boolean>(false);

  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (initialServiceTitle) {
      setSelectedService(initialServiceTitle);
    } else if (services.length > 0) {
      setSelectedService(services[0].title);
    }
  }, [initialServiceTitle, lang]);

  useEffect(() => {
    if (submitted && !pinSuccess) {
      setTimeout(() => {
        pinRefs[0].current?.focus();
      }, 200);
    }
  }, [submitted, pinSuccess]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean && val !== '') return;

    const newDigits = [...pinDigits];
    const char = clean.slice(-1);
    newDigits[index] = char;
    setPinDigits(newDigits);
    setPinError(null);

    if (char && index < 3) {
      pinRefs[index + 1].current?.focus();
    }

    const fullPin = newDigits.join('');
    if (fullPin.length === 4 && index === 3) {
      handlePinVerify(fullPin);
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    } else if (e.key === 'Enter') {
      const full = pinDigits.join('');
      if (full.length === 4) {
        handlePinVerify(full);
      }
    }
  };

  const handlePinVerify = (pinToTest?: string) => {
    const pin = pinToTest || pinDigits.join('');
    if (pin.length < 4) {
      setPinError(isAr ? 'يرجى إدخال الأرقام الأربعة كاملة' : 'Please enter all 4 digits');
      return;
    }

    if (verifyPinCode(pin)) {
      setPinSuccess(true);
      setPinError(null);
      setAppUnlockedStatus(true);
    } else {
      setPinError(
        isAr 
          ? 'رمز التفعيل غير صحيح! يرجى مراجعة المالك عبر واتساب للحصول على كود التفعيل المكون من 4 أرقام.'
          : 'Invalid 4-digit PIN! Please contact the owner on WhatsApp to receive your activation code.'
      );
      pinRefs[0].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urgencyLabels = {
      normal: isAr ? 'عادي' : 'Normal',
      urgent: isAr ? 'مستعجل' : 'Urgent',
      emergency: isAr ? 'طارئ وفوري' : 'Emergency'
    };

    const formattedMessage = isAr ? (
      `*تأكيد اشتراك وطلب خدمة من موقع رقيب للبرمجة والتسويق*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *الاسم:* ${clientName || 'عميل رقيب'}\n` +
      `📱 *رقم العميل:* ${clientPhone || 'غير محدد'}\n` +
      `🛠️ *الخدمة المطلوبة:* ${selectedService}\n` +
      `⚡ *مستوى الأهمية:* ${urgencyLabels[urgency]}\n` +
      `📝 *تفاصيل الجهاز / الحساب:* ${deviceOrAccountDetails || 'لا توجد تفاصيل إضافية'}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `لقد أرسلت التأكيد وأنتظر تزويدي برمز التفعيل (PIN المكون من 4 أرقام) لتشغيل واستخدام التطبيق.`
    ) : (
      `*Subscription & Service Request from Raqeeb Tech & Marketing*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${clientName || 'Client'}\n` +
      `📱 *Client Phone:* ${clientPhone || 'Not specified'}\n` +
      `🛠️ *Requested Service:* ${selectedService}\n` +
      `⚡ *Urgency Level:* ${urgencyLabels[urgency]}\n` +
      `📝 *Device / Account Details:* ${deviceOrAccountDetails || 'None provided'}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `I have confirmed my subscription and await the 4-digit PIN to activate the app.`
    );

    const whatsappUrl = `https://wa.me/967${phone}?text=${encodeURIComponent(formattedMessage)}`;
    
    // Save order in admin storage for owner tracking
    try {
      addCustomerOrder({
        id: `ord-${Date.now()}`,
        clientName: clientName || (isAr ? 'عميل عبر الموقع' : 'Website Client'),
        clientPhone: clientPhone || 'غير محدد',
        serviceTitle: selectedService,
        urgency: urgency,
        details: deviceOrAccountDetails || (isAr ? 'طلب اشتراك وتفعيل' : 'Subscription request'),
        date: new Date().toLocaleString(isAr ? 'ar-EG' : 'en-US'),
        status: 'pending'
      });
    } catch {
      // ignore
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const requestPinWhatsappUrl = `https://wa.me/967${phone}?text=${encodeURIComponent(
    isAr 
      ? `مرحباً أخي مالك رقيب، أرسلت تأكيد اشتراكي لخدمة (${selectedService}) وأريد كود التفعيل المكون من 4 أرقام لتشغيل التطبيق.`
      : `Hello Raqeeb Owner, I submitted my subscription for (${selectedService}) and need the 4-digit PIN to unlock the app.`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-xl my-auto max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 ${isAr ? 'text-right' : 'text-left'} space-y-5 sm:space-y-6 scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button - 44px min touch target */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{submitted ? (isAr ? 'تأكيد الاشتراك وتفعيل التطبيق' : 'Verify Subscription PIN') : (isAr ? 'نموذج طلب خدمة واشتراك' : 'Service Order & Subscription Form')}</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
            {submitted 
              ? (pinSuccess 
                  ? (isAr ? 'تم تفعيل التطبيق بنجاح!' : 'App Activated Successfully!') 
                  : (isAr ? 'أدخل رمز التفعيل (4 أرقام) لاستخدام التطبيق' : 'Enter 4-Digit PIN to Unlock App'))
              : (isAr ? 'تأكيد الاشتراك وطلب الخدمة' : 'Confirm Subscription & Request Service')}
          </h3>
          <p className="text-xs text-slate-300">
            {submitted 
              ? (pinSuccess 
                  ? (isAr ? 'تم التحقق من كود المالك المعتمد، التطبيق مفتوح الآن بالكامل.' : 'Owner code verified. All features are fully unlocked.')
                  : (isAr ? 'تم إرسال تأكيد اشتراكك عبر واتساب! لتشغيل واستخدام التطبيق، يرجى إدخال الرمز المكون من 4 أرقام المستلم من المالك.' : 'Your request was sent to WhatsApp. Enter the 4-digit PIN provided by the owner to start using the app.'))
              : (isAr ? 'املأ البيانات لإرسال تأكيد الاشتراك إلى المالك عبر واتساب وتفعيل التطبيق' : 'Fill details to send WhatsApp confirmation to the owner and unlock the app')}
          </p>
        </div>

        {submitted ? (
          /* POST-WHATSAPP SUBMITTED VIEW WITH 4-DIGIT PIN ENTRY */
          <div className="space-y-5">
            
            {/* Top confirmation banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">
                  {isAr ? 'تم إرسال تأكيد الاشتراك إلى المالك عبر واتساب' : 'Subscription sent to Owner on WhatsApp'}
                </div>
                <div className="text-emerald-400 font-mono text-[11px]">
                  {phone} (مالك رقيب)
                </div>
              </div>
            </div>

            {pinSuccess ? (
              /* Success Activated State */
              <div className="p-6 text-center space-y-4 bg-slate-950 rounded-2xl border border-emerald-500/60">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/60 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {isAr ? 'تهانينا! تم تفعيل التطبيق بنجاح' : 'Congratulations! App Activated'}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                    {isAr ? 'تم التحقق من الرمز بنجاح، يمكنك الآن تحميل واستخدام تطبيق رقيب بكافة مميزاته.' : 'PIN verified successfully. You can now download and enjoy all features of Raqeeb.'}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={APK_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-950/80 transition cursor-pointer min-h-[48px]"
                  >
                    <Download className="w-4 h-4 animate-bounce" />
                    <span>{isAr ? 'تحميل تطبيق رقيب الآن (APK مباشر)' : 'Download Raqeeb APK Now'}</span>
                    <ExternalLink className="w-4 h-4 opacity-75" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setPinSuccess(false);
                      setPinDigits(['', '', '', '']);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer min-h-[44px]"
                  >
                    {isAr ? 'إغلاق ومتابعة الاستخدام' : 'Close & Continue'}
                  </button>
                </div>
              </div>
            ) : (
              /* 4-Digit PIN Input Box */
              <div className="space-y-4">
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-cyan-800/60 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-300">
                    <KeyRound className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>{isAr ? 'أيقونة إدخال كود التفعيل المكون من 4 أرقام:' : 'Enter 4-Digit Activation PIN:'}</span>
                  </div>

                  <div className="flex justify-center items-center gap-3 sm:gap-4 py-2" dir="ltr">
                    {pinDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={pinRefs[idx]}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-mono font-black rounded-2xl bg-slate-900 border-2 text-cyan-300 focus:outline-none transition ${
                          pinError 
                            ? 'border-rose-500 bg-rose-950/20 text-rose-300' 
                            : digit 
                              ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-md' 
                              : 'border-slate-700 focus:border-cyan-400'
                        }`}
                      />
                    ))}
                  </div>

                  {pinError && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-bold bg-rose-950/40 p-2 rounded-xl border border-rose-800/50">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  <button
                    onClick={() => handlePinVerify()}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer min-h-[44px]"
                  >
                    {isAr ? 'تحقق من الكود وتفعيل التطبيق' : 'Verify Code & Activate'}
                  </button>
                </div>

                {/* WhatsApp Request PIN button if user does not have it yet */}
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-2">
                  <p className="text-[11px] text-slate-400">
                    {isAr 
                      ? 'للحصول على الرمز السري من المالك مباشرة عبر واتساب:' 
                      : 'To receive the secret 4-digit code directly from the owner:'}
                  </p>
                  <a
                    href={requestPinWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isAr ? 'مراسلة المالك لطلب كود التفعيل' : 'Chat with Owner on WhatsApp'}</span>
                  </a>
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    {isAr ? 'إغلاق مؤقتاً والعودة لاحقاً' : 'Close temporarily'}
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Service Selection Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'حدد الخدمة المطلوبة:' : 'Select Desired Service:'}
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 min-h-[44px]"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    [{s.categoryName}] {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'اسمك الكريم:' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'مثال: محمد علي' : 'e.g. Alex Smith'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'رقم هاتفك (للتواصل):' : 'Your Phone Number:'}
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="785502919"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 min-h-[44px]"
                />
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'مستوى الاستعجال:' : 'Urgency Level:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('normal')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition min-h-[44px] cursor-pointer ${
                    urgency === 'normal' 
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {isAr ? 'عادي (خلال 24 س)' : 'Normal (24h)'}
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('urgent')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition min-h-[44px] cursor-pointer ${
                    urgency === 'urgent' 
                      ? 'bg-amber-950/70 border-amber-400 text-amber-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {isAr ? 'مستعجل (خلال ساعات)' : 'Urgent (Few hrs)'}
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('emergency')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition min-h-[44px] cursor-pointer ${
                    urgency === 'emergency' 
                      ? 'bg-rose-950/70 border-rose-400 text-rose-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {isAr ? 'فوري وطارئ الآن' : 'Immediate / Emergency'}
                </button>
              </div>
            </div>

            {/* Device or account info */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'نوع الجهاز أو الحساب / تفاصيل المشكلة:' : 'Device / Account Details / Issue Description:'}
              </label>
              <textarea
                rows={3}
                value={deviceOrAccountDetails}
                onChange={(e) => setDeviceOrAccountDetails(e.target.value)}
                placeholder={isAr ? 'مثال: سامسونج S22 مقفل شبكة / أو حساب انستغرام بحاجة لإعلانات ممولة...' : 'e.g. Samsung locked on carrier / Instagram ad campaign setup...'}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Security Assurance badge */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isAr ? 'سيتم إرسال تأكيد الاشتراك إلى المالك عبر واتساب ثم إدخال الرمز المكون من 4 أرقام لتشغيل التطبيق.' : 'Subscription will route to WhatsApp and prompt 4-digit PIN verification to activate app.'}
              </span>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition cursor-pointer min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال تأكيد الاشتراك عبر واتساب وتفعيل التطبيق' : 'Send WhatsApp Confirmation & Unlock'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

