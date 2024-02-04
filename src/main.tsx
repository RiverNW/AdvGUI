import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './style.css';
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals"

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider defaultColorScheme="dark">
		<ModalsProvider>
			<App />
		</ModalsProvider>
	</MantineProvider>
)
