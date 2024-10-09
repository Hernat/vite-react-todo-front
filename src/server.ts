import axios from "axios";

export const fetchTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3000/tasks", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
    }
};
