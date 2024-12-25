export type Coordinates = {
  lat: number;
  lng: number;
};

export type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  birthDate: string;
  image: string;
  address: Address;
};

export type Users {
  users: User[];
  total: number;
  skip: number;
};
