import { apiClient } from './client';
import type { PackageModel, PackageDetailModel } from '../types';

export async function getPackages(params?: {
  city?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PackageModel[]> {
  try {
    const { data: body } = await apiClient.get('/packages', { params });
    return body?.data?.items ?? [];
  } catch {
    return [];
  }
}

export async function getPackageDetail(slug: string): Promise<PackageDetailModel | null> {
  try {
    const { data: body } = await apiClient.get(`/packages/${slug}`);
    const raw = body?.data;
    if (!raw) return null;
    return {
      ...raw,
      inclusions: ((raw.inclusions as any[]) ?? [])
        .filter((e: any) => e?.details)
        .map((e: any) => ({ details: e.details.toString(), iconClass: e.iconClass ?? null })),
      exclusions: ((raw.exclusions as any[]) ?? [])
        .filter((e: any) => e?.details)
        .map((e: any) => ({ details: e.details.toString(), iconClass: e.iconClass ?? null })),
    } as PackageDetailModel;
  } catch {
    return null;
  }
}

export async function getSimilarPackages(slug: string): Promise<PackageModel[]> {
  try {
    const { data: body } = await apiClient.get(`/packages/${slug}/similar`);
    return body?.data?.items ?? [];
  } catch {
    return [];
  }
}
// import { apiClient } from './client';
// import type { PackageModel, PackageDetailModel } from '../types';

// export async function getPackages(params?: {
//   city?: string;
//   search?: string;
//   page?: number;
//   pageSize?: number;
// }): Promise<PackageModel[]> {
//   try {
//     const { data: body } = await apiClient.get('/packages', { params });
//     return body?.data?.items ?? [];
//   } catch {
//     return [];
//   }
// }

// export async function getPackageDetail(slug: string): Promise<PackageDetailModel | null> {
//   try {
//     const { data: body } = await apiClient.get(`/packages/${slug}`);
//     const raw = body?.data;
//     if (!raw) return null;
//     return {
//       ...raw,
//       inclusions: ((raw.inclusions as any[]) ?? [])
//         .filter((e: any) => e?.details)
//         .map((e: any) => ({ details: e.details.toString(), iconClass: e.iconClass ?? null })),
//       exclusions: ((raw.exclusions as any[]) ?? [])
//         .filter((e: any) => e?.details)
//         .map((e: any) => ({ details: e.details.toString(), iconClass: e.iconClass ?? null })),
//     } as PackageDetailModel;
//   } catch {
//     return null;
//   }
// }

// export async function getSimilarPackages(slug: string): Promise<PackageModel[]> {
//   try {
//     const { data: body } = await apiClient.get(`/packages/${slug}/similar`);
//     return body?.data?.items ?? [];
//   } catch {
//     return [];
//   }
// }