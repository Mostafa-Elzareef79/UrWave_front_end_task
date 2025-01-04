export interface GeneralResponse<T> {
    data: T;
    errors: string[];
    message: string;
    succeeded: boolean;
    statusCode:number;
}
