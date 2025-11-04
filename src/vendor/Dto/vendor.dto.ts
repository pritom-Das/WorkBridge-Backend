export class CreateServiceDto {
  title: string;
  description: string;
  category: string;
  price: number;
  id: number;
}
 
export class UpdateServiceDto {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
}

export class UpdateProfileDto {
  name?: string;
  bio?: string;
  skills?: string[];
}