import React, { useContext } from "react";
import { BaseComponent, Component } from "../../../../types/components";

export const ScaleContext = React.createContext<number>(2);

export const useScale = () => {
    let scaling = useContext(ScaleContext);

    return (n: number) => `${n * scaling}em`;
}

export const usePreviewStyles = (value: BaseComponent) => {
    let scale = useScale();

    return {
        top: `${(value.x)}rem`,
        left: `${(value.y)}rem`,
        position: "fixed",
    }
}
