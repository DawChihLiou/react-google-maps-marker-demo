import { FetchHotelsResponse } from "../services/fetchHotels";

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Hotel = ArrayElement<FetchHotelsResponse["hotels"]>;
