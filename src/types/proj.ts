import { randId } from "../utils/randId";
import { Alignment, Component } from "./components";

export interface Project {
    id: string;
    title: string;
    width: number;
    height: number;
    components: Component[];
}

export const createDefaultProject: () => Project = () => ({
    id: randId(),
    height: 1,
    width: 1,
    title: "Untitled",
    components: [
        {
            id: "root",
            type: "root",
            label: "Root",
            orderId: "",
            parentId: "",
            x: 0,
            y: 0
        },
        {
            id: "baseStack",
            parentId: "root",
            type: "stack",
            align: Alignment.Center,
            justify: Alignment.Center,
            gap: 0,
            height: 10,
            label: "stek",
            width: 10,
            x: 0,
            y: 0,
            orderId: "root"
        },
        {
            id: "g",
            type: "text",
            color: "",
            font: "",
            label: "a",
            size: 16,
            text: "Hello",
            x: 5,
            y: 5,
            parentId: "baseStack",
            orderId: "1"
        }
    ],
});
