import { apiClient } from './client';
import { notifyTelegram } from './telegram';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  city?: string;
  expectedTravelDate?: string;
  message: string;
  pageUrl: string;
  packageSlug?: string;
  packageName?: string;
  destination?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  isBookedFlightOrTrain?: boolean;
  isDateFlexible?: boolean;
  preferredHotelCategory?: string;
  budgetRange?: string;
  wantToExplore?: string;
  duration?: number;
}

export interface CreateEnquiryResult {
  id: number;
  status: string;
  createdDate: string;
}

export interface EnquiryApiResponse {
  success: boolean;
  message?: string | null;
  data?: CreateEnquiryResult | null;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryApiResponse | null> {
  try {
    const { data } = await apiClient.post<EnquiryApiResponse>('/enquiries', payload);
    if (data?.success) {
      // Fire-and-forget — Telegram failure never blocks the user
      notifyTelegram(payload);
    }
    return data;
  } catch {
    return null;
  }
}
