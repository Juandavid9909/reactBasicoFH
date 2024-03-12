import { useContext } from "../../src/base-pruebas/06-deses-objetos";

describe("Pruebas en 06-deses-objetos", () => {
    test("useContext debe retornar un objeto", () => {
        const clave = "Juandavid";
        const edad = 24;

        const context = useContext({ clave, edad });

        expect(context).toEqual({
            nombreClave: clave,
            anios: edad,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
            }
        });
    });
});