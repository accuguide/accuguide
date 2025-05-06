export type SearchDisplayType = {
  googleId: string;
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

export type Claim = {
  sub: string;
  name: string;
  picture: string;
  email: string;
};

export type SearchDisplayProps = {
  displayType: string;
  id?: string;
  googleId: string;
  name: string;
  address: string;
  type: string;
};
