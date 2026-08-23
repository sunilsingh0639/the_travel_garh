import { apiClient } from './client';
import type { ReviewModel } from '../types';

function mapReview(item: any): ReviewModel {
  return {
    id: item.id ?? 0,
    name: (item.userName ?? '') as string,
    trip: (item.packageName ?? '') as string,
    review: (item.review ?? '') as string,
    rating: (item.starRating as number) ?? 5,
    imagePath: item.profileImage ?? null,
    images: (item.images as string[]) ?? [],
  };
}

export async function getHomeReviews(): Promise<ReviewModel[]> {
  try {
    const { data: body } = await apiClient.get('/home-reviews');
    const items = body?.data?.items ?? [];
    return items.map(mapReview);
  } catch {
    return [];
  }
}
