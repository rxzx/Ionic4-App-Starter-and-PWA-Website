
//Models
export * from './models/user';


//Enums
export * from './enums/enums';
export * from './enums/storagekey';


export interface ApiResponse{
    isSuccess?: boolean;
    data?: any;
    message?:string;
    statusCode?:number;
}