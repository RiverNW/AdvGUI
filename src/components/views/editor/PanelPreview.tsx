import { Box, ScrollArea } from "@mantine/core"
import { useContext, useState } from "react"
import { EditorContext } from "../EditorContext";
import { useHotkeys } from "@mantine/hooks";

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

    useHotkeys([
        ["w", () => setPanX(_ => _ + 1)],
        ["s", () => setPanY(_ => _ - 1)],
    ])

    const _scale = 16;

    return (
        <ScrollArea
            maw="100%"
            mah="100%"
        >
            <Box
                bg="dark.3"
                w={(project.width * _scale) + "em"}
                h={(project.height * _scale) + "em"}
            >
                uwu
            </Box>
        </ScrollArea>
    )
}
