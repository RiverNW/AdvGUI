import { AppShell, Group } from "@mantine/core";
import { useState } from "react";
import { ViewHome } from "./components/views/ViewHome";
import { ViewEditor } from "./components/views/ViewEditor";

export interface IApp {

}

function App() {
	const [currentPage, setCurrentPage] = useState<"home" | "edit">("edit");
	const [id, setId] = useState("TEST");

	return (
		currentPage == "home" ? (
			<ViewHome
				startProject={(id) => {}}
				createProject={() => {}}
			/>
		) : (
			<ViewEditor
				id={id}
			/>
		)
	)
}

export default App
