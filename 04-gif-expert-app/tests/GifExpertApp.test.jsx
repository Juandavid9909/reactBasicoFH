import { fireEvent, render, screen } from "@testing-library/react";

import GifExpertApp from "../src/GifExpertApp";

describe("Pruebas en <GifExpertApp />", () => {
    const category = "Spider-Man";

    test("debe de tener el título", () => {
        render(<GifExpertApp />);

        expect(screen.getByText("GifExpertApp"));
    });

    test("debe de agregar una nueva categoría cuando onNewCategory es llamado", () => {
        const { container } = render(<GifExpertApp />);

        const input = container.querySelector("input");
        const form = container.querySelector("form");

        fireEvent.change(input, { target: { value: category } });
        fireEvent.submit(form);

        expect(container.textContent).toContain(category);
    });

    test("no debe de agregar categorías duplicadas", () => {
        const { container } = render(<GifExpertApp />);

        const form = container.querySelector("form");

        fireEvent.submit(form);

        expect(container.textContent).not.toContain(category);
    });
});