import { Accordion, Button, Group, ScrollArea, Stack } from "@mantine/core";
import React, { useContext } from "react";
import { EditorContext } from "../EditorContext";
import { IconCopy, IconEdit, IconPhoto, IconTrash, IconTypography } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { Component } from "../../../types/components";
import { PropAlignment, PropColor, PropFontSize, PropId, PropLabel, PropPosition, PropText, PropWidthHeight } from "./properties/Editors";

export type PropertyEditor<T> = ({
    value,
    onChange
}: {
    value: T,
    onChange: (v: T) => void
}) => React.ReactNode;

export const ComponentEditors: Record<Component["type"], PropertyEditor<Component>[]> = {
    root: [],
    text: [
        PropId,
        PropLabel,
        PropText,
        PropColor,
        PropPosition,
        PropFontSize,
    ],
    container: [
        PropId,
        PropLabel,
        PropPosition,
    ],
    group: [
        PropId,
        PropLabel,
        PropAlignment("justify"),
        PropAlignment("align"),
        PropPosition,
        PropWidthHeight,
    ],
    stack: [
        PropId,
        PropLabel,
        PropAlignment("justify"),
        PropAlignment("align"),
        PropPosition,
        PropWidthHeight,
    ],
    rect: [
        PropId,
        PropLabel,
        PropColor,
        PropPosition,
        PropWidthHeight,
    ],
};

export const PanelProperties = () => {
    const {
        selections,
        project,
        setProject,
        deleteSelectedComponents,
        duplicateSelectedComponents,
    } = useContext(EditorContext);

    const selectedFirst = project.components.find(x => x.id == selections[0]);

    return (
        <ScrollArea.Autosize h="100%">
            <Stack h="100%" gap={0}>
                {!!selections.length && !selections.includes("root") && (
                    <Group w="100%" align="center" justify="center" p="sm">
                        <Button
                            variant="light"
                            leftSection={<IconCopy />}
                            color="gray"
                            onClick={() => duplicateSelectedComponents()}
                        >
                            Duplicate
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconTrash />}
                            color="red"
                            onClick={() => deleteSelectedComponents()}
                        >
                            Delete
                        </Button>
                    </Group>
                )}
                <Accordion defaultValue="edit" h="100%">
                    {selections.length == 1 && selectedFirst && !!ComponentEditors[selectedFirst.type].length && (
                        <Accordion.Item value="edit">
                            <Accordion.Control icon={<IconEdit />}>
                                Edit
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Stack my="md" pb="xl">
                                    {ComponentEditors[selectedFirst.type].map((Edit, i) => (
                                        <Edit
                                            key={i}
                                            value={selectedFirst}
                                            onChange={(v) => {
                                                setProject({
                                                    ...project,
                                                    components: project.components.map(x => x.id == selectedFirst.id ? v : x),
                                                });
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}
                    <Accordion.Item value="images">
                        <Accordion.Control icon={<IconPhoto />}>
                            Images
                        </Accordion.Control>
                        <Accordion.Panel>
                            mrow~
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="fonts">
                        <Accordion.Control icon={<IconTypography />}>
                            Fonts
                        </Accordion.Control>
                        <Accordion.Panel>
                            mrow~
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        </ScrollArea.Autosize>
    );
}
