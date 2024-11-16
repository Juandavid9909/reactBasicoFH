import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

import { ImageGallery } from "../components";

export const NoteView = () => {
    return (
        <Grid container
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography
                    fontSize={ 39 }
                    fontWeight="light"
                >
                    28 de agosto, 2023
                </Typography>
            </Grid>

            <Grid item>
                <Button
                    color="primary"
                    sx={{ p: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />

                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    fullWidth
                    label="Título"
                    placeholder="Ingrese un título"
                    sx={{ border: "none", mb: 1 }}
                    type="text"
                    variant="filled"
                />

                <TextField
                    fullWidth
                    minRows={ 5 }
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    type="text"
                    variant="filled"
                />
            </Grid>

            <ImageGallery />
        </Grid>
    );
};