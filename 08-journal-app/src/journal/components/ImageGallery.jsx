import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images = [] }) => {
  console.log(images);
    return (
        <ImageList
            cols={ 4 }
            rowHeight={ 200 }
            sx={{ width: "100%", height: 450 }}
        >
            {
                images.map((image) => (
                    <ImageListItem key={ image.url }>
                        <img
                            alt="Imagen de la nota"
                            loading="lazy"
                            src={`${ image.url }?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${ image.url }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        />
                    </ImageListItem>
                ))
            }
        </ImageList>
    );
};