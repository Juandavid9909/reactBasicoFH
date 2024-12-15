import { getEnvironments } from "./getEnvironments";

export const fileUpload = async(file) => {
    if (!file) return null;

    const { VITE_CLOUDINARY_URL } = getEnvironments();

    const cloudUrl = VITE_CLOUDINARY_URL;
    const formData = new FormData();

    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });

        if (!resp.ok) throw new Error("No se pudo subir la imagen");

        const cloudResp = await resp.json();

        return cloudResp;
    } catch (error) {
        return null;
    }
};