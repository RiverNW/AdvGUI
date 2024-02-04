import { IconLayout2, IconLayoutBoard, IconLayoutList, IconTextSize } from "@tabler/icons-react";
import { Component } from "../../types/components"

const icons = {
    container: <IconLayout2 />,
    stack: <IconLayoutList />,
    group: <IconLayoutBoard />,
    text: <IconTextSize />,
}

export const ComponentIcon = ({
    type
}: {
    type: string,
}) => {
    return icons[type || "container"];
}
