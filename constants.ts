
import { Category, SiteSettings, Post } from './types';

export const CATEGORIES: Category[] = [
  'أخبار المغرب',
  'تقنية',
  'تطوير الذات',
  'تقييم المنتجات',
  'أفلييت',
  'أخرى'
];

export const DEFAULT_SETTINGS: SiteSettings = {
  title: 'عبو ويب - Abdou Web',
  description: 'مدونتك المفضلة لأخبار المغرب والتقنية وتطوير الذات',
  logo: 'https://picsum.photos/200/60',
  adsenseId: 'pub-xxxxxxxxxxxxxx',
  adminPassword: 'admin',
  footerText: 'جميع الحقوق محفوظة © عبو ويب 2024'
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'مرحبا بكم في عبو ويب',
    slug: 'welcome-to-abdou-web',
    content: '<p>هذه هي تدوينتنا الأولى. نحن فخورون بإطلاق المنصة الجديدة.</p>',
    excerpt: 'بداية رحلتنا في عالم التدوين العربي الاحترافي...',
    category: 'تقنية',
    image: 'https://picsum.photos/800/400?random=1',
    date: new Date().toISOString(),
    author: 'عبدو',
    isPublished: true,
    adSlotEnabled: true
  }
];
