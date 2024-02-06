import { Stack, Text } from "@mantine/core"
import { BaseComponent, Component, StackComponent, TextComponent } from "../../../../../types/components"
import { useMemo } from "react";
import { RendererComponent } from "../RendererComponent";
import { usePreviewStyles } from "../Scale";

export const RendererStack = ({
    id,
    tree,
}: {
    id: string,
    tree: Component[],
}) => {
    let value = useMemo(() => (
        tree.find(x => x.id == id)
    ), [id, tree]) as StackComponent;

    let children = useMemo(() => (
        tree.filter(x => x.parentId == id)
    ), [id, tree]);

    return (
        <Stack
            justify={value.justify}
            align={value.align}
            gap={value.gap + "em"}
            w={value.width + "em"}
            h={value.height + "em"}
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
        </Stack>
    )
}
