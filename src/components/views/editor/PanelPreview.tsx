import { Box, Center, ScrollArea } from "@mantine/core"
import { useContext, useMemo, useState } from "react"
import { EditorContext } from "../EditorContext";
import { useHotkeys } from "@mantine/hooks";
import { PanelTreeProps } from "./tree/PanelTreeChild";
import { RendererComponent } from "./preview/RendererComponent";
import { ScaleContext, useScale } from "./preview/Scale";
import { MapInteractionCSS } from 'react-map-interaction';

export const PanelPreview = () => {
    return (
        <Box w="100%" h="100%">
            <RootCanvas />
        </Box>
    );
}

export const RootCanvas = () => {
    const { project, setProject } = useContext(EditorContext);

    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [scale, setScale] = useState(0.8);

    useHotkeys([
        ["w", () => setPanY(_ => _ + 1)],
        ["s", () => setPanY(_ => _ - 1)],
        ["a", () => setPanX(_ => _ + 1)],
        ["d", () => setPanX(_ => _ - 1)],
    ])

    return (
        <Box
            w="100%"
            h="100%"
        >
            <ScaleContext.Provider value={scale}>
                <MapInteractionCSS>
                    <ItemFrames />
                </MapInteractionCSS>
            </ScaleContext.Provider>
        </Box>
    )
}

const ItemFrames = () => {
    const { project } = useContext(EditorContext);

    return (
        <Box
            bg="dark.3"
            w={(project.width * 128) + "em"}
            h={(project.height * 128) + "em"}
        >
            <RendererComponent
                id="root"
                tree={project.components}
            />
        </Box>
    )
}
