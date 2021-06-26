import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        installServiceWorker();
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;

const supportsServiceWorker = () => "serviceWorker" in navigator;

const installServiceWorker = (config) => {
    if (!supportsServiceWorker()) {
        return;
    }
    window.addEventListener("load", () =>
        registerSW("/service-worker.js", config)
    );
};

const registerSW = async function (swUrl) {
    try {
        const registration = await navigator.serviceWorker.register(swUrl);
        const installingWorker = registration.installing;
        registration.onupdatefound = () => {
            registration.onstatechange = () => {
                if (installingWorker.state !== "installed") {
                    console.log("service worker is not installed. Returning");
                    return;
                }

                const msg = navigator.serviceWorker.controller
                    ? "new content available and will be used when tabs are closed"
                    : "new content cached for offline use";

                console.log("Msg: ", msg);
            };
        };
    } catch (error) {
        logger({ level: "error" }, error.message);
    }
};
