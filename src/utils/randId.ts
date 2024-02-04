export const randId = (prefix?: string) => `${prefix ? `${prefix}-` : ""}${Math.random().toString(36).slice(2)}`;
