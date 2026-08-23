import { apiClient } from './client';
import type { BlogItem } from '../types';

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    const { data: body } = await apiClient.get('/blogs');
    if (body?.success === true) {
      return body.data ?? [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<any> {
  try {
    const { data: body } = await apiClient.get(`/blogs/${slug}`);
    if (body?.success === true) {
      return body.data ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
