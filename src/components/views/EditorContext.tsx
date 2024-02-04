import { createContext } from "react";
import { Meta } from "../../types/meta";
import { Project } from "../../types/proj";

// @ts-ignore
export const EditorContext = createContext<IEditor>();

export interface IEditor {
    selections: string[];
    project: Project;
    setProject: (p: Project) => void;
    projectMeta: Meta;
    setProjectMeta: (meta: Meta) => void;

    select(id: string): void;
    deselect(id: string): void;
    deselectAll(): void;
    undo(): void;
    redo(): void;

    duplicateSelectedComponents: () => void;
    deleteSelectedComponents: () => void;
    deleteComponent: (id: string) => void;
}

