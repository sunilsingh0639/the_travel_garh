import { apiClient } from './client';
import { getImageUrl } from './client';

export interface City {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
  thumbnail: string;
}

interface CitiesResponse {
  success: boolean;
  message: string;
  data: {
    domestic: City[];
    international: City[];
  };
}

export async function getCities(): Promise<{ domestic: City[]; international: City[] }> {
  try {
    const { data: body } = await apiClient.get<CitiesResponse>('/cities');
    return body?.data ?? { domestic: [], international: [] };
  } catch {
    return { domestic: [], international: [] };
  }
}

export function getCityImageUrl(city: City): string {
  return getImageUrl(city.thumbnail);
}
