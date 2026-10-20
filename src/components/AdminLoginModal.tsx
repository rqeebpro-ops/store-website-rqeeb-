import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  KeyRound, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  verifyAdminPassword, 
  verifyAdminPhone, 
  setAdminSession,
  ADMIN_MASTER_PASSWORD,
  AUTHORIZED_OWNER_PHONES
} from '../utils/adminStorage';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  lang?: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';
  
  // Login Tab: 'password' | 'phone'
  const [activeTab, setActiveTab] = useState<'password' | 'phone'>('password');
  
  // Form fields
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('785502919');
  const [pinCode, setPinCode] = useState('');
  
  // States
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError(isAr ? 'يرجى كتابة كلمة السر' : 'Please enter password');
      return;
    }

    if (verifyAdminPassword(password)) {
      handleSuccess();
    } else {
      setError(
        isAr 
          ? 'كلمة السر غير صحيحة! يرجى إدخال كلمة سر الإدارة المحددة (@#Abasabfarag1)' 
          : 'Incorrect password! Please enter the admin master password.'
      );
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone) {
      setError(isAr ? 'يرجى إدخال رقم الهاتف' : 'Please enter phone number');
      return;
    }

    if (verifyAdminPhone(phone, pinCode)) {
      handleSuccess();
    } else {
      setError(
        isAr 
          ? 'رقم الهاتف أو رمز PIN غير مصرح به! يرجى إدخال رقم هاتف المالك (785502919).' 
          : 'Unauthorized phone number! Please enter the owner phone (785502919).'
      );
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
    setAdminSession(true, rememberMe);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      onLoginSuccess();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Top glowing bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-1 rounded-2xl bg-white border border-blue-400/40 shadow-xl w-16 h-16 mx-auto items-center justify-center overflow-hidden">
              <img 
                src="/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png" 
                alt="لوجو رقيب" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>{isAr ? 'لوحة تحكم رقيب' : 'Raqeeb Admin Panel'}</span>
              <span className="text-[10px] uppercase font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                {isAr ? 'المالك والمشرف' : 'Owner'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              {isAr 
                ? 'تم فتح نافذة تسجيل الدخول السري عبر النقر 10 مرات على الشعار. اختر طريقة تسجيل الدخول للمتابعة:' 
                : 'Secret login activated via 10 clicks on logo. Choose your preferred login method:'}
            </p>
          </div>

          {/* Success Notification */}
          {success && (
            <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">
                  {isAr ? 'تم التحقق بنجاح!' : 'Authenticated successfully!'}
                </p>
                <p className="text-[11px] text-emerald-300">
                  {isAr ? 'جاري فتح لوحة التحكم وجميع الصلاحيات...' : 'Opening dashboard with full privileges...'}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Tabs: Method 1 (Password) vs Method 2 (Phone) */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setActiveTab('password');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'password'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{isAr ? '1. بكلمة السر' : '1. Password'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('phone');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'phone'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isAr ? '2. برقم الهاتف' : '2. Phone'}</span>
            </button>
          </div>

          {/* Tab 1: Password Login */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>{isAr ? 'كلمة السر الرئيسية' : 'Master Password'}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">(@#Abasabfarag1)</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isAr ? 'أدخل كلمة السر الخاصة بك...' : 'Enter master password...'}
                    autoFocus
                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
                    title={showPassword ? 'إخفاء' : 'إظهار'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick helper for owner */}
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-[11px] text-cyan-300 flex items-center justify-between">
                <span>{isAr ? 'كلمة سر المالك المعتمدة:' : 'Owner Password:'}</span>
                <button
                  type="button"
                  onClick={() => setPassword(ADMIN_MASTER_PASSWORD)}
                  className="font-mono bg-cyan-900/60 hover:bg-cyan-800 px-2 py-0.5 rounded text-white text-[10px] font-bold transition cursor-pointer"
                >
                  {isAr ? 'ملء تلقائي (@#Abasabfarag1)' : 'Auto-fill'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                  />
                  <span>{isAr ? 'تذكر تسجيل الدخول في هذا الجهاز' : 'Remember me'}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'دخول لوحة التحكم' : 'Login to Dashboard'}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Tab 2: Phone Login */}
          {activeTab === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>{isAr ? 'رقم هاتف المالك المصرح' : 'Authorized Owner Phone'}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">785502919</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="785502919"
                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono text-left transition"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>{isAr ? 'رمز الأمان السري (PIN المكون من 4 أرقام - اختياري للتأكيد)' : 'Secret 4-digit PIN (Optional)'}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">2029 / 7855</span>
                </label>
                <input
                  type="password"
                  dir="ltr"
                  maxLength={4}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="2029"
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono text-center tracking-widest transition"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                  />
                  <span>{isAr ? 'حفظ الجلسة' : 'Save session'}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'تأكيد ودخول برقم الهاتف' : 'Verify & Login with Phone'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-3 border-t border-slate-800/80 text-center">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>{isAr ? 'جميع الصلاحيات متاحة: مقالات، ألعاب، تطبيقات APK، وإدارة كاملة' : 'Full privileges: Articles, Games, APKs & System'}</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
