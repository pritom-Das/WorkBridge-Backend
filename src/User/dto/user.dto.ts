/* eslint-disable prettier/prettier */
export class CreateUserDto {
    "id": string;
    "name": string;
    "email": string;
    "gender": string;
    "phoneNumber": string;
    "role": string;
    

}
export class UpdateServiceStatus {
  status: string;
}
export class BookServiceDto {
       id: string;
      serviceName: string;
      category: string;
      description:  string;
      price: number;
      status: string;
      rating: number;
}

