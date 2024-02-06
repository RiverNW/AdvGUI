import { Box, Stack, Text } from "@mantine/core"
import { BaseComponent, Component, ContainerComponent, StackComponent, TextComponent } from "../../../../../types/components"
import { useMemo } from "react";
import { RendererComponent } from "../RendererComponent";
import { usePreviewStyles, useScale } from "../Scale";

export const RendererContainer = ({
    id,
    tree,
}: {
    id: string,
    tree: Component[],
}) => {
    let value = useMemo(() => (
        tree.find(x => x.id == id)
    ), [id, tree]);

    let children = useMemo(() => (
        tree.filter(x => x.parentId == id)
    ), [id, tree]);

    return (
        <Box
            // @ts-ignore
            style={usePreviewStyles(value)}
        >
            {children.map((child, i) => (
                <RendererComponent
                    tree={tree}
                    id={child.id}
                    key={i}
                />
            ))}
        </Box>
    )
}
