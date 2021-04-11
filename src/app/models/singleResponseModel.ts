import { ResponseModel } from "./responseModel";

export interface SingleRespnseModel<T> extends ResponseModel{
    data:T
}