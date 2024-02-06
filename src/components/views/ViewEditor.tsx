import React, { Dispatch, useEffect, useState } from "react";
import { Component } from "../../types/components";
import { useHotkeys, useListState, useLocalStorage, useWindowEvent } from "@mantine/hooks";
import { ActionIcon, AppShell, Box, Button, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { Project, createDefaultProject } from "../../types/proj";
import { modals } from "@mantine/modals";
import { EditProjectModal } from "../modals/EditProjectModal";
import { IconArrowBack, IconArrowForward } from "@tabler/icons-react";
import { PanelTree } from "./editor/PanelTree";
import { AddComponentButton } from "../editor/AddComponentButton";
import { PanelPreview } from "./editor/PanelPreview";
import { createDefaultMeta } from "../../types/meta";
import { EditorContext } from "./EditorContext";
import { PanelProperties } from "./editor/PanelProperties";
import { randId } from "../../utils/randId";
import { PanelFooter } from "./editor/PanelFooter";

export interface History<T> {
    past: T[],
    present: T,
    future: T[],
};

export const ViewEditor = ({
    id,
}: {
    id: string,
}) => {
    const [selections, {
        filter: filterSelections,
        append: select,
        setState: setSelections,
    }] = useListState<string>([]);

    // hacky
    const [project, __setData] = useState(
        localStorage.getItem(`Project:${id}`) ? (
            JSON.parse(localStorage.getItem(`Project:${id}`))
        ) : (
            createDefaultProject()
        )
    );

    const setProjectData = (data: Project) => {
        localStorage.setItem(`Project:${id}`, JSON.stringify(data));
        __setData(data);
    }

    const [projectMeta, setProjectMeta] = useLocalStorage({
        key: `ProjectMeta:${id}`,
        defaultValue: createDefaultMeta(),
    });

    const [history, setHistory] = useState<History<Project>>({
        past: [],
        present: project,
        future: [],
    });

    const [navbarWidth, setNavbarWidth] = useState(300);
    const [asideWidth, setAsideWidth] = useState(300);

    const [isNavDragging, setIsNavDragging] = useState(false);
    const [isAsideDragging, setIsAsideDragging] = useState(false);

    const [visibleCursor, setVisibleCursor] = useState<string>(null);

    useWindowEvent("mousemove", (e) => {
        if (isNavDragging) setNavbarWidth(Math.min(Math.max(e.clientX, 200), 500));
        if (isAsideDragging) setAsideWidth(Math.min(Math.max(window.innerWidth - e.clientX, 200), 500));
        if (
            (e.clientX > navbarWidth - 10 && e.clientX < navbarWidth + 10) ||
            (e.clientX > window.innerWidth - asideWidth - 10 && e.clientX < window.innerWidth - asideWidth + 10)
        ) {
            setVisibleCursor("ew-resize");
        } else {
            setVisibleCursor(null);
        }
    });

    useWindowEvent("mousedown", (e) => {
        if (e.clientX > navbarWidth - 10 && e.clientX < navbarWidth + 10)
            setIsNavDragging(true);
        if (e.clientX > window.innerWidth - asideWidth - 10 && e.clientX < window.innerWidth - asideWidth + 10)
            setIsAsideDragging(true);
    });

    useWindowEvent("mouseup", (e) => {
        setIsNavDragging(false);
        setIsAsideDragging(false);
    });

    const canUndo = !!history.past.length;
    const canRedo = !!history.future.length;

    const undo = () => {
        setHistory(prev => {
            setProjectData(prev.past.at(-1));
            return {
                past: prev.past.slice(0, -1),
                present: prev.past.at(-1),
                future: [prev.present, ...prev.future],
            };
        })
    }

    const redo = () => {
        setHistory(prev => {
            setProjectData(prev.future[0]);
            return {
                past: [...prev.past, prev.present],
                present: prev.future[0],
                future: prev.future.slice(1),
            };
        })
    }

    const setProject = (p: Project) => {
        setProjectData(p);
        setHistory(prev => ({
            past: [...prev.past, prev.present],
            present: p,
            future: [],
        }));
    };

    const deleteSelectedComponents = () => {
        selections.forEach(x => deleteComponent(x));
    };

    const deleteComponent = (id: string) => {
        let toDelete = [];

        const recurse = (id: string) => {
            if (id !== "root") toDelete.push(id);

            project.components
                .filter(x => x.parentId == id)
                .forEach(x => recurse(x.id));
        }

        recurse(id);

        setProject({
            ...project,
            components: project.components.filter(c => !toDelete.includes(c.id)),
        });
    };

    const duplicateSelectedComponents = () => {
        let toAdd = [];

        let recurse = (parentId: string, id: string) => {
            let comp = project.components.find(x => x.id == id);
            let newId = randId();
            toAdd.push({
                ...comp,
                id: newId,
                parentId,
            });

            project.components.filter(x => x.parentId == id).forEach(x => recurse(newId, x.id));
        };

        selections.forEach(id => recurse(project.components.find(x => x.id == id).parentId, id));

        setProject({
            ...project,
            components: [
                ...project.components,
                ...toAdd,
            ],
        });
    };

    useHotkeys([
        // @ts-ignore
        ["Escape", (e) => e.currentTarget.tagName !== "input" && setSelections([])],
        ["Ctrl+D", () => duplicateSelectedComponents()],
        // @ts-ignore
        ["Delete", (e) => e.currentTarget.tagName !== "input" && deleteSelectedComponents()],

        // @ts-ignore
        ["Ctrl+Z", (e) => e.currentTarget.tagName !== "input" && canUndo && undo()],
        // @ts-ignore
        ["Ctrl+Y", (e) => e.currentTarget.tagName !== "input" && canRedo && redo()],
    ]);

    return (
        <EditorContext.Provider
            value={{
                project: history.present,
                setProject,
                projectMeta,
                setProjectMeta,
                undo,
                redo,
                selections,
                deselectAll: () => setSelections([]),
                deselect: (id) => filterSelections((item) => item !== id),
                select,
                deleteSelectedComponents,
                duplicateSelectedComponents,
                deleteComponent
            }}
        >
            <AppShell
                header={{ height: 60 }}
                footer={{ height: 60 }}
                navbar={{ width: navbarWidth, breakpoint: 0 }}
                aside={{ width: asideWidth, breakpoint: 0 }}
                padding="md"
                style={{
                    cursor: visibleCursor
                }}
            >
                <AppShell.Header>
                    <Group justify="space-between" align="center" h="100%" px="md">
                        <Group>
                            segmentation fault
                        </Group>
                        <Group>
                            <Button
                                variant="light"
                                color="gray"
                                size="lg"
                                onClick={() => {
                                    modals.open({
                                        title: "Edit Project",
                                        children: (
                                            <EditProjectModal
                                                onCancel={() => modals.closeAll()}
                                                value={project}
                                                onSave={(v) => {
                                                    setProject(v);
                                                    modals.closeAll();
                                                }}
                                                isNew={false}
                                            />
                                        ),
                                    })
                                }}
                            >
                                <Stack gap={0} mx="xl">
                                    <Text>{project.title}</Text>
                                    <Text c="gray.5">{project.width}x{project.height} item frames</Text>
                                </Stack>
                            </Button>
                            <Group>
                                <Tooltip label="Undo">
                                    <ActionIcon
                                        variant="light"
                                        color="gray"
                                        onClick={undo}
                                        disabled={!canUndo}
                                    >
                                        <IconArrowBack />
                                    </ActionIcon>
                                </Tooltip>

                                <Tooltip label="Redo">
                                    <ActionIcon
                                        variant="light"
                                        color="gray"
                                        onClick={redo}
                                        disabled={!canRedo}
                                    >
                                        <IconArrowForward />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Group>
                        <Group>
                            <Button
                                variant="light"
                                color="blue"
                            >
                                Export
                            </Button>
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar>
                    <PanelTree />
                </AppShell.Navbar>
                <AppShell.Main>
                    <PanelPreview />
                </AppShell.Main>
                <AppShell.Aside>
                    <PanelProperties />
                </AppShell.Aside>
                <AppShell.Footer>
                    <PanelFooter />
                </AppShell.Footer>
            </AppShell>
        </EditorContext.Provider>
    )
}
