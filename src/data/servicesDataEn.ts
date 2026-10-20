import { ServiceItem, ServiceCategory } from '../types';

export const SERVICES_DATA_EN: ServiceItem[] = [
  // --- Unlocking ---
  {
    id: 'carrier-network-unlock',
    title: 'International & Local Carrier Unlock',
    category: 'unlocking',
    categoryName: 'Device & Carrier Unlocking',
    shortDesc: 'Factory unlock for all phones (Samsung, iPhone, Xiaomi, Motorola, etc.) to operate seamlessly on any local and global telecom network with 4G/5G support.',
    fullDesc: 'Certified carrier unlock service for devices locked to international carriers (T-Mobile, AT&T, Verizon, Sprint, Softbank, Vodafone, etc.) via official servers and specialized protocols, ensuring permanent 100% functionality.',
    icon: 'Radio',
    badge: 'High Demand',
    popular: true,
    estimatedTime: '15 - 60 minutes',
    successRate: '99.5%',
    guarantee: 'Permanent Lifetime Guarantee',
    steps: [
      { title: 'Diagnostic IMEI & Model Verification', description: 'Read device parameters, lock type, and carrier origin to determine the official unlock path.' },
      { title: 'Server / Protocol Activation', description: 'Submit server code or apply direct engineering box protocols.' },
      { title: 'Modem & NVRAM Optimization', description: 'Configure baseband bands to guarantee network stability, 4G/5G data flow, and VoLTE.' },
      { title: 'Testing & Quality Check', description: 'Verify multiple SIM cards, signal bars, call quality, and internet speed.' }
    ],
    requirements: [
      'Device IMEI number (*#06#)',
      'Exact phone model',
      'Original carrier lock (if known)'
    ],
    features: [
      'Zero impact on existing internal phone data',
      'Immediate 4G/5G and VoLTE activation',
      'Supports all Android and iOS versions',
      'Permanent unlock — unaffected by future system updates'
    ]
  },
  {
    id: 'bootloader-modem-repair',
    title: 'Modem, IMEI & Bootloader Repair',
    category: 'unlocking',
    categoryName: 'Device & Carrier Unlocking',
    shortDesc: 'Fix lost network signal (Null IMEI / Baseband Unknown), restore lost serial numbers, and unlock bootloader safely.',
    fullDesc: 'Comprehensive software repair resolving baseband failures, corrupted NVRAM/EFS partitions, and secure bootloader modifications with factory-grade firmware.',
    icon: 'Cpu',
    estimatedTime: '30 - 90 minutes',
    successRate: '98%',
    guarantee: 'Signal Stability Guarantee',
    steps: [
      { title: 'Baseband Diagnostic Check', description: 'Examine processor status, radio firmware, and EFS partition integrity.' },
      { title: 'QCN / EFS Reconstruction', description: 'Re-flash genuine calibration and radio frequency profiles.' },
      { title: 'Bootloader Setup & Authentication', description: 'Safely manage bootloader privileges without tripping security flags.' },
      { title: 'Signal Transmission Testing', description: 'Conduct test calls and verify antenna reception stability.' }
    ],
    requirements: ['Device present at lab or remote connection via AnyDesk/TeamViewer'],
    features: ['Resolves sudden signal drop issues', 'Restores original device serial number', 'Fixes bootloop / stuck on logo']
  },

  // --- Screen Locks & Security ---
  {
    id: 'frp-google-bypass',
    title: 'Google FRP Lock Bypass',
    category: 'screen_locks',
    categoryName: 'Screen Locks & Security',
    shortDesc: 'Permanent removal of Google Account Verification lock after factory reset across Samsung, Xiaomi, Huawei, Oppo, and Infinix devices.',
    fullDesc: 'Professional bypass for "Verify your account - This device was reset" lock using certified engineering tools for the latest Android OS versions without damaging the device.',
    icon: 'ShieldAlert',
    badge: 'Rapid Service',
    popular: true,
    estimatedTime: '10 - 30 minutes',
    successRate: '100%',
    guarantee: 'Permanent Unlock & Accepts New Account',
    steps: [
      { title: 'Android Security Patch Verification', description: 'Identify current security patch level and processor architecture.' },
      { title: 'Diagnostic Mode Engagement', description: 'Connect via ADB, EDL, or Test Point mode using specialized Raqeeb suites.' },
      { title: 'FRP Partition Reset', description: 'Clear old security flags and return the device to clean factory state.' },
      { title: 'Initial Device Setup', description: 'Sign in freely with your own personal Google account.' }
    ],
    requirements: ['Phone model and verification of legal ownership'],
    features: ['Supports Android 13, 14, and 15', 'Remote execution available via AnyDesk', 'Full device functionality restored']
  },
  {
    id: 'screen-pattern-pin-unlock',
    title: 'PIN, Pattern & Password Screen Unlock',
    category: 'screen_locks',
    categoryName: 'Screen Locks & Security',
    shortDesc: 'Unlock smartphones and tablets when passwords, pins, or patterns are forgotten, with data retention options where supported.',
    fullDesc: 'Unlock locked smartphones with advanced forensic recovery tools to extract or preserve critical memories and contacts before device reset where supported by hardware architecture.',
    icon: 'Lock',
    estimatedTime: '15 - 45 minutes',
    successRate: '99%',
    guarantee: '100% Operational Device Restored',
    steps: [
      { title: 'Hardware & Encryption Audit', description: 'Determine if device allows memory dump or standard unlocking.' },
      { title: 'Passcode Sector Bypass', description: 'Safely bypass encrypted lock files using specialized test protocols.' },
      { title: 'Main Menu Access & Reconfiguration', description: 'Regain full screen access and configure new credentials.' }
    ],
    requirements: ['Locked device and proof of ownership'],
    features: ['Ultra-fast execution', 'Modern box programming interfaces', 'Wide compatibility from legacy to flagship phones']
  },
  {
    id: 'icloud-apple-solutions',
    title: 'iCloud & Apple Device Solutions (MDM / Screen Passcode)',
    category: 'screen_locks',
    categoryName: 'Screen Locks & Security',
    shortDesc: 'Official bypass solutions for iPhones and iPads on activation lock, corporate MDM lock, and passcode screens.',
    fullDesc: 'Advanced Apple solutions covering screen lock bypass with full cellular signal, one-click MDM school/enterprise removal, and server-side clean status verification.',
    icon: 'Smartphone',
    badge: 'Advanced Tech',
    estimatedTime: '30 mins - 24 hours',
    successRate: '97%',
    guarantee: 'Full Compatibility Guarantee',
    steps: [
      { title: 'Server IMEI Status Verification', description: 'Check device profile status (Clean / MDM / Enterprise).' },
      { title: 'Ramdisk Tooling Execution', description: 'Deploy trusted ramdisk scripts and server patch bypass.' },
      { title: 'Cellular & iCloud Activation', description: 'Enable network connectivity, App Store, and cloud services.' }
    ],
    requirements: ['Serial number or IMEI', 'Exact Apple model'],
    features: ['Cellular signal and calls active', 'MDM bypass without jailbreak', 'Supports iPhone 6s through modern flagships']
  },

  // --- Account Recovery ---
  {
    id: 'social-account-recovery',
    title: 'Compromised & Hacked Account Recovery',
    category: 'account_recovery',
    categoryName: 'Account Recovery',
    shortDesc: 'Restore hacked personal and business social media accounts (Facebook, Instagram, TikTok, Snapchat) even if email, phone, and 2FA were altered.',
    fullDesc: 'Professional forensic cyber recovery for stolen social media profiles through direct developer channels, official legal appeals, identity verifications, and 2FA authenticator bypass.',
    icon: 'UserCheck',
    badge: 'High Success Rate',
    popular: true,
    estimatedTime: '2 - 24 hours',
    successRate: '96%',
    guarantee: 'Full Restoration & Account Hardening',
    steps: [
      { title: 'Hacking Breach Audit', description: 'Identify altered credentials (compromised email, phone, 2FA app, username).' },
      { title: 'Official Identity Dossier Submission', description: 'Prepare national ID verifications, registration dates, and past transaction records.' },
      { title: 'Direct Escalation Appeal', description: 'Liaise via specialized developer channels and internal safety escalation desks.' },
      { title: 'Sanitization & Account Hardening', description: 'Revoke active hacker sessions and deploy Raqeeb 3-layer security.' }
    ],
    requirements: [
      'Original username or account URL',
      'Previous registered email or phone',
      'Official ID matching registered name/birthdate'
    ],
    features: [
      'Account recovery even after total credential alteration',
      'Revocation of intruder 2-Factor Authentication keys',
      'Restores business pages, ad accounts, and groups',
      'Complimentary security setup against future attacks'
    ]
  },
  {
    id: 'whatsapp-ban-removal',
    title: 'WhatsApp Number Unban & Account Reinstatement',
    category: 'account_recovery',
    categoryName: 'Account Recovery',
    shortDesc: 'Unban temporary and permanent spam bans on standard and Business WhatsApp numbers and restore chat availability.',
    fullDesc: 'Legal and technical escalation for WhatsApp bans caused by mass reporting, third-party modded apps, or broadcast messages, submitted directly to Meta review teams.',
    icon: 'MessageSquare',
    estimatedTime: '1 - 6 hours',
    successRate: '98%',
    guarantee: 'Reactivated Mobile Number',
    steps: [
      { title: 'Ban Reason Analysis', description: 'Classify error code (spam flag, terms violation, or temporary restriction).' },
      { title: 'Formal Technical Appeal', description: 'Draft a precise, legal technical appeal directed to WhatsApp safety teams.' },
      { title: 'Re-verification & Activation', description: 'Receive approval notification and successfully confirm SMS verification.' }
    ],
    requirements: ['Phone number with country code', 'Screenshot of ban error dialog'],
    features: ['Unbans permanent and temporary blocks', 'Resolves missing SMS code delivery', 'Includes anti-ban guidance']
  },

  // --- Data Recovery ---
  {
    id: 'deleted-photos-data-recovery',
    title: 'Deleted Photos, Videos & Chat Recovery',
    category: 'data_recovery',
    categoryName: 'Data & File Recovery',
    shortDesc: 'Forensic recovery of deleted photos, family videos, contacts, and WhatsApp databases accidentally wiped from phones.',
    fullDesc: 'Extract lost files directly from internal flash memory using RAW deep sector carving before data is overwritten, conducted with 100% strict privacy protection.',
    icon: 'FileSpreadsheet',
    badge: 'Encrypted Privacy',
    popular: true,
    estimatedTime: '1 - 4 hours',
    successRate: '95%',
    guarantee: '100% Strict Confidentiality Guarantee',
    steps: [
      { title: 'Immediate Memory Lockdown', description: 'Halt all write operations to preserve erased data sectors.' },
      { title: 'Bit-by-Bit Image Dump', description: 'Generate a byte-for-byte virtual mirror of storage for safe offline analysis.' },
      { title: 'Deep Signature Carving', description: 'Scan unallocated space for JPEG, PNG, MP4, and SQLite database headers.' },
      { title: 'Secure Encrypted Delivery', description: 'Transfer recovered archives directly to customer external storage.' }
    ],
    requirements: ['Cease using device immediately upon deletion to maximize recovery chances'],
    features: [
      'Recovers WhatsApp chats, media, documents, and contacts',
      'End-to-end encrypted extraction to protect family privacy',
      'Retrieves data even after quick factory formatting',
      'Compatible with both Android and iOS devices'
    ]
  },
  {
    id: 'damaged-devices-forensic-recovery',
    title: 'Forensic Recovery from Water-Damaged & Broken Devices',
    category: 'data_recovery',
    categoryName: 'Data & File Recovery',
    shortDesc: 'Data extraction from dead smartphones, water-damaged electronics, cracked motherboards, corrupted SSDs, and flash drives.',
    fullDesc: 'Direct chip-off memory harvesting (eMMC / UFS NAND) and microscopic ISP wiring to read data from non-booting devices using certified international hardware programmers.',
    icon: 'HardDrive',
    badge: 'Specialized Lab',
    estimatedTime: '12 - 48 hours',
    successRate: '93%',
    guarantee: 'No Data Retrieved = No Fee',
    steps: [
      { title: 'Motherboard & Power Rail Diagnostic', description: 'Repair power traces to temporarily energize the memory controller.' },
      { title: 'Direct Microscopic Wiring (ISP / JTAG)', description: 'Solder micro-jumpers onto CLK, CMD, and DAT lines to read flash memory.' },
      { title: 'Sector Dump & Decryption', description: 'Acquire raw userdata partitions and decrypt user media.' },
      { title: 'Verification & File Organization', description: 'Sort recovered folders neatly onto a portable drive.' }
    ],
    requirements: ['Bring or ship damaged phone, memory card, or corrupted drive to the lab'],
    features: ['Handles burnt, water-submerged, or crushed phones', 'SSD & mechanical HDD recovery capabilities', 'High-end ultrasonic and microscope workstation']
  },

  // --- Programming & Development ---
  {
    id: 'custom-web-apps-development',
    title: 'Custom Web & Application Development',
    category: 'programming',
    categoryName: 'Software & Tech Solutions',
    shortDesc: 'Build high-speed landing pages, e-commerce stores, custom admin panels, and cloud applications optimized for search engines.',
    fullDesc: 'Full-stack software engineering using modern frameworks (React, Next.js, Node.js, Tailwind CSS) with robust databases, payment gateways, and custom dashboards.',
    icon: 'Code',
    badge: 'Tailored Solutions',
    popular: true,
    estimatedTime: '3 - 14 days',
    successRate: '100%',
    guarantee: 'Includes 6 Months Free Maintenance & Support',
    steps: [
      { title: 'Requirements & UI/UX Architecture', description: 'Map project scope and design responsive visual wireframes.' },
      { title: 'Full-Stack Development', description: 'Write clean, modular code and establish secure database APIs.' },
      { title: 'Security & Speed Optimization', description: 'Audit security vulnerabilities and tune page speed to sub-second load.' },
      { title: 'Deployment & Training', description: 'Launch to cloud hosting, link custom domains, and hand over the admin panel.' }
    ],
    requirements: ['Project concept or list of required features'],
    features: [
      '100% mobile-responsive custom design',
      'Intuitive admin dashboard for easy content management',
      'Hardened against DDoS and injection attacks',
      'Built-in technical SEO from day one'
    ]
  },
  {
    id: 'custom-bots-automation-api',
    title: 'Smart Automation Bots, Scripts & APIs',
    category: 'programming',
    categoryName: 'Software & Tech Solutions',
    shortDesc: 'Develop intelligent Telegram and WhatsApp bots, web scraping scripts, and seamless system integrations.',
    fullDesc: 'Automate business workflows with intelligent bots supporting auto-replies, AI integration, inventory alerts, and payment webhooks.',
    icon: 'Bot',
    estimatedTime: '2 - 5 days',
    successRate: '100%',
    guarantee: '24/7 Cloud Uptime Guarantee',
    steps: [
      { title: 'Workflow & Trigger Mapping', description: 'Define commands, logic flows, and database triggers.' },
      { title: 'API Integration & Logic Coding', description: 'Develop backend integrations using official Telegram / WhatsApp Cloud APIs.' },
      { title: 'Cloud Server Deployment', description: 'Deploy on scalable cloud infrastructure ensuring sub-second response times.' }
    ],
    requirements: ['Target bot objectives and workflow description'],
    features: ['Instant automated replies', 'Saves dozens of customer support hours', 'Comprehensive analytics and logging']
  },

  // --- Digital Marketing ---
  {
    id: 'targeted-paid-ads-campaigns',
    title: 'High-ROI Paid Advertising Campaigns (Meta, Google, TikTok)',
    category: 'marketing',
    categoryName: 'Digital Marketing & Ads',
    shortDesc: 'Launch laser-targeted ad campaigns on Facebook, Instagram, Google, and TikTok to maximize ROI and scale revenue.',
    fullDesc: 'End-to-end paid advertising management including persuasive copywriting, pinpoint audience segmentation, A/B creative testing, and conversion tracking via Meta Pixel and Google Analytics.',
    icon: 'TrendingUp',
    badge: 'High Conversion',
    popular: true,
    estimatedTime: 'Ongoing / Weekly & Monthly Plans',
    successRate: 'Scalable Revenue',
    guarantee: 'Guaranteed Reach to Verified Buyer Demographics',
    steps: [
      { title: 'Competitor & Audience Analysis', description: 'Audit market landscape and pinpoint high-converting buyer personas.' },
      { title: 'High-Converting Creative Production', description: 'Craft compelling video reels and visuals with irresistible offers.' },
      { title: 'Campaign Launch & Budget Optimization', description: 'Actively manage bids to minimize Cost per Lead and Cost per Acquisition.' },
      { title: 'Transparent Performance Analytics', description: 'Deliver crystal-clear KPI reports on conversions, leads, and sales.' }
    ],
    requirements: ['Business niche, proposed ad budget, and campaign target'],
    features: [
      'Pinpoint demographic and geographic targeting',
      'Lower cost-per-click and increased purchase conversions',
      'Direct WhatsApp click-to-chat ad funnels',
      'Google Search ads to dominate page-one rankings'
    ]
  },
  {
    id: 'social-media-management-branding',
    title: 'Social Media Management, Content & Branding',
    category: 'marketing',
    categoryName: 'Digital Marketing & Ads',
    shortDesc: 'Full management of your social brand accounts, bespoke visual posts, viral reels, and rapid community engagement.',
    fullDesc: 'Cultivate an influential brand presence with scheduled thematic posts, eye-catching visual identity design, persuasive captions, and responsive community interactions.',
    icon: 'Sparkles',
    badge: 'Premium Presence',
    estimatedTime: 'Monthly Retainer',
    successRate: 'Authentic Follower Growth',
    guarantee: '100% Bespoke Designs Without Generic Templates',
    steps: [
      { title: 'Content Strategy & Editorial Calendar', description: 'Establish brand tone and high-interest topics for your audience.' },
      { title: 'Graphic Design & Video Editing', description: 'Produce sleek Instagram Reels, TikTok shorts, and carousel graphics.' },
      { title: 'Scheduled Publishing & Engagement', description: 'Post at peak hours and foster loyal, repeat customer relationships.' }
    ],
    requirements: ['Brand logo and overview of services or products'],
    features: ['Luxury aesthetic reflecting brand authority', 'Expanded organic reach and viral engagement', 'Bi-weekly growth performance reports']
  },
  {
    id: 'seo-search-engine-optimization',
    title: 'Search Engine Optimization (SEO) & Google Ranking',
    category: 'marketing',
    categoryName: 'Digital Marketing & Ads',
    shortDesc: 'Rank your business on Google page-one when clients search for your services, driving organic leads forever.',
    fullDesc: 'Comprehensive On-Page and Off-Page SEO, high-intent keyword strategy, authoritative backlink generation, and Google Business Profile optimization for dominant local search visibility.',
    icon: 'Search',
    estimatedTime: '1 - 3 months',
    successRate: 'First-Page Google Rankings',
    guarantee: 'Continuous Growth in Free Organic Traffic',
    steps: [
      { title: 'Site Audit & Keyword Discovery', description: 'Identify profitable keywords searched by high-intent customers.' },
      { title: 'Technical SEO & Speed Optimization', description: 'Eliminate crawl errors, tune mobile responsiveness, and accelerate speed.' },
      { title: 'Content Authority & Local Maps Ranking', description: 'Publish authoritative articles and optimize your Google Maps profile.' }
    ],
    requirements: ['Website URL or Business name'],
    features: ['Continuous zero-cost organic customer acquisition', 'Google Maps profile dominance for local clients', 'Builds long-term domain authority and brand trust']
  }
];

