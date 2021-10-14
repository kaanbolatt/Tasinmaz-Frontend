import { ResponseModel } from "./responseModel";
import { Tasinmaz } from "./tasinmaz";


export interface TasinmazResponseModel extends ResponseModel{
    data:Tasinmaz[]
}