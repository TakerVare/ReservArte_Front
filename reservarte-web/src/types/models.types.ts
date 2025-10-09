// TODO: Define domain model types
export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Add more model types as needed
