import { ActionIcon, Button, Group, Paper, Popover, Stack, Text, Tooltip } from "@mantine/core"
import { Alignment, Component } from "../../types/components"
import { modals } from "@mantine/modals"
import { SearchableModal } from "./SearchableModal"
import { IconLayoutCards, IconLayoutList, IconPlus, IconTextSize } from "@tabler/icons-react"
import React from "react"
import { randId } from "../../utils/randId"
import { ComponentIcons } from "./ComponentIcon"

interface CListCategory {
    label: string;
    items: CListItem[];
}

interface CListItem {
    icon: React.ReactNode,
    label: string,
    desc: string,
    comp: Component,
}

const _defaults = {
    id: "",
    parentId: "root",
    x: 0,
    y: 0,
};

const componentsList: CListItem[] = [
    {
        icon: ComponentIcons.stack,
        label: "Stack",
        desc: "Vertical layouts",
        comp: {
            ..._defaults,
            type: "stack",
            label: "Stack",
            align: Alignment.Start,
            justify: Alignment.Start,
            gap: 0,
            height: 20,
            width: 20,
        }
    },
    {
        icon: ComponentIcons.group,
        label: "Group",
        desc: "Horizontal layouts",
        comp: {
            ..._defaults,
            type: "group",
            label: "Group",
            align: Alignment.Start,
            justify: Alignment.Start,
            height: 20,
            width: 20,
        }
    },
    {
        icon: ComponentIcons.container,
        label: "Container",
        desc: "Folder of components",
        comp: {
            ..._defaults,
            type: "container",
            label: "Container",
        }
    },
    {
        icon: ComponentIcons.text,
        label: "Text",
        desc: "Write some text",
        comp: {
            ..._defaults,
            type: "text",
            label: "Text",
            text: "Text",
            color: "rgba(0,0,0,1)",
            font: "Roboto",
            size: 16,
        },
    },
    {
        icon: ComponentIcons.rect,
        label: "Rectangle",
        desc: "A box",
        comp: {
            ..._defaults,
            type: "rect",
            label: "Rectangle",
            color: "rgba(128,128,128,1)",
            width: 20,
            height: 20,
        },
    },
];

export const AddComponentButton = ({
    onAdd,
    compact,
}: {
    onAdd?: (comp: Component) => void,
    compact?: boolean,
}) => {
    const onClick = (e) => {
        e.stopPropagation();
        modals.open({
            size: "lg",
            title: "Select a component to add",
            children: <SearchableModal
                items={componentsList}
                getText={(c) => c.label}
                renderer={({ icon, label, desc }) => (
                    <Paper withBorder p="md" className="hoverable" ta="center" style={{
                        cursor: "pointer",
                        userSelect: "none",
                    }}>
                        <Stack align="center" w="100%" gap={0}>
                            <Group justify="center" w="100%">
                                {icon}
                            </Group>
                            <Text>
                                {label}
                            </Text>
                            <Text c="dimmed" w="100%">
                                {desc}
                            </Text>
                        </Stack>
                    </Paper>
                )}
                onChoose={(item) => {
                    onAdd?.(item.comp);
                    modals.closeAll();
                }}
            />,
        })
    }

    return (
        compact ? (
            <Tooltip label="Add Component">
                <ActionIcon
                    variant="light"
                    color="gray"
                    onClick={onClick}
                >
                    <IconPlus />
                </ActionIcon>
            </Tooltip>
        ) : (
            <Button
                variant="light"
                color="gray"
                leftSection={<IconPlus />}
                onClick={onClick}
            >
                Add Component
            </Button>
        )
    )
}
