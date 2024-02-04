import { ActionIcon, Button, Group, Paper, Popover, Stack, Text, Tooltip } from "@mantine/core"
import { Alignment, Component } from "../../types/components"
import { modals } from "@mantine/modals"
import { SearchableModal } from "./SearchableModal"
import { IconLayoutList, IconPlus, IconTextSize } from "@tabler/icons-react"
import React from "react"
import { randId } from "../../utils/randId"

interface CListItem {
    icon: React.ReactNode,
    label: string,
    desc: string,
    comp: Component,
}

const componentsList: CListItem[] = [
    {
        icon: <IconLayoutList />,
        label: "Stack",
        desc: "Vertical layouts",
        comp: {
            id: "",
            type: "stack",
            parentId: "root",
            x: 0,
            y: 0,
            align: Alignment.Start,
            justify: Alignment.Start,
            gap: 0,
            height: 100,
            width: 100,
            label: "Stack"
        }
    },
    {
        icon: <IconTextSize />,
        label: "Text",
        desc: "Write some text",
        comp: {
            parentId: "root",
            type: "text",
            text: "Hi",
            color: "black",
            font: "Roboto",
            id: "",
            label: "Text",
            size: 16,
            x: 0,
            y: 0,
        },
    }
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
