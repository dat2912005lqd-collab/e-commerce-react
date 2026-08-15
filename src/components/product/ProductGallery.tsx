import {useState} from "react";
interface ProductGalleryProps{
    images:string[];
    title:string;
}
export default function ProductGallery({
    images,title,
}:ProductGalleryProps){
    const [selectedImage, setSelectedImage]=
    useState(images[0]??"");
    if (images.length===0){
        return <p>Không có hìnnh ảnh.</p>
    }
    return(
        <div>
            <img
            src={selectedImage}
            alt={title}
            width={400}
            />
            <div>
            {images.map((image,index)=>
            <button
            key={`${image}-${index}`}
            type="button"
            onClick={()=>setSelectedImage(image)}>
                <img
                src={image}
                alt={'${title}${index+1}'}
                width={80}
                />
            </button>
            )}
        </div>
        </div>
    )
}