export interface Meta {
    collapsedIds: string[]
}

export const createDefaultMeta = (): Meta => ({
    collapsedIds: []
})
