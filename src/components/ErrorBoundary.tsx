import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });

    const isChunkLoadError = 
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed') ||
      error.message?.includes('Loading chunk') ||
      error.name === 'ChunkLoadError';

    if (isChunkLoadError) {
      const hasAutoReloaded = sessionStorage.getItem('raqeeb_chunk_auto_reloaded');
      if (!hasAutoReloaded) {
        sessionStorage.setItem('raqeeb_chunk_auto_reloaded', 'true');
        window.location.reload();
      }
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHardReset = () => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        if ('caches' in window) {
          caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
          });
        }
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((reg) => reg.unregister());
          });
        }
      }
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen bg-[#0A2351] text-white flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white"
          dir="rtl"
          style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
        >
          <div className="max-w-md w-full bg-[#0F2D5C]/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                رقيب برو (Rqeeb Pro)
              </h2>
              <p className="text-sm text-blue-200">
                حدث تحديث في ملفات الموقع، اضغط على زر التحديث لعرض أحدث إصدار.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل الصفحة فوراً</span>
              </button>

              <button
                onClick={this.handleHardReset}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-blue-200 hover:text-white font-medium text-xs border border-white/10 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>مسح التخزين المؤقت والبدء من جديد</span>
              </button>
            </div>

            <p className="text-[11px] text-blue-300/60 pt-2 border-t border-white/10">
              مركز رقيب للبرمجة والتسويق • هاتف الدعم: 785502919
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
