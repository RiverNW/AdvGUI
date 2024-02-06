import { ActionIcon, ColorInput, CopyButton, Group, NumberInput, SegmentedControl, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { Alignment, Component } from "../../../../types/components";
import { PropertyEditor } from "../PanelProperties";
import { IconCopy } from "@tabler/icons-react";

const Copier = ({ value }: { value: string }) => {
    return (
        <CopyButton value={value}>
            {({ copied, copy }) => (
                <ActionIcon
                    variant="light"
                    color={copied ? 'teal' : 'gray'}
                    onClick={copy}
                >
                    <IconCopy />
                </ActionIcon>
            )}
        </CopyButton>
    )
}

export const PropId: PropertyEditor<Component> = ({ value, onChange }) => {
    return (
        <TextInput
            value={value.id}
            label="ID"
            readOnly
            rightSection={<Copier value={value.id} />}
        />
    )
};

export const PropLabel = ({ value, onChange }) => {
    return (
        <TextInput
            value={value.label}
            label="Label"
            onChange={(v) => onChange({
                ...value,
                label: v.currentTarget.value
            })}
        />
    )
};

export const PropText = ({ value, onChange }) => {
    return (
        <Textarea
            placeholder="Hello world"
            label="Text"
            autosize
            minRows={2}
            value={value.text}
            onChange={(v) => onChange({
                ...value,
                text: v.currentTarget.value,
            })}
        />
    )
}

export const PropColor = ({ value, onChange }) => {
    return (
        <ColorInput
            label="Color"
            value={value.color}
            format="rgba"
            onChange={(v) => onChange({
                ...value,
                color: v,
            })}
        />
    )
}

export const PropFontSize = ({ value, onChange }) => {
    return (
        <NumberInput
            label="Font Size"
            value={value.size}
            onChange={(v) => !isNaN(Number(v)) && onChange({ ...value, size: Number(v) })}
        />
    )
}

export const PropAlignment = (type: "justify" | "align") => (({ value, onChange }) => {
    return (
        <Stack gap={0}>
            <Text>
                {type == "justify" ? "Justify" : "Align"}
            </Text>
            <SegmentedControl
                data={[
                    { label: "Start", value: Alignment.Start },
                    { label: "Center", value: Alignment.Center },
                    { label: "End", value: Alignment.End },
                    { label: "Space Between", value: Alignment.SpaceBetween },
                ]}
                value={value[type]}
                onChange={(v) => onChange({ ...value, [type]: v })}
            />
        </Stack>
    )
})

export const PropPosition = ({ value, onChange }) => {
    return (
        <Group grow>
            <NumberInput
                label="X offset"
                value={value.x}
                onChange={(v) => !isNaN(Number(v)) && onChange({ ...value, x: Number(v) })}
            />
            <NumberInput
                label="Y offset"
                value={value.y}
                onChange={(v) => !isNaN(Number(v)) && onChange({ ...value, y: Number(v) })}
            />
        </Group>
    )
}

export const PropWidthHeight = ({ value, onChange }) => {
    return (
        <Group grow>
            <NumberInput
                label="Width"
                value={value.width}
                onChange={(v) => !isNaN(Number(v)) && onChange({ ...value, width: Number(v) })}
            />
            <NumberInput
                label="Height"
                value={value.height}
                onChange={(v) => !isNaN(Number(v)) && onChange({ ...value, height: Number(v) })}
            />
        </Group>
    )
}
