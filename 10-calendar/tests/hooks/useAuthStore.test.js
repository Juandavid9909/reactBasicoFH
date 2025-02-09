import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { authSlice } from "../../src/store";
import { calendarApi } from "../../src/api";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { useAuthStore } from "../../src/hooks/useAuthStore";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    });
};

describe("Pruebas en useAuthStore", () => {
    beforeEach(() => localStorage.clear());

    test("debe de regresar los valores por defecto", () => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: "checking",
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        });
    });

    test("startLogin debe de realizar el login correctamente", async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: {
                name: "Test User",
                uid: "62a10a4954e8230e568a49ab"
            }
        });

        expect(localStorage.getItem("token")).toBe(expect.any(String));
        expect(localStorage.getItem("token-init-date")).toBe(expect.any(String));
    });

    test("startLogin debe de fallar la autenticación", async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin({ email: "algo@google.com", password: "123456789" });
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem("token")).toBeNull();
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "Credenciales incorrectas",
            status: "not-authenticated",
            user: {}
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBeUndefined()
        );
    });

    test("startRegister debe de crear un usuario", async() => {
        const newUser = { email: "algo@google.com", password: "123456789", name: "Test User 2" };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        const spy = jest.spyOn(calendarApi, "post", mockReturnValue({
            data: {
                ok: true,
                uid: "12345678",
                name: "Test User",
                token: "ALGUN-TOKEN"
            }
        }));

        await act(async() => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: {
                name: "Test User",
                uid: "12345678"
            }
        });

        spy.mockRestore();
    });

    test("startRegister debe de fallar la creación", async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "El usuario ya existe",
            status: "not-authenticated",
            user: {}
        });
    });

    test("checkAuthToken debe de fallar si no hay token", async() => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "not-authenticated",
            user: {}
        });
    });

    test("checkAuthToken debe de autentucar al usuario si hay un token", async() => {
        const { data } = await calendarApi.post("/auth", testUserCredentials);

        localStorage.setItem("token", data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: {
                uid: "62a10a4954e8230e568a49ab",
                name: "Test User"
            }
        });
    });
});