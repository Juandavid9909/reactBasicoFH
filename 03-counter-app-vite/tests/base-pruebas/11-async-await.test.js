import { getImagen } from "../../src/base-pruebas/11-async-await";

describe("Probando en 11-async-await", () => {
    test("getImagen debe de retornar un URL de la imagen", async() => {
        const url = await getImagen();

        expect(url).toBe(expect.any(String));
    });

    test("getImagen debe de retornar un error si no tenemos apiKey", async() => {
        const resp = await getImagen();

        expect(resp).toBe("No se encontró la imagen");
    });
});