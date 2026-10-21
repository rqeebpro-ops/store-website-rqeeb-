/**
 * SEO & Google Search Console Configuration for Raqeeb Pro
 * Domain: rqeebpro.store
 * Brand Logo: /assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png
 */

import { ArticleItem, ServiceItem } from '../types';

export const SITE_DOMAIN = 'rqeebpro.store';
export const SITE_URL = 'https://rqeebpro.store';
export const BRAND_LOGO_PATH = '/assets/aistudio/file_000000003a1482119a5607f2945397e0_42f71af7.png';
export const BRAND_LOGO_FULL_URL = `${SITE_URL}${BRAND_LOGO_PATH}`;

export const DEFAULT_SITE_TITLE = 'رقيب للبرمجة والتسويق | المنصة الرسمية';
export const DEFAULT_SITE_DESCRIPTION = 'منصة رقيب الرائدة لخدمات البرمجة والحلول التقنية وفك الشفرات واسترجاع الحسابات والبيانات وتطوير التطبيقات والتسويق الرقمي.';

/**
 * Returns canonical indexing URL for any article / post
 */
export const getArticleCanonicalUrl = (articleId: string): string => {
  return `${SITE_URL}/?article=${encodeURIComponent(articleId)}`;
};

/**
 * Returns canonical indexing URL for any service
 */
export const getServiceCanonicalUrl = (serviceId: string): string => {
  return `${SITE_URL}/?service=${encodeURIComponent(serviceId)}`;
};

/**
 * Generates the official Google Search Console URL Inspection link
 * Opens directly into GSC inspection tool for the given URL under the rqeebpro.store property
 */
export const getGoogleSearchConsoleInspectUrl = (targetUrl: string): string => {
  const resourceId = encodeURIComponent(`${SITE_URL}/`);
  const inspectUrl = encodeURIComponent(targetUrl);
  return `https://search.google.com/search-console/inspect?resource_id=${resourceId}&inspect_url=${inspectUrl}`;
};

/**
 * Direct link to Google Search Console Property Dashboard
 */
export const getGoogleSearchConsoleDashboardUrl = (): string => {
  const resourceId = encodeURIComponent(`${SITE_URL}/`);
  return `https://search.google.com/search-console?resource_id=${resourceId}`;
};

/**
 * Google Rich Results Test URL
 */
export const getGoogleRichResultsTestUrl = (targetUrl: string): string => {
  return `https://search.google.com/test/rich-results?url=${encodeURIComponent(targetUrl)}`;
};

/**
 * Generate Schema.org JSON-LD Article / BlogPosting for Google Rich Snippets
 */
export const generateArticleJsonLd = (article: ArticleItem) => {
  const articleUrl = getArticleCanonicalUrl(article.id);
  const imageUrl = article.image.startsWith('http') 
    ? article.image 
    : `${SITE_URL}${article.image.startsWith('/') ? '' : '/'}${article.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    'headline': article.title,
    'description': article.summary,
    'image': [imageUrl],
    'author': {
      '@type': 'Organization',
      'name': article.author || 'منصة رقيب للبرمجة والحلول التقنية',
      'url': SITE_URL
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'رقيب للبرمجة والتسويق',
      'logo': {
        '@type': 'ImageObject',
        'url': BRAND_LOGO_FULL_URL
      }
    },
    'datePublished': '2026-01-01T08:00:00+03:00',
    'dateModified': '2026-10-20T12:00:00+03:00',
    'inLanguage': 'ar'
  };
};

/**
 * Generates a complete XML Sitemap for https://rqeebpro.store
 */
export const generateSitemapXml = (articles: ArticleItem[] = [], services: ServiceItem[] = []): string => {
  const now = new Date().toISOString().split('T')[0];

  const mainPages = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${SITE_URL}/#services-section`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/#apk-store-section`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/#articles-section`, priority: '0.8', changefreq: 'daily' },
    { loc: `${SITE_URL}/#download-app`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/#contact`, priority: '0.7', changefreq: 'monthly' }
  ];

  const articlePages = articles.map(art => ({
    loc: getArticleCanonicalUrl(art.id),
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const servicePages = services.map(srv => ({
    loc: getServiceCanonicalUrl(srv.id),
    priority: '0.7',
    changefreq: 'monthly'
  }));

  const allUrls = [...mainPages, ...articlePages, ...servicePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};
