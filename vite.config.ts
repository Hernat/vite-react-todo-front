import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

// export const getConfigs = async () => {
//     await axios.get("http://localhost:3000/tasks"); // "http://localhost:3000/api/v1/configurations"
// };

export default defineConfig({
    server: {
        proxy: {
            "/tasks": {
                target: "http://localhost:3000/",
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    plugins: [react()],
});
