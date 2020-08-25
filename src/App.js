import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, View } from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

export const COLOR_SCHEMES = {
	CLIENT_LIGHT: 'client_light',
	BRIGHT_LIGHT: 'bright_light',
	CLIENT_DARK: 'client_dark',
	SPACE_GRAY: 'space_gray'
};

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.body.setAttribute('scheme', COLOR_SCHEMES.SPACE_GRAY);
	window._appColorScheme = COLOR_SCHEMES.SPACE_GRAY
}

const App = () => {
	const [activePanel, setActivePanel] = useState('home');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const oldScheme = document.body.getAttribute('scheme');
				const vkScheme = data.scheme ? data.scheme : COLOR_SCHEMES.BRIGHT_LIGHT;

				if (oldScheme !== vkScheme) {
					if (vkScheme === COLOR_SCHEMES.CLIENT_DARK || vkScheme === COLOR_SCHEMES.SPACE_GRAY) {
						bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#0a0a0a"});
					} else {
						bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"});
					}
				}

				document.body.setAttribute('scheme', vkScheme);
				window._appColorScheme = vkScheme;
			}
		});
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider scheme={window._appColorScheme}>
			<View activePanel={activePanel}>
				<Home id='home' go={go} />
			</View>
		</ConfigProvider>
	);
}

export default App;

