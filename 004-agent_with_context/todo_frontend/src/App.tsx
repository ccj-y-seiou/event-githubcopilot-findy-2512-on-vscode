import { useEffect, useState } from 'react'
import './App.css'

import * as api from "./api/task";
import type { Task } from "./entity/tasks";
import { NewTaskForm } from "./views/newTask";
import { ListTaskView } from "./views/taskList";

function App() {
    const [taskList, setTasks] = useState<Task[]>([]);

    async function reloadTasks() {
        const tasks = await api.loadTasks();
        setTasks(tasks);
    }

    useEffect(() => {
        reloadTasks();
    }, []);

    return (
        <div className="container">
            <NewTaskForm reloadTasks={reloadTasks} />
            <ListTaskView taskList={taskList} reloadTasks={reloadTasks} />
        </div>
    );
}

export default App
