import "./LoginPage.css";

export const LoginPage = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    <form>
                        <div className="form-group mb-2">
                            <input 
                                className="form-control"
                                placeholder="Correo"
                                type="text"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                placeholder="Contraseña"
                                type="password"
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

                    <form>
                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                placeholder="Nombre"
                                type="text"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                placeholder="Correo"
                                type="email"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                placeholder="Contraseña" 
                                type="password"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                type="password"
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