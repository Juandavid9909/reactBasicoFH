import { addHours } from "date-fns";
import { Calendar } from "react-big-calendar";
import { useState } from "react";

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { getMessagesEs, localizer } from "../../helpers";

import "react-big-calendar/lib/css/react-big-calendar.css";

const events = [
    {
        title: "Cumpleaños del jefe",
        notes: "Hay que comprar el pastel",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#FAFAFA",
        user: {
            _id: "123",
            name: "Juan"
        }
    }
];

export const CalendarPage = () => {
    const [lastView, setLastView] =  useState(localStorage.getItem("lastView") || "week");

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#347CF7",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white"
        };

        return {
            style
        };
    };

    const onDoubleClick = (event) => {

    };

    const onSelect = (event) => {
        
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
    };

    return (
        <>
            <Navbar />

            <Calendar
                components={{
                    event: CalendarEvent
                }}
                culture="es"
                defaultView={ lastView }
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                events={ events }
                localizer={ localizer }
                messages={ getMessagesEs() }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
                startAccessor="start"
                style={{ height: "calc(100vh - 80px)" }}
            />

            <CalendarModal />
        </>
    );
};