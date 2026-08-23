export interface BannerModel {
  id: number;
  image: string;
  buttonText: string;
}

export interface PackageImage {
  imagePath: string;
  altText: string;
  description: string;
}

// export interface PackageModel {
//   id: number;
//   name: string;
//   slug: string;
//   shortDescription: string;
//   days: number;
//   nights: number;
//   price: number;
//   cutPrice: number;
//   saving: number;
//   city: string;
//   images: string[];
// }
export interface PackageModel {
  id: number
  name: string
  slug: string
  shortDescription: string
  tag?: string | null
  days: number
  nights: number
  price: number
  cutPrice: number
  saving: number
  city: string
  images: string[]
  easyEmi?: boolean
}
export interface ItineraryItem {
  dayLabel: string;
  title: string;
  description: string;
  imagePath: string;
}

export interface HotelImage {
  imagePath: string;
  imageType: string;
  imageName: string;
  altText: string;
}

export interface StayTypeImage {
  imagePath: string;
  altText: string;
  description: string;
}

export interface StayType {
  type: string;
  price: number;
  images: StayTypeImage[];
}

export interface HotelModel {
  id: number;
  name: string;
  location: string;
  starRating: number;
  includes: string[];
  images: HotelImage[];
  stayTypes?: StayType[];
}

export interface PackageDetailModel {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  city: string;
  days: number;
  nights: number;
  price: number;
  cutPrice: number;
  saving: number;
  images: PackageImage[];
  itineraries: ItineraryItem[];
  // inclusions: string[];
  // exclusions: string[];
  inclusions: { details: string; iconClass?: string | null }[]
  exclusions: { details: string; iconClass?: string | null }[]
  hotels: HotelModel[];
  packageTypes?: string[]
}

export interface TrendingModel {
  id: number;
  title: string;
  packages: PackageModel[];
}

export interface ReviewModel {
  id: number;
  name: string;
  trip: string;
  review: string;
  rating: number;
  imagePath: string | null;
  images: string[];
}

export interface BlogItem {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  readTimeMinutes: number;
  by: string;
  byImage: string;
  publishedDate: string;
}

export interface EnquiryForm {
  name: string;
  phone: string;
  email: string;
  travelDate: string;
  message: string;
  packageSlug?: string;
  packageName?: string;
  destination?: string;
}
