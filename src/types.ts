export interface Book {
  id: string;
  name: string;
  description: string;
}

export interface User {
  name?: string;
  picture?: string;
  email?: string;
  sub?: string;
}

export interface CreateBookInput {
  name: string;
  description: string;
}