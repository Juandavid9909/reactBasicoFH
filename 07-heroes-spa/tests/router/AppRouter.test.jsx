import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../src/auth";
import AppRouter from "../../src/router/AppRouter";

describe("Pruebas en <AppRouter />", () => {
    test("debe de mostrar el login si no está autenticado", () => {
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={ ["/marvel"] }>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText("Login").length).toBe(2);
    });

    test("debe de mostrar el componente de Marvel si está autenticado", () => {
        const contextValue = {
            logged: true,
            user: {
                id: "ABC",
                name: "Juan David"
            }
        };

        render(
            <MemoryRouter initialEntries={ ["/login"] }>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
    });
});