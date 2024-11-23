import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useForm } from "../../hooks";

const formData = {
    email: "",
    password: ""
};

export const LoginPage = () => {
    const { status, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(startLoginWithEmailPassword({ email, password }));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Login">
            <form
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ onSubmit }
            >
                <Grid container>
                    <Grid item
                        sx={{ mt: 2 }}
                        xs={ 12 }
                    >
                        <TextField
                            fullWidth
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
                            fullWidth
                            label="Contraseña"
                            name="password"
                            onChange={ onInputChange }
                            placeholder="Contraseña"
                            type="password"
                            value={ password }
                        />
                    </Grid>

                    <Grid container
                        display={ errorMessage ? "" : "none" }
                        sx={{ mt: 1 }}
                    >
                        <Grid item
                            xs={ 12 }
                        >
                            <Alert severity="error">
                                { errorMessage }
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item
                            sm={ 6 }
                            xs={ 12 }
                        >
                            <Button
                                disabled={ isAuthenticating }
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item
                            sm={ 6 }
                            xs={ 12 }
                        >
                            <Button
                                disabled={ isAuthenticating }
                                fullWidth
                                onClick={ onGoogleSignIn }
                                variant="contained"
                            >
                                <Google />
                                
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent="end"
                    >
                        <Link
                            color="inherit"
                            component={ RouterLink }
                            to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};