export type Component = BaseComponent & (
    GroupComponent
    | StackComponent
    | TextComponent
    | RectComponent
    | ContainerComponent
    | RootComponent
);

export interface BaseComponent {
    id: string;
    parentId: string;
    label: string;
    x: number;
    y: number;
}

export interface RootComponent {
    type: "root";
    label: "Root"
}

export type Spacing = number | string;

export interface GroupComponent {
    type: "group";
    justify: Alignment;
    align: Alignment;
    width: number;
    height: number;
}

export enum Alignment {
    Start = "start",
    Center = "center",
    End = "end",
    SpaceBetween = "space-between",
}

export interface StackComponent {
    type: "stack";
    justify: Alignment;
    align: Alignment;
    gap: Spacing;
    width: number;
    height: number;
}

export interface TextComponent {
    type: "text";
    text: string;
    font: string;
    size: number;
    color: string;
}

export interface RectComponent {
    type: "rect",

    width: number;
    height: number;
    color: string;
}

export interface ContainerComponent {
    type: "container";
}

export const canHaveChildren = (c: Component) => c.type == "container" || c.type == "group" || c.type == "stack" || c.id == "root";
