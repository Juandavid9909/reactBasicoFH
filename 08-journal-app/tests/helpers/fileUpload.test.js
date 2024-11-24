import { v2 as cloudinary } from "cloudinary";

import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    secure: true
});

describe("Pruebas en fileUpload", () => {
    test("debe de subir el archivo correctamente a cloudinary", async() => {
        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cuesta_del_obispo_01.jpg/640px-Cuesta_del_obispo_01.jpg";

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], "image.jpg");

        const url = await fileUpload(file);

        expect(typeof url).toBe("string");

        const segments = url.split("/");
        const imageId = segments[segments.length - 1].replace(".jpg", "");

        await cloudinary.api.delete_resources(["journal/" + imageId], {
            resource_type: "image"
        });
    });

    test("debe de retornar null", async() => {
        const file = new File([], "image.jpg");

        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});