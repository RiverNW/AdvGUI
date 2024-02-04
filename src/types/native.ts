
export interface AdvProject {
	name: string;
	version: "1.0.8";
	invisible: [];
	fonts: AdvResource[];
	images: AdvResource[];
	gifs: AdvResource[];
	width: string;
	height: string;
}

export interface AdvResource {
	name: string;
	data: string;
}

export type AdvAction = AdvCommandAction;

export interface AdvCommandAction {
    id: "Command";
    command: string;
    asConsole: boolean;
    asOperator: boolean;
}

export type AdvComponent = AdvBaseComponent & (
    AdvTextComponent
    | AdvRectComponent
    | AdvGroupComponent
    | AdvRemoteImageComponent
);

export interface AdvBaseComponent {
	id: string;
	name: string;
    action: AdvAction[];
}

export interface AdvTextComponent {
	type: "Text";
	text: string;
    x: number;
    y: number;
	font: string;
	size: number;
	color: string;
	placeholder: boolean;
	previewText: string | null;
}

export interface AdvRectComponent {
	width: number;
	height: number;
    x: number;
    y: number;
}

export interface AdvGroupComponent {
    type: "Group";
    components: AdvComponent[],
}

export interface AdvImageComponent {
    type: "Image";
    x: number;
    y: number;
    width: number;
    height: number;
    image: string;
    keepImageRatio: boolean;
    dithering: boolean;
}

export interface AdvHoverComponent {
    type: "Hover";
    components: [AdvComponent, AdvComponent];
}

export interface AdvRemoteImageComponent {
    type: "Remote Image";
    dithering: boolean;
    drawLoading: boolean;
    width: number;
    height: number;
    imageUrl: string;
    keepImageRatio: boolean;
    ratio: number;
}


