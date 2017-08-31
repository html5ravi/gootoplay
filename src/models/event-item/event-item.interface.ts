export interface EventItem{
    $key?:string,
    eventName:string,
    eventDate:Date,
    created_at?:Date
}
export interface TournamentCatory{
    $key?:string,
    name:string,
    id:number
}
export interface AgeCategory{
    $key?:string,
    name:string,
    id:number
}
export interface MatchCategory{
    $key?:string,
    name:string,
    id:number,
    boolVal:boolean,
    entryfee:number,
    matchtype:string
}
export interface MatchType{
    $key?:string,
    name:string,
    id:number
}
export interface ShuttleBrand{
    $key?:string,
    name:string,
    id:number
}
export interface ShuttleType{
    $key?:string,
    name:string,
    id:number
}
export interface Contacts{
    name:string,
    mobile:number,
    id?:number
}
// export interface CategoryItem{
//     ageCategory:string,
//     matchCategory:string,
//     entryFee:number,
//     matchType:string
// }


