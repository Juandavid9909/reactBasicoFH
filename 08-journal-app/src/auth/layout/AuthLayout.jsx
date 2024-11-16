import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
    return (
        <Grid container
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={ 0 }
            sx={{
                backgroundColor: "primary.main",
                minHeight: "100vh",
                padding: 4
            }}
        >
            <Grid item
                className="box-shadow"
                sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    padding: 3,
                    width: { sm: 450 }
                }}
                xs={ 3 }
            >
                <Typography
                    sx={{ mb: 1 }}
                    variant="h5"
                >
                    { title }
                </Typography>

                { children }
            </Grid>
        </Grid>
    );
};