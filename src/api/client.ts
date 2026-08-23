import axios from 'axios';

export const API_BASE = 'https://travls.parkensolution.in/api';
export const IMAGE_BASE = 'https://travls.parkensolution.in';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/images/')) {
    const base = import.meta.env.BASE_URL || '/'
    return `${base}${path.replace(/^\//, '')}`
  }
  return `${IMAGE_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}
