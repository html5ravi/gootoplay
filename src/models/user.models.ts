export interface User{
    email:string,
    password:string,
    displayName:string,
    phoneNumber?:number,
    address?:string,
    url?:{
        photoURL?:string
    }
}
