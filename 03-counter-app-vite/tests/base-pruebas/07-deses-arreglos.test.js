import { retornaArreglo } from "../../src/base-pruebas/07-deses-arreglos";

describe("Pruebas en 07-deses-arreglos", () => {
    test("debe de retornar un string y un número", () => {
        const [letters, numbers] = retornaArreglo();

        expect(letters).toBe("ABC");
        expect(numbers).toBe(123);

        expect(typeof letters).toBe("string");
        expect(typeof numbers).toBe("number");

        expect(letters).toBe(expect.any(String));
        expect(numbers).toBe(expect.any(Number));
    });
});