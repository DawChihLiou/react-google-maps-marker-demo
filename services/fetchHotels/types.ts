export interface FetchHotelsResponse {
  offset: number;
  pageSize: number;
  marketSize: number;
  sortType: string;
  tripFilterSummary: {
    totalSizefiltered: number;
    cityCounts: Record<string, number>;
    clusterCounts: Record<string, number>;
    amenityCounts: Record<string, number>;
    starRatingCounts: Record<string, number>;
    brandIdCounts: Record<string, number>;
    propertyTypeCounts: Record<string, number>;
    propertyType: {
      typeId: string;
      typeTitle: string;
      count: number;
    }[];
    dealTypeCounts: Record<string, number>;
    minFilterPrice: string;
    maxFilterPrice: string;
    maxFilterPricePerStaty: string;
  };
  cityInfo: {
    cityId: number;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    areaId: number;
    lat: number;
    lon: number;
    zonePolygonInfo: Record<string, unknown>;
  };
  hotels: {
    hotelId?: string;
    pclnId?: string;
    name: string;
    brand: string;
    starRating: number;
    location: {
      address: {
        addressLine1: string;
        cityName: string;
        provinceCode: string;
        countryName: string;
        zip: string;
        isoCountryCode: string;
      };
      longitude: number | undefined;
      latitude: number | undefined;
      timeZone: string;
      neighborhoodId: string;
      neighborhoodName: string;
      cityId: number;
      zoneId: string;
    };
    thumbnailUrl: string;
    hotelFeatures: {
      hotelAmenityCodes: string[];
    };
    overallGuestRating: number;
    totalReviewCount: number;
    proximity: number;
    ratesSummary: {
      minPrice: string;
      minCurrencyCode: string;
      pclnId: string;
      freeCancelableRateAvail: boolean;
      payWhenYouStayAvailable: boolean;
      minRatePromos: {
        type: string;
        title: string;
        discountPercentage: number;
        showDiscount: boolean;
        dealType: string;
        isVariableMarkupPromo: boolean;
      }[];
      availablePromos: {
        type: string;
        title: string;
        discountPercentage: number;
        showDiscount: boolean;
        isVariableMarkupPromo: boolean;
      }[];
      gid: number;
      rateIdentifier: string;
      ccNotRequiredAvailable: boolean;
      applePayRateAvailable: boolean;
    };
    allInclusiveRateProperty: boolean;
    displayRank: number;
    recmdScore: number;
    merchandising: {
      topBooked: {
        type: string;
        description: string;
      };
    };
    badges: {
      type: string;
      description: string;
    }[];
    media: {
      source: string;
      url: string;
    };
    keyFeatures: string[];
    globalDealScore: number;
  }[];
}
