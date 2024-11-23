import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
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
            <Grid container
                direction="row"
                justifyContent="center"
            >
                <CircularProgress color="warning" />
            </Grid>
        </Grid>
    );
};