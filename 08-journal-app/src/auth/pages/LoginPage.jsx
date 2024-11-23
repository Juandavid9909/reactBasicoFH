import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
import { useForm } from "../../hooks";

export const LoginPage = () => {
    const { status } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const { email, password, onInputChange } = useForm({
        email: "juandavid@mail.com",
        password: "123456"
    });

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(checkingAuthentication());
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={ onSubmit } >
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