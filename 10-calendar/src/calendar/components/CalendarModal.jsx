import { addHours, differenceInSeconds } from "date-fns";
import { es } from "date-fns/locale/es";
import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";
import Swal from "sweetalert2";

import { useCalendarStore, useUiStore } from "../../hooks";

import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { getEnvVariables } from "../../helpers";

registerLocale("es", es);

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
};

if(getEnvVariables().VITE_MODE !== "test") {
    Modal.setAppElement("#root");
}

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if(!formSubmitted) return "";

        return formValues.title.length > 0
            ? ""
            : "is-invalid";
    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if(activeEvent) {
            setFormValues({
                ...activeEvent
            });
        }
    }, [activeEvent]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    };

    const onCloseModal = () => {
        console.log("Cerrando modal");
        closeDateModal();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if(isNaN(difference) || difference <= 0) {
            Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");

            return;
        }

        if(formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        
        closeDateModal();
        setFormSubmitted(false);
    };

    return (
        <Modal
            className="modal"
            closeTimeoutMS={ 200 }
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            overlayClassName="modal-fondo"
            style={ customStyles }
        >
            <h1> Nuevo evento </h1>

            <hr />

            <form className="container" onSubmit={ onSubmit }>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>

                    <div className="customDatePickerWidth">
                        <DatePicker
                            className="form-control"
                            dateFormat="Pp"
                            locale="es"
                            onChange={ (event) => onDateChanged(event, "start") }
                            selected={ formValues.start }
                            showTimeSelect
                            timeCaption="Hora"
                        />
                    </div>
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>

                    <div className="customDatePickerWidth">
                        <DatePicker
                            className="form-control"
                            dateFormat="Pp"
                            locale="es"
                            minDate={ formValues.start }
                            onChange={ (event) => onDateChanged(event, "end") }
                            selected={ formValues.end }
                            showTimeSelect
                            timeCaption="Hora"
                        />
                    </div>
                </div>

                <hr />

                <div className="form-group mb-2">
                    <label>Titulo y notas</label>

                    <input 
                        autoComplete="off"
                        className={ `form-control ${ titleClass }` }
                        name="title"
                        onChange={ onInputChanged }
                        placeholder="Título del evento"
                        type="text" 
                        value={ formValues.title }
                    />

                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        className="form-control"
                        name="notes"
                        onChange={ onInputChanged }
                        placeholder="Notas"
                        rows="5"
                        type="text"
                        value={ formValues.notes }
                    ></textarea>

                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    className="btn btn-outline-primary btn-block"
                    type="submit"
                >
                    <i className="far fa-save"></i>

                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};