import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";

import { ImageGallery } from "../components";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { useForm } from "../../hooks/useForm";

import "sweetalert2/dist/sweetalert2.min.css";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire("Nota actualizada", messageSaved, "success");
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    };

    const onFileInputChange = ({ target }) => {
        if(target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <Grid container
            className="animate__animated animate__fadeIn animate__faster"
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography
                    fontSize={ 39 }
                    fontWeight="light"
                >
                    { dateString }
                </Typography>
            </Grid>

            <Grid item>
                <input
                    multiple
                    onChange={ onFileInputChange }
                    ref={ fileInputRef }
                    style={{ display: "none" }}
                    type="file"
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color="primary"
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />

                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    fullWidth
                    label="Título"
                    name="title"
                    onChange={ onInputChange }
                    placeholder="Ingrese un título"
                    sx={{ border: "none", mb: 1 }}
                    type="text"
                    value={ title }
                    variant="filled"
                />

                <TextField
                    fullWidth
                    minRows={ 5 }
                    multiline
                    name="body"
                    onChange={ onInputChange }
                    placeholder="¿Qué sucedió en el día de hoy?"
                    type="text"
                    value={ body }
                    variant="filled"
                />
            </Grid>

            <Grid container
                justifyContent="end"
            >
                <Button
                    color="error"
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            <ImageGallery
                images={ note.imageUrls }
            />
        </Grid>
    );
};