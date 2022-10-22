import React, { useContext, useRef, useState } from "react";

import Calendar from "react-calendar";

import { TasksContext, TaskProps } from "../../contexts/TasksContext";

import removeIcon from "@assets/removeIcon.svg";
import editIcon from "@assets/editIcon.svg";

import TaskStyles from "./styles";

import { lightTheme } from "../../App";

interface TaskComponentProps {
  task: TaskProps;
}

const Task = ({ task }: TaskComponentProps) => {
  const { removeTask, updateCheckedStatus, updateDate, updateTaskContent } =
    useContext(TasksContext);

  const [beingRemoved, setBeingRemoved] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(task.checked);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const waitForAnimationAndRemove = (id: string) => {
    setTimeout(() => {
      removeTask(id);
    }, 250);
  };

  const handleRemoveTask = (id: string) => {
    setBeingRemoved(id);
    waitForAnimationAndRemove(id);
  };

  const handleUpdateDate = (task: TaskProps, date: Date) => {
    setIsSelectingDate(false);
    updateDate(task, date.toString());
  };

  const handleCheckedStatus = () => {
    setChecked(!checked);
    updateCheckedStatus(task, !checked);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateContent = (e: React.FormEvent) => {
    e.preventDefault();

    const content = inputRef.current?.value;

    if (!content) return;

    updateTaskContent(task, content);
    formRef.current?.reset();
  };

  return (
    <TaskStyles
      beingRemoved={beingRemoved === task.id}
      checked={task.checked}
      isSelectingDate={isSelectingDate}
      theme={lightTheme}
    >
      <div className="left">
        <label>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => handleCheckedStatus()}
          />
          <div className="checkbox-div" />
        </label>
        <form noValidate onSubmit={handleUpdateContent} ref={formRef}>
          <input type="text" placeholder={task.content} ref={inputRef} />
        </form>
      </div>

      <div className="right">
        <h4
          className="date"
          onClick={() => setIsSelectingDate(!isSelectingDate)}
        >{`${task.date.split(" ")[1]} ${task.date.split(" ")[2]}`}</h4>
        {isSelectingDate && (
          <Calendar
            locale="en-US"
            onClickDay={(e) => handleUpdateDate(task, e)}
          />
        )}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.25"
            y="1.25"
            width="12.5"
            height="12.5"
            rx="4.75"
            stroke={`#${task.category.color}`}
            strokeWidth="2.5"
          />
        </svg>

        <button onClick={() => handleRemoveTask(task.id)}>
          <img src={removeIcon} alt="" width={15} />
        </button>
      </div>
    </TaskStyles>
  );
};

export default Task;
