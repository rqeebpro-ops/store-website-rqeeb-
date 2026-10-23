import React from 'react';

export interface OwnerSocialLink {
  id: 'facebook' | 'instagram' | 'tiktok' | 'website' | 'telegram' | 'whatsapp';
  name: string;
  nameEn: string;
  username: string;
  url: string;
  badgeColor: string;
  hoverBg: string;
}

export const OWNER_SOCIAL_LINKS: OwnerSocialLink[] = [
  {
    id: 'facebook',
    name: 'فيسبوك',
    nameEn: 'Facebook',
    username: 'rqeebpro',
    url: 'https://www.facebook.com/rqeebpro',
    badgeColor: '#1877F2',
    hoverBg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]'
  },
  {
    id: 'instagram',
    name: 'انستغرام',
    nameEn: 'Instagram',
    username: 'rqeebpro',
    url: 'https://www.instagram.com/rqeebpro',
    badgeColor: '#E1306C',
    hoverBg: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent'
  },
  {
    id: 'tiktok',
    name: 'تيك توك',
    nameEn: 'TikTok',
    username: 'rqeebpro',
    url: 'https://www.tiktok.com/@rqeebpro',
    badgeColor: '#000000',
    hoverBg: 'hover:bg-black hover:text-white hover:border-black'
  },
  {
    id: 'website',
    name: 'موقع ويب',
    nameEn: 'Website',
    username: 'rqeebpro.online',
    url: 'https://rqeebpro.online',
    badgeColor: '#2563EB',
    hoverBg: 'hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]'
  }
];

// Crisp, high-definition branded SVG Icons
export const FacebookIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.32a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 1 0 6.34 6.34V8.71a8.21 8.21 0 0 0 4.81 1.55v-3.45c-.37 0-.74-.04-1.04-.12z"/>
  </svg>
);

export const WebsiteGlobeIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export const getSocialIconComponent = (id: string, className?: string, size?: number) => {
  switch (id) {
    case 'facebook':
      return <FacebookIcon className={className} size={size} />;
    case 'instagram':
      return <InstagramIcon className={className} size={size} />;
    case 'tiktok':
      return <TikTokIcon className={className} size={size} />;
    case 'website':
      return <WebsiteGlobeIcon className={className} size={size} />;
    default:
      return <WebsiteGlobeIcon className={className} size={size} />;
  }
};

interface OwnerSocialBarProps {
  layout?: 'chips' | 'icons-only' | 'cards' | 'ribbon';
  lang?: 'ar' | 'en';
  className?: string;
}

export const OwnerSocialBar: React.FC<OwnerSocialBarProps> = ({ 
  layout = 'chips', 
  lang = 'ar',
  className = '' 
}) => {
  const isAr = lang === 'ar';

  if (layout === 'ribbon') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {OWNER_SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${isAr ? item.name : item.nameEn}: ${item.username}`}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white text-blue-100 hover:text-[#0A2351] flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-xs"
            aria-label={item.name}
          >
            {getSocialIconComponent(item.id, 'w-3.5 h-3.5')}
          </a>
        ))}
      </div>
    );
  }

  if (layout === 'icons-only') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {OWNER_SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${isAr ? item.name : item.nameEn}: ${item.username}`}
            className="w-9 h-9 rounded-xl bg-white border border-[#DBEAFE] hover:border-transparent text-[#0F172A] flex items-center justify-center shadow-xs transition-all duration-200 transform hover:scale-105 group"
            style={{ color: item.badgeColor }}
            aria-label={item.name}
          >
            {getSocialIconComponent(item.id, 'w-4 h-4 transition group-hover:scale-110')}
          </a>
        ))}
      </div>
    );
  }

  if (layout === 'cards') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
        {OWNER_SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#DBEAFE] hover:shadow-md transition-all duration-200 group"
          >
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: item.badgeColor }}
            >
              {getSocialIconComponent(item.id, 'w-4 h-4 text-white')}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-[#0F172A] block truncate group-hover:text-[#2563EB] transition">
                {isAr ? item.name : item.nameEn}
              </span>
              <span className="text-[10px] text-[#64748B] font-mono block truncate" dir="ltr">
                {item.id === 'website' ? item.username : `@${item.username}`}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // Default: chips / pills with handle
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      {OWNER_SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#DBEAFE] shadow-xs text-xs font-bold text-[#0F172A] transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <span 
            className="w-5 h-5 rounded-lg flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: item.badgeColor }}
          >
            {getSocialIconComponent(item.id, 'w-3 h-3 text-white')}
          </span>
          <span>{isAr ? item.name : item.nameEn}</span>
          <span className="text-[10px] font-mono font-medium text-[#64748B] group-hover:text-[#2563EB]" dir="ltr">
            {item.id === 'website' ? item.username : `@${item.username}`}
          </span>
        </a>
      ))}
    </div>
  );
};
