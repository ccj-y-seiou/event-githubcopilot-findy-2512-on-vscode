import type { Task } from '../entity/tasks.ts'

const API_BASE_URL = 'http://localhost:8080'

export async function loadTasks(): Promise<Task[]> {
  const url = `${API_BASE_URL}/api/tasks`
  const res = await fetch(url, { method: 'GET' })
  return await res.json()
}

export async function postTask(task: Task): Promise<Task[]> {
  const url = `${API_BASE_URL}/api/tasks`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export async function postTaskDone(task: Task): Promise<void> {
  const url = `${API_BASE_URL}/api/tasks/${task.id}/done`
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function postTaskStart(task: Task): Promise<void> {
  const url = `${API_BASE_URL}/api/tasks/${task.id}/start`
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
