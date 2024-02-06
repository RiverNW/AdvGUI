import { Text } from "@mantine/core"
import { BaseComponent, Component, TextComponent } from "../../../../../types/components"
import { usePreviewStyles } from "../Scale"
import { useMemo } from "react"

export const RendererText = ({
    id,
    tree,
}: {
    tree: Component[],
    id: string,
}) => {
    let value = useMemo(() => (
        tree.find(x => x.id == id)
    ), [id, tree]) as TextComponent & BaseComponent;

    return (
        <Text
            fz={value.size+"em"}
            // @ts-ignore
            style={{
                ...usePreviewStyles(value),
                fontFamily: value.font,
            }}
            c={value.color}
            span
        >
            {value.text}
        </Text>
    )
}
