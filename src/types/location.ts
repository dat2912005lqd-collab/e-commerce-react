export interface Location{
    id:number;
    name:string;
    address:string;
    city:string;
    phone?:string;
    latitude?:number;
    longtitude?:number;
}
export interface CreateLocationRequest{
    name:string;
    address:string;
    city:string;
    phone?:string;
    latitude?:number;
    longitude?:number;
}
export interface UpdateLocationRequest{
    name?:string;
    address?:string;
    city?:string;
    phone?:string;
    latitude?:number;
    longtitude?:number;
}