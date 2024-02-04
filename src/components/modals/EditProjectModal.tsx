import { Button, Group, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { Project } from "../../types/proj";
import { useState } from "react";

export const EditProjectModal = ({
    isNew,
    onCancel,
    onSave,
    value,
}: {
    isNew: boolean,
    value: Project,
    onSave: (proj: Project) => void,
    onCancel: () => void,
}) => {
    let [title, setTitle] = useState(value.title); 
    let [width, setWidth] = useState(value.width); 
    let [height, setHeight] = useState(value.height); 

    return (
        <Stack>
            <TextInput
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="Untitled"
                label="Project Title"
            />

            <NumberInput
                label="Width (item frames)"
                value={width}
                onChange={(v) => setWidth(Number(v))}
                min={1}
            />

            <NumberInput
                label="Height (item frames)"
                value={height}
                onChange={(v) => setHeight(Number(v))}
                min={1}
            />

            <Text ta="center">
                Pixels: {width * 128}x{height * 128}
            </Text>

            <Group justify="space-between">
                <Button
                    variant="light"
                    color="gray"
                    onClick={() => onCancel()}
                >
                    Cancel
                </Button>
                <Button
                    variant="light"
                    color={isNew ? "green" : "blue"}
                    onClick={() => onSave({
                        ...value,
                        title,
                        width,
                        height,
                    })}
                >
                    {isNew ? "Create" : "Save"}
                </Button>
            </Group>
        </Stack>
    );
};

