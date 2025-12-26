
export type Category = 'أخبار المغرب' | 'تقنية' | 'تطوير الذات' | 'تقييم المنتجات' | 'أفلييت' | 'أخرى';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  image: string;
  date: string;
  author: string;
  isPublished: boolean;
  affiliateLinks?: { label: string; url: string }[];
  adSlotEnabled: boolean;
}

export interface SiteSettings {
  title: string;
  description: string;
  logo: string;
  adsenseId: string;
  adminPassword: string;
  footerText: string;
}

export interface AppState {
  posts: Post[];
  settings: SiteSettings;
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
}
