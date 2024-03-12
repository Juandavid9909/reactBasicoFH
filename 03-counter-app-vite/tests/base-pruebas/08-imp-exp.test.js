import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";

describe("Pruebas en 08-imp-exp", () => {
    test("getHeroeById debe de retornar un héroe por ID", () => {
        const id = 1;
        const hero = getHeroeById(id);

        expect(hero).toEqual({
            id,
            name: "Batman",
            owner: "DC"
        });
    });

    test("getHeroeById debe de retornar undefined si no existe el id", () => {
        const id = 100;
        const hero = getHeroeById(id);

        expect(hero).toBeFalsy();
    });

    test("getHeroesByOwner debe regresar heroes de DC", () => {
        const owner = "DC";
        const heroesDC = getHeroesByOwner(owner);

        expect(heroesDC.length).toBe(3);
        expect(heroesDC).toEqual([{
                id: 1,
                name: 'Batman',
                owner: 'DC'
            },
            {
                id: 3,
                name: 'Superman',
                owner: 'DC'
            },
            {
                id: 4,
                name: 'Flash',
                owner: 'DC'
            }
        ]);

        expect(heroesDC).toEqual(heroes.filter(heroe => heroe.owner === owner));
    });

    test("getHeroesByOwner debe de retornar un arreglo héroes por owner Marvel", () => {
        const owner = "Marvel";
        const heroesMarvel = getHeroesByOwner(owner);

        expect(heroesMarvel.length).toBe(2);
        expect(heroesMarvel).toEqual([{
                id: 2,
                name: 'Spiderman',
                owner: 'Marvel'
            },
            {
                id: 5,
                name: 'Wolverine',
                owner: 'Marvel'
            }
        ]);

        expect(heroesMarvel).toEqual(heroes.filter(heroe => heroe.owner === owner));
    });
});