import { Box, Code, Divider, Group, Text } from "@mantine/core"
import { useContext } from "react"
import { EditorContext } from "../EditorContext";

export const PanelFooter = () => {
    const {
        selections,
        project,
    } = useContext(EditorContext);

    return (
        <Group
            justify="space-between"
            align="center"
            h="100%"
            w="100%"
            p="sm"
        >
            <Group>
                {project.width * 128}x{project.height * 128} pixels
            </Group>
            <Group>
                {!!selections.length ? (
                    [
                        ["DEL", "to delete"],
                        ["CTRL+D", "to duplicate"],
                        ["ESC", "to cancel"],
                    ].map(([btn, text], i, arr) => (
                        <Group key={i}>
                            <Code>{btn}</Code>
                            <Text>{text}</Text>
                            {arr.length > i + 1 && (
                                <Divider
                                    size="md"
                                    orientation="vertical"
                                />
                            )}
                        </Group>
                    ))
                ) : (
                    <Text>
                        Click on a component
                    </Text>
                )}
            </Group>
        </Group>
    )
}
