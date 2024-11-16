import { Grid, Typography } from "@mui/material";
import { StartOutlined } from "@mui/icons-material";

export const NothingSelectedView = () => {
    return (
        <Grid container
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={ 0 }
            sx={{
                backgroundColor: "primary.main",
                borderRadius: 3,
                minHeight: "calc(100vh - 110px)"
            }}
        >
            <Grid item xs={ 12 }>
                <StartOutlined sx={{ fontSize: 100, color: "white" }} />
            </Grid>

            <Grid item xs={ 12 }>
                <Typography
                    color= "white"
                    variant="h5"
                >
                    Selecciona o crea una entrada
                </Typography>
            </Grid>
        </Grid>
    );
};