import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App, {COLOR_SCHEMES} from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");
bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"});
window._appColorScheme = COLOR_SCHEMES.BRIGHT_LIGHT;

ReactDOM.render(<App />, document.getElementById("root"));