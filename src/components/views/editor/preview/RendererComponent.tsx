import { useMemo } from "react";
import { Component } from "../../../../types/components";
import { RendererContainer } from "./components/RendererContainer";
import { RendererRect } from "./components/RendererRect";
import { RendererStack } from "./components/RendererStack";
import { RendererText } from "./components/RendererText";

export const RendererComponent = ({
    id,
    tree,
}: {
    id: string,
    tree: Component[],
}) => {
    let value = useMemo(() => (
        tree.find(x => x.id == id)
    ), [id, tree]);

    //console.log("DEBUG", id, value, tree);

    if(!value) {
        console.log("UNDEFINED", id, tree);
        return <></>
    }

    const Renderer = {
        text: RendererText,
        rect: RendererRect,
        stack: RendererStack,
        root: RendererContainer,
    }[value.type];

    return (
        <Renderer
            tree={tree}
            id={id}
        />
    )
}