export const CATEGORIES_LIST_EN = [
  { id: 'all' as ServiceCategory, name: 'All Services', icon: 'LayoutGrid', count: SERVICES_DATA_EN.length },
  { id: 'unlocking' as ServiceCategory, name: 'Carrier & Network Unlocking', icon: 'Radio', count: SERVICES_DATA_EN.filter(s => s.category === 'unlocking').length },
  { id: 'screen_locks' as ServiceCategory, name: 'Screen Locks & FRP', icon: 'Lock', count: SERVICES_DATA_EN.filter(s => s.category === 'screen_locks').length },
  { id: 'account_recovery' as ServiceCategory, name: 'Account Recovery', icon: 'UserCheck', count: SERVICES_DATA_EN.filter(s => s.category === 'account_recovery').length },
  { id: 'data_recovery' as ServiceCategory, name: 'Data & Photo Recovery', icon: 'HardDrive', count: SERVICES_DATA_EN.filter(s => s.category === 'data_recovery').length },
  { id: 'programming' as ServiceCategory, name: 'Software Development', icon: 'Code', count: SERVICES_DATA_EN.filter(s => s.category === 'programming').length },
  { id: 'marketing' as ServiceCategory, name: 'Digital Marketing & Ads', icon: 'TrendingUp', count: SERVICES_DATA_EN.filter(s => s.category === 'marketing').length },
];

