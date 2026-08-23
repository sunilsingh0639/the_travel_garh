import { apiClient } from './client';
import type { BannerModel } from '../types';

export async function getBanners(): Promise<BannerModel[]> {
  try {
    const { data: body } = await apiClient.get('/home-banners');
    const items = body?.data ?? [];
    return items.map((item: any) => ({
      id: item.id ?? 0,
      image: item.imagePath ?? '',
      buttonText: item.buttonText ?? '',
    }));
  } catch {
    return [];
  }
}
