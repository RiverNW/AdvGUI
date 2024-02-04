import { useContext, useMemo, useState } from "react"
import { EditorContext } from "../EditorContext";
import { Component, canHaveChildren } from "../../../types/components";
import { ActionIcon, Box, Collapse, Flex, Group, Paper, ScrollArea, Stack } from "@mantine/core";
import { CSS } from '@dnd-kit/utilities'
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { PanelTreeChild } from "./tree/PanelTreeChild";
import { AddComponentButton } from "../../editor/AddComponentButton";
import { randId } from "../../../utils/randId";

export const PanelTree = () => {
    const { project, setProject } = useContext(EditorContext);

    return (
        <Stack justify="space-between" h="100%" gap={0} p="sm">
            <ScrollArea h="100%" offsetScrollbars>
                <PanelTreeChild
                    id="root"
                    tree={project.components}
                    onChange={(comps) => {
                        setProject({
                            ...project,
                            components: comps
                        })
                    }}
                />
            </ScrollArea>
            <Stack>
                <AddComponentButton
                    onAdd={(comp) => {
                        setProject({
                            ...project,
                            components: [
                                ...project.components,
                                {
                                    ...comp,
                                    id: randId(comp.type),
                                    parentId: "root",
                                },
                            ],
                        })
                    }}
                />
            </Stack>
        </Stack>
    )
}
