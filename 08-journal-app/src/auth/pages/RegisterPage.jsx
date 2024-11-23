import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
    email: "juandavid@mail.com",
    password: "123456",
    displayName: "Juan David"
};

const formValidations = {
    email: [(value => value.includes("@")), "El correo debe de tener un @."],
    password: [(value => value.length >= 6), "El password debe de tener al menos 6 letras."],
    displayName: [(value => value.length >= 1), "El nombre es obligatorio."]
};

export const RegisterPage = () => {
    const [formSubmitted, setFormSubmitted] = useState();

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);
    };

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item
                        sx={{ mt: 2 }}
                        xs={ 12 }
                    >
                        <TextField
                            error={ !!displayNameValid && formSubmitted }
                            fullWidth
                            helperText={ displayNameValid }
                            label="Nombre completo"
                            name="displayName"
                            onChange={ onInputChange }
                            placeholder="Nombre completo"
                            type="text"
                            value={ displayName }
                        />
                    </Grid>

                    <Grid item
                        sx={{ mt: 2 }}
                        xs={ 12 }
                    >
                        <TextField
                            error={ !!emailValid && formSubmitted }
                            fullWidth
                            helperText={ emailValid }
                            label="Correo"
                            name="email"
                            onChange={ onInputChange }
                            placeholder="correo@google.com"
                            type="email"
                            value={ email }
                        />
                    </Grid>

                    <Grid item
                        sx={{ mt: 2 }}
                        xs={ 12 }
                    >
                        <TextField
                            error={ !!passwordValid && formSubmitted }
                            fullWidth
                            helperText={ passwordValid }
                            label="Contraseña"
                            name="password"
                            onChange={ onInputChange }
                            placeholder="Contraseña"
                            type="password"
                            value={ password }
                        />
                    </Grid>

                    <Grid container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item
                            xs={ 12 }
                        >
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent="end"
                    >
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>

                        <Link
                            color="inherit"
                            component={ RouterLink }
                            to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};