import {fileService} from "../rservices/fileService";
interface ImageUploadProps{
    value?:string;
    onChange:(url:string)=>void;
}
export 