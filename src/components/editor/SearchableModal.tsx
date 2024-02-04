import { Box, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import React, { useState } from "react"

export const SearchableModal = <T,>({
    items,
    getText,
    renderer,
    onChoose,
}: {
    items: T[],
    renderer: (item: T) => React.ReactNode,
    getText: (item: T) => string,
    onChoose: (item: T) => void,
}) => {
    const [search, setSearch] = useState("");

    const filtered = search ? (
            items.filter(x => getText(x).toLowerCase().includes(search.toLowerCase()))
        )
        : items;

    return (
        <Stack>
            <TextInput
                label="Search"
                placeholder="Search components..."
                value={search}
                onChange={(v) => setSearch(v.currentTarget.value)}
            />

            <SimpleGrid cols={3}>
                {filtered.length ? (
                    filtered.map((item, i) => (
                        <Box key={i} onClick={() => {
                            onChoose(item);
                        }}>
                            {renderer(item)}
                        </Box>
                    ))
                ) : (
                    <Text>
                        No results
                    </Text>
                )}
            </SimpleGrid>
        </Stack>
    )
}
