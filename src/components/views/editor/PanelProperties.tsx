import { Accordion, Button, Group, Stack } from "@mantine/core";
import { useContext } from "react";
import { EditorContext } from "../EditorContext";
import { IconCopy, IconEdit, IconPhoto, IconTrash, IconTypography } from "@tabler/icons-react";
import { modals } from "@mantine/modals";



export const PanelProperties = () => {
    const {
        selections,
        project,
        deleteSelectedComponents,
        duplicateSelectedComponents,
    } = useContext(EditorContext);

    return (
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
                <Accordion.Item value="edit">
                    <Accordion.Control icon={<IconEdit />}>
                        Edit
                    </Accordion.Control>
                    <Accordion.Panel>
                        mrow~
                    </Accordion.Panel>
                </Accordion.Item>
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
    );
}
