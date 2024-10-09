// TodoApp.js
import axios from "axios";
import { useEffect, useState } from "react";

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Fonction pour récupérer toutes les tâches
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches :", error);
        }
    };

    // Fonction pour créer une nouvelle tâche
    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            completed: false,
        };

        try {
            const response = await axios.post("/tasks", newTask);
            setTasks([...tasks, response.data]);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Erreur lors de la création de la tâche :", error);
        }
    };

    // Fonction pour mettre à jour le statut d'une tâche
    const toggleTaskCompletion = async (taskId: number, completed: boolean) => {
        try {
            await axios.patch(`/tasks/${taskId}`, {
                completed: !completed,
            });
            setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !completed } : task)));
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    };

    // Fonction pour supprimer une tâche
    const deleteTask = async (taskId: number) => {
        try {
            await axios.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error);
        }
    };

    // Récupérer les tâches lors du montage du composant
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>

            {/* Formulaire pour créer une nouvelle tâche */}
            <form onSubmit={createTask} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 p-2 border rounded mb-2 md:mb-0"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="flex-1 p-2 border rounded mb-2 md:mb-0"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Ajouter
                    </button>
                </div>
            </form>

            {/* Liste des tâches */}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between p-2 border-b">
                        <div className="flex items-center">
                            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id, task.completed)} className="mr-2" />
                            <div>
                                <p className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
