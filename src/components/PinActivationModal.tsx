import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Download, 
  ExternalLink,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { 
  verifyPinCode, 
  checkIsAppUnlocked, 
  setAppUnlockedStatus,
  MASTER_OWNER_PIN 
} from '../utils/securityConfig';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface PinActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  lang: Language;
  onActivatedSuccess?: () => void;
  autoPromptedAfterWhatsapp?: boolean;
}

export const PinActivationModal: React.FC<PinActivationModalProps> = ({
  isOpen,
  onClose,
  phone,
  lang,
  onActivatedSuccess,
  autoPromptedAfterWhatsapp = false
}) => {
  const isAr = lang === 'ar';
  
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isOwnerDetected, setIsOwnerDetected] = useState<boolean>(false);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Initialize status on modal open
  useEffect(() => {
    if (isOpen) {
      const alreadyUnlocked = checkIsAppUnlocked();
      if (alreadyUnlocked) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        setDigits(['', '', '', '']);
        setErrorMsg(null);
        // Focus first input after animation
        setTimeout(() => {
          inputRefs[0].current?.focus();
        }, 150);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, val: string) => {
    // Only allow single numeric char
    const clean = val.replace(/\D/g, '');
    if (!clean && val !== '') return;

    const newDigits = [...digits];
    const char = clean.slice(-1);
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMsg(null);

    // Auto-advance to next input
    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If all 4 digits entered, auto-verify
    const fullPin = newDigits.join('');
    if (fullPin.length === 4 && index === 3) {
      handleVerify(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'Enter') {
      const fullPin = digits.join('');
      if (fullPin.length === 4) {
        handleVerify(fullPin);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;

    const newDigits = ['', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    if (pasted.length === 4) {
      handleVerify(pasted);
    } else {
      inputRefs[Math.min(pasted.length, 3)].current?.focus();
    }
  };

  const handleVerify = (pinToTest?: string) => {
    const pin = pinToTest || digits.join('');
    if (pin.length < 4) {
      setErrorMsg(isAr ? 'يرجى إدخال الأرقام الأربعة كاملة' : 'Please enter all 4 digits');
      return;
    }

    const valid = verifyPinCode(pin);
    if (valid) {
      setIsSuccess(true);
      setErrorMsg(null);
      setAppUnlockedStatus(true);
      if (pin === MASTER_OWNER_PIN) {
        setIsOwnerDetected(true);
      }
      if (onActivatedSuccess) {
        onActivatedSuccess();
      }
    } else {
      setErrorMsg(
        isAr 
          ? 'رمز التفعيل غير صحيح! لا يمكن استخدام التطبيق بدون الكود المعتمد من المالك.' 
          : 'Invalid 4-digit PIN! App activation requires the verified owner code.'
      );
      // Shake inputs and focus first
      inputRefs[0].current?.focus();
    }
  };

  const handleReset = () => {
    setAppUnlockedStatus(false);
    setIsSuccess(false);
    setIsOwnerDetected(false);
    setDigits(['', '', '', '']);
    setErrorMsg(null);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
  };

  const whatsappHelpUrl = `https://wa.me/967${phone}?text=${encodeURIComponent(
    isAr 
      ? 'مرحباً أخي مالك رقيب، أرسلت تأكيد اشتراكي عبر واتساب وأريد كود التفعيل المكون من 4 أرقام لتشغيل واستخدام التطبيق.'
      : 'Hello Raqeeb Owner, I sent my subscription confirmation on WhatsApp and need the 4-digit PIN code to activate and use the app.'
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-slate-900 border ${isSuccess ? 'border-emerald-500/80 shadow-emerald-950/80' : 'border-cyan-800/80 shadow-cyan-950/80'} rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 ${isAr ? 'text-right' : 'text-left'} space-y-5 scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Badge & Title */}
        <div className="space-y-2 pr-8">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isSuccess ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60' : 'bg-cyan-950 text-cyan-300 border-cyan-800/60'}`}>
            {isSuccess ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'التطبيق مفعل بنجاح' : 'App Fully Activated'}</span>
              </>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{isAr ? 'تأكيد الاشتراك وتفعيل التطبيق' : 'Subscription PIN Verification'}</span>
              </>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {isSuccess 
              ? (isAr ? 'تم تفعيل تطبيق رَقِـيـب بنجاح!' : 'Raqeeb App Activated Successfully!')
              : (isAr ? 'أدخل رمز التفعيل (مكون من 4 أرقام)' : 'Enter 4-Digit Activation PIN')}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isSuccess 
              ? (isAr ? 'تم التحقق من كود المالك المعتمد. التطبيق مفتوح وجاهز للاستخدام الكامل وتنزيل التحديثات.' : 'Owner code verified. All app functions and high-speed tools are unlocked.')
              : (autoPromptedAfterWhatsapp 
                  ? (isAr ? 'تم إرسال تأكيد اشتراكك عبر واتساب! لتشغيل واستخدام التطبيق، يرجى إدخال الرمز السري المكون من 4 أرقام المُستلم من المالك.' : 'Your subscription request was routed to WhatsApp! Enter the 4-digit PIN provided by the owner to unlock the app.')
                  : (isAr ? 'بعد إرسال تأكيد الاشتراك إلى المالك عبر واتساب، أدخل الرمز المكون من 4 أرقام لتشغيل التطبيق واستخدامه دون قيود.' : 'Enter the 4-digit activation PIN issued by the owner to unlock the application.'))}
          </p>
        </div>

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/50 text-center space-y-3 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/60 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {isAr ? 'الترخيص نشط ومصرح للاستخدام' : 'License Verified & Active'}
                </h4>
                <div className="text-xs text-emerald-300/90 font-medium mt-1">
                  {isOwnerDetected 
                    ? (isAr ? 'مرحباً بك يا مالك التطبيق! تم تسجيل الدخول بالكود الرئيسي المعتمد (2029).' : 'Welcome, Owner! Unlocked via primary master code.')
                    : (isAr ? 'تم قبول كود التفعيل المعتمد بنجاح.' : 'Verified by Raqeeb security engine.')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-emerald-900/50">
                <div className="bg-slate-950/80 p-2 rounded-xl border border-emerald-800/40">
                  <span className="text-emerald-400 font-bold block">حالة التطبيق:</span>
                  <span>مفعل وجاهز ⚡</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-emerald-800/40">
                  <span className="text-cyan-400 font-bold block">الإصدار:</span>
                  <span>v2.2 APK الكامل</span>
                </div>
              </div>
            </div>

            {/* Actions for activated user */}
            <div className="space-y-2.5">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-950/70 transition cursor-pointer min-h-[50px]"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>{isAr ? 'تحميل تطبيق رقيب المعتمد (APK مباشر)' : 'Download Unlocked Raqeeb APK'}</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition cursor-pointer min-h-[44px]"
                >
                  {isAr ? 'متابعة التصفح واستخدام الخدمات' : 'Continue to Dashboard'}
                </button>

                <button
                  onClick={handleReset}
                  title={isAr ? 'إعادة قفل أو تغيير الرمز' : 'Lock or Reset PIN'}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs font-bold transition cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* LOCKED / PIN ENTRY STATE */
          <div className="space-y-5">
            {/* 4-Digit Box Inputs */}
            <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4 shadow-inner">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'أدخل الأرقام الأربعة للتفعيل:' : 'Enter 4 Digits:'}</span>
              </div>

              {/* 4 Digit Boxes */}
              <div className="flex justify-center items-center gap-3 sm:gap-4" dir="ltr">
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className={`w-14 h-16 sm:w-16 sm:h-20 text-center text-2xl sm:text-3xl font-mono font-black rounded-2xl bg-slate-900 border-2 text-cyan-300 focus:outline-none transition ${
                      errorMsg 
                        ? 'border-rose-500/80 bg-rose-950/20 text-rose-300 shadow-lg shadow-rose-950/50' 
                        : digit 
                          ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-lg shadow-cyan-950/50' 
                          : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                ))}
              </div>

              {/* Error Message if wrong */}
              {errorMsg && (
                <div className="flex items-center justify-center gap-2 text-xs text-rose-400 font-bold bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/50 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Confirm Verify Button */}
            <button
              onClick={() => handleVerify()}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm sm:text-base shadow-xl shadow-cyan-950/70 transition cursor-pointer min-h-[48px]"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isAr ? 'تأكيد رمز التفعيل وتشغيل التطبيق' : 'Verify PIN & Unlock App'}</span>
            </button>

            {/* Help / WhatsApp Contact to get PIN */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
              <p className="text-xs text-slate-400">
                {isAr 
                  ? 'لم تستلم كود التفعيل بعد؟ تواصل مع المالك لتأكيد اشتراكك والحصول على الرمز فوراً:'
                  : 'Haven’t received your 4-digit code yet? Request it directly from the owner:'}
              </p>
              <a
                href={whatsappHelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'مراسلة المالك على واتساب لطلب كود التفعيل' : 'Request Activation PIN via WhatsApp'}</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
