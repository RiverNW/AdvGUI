import { Box, Text } from "@mantine/core"
import { BaseComponent, Component, RectComponent, TextComponent } from "../../../../../types/components"
import { usePreviewStyles } from "../Scale"
import { useMemo } from "react";

export const RendererRect = ({
    tree,
    id,
}: {
    tree: Component[],
    id: string,
}) => {
    let value = useMemo(() => (
        tree.find(x => x.id == id)
    ), [id, tree]) as RectComponent;

    return (
        <Box
            bg={value.color}
            w={value.width + "em"}
            h={value.height + "em"}
            // @ts-ignore
            style={usePreviewStyles(value)}
        >
        </Box>
    )
}
