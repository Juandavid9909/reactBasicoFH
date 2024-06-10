import { memo } from "react";

export const Small = memo(({ value }) => {
    console.log("Me volví a generar :(");

    return (
        <small>{ value }</small>
    );
});