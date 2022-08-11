export * from "./types";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
    "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
  },
};

const host = "https://priceline-com-provider.p.rapidapi.com";
const path = "v1/hotels/search";
const query = (q: FetchHotelsQueryParam) =>
  `sort_order=HDR&location_id=${q.locationId}&date_checkout=${q.checkOut}&date_checkin=${q.checkIn}&rooms_number=${q.rooms}`;

interface FetchHotelsQueryParam {
  locationId: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  rooms: number;
}
export const fetchHotels = async (queryParam: FetchHotelsQueryParam) => {
  const response = await fetch(`${host}/${path}?${query(queryParam)}`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
