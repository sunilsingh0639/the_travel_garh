import { apiClient } from './client';
import type { TrendingModel } from '../types';

// function mapSection(item: any): TrendingModel {
//   const rawPackages = item.packages?.items ?? [];
//   return {
//     id: item.id ?? 0,
//     title: item.title ?? '',
//     packages: rawPackages.map((p: any) => ({
//       id: p.id ?? 0,
//       name: p.name ?? '',
//       slug: p.slug ?? '',
//       shortDescription: p.shortDescription ?? '',
//       days: p.days ?? 0,
//       nights: p.nights ?? 0,
//       price: p.price ?? 0,
//       cutPrice: p.cutPrice ?? 0,
//       saving: p.saving ?? 0,
//       city: p.city ?? '',
//       images: (p.images as string[]) ?? [],
//     })),
//   };
// }
function mapSection(item: any): TrendingModel {
  const rawPackages = item.packages?.items ?? [];
  return {
    id: item.id ?? 0,
    title: item.title ?? '',
    packages: rawPackages.map((p: any) => ({
      id: p.id ?? 0,
      name: p.name ?? '',
      slug: p.slug ?? '',
      shortDescription: p.shortDescription ?? '',
      tag: p.tag ?? null,
      days: p.days ?? 0,
      nights: p.nights ?? 0,
      price: p.price ?? 0,
      cutPrice: p.cutPrice ?? 0,
      saving: p.saving ?? 0,
      city: p.city ?? '',
      images: (p.images as string[]) ?? [],
      easyEmi: p.easyEmi ?? false,
    })),
  };
}
export async function getTrendingSections(title?: string): Promise<TrendingModel[]> {
  try {
    const { data: body } = await apiClient.get('/trending-sections', {
      params: title ? { title } : undefined,
    });
    const items = body?.data?.items ?? [];
    return items.map(mapSection);
  } catch {
    return [];
  }
}
