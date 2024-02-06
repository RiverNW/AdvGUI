import { IconLayout2, IconLayoutBoard, IconLayoutList, IconSquare, IconTextSize } from "@tabler/icons-react";
import { Component } from "../../types/components"

export const ComponentIcons = {
    container: <IconLayout2 />,
    stack: <IconLayoutList />,
    group: <IconLayoutBoard />,
    text: <IconTextSize />,
    rect: <IconSquare />,
}

export const ComponentIcon = ({
    type
}: {
    type: string,
}) => {
    return ComponentIcons[type || "container"];
}
