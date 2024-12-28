import { Calendar } from "react-big-calendar";
import { useState } from "react";

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { getMessagesEs, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
    
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
        openDateModal();
    };

    const onSelect = (event) => {
        setActiveEvent(event);
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

            <FabAddNew />

            <FabDelete />
        </>
    );
};