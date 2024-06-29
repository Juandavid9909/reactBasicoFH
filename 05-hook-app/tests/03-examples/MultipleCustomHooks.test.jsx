import { fireEvent, render, screen } from "@testing-library/react";

import { MultipleCustomHooks } from "../../src/03-examples/MultipleCustomHooks";
import { useCounter } from "../../src/hooks/useCounter";
import { useFetch } from "../../src/hooks/useFetch";

jest.mock("../../src/hooks/useFetch");
jest.mock("../../src/hooks/useCounter");

describe("Pruebas en MultipleCustomHooks", () => {

    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("debe de mostrar el componente por defecto", () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        expect(screen.getByText("Cargando"));
        expect(screen.getByText("Información de Pokémon"));

        const nextButton = screen.getByRole("button", { name: "Siguiente" });

        expect(nextButton.disabled).toBeTruthy();

        // screen.debug();
    });

    test("debe de mostrar un Pokémon", () => {
        useFetch.mockReturnValue({
            data: {
                name: "Charmander",
                id: 2,
                sprites: {
                    back_default: "back_default",
                    back_shiny: "back_shiny",
                    front_default: "front_default",
                    front_shiny: "front_shiny"
                }
            },
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        expect(screen.getByText("Charmander")).toBeTruthy();

        const nextButton = screen.getByRole("button", { name: "Siguiente" });

        expect(nextButton.disabled).toBeFalsy();
    });

    test("debe de llamar la función de incrementar", () => {

        useFetch.mockReturnValue({
            data: {
                name: "Charmander",
                id: 2,
                sprites: {
                    back_default: "back_default",
                    back_shiny: "back_shiny",
                    front_default: "front_default",
                    front_shiny: "front_shiny"
                }
            },
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        const nextButton = screen.getByRole("button", { name: "Siguiente" });

        fireEvent.click(nextButton);

        expect(mockIncrement).toHaveBeenCalled();
    });
});