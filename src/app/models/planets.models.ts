export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetListResponse {
  count: number;
  next: string;
  previous: string;
  results: Planet[];
}

// Took just used fields in People and Film interfaces

export interface People {
  name: string;
}

export interface Film {
  title: string;
}
