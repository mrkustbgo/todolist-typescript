import React, { createContext, useEffect, useState } from "react";
import { CategoryProps } from "./CategoriesContext";

export const TasksContext = createContext({} as TasksContextProps);

export interface TaskProps {
  category: CategoryProps;
  checked: boolean;
  content: string;
  date: string;
  id: string;
}

interface TasksContextProps {
  tasks: TaskProps[];
  addTask: (newTask: TaskProps) => void;
  removeTask: (id: string) => void;
  updateCheckedStatus: (updatedTask: TaskProps, checked: boolean) => void;
  updateDate: (updatedTask: TaskProps, date: string) => void;
  updateTaskColor: (slugBeingUpdated: string, color: string) => void;
  changeTasksOrder: (result: TaskProps[]) => void;
  updateTaskContent: (updatedTask: TaskProps, content: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const initialTasks = JSON.parse(
    localStorage.getItem("userTasksDonaClone") || "[]"
  );
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);

  const addTask = (newTask: TaskProps) => {
    setTasks((prevTask) => [...prevTask, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  };

  const updateCheckedStatus = (updatedTask: TaskProps, checked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...updatedTask,
            checked: checked,
          };
        }
        return task;
      })
    );
  };

  const updateDate = (updatedTask: TaskProps, date: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...updatedTask,
            date: date,
          };
        }
        return task;
      })
    );
  };

  const updateTaskColor = (slugBeingUpdated: string, color: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.category.slug === slugBeingUpdated) {
          return {
            ...task,
            category: {
              ...task.category,
              color: color,
            },
          };
        }
        return task;
      })
    );
  };

  const updateTaskContent = (updatedTask: TaskProps, content: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...updatedTask,
            content: content,
          };
        }
        return task;
      })
    );
  };

  const changeTasksOrder = (result: TaskProps[]) => {
    let index: number = 0;
    setTasks(
      tasks.map((task) => {
        if (task.category.slug === result[0].category.slug) {
          task = result[index];
          index++;
        }
        return task;
      })
    );
  };

  const updateTasks = useEffect(() => {
    localStorage.setItem("userTasksDonaClone", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateCheckedStatus,
        updateDate,
        updateTaskColor,
        changeTasksOrder,
        updateTaskContent,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