export const TESTIMONIALS_DATA_EN = [
  {
    id: '1',
    name: 'Eng. Yasser Hameed',
    role: 'Tech Enterprise Director',
    serviceUsed: 'Dead Phone Forensic Data Recovery',
    comment: 'I lost my work phone containing irreplaceable project contracts and family photos. After multiple shops failed, Raqeeb recovered 100% of my data within hours with total privacy.',
    rating: 5,
    date: '1 week ago'
  },
  {
    id: '2',
    name: 'Dr. Samar Al-Absi',
    role: 'Medical Consultant',
    serviceUsed: 'Hacked Commercial Instagram Recovery',
    comment: 'My clinic account was stolen, and the hacker changed the email and set up external 2FA. Raqeeb successfully restored the account, removed the hacker, and secured my business.',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    id: '3',
    name: 'Abu Fahad Al-Shammari',
    role: 'Electronics & Mobile Retailer',
    serviceUsed: 'Carrier Unlock for 20 Devices',
    comment: 'I rely on Raqeeb continuously for unlocking US carrier phones and FRP bypass. Exceptional speed, deep technical expertise, and fair pricing.',
    rating: 5,
    date: '1 month ago'
  },
  {
    id: '4',
    name: 'Ofuq Commerce Group',
    role: 'Fragrance & Apparel Store',
    serviceUsed: 'Targeted Paid Ads & Social Management',
    comment: 'Our store sales increased by 350% in the first month after Raqeeb took over our Instagram and TikTok ad campaigns. Flawless audience targeting and creative visual work.',
    rating: 5,
    date: '3 weeks ago'
  }
];
