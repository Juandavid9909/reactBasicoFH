import { useEffect } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";

import "./LoginPage.css";

const loginFormFields = {
    loginEmail: "",
    loginPassword: ""
};

const registerFormFields = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: ""
};

export const LoginPage = () => {
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();

        startLogin({ email: loginEmail, password: loginPassword });
    };

    const registerSubmit = (event) => {
        event.preventDefault();

        if(registerPassword !== registerPassword2) {
            Swal.fire("Error en registro", "Contraseñas no son iguales", "error");

            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    };

    useEffect(() => {
        if(errorMessage !== undefined) {
            Swal.fire("Error en la autenticación", errorMessage), "error";
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                className="form-control"
                                name="loginEmail"
                                onChange={ onLoginInputChange }
                                placeholder="Correo"
                                type="text"
                                value={ loginEmail }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                name="loginPassword"
                                onChange={ onLoginInputChange }
                                placeholder="Contraseña"
                                type="password"
                                value={ loginPassword }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                className="btnSubmit"
                                type="submit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>

                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                name="registerName"
                                onChange={ onRegisterInputChange }
                                placeholder="Nombre"
                                type="text"
                                value={ registerName }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                name="registerEmail"
                                onChange={ onRegisterInputChange }
                                placeholder="Correo"
                                type="email"
                                value={ registerEmail }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                name="registerPassword"
                                onChange={ onRegisterInputChange }
                                placeholder="Contraseña" 
                                type="password"
                                value={ registerPassword }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                name="registerPassword2"
                                onChange={ onRegisterInputChange }
                                placeholder="Repita la contraseña" 
                                type="password"
                                value={ registerPassword2 }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                className="btnSubmit" 
                                type="submit" 
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};