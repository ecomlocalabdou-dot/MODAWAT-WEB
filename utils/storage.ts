
import { Post, SiteSettings } from '../types';
import { DEFAULT_SETTINGS, INITIAL_POSTS } from '../constants';

const STORAGE_KEYS = {
  POSTS: 'abdou_web_posts',
  SETTINGS: 'abdou_web_settings',
  THEME: 'abdou_web_theme'
};

export const getStoredPosts = (): Post[] => {
  const data = localStorage.getItem(STORAGE_KEYS.POSTS);
  return data ? JSON.parse(data) : INITIAL_POSTS;
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
};

export const getStoredSettings = (): SiteSettings => {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: SiteSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getStoredTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
};

export const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
