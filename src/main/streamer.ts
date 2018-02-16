import * as path from "path";

import { app } from "electron";

import { Server } from "@r2-streamer-js/http/server";
import { setupReadiumCSS } from "@r2-navigator-js/electron/main/readium-css";

import { secureSessions } from "@r2-navigator-js/electron/main/sessions";


// Preprocessing directive
declare const __RENDERER_BASE_URL__: string;
declare const __NODE_ENV__: string;
declare const __NODE_MODULE_RELATIVE_URL__: string;
declare const __PACKAGING__: string;

// Create readium2 streamer
// This streamer is used to stream epub content to the renderer
export const streamer: Server = new Server({
    disableDecryption: false,
    disableOPDS: true,
    disableReaders: true,
    disableRemotePubUrl: true,
});

app.on("ready", () => {
    secureSessions(streamer); // HTTPS
});

// FIXME: __TODO_LCP_LSD__

// import { IStore } from "@r2-testapp-js/electron/common/store";
// import { StoreElectron } from "@r2-testapp-js/electron/common/store-electron";
// import { getDeviceIDManager } from "@r2-testapp-js/electron/main/lsd-deviceid-manager";
// const electronStoreLSD: IStore = new StoreElectron("readium2-testapp-lsd", {});
// const deviceIDManager = getDeviceIDManager(electronStoreLSD, "Readium2 Electron desktop app");

// import { installLcpHandler } from "@r2-navigator-js/electron/main/lcp";
// import { installLsdHandler } from "@r2-navigator-js/electron/main/lsd";

// installLcpHandler(streamer);
// installLsdHandler(streamer, deviceIDManager);

let rcssPath = "ReadiumCSS";
if (__PACKAGING__ === "1") {
    rcssPath = path.normalize(path.join(__dirname, rcssPath));
} else {
    rcssPath = "r2-navigator-js/dist/ReadiumCSS";
    rcssPath = path.normalize(path.join(__dirname, __NODE_MODULE_RELATIVE_URL__, rcssPath));
}

rcssPath = rcssPath.replace(/\\/g, "/");
console.log(rcssPath);

setupReadiumCSS(streamer, rcssPath);
