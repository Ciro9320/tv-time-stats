import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "TV Time Stats",
        short_name: "TV Time Stats",
        description: "Analyse your TV Time stats",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4f46e5",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/apple-icon.png",
                sizes: "1024x1024",
                type: "image/png",
            },
        ],
    };
}
