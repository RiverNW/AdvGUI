import { useContext, useMemo, useState } from "react";
import { Component, canHaveChildren } from "../../../../types/components"
import { ActionIcon, Collapse, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronRight, IconTrash } from "@tabler/icons-react";
import { ComponentIcon } from "../../../editor/ComponentIcon";
import { AddComponentButton } from "../../../editor/AddComponentButton";
import { randId } from "../../../../utils/randId";
import { EditorContext } from "../../EditorContext";
import { useWindowEvent } from "@mantine/hooks";

export interface PanelTreeProps {
    tree: Component[],
    onChange: (v: Component[]) => void,
    id?: string;
}

export const PanelTreeChild = ({
    tree,
    onChange,
    id
}: PanelTreeProps) => {
    const { projectMeta, setProjectMeta, selections, select, deselect, deselectAll, deleteComponent } = useContext(EditorContext);

    let comp = useMemo(() => {
        return tree.find(i => i.id == id);
    }, [id, tree]);

    let children = useMemo(() => {
        return tree.filter(i => i.parentId == comp.id);
    }, [comp.id, tree]);

    const doHaveChildren = canHaveChildren(comp);
    const isOpened = !projectMeta.collapsedIds.includes(id);

    const [isPressingShift, setPressingShift] = useState(false);

    useWindowEvent("keyup", (e) => {
        e.key == "Shift" && setPressingShift(false);
    });

    useWindowEvent("keydown", (e) => {
        e.key == "Shift" && setPressingShift(true);
    })

    return (
        <Stack gap={0}>
            <Group justify="space-between" align="center" wrap="nowrap" gap="sm" h="100%" py="2px" my="2px" style={{
                borderBottom: "1px solid var(--mantine-color-dimmed)",
                borderRadius: "4px",
            }} className={`hoverable ${selections.includes(id) ? "active" : ""}`}
                onClick={(e) => {
                    if (!e.ctrlKey) deselectAll();
                    selections.includes(id) ? deselect(id) : select(id);
                }}
            >
                <Group wrap="nowrap">
                    {doHaveChildren ? (
                        <Group wrap="nowrap" onClick={(e) => {
                            e.stopPropagation();
                            setProjectMeta({
                                ...projectMeta,
                                collapsedIds: isOpened
                                    ? [...projectMeta.collapsedIds, id]
                                    : projectMeta.collapsedIds.filter(i => i != id)
                            });
                        }} align="center" justify="center" style={{
                            cursor: "pointer"
                        }}>
                            {isOpened ? <IconChevronDown /> : <IconChevronRight />}
                        </Group>
                    ) : <ComponentIcon type={comp.type} />}
                    <Text span style={{ userSelect: "none" }}>{comp.label}</Text>
                    {comp.label.toLowerCase() !== comp.type && (
                        <Text span c="dimmed" style={{ userSelect: "none" }}>{comp.type}</Text>
                    )}
                </Group>
                <Group gap="4px">
                    {isPressingShift && id !== "root" && (
                        <Tooltip label="Remove Component">
                            <ActionIcon
                                variant="light"
                                color="red"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteComponent(id);
                                }}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </Tooltip>
                    )}
                    {doHaveChildren && (
                        <AddComponentButton
                            compact
                            onAdd={(c: Component) => {
                                onChange([
                                    ...tree,
                                    {
                                        ...c,
                                        id: randId(c.type),
                                        parentId: id
                                    }
                                ])
                            }}
                        />
                    )}
                </Group>
            </Group>
            {doHaveChildren && (
                <Collapse in={isOpened} transitionDuration={id == "root" ? 0 : 100}>
                    <Stack pl="md" gap={0}>
                        {children.map(child => (
                            <PanelTreeChild id={child.id} tree={tree} onChange={onChange} key={child.id} />
                        ))}
                    </Stack>
                </Collapse>
            )}
        </Stack>
    )
}
