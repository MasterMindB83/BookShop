export interface IUser {
    username: string;
    name: string;
    e_mail: string;
    address: string;
    city: string;
    phone: string;
    password: string;
}
export interface IBook {
    id: number;
    name: string;
    description: string;
    author: string;
    genre: string;
    image: string;
    price: number;
    discount: number;
    kolicina: number;
    total: number;
}
