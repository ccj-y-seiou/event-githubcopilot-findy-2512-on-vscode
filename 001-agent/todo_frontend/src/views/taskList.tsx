import * as api from '../api/task.ts'
import type { Task } from '../entity/tasks.ts'

interface ListTaskViewProps {
  taskList: Task[]
  reloadTasks: () => Promise<void>
}

export const ListTaskView = (props: ListTaskViewProps) => {
  if (props.taskList.length === 0) {
    return (
      <div className="text-center text-muted py-5 px-3 border border-2 border-secondary-subtle rounded-4 bg-white">
        タスクは全て完了済みです🎉
      </div>
    )
  }

  return (
    <div className="row g-3">
      {props.taskList.map(task => (
        <div className="col-12 col-md-6" key={task.id}>
          <TaskCard task={task} reloadTasks={props.reloadTasks} />
        </div>
      ))}
    </div>
  )
}

interface TaskCardProps {
  task: Task
  reloadTasks: () => Promise<void>
}

const TaskCard = (props: TaskCardProps) => {
  async function clickDone(): Promise<void> {
    await api.postTaskDone(props.task)
    await props.reloadTasks()
  }

  async function clickStart(): Promise<void> {
    await api.postTaskStart(props.task)
    await props.reloadTasks()
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'in_progress':
        return <span className="badge text-bg-warning">進行中</span>
      case 'done':
        return <span className="badge text-bg-success">完了済み</span>
      case 'todo':
      default:
        return <span className="badge text-bg-secondary">実施前</span>
    }
  }

  const showStartButton = props.task.status === 'todo'
  const showDoneButton = props.task.status === 'in_progress'

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-start">
          <span className="badge text-bg-secondary">
            #{props.task.id}
          </span>
          {getStatusBadge(props.task.status)}
        </div>
        <p className="card-text flex-grow-1 mb-0">{props.task.text}</p>
        <div className="d-flex gap-2">
          {showStartButton && (
            <button
              className="btn btn-outline-primary"
              onClick={clickStart}
              type="button"
            >
              start
            </button>
          )}
          {showDoneButton && (
            <button
              className="btn btn-outline-success"
              onClick={clickDone}
              type="button"
            >
              done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
