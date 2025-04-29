export type SearchDisplay = {
  id: string;
  name: string;
  address: string;
  type: string;
};

export type GoogleSearchResponse = {
  place_id: string;
  name: string;
  formatted_address: string;
  types: string[];
};
