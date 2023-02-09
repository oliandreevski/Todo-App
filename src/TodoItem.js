import React, { useEffect, useState } from "react";
import { useStore } from "./store/store";
import TimeAgo from "./TimeAgo";

import { toast, Toaster } from "react-hot-toast";

const TodoItem = ({ id, value, dateEdited, dateCreated, completed }) => {
  const editTodo = useStore((state) => state.editTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const toggleCompleted = useStore((state) => state.toggleCompleted);
  const [onEdit, setOnEdit] = useState(false);
  const [inputText, setInputText] = useState(value);
  useEffect(() => {
    setInputText(value);
  }, [value]);

  const onAdd = () => {
    editTodo(id, inputText);
    setOnEdit(false);
    toast(`ToDo Updated from ${value} to ${inputText}`, {
      duration: 6000,
      icon: `📝`,
      style: { background: "#5A72D2", color: "white" },
    });
  };

  const onCancel = () => {
    setInputText(value);
    setOnEdit(false);
  };

  const onDelete = (id) => {
    toast.error(`ToDo ${inputText} Successfully deleted`);
    deleteTodo(id);
  };

  return (
    <div className="todo--item">
      <input
        type="checkbox"
        className="checkbox"
        id={id}
        name={id}
        chacked={completed ? 1 : 0}
        onChange={() => toggleCompleted(id)}
      />
      <div className="editable--text">
        {!onEdit ? (
          <>
            <div className="editable--text--child">{value}</div>
            <div>
              <TimeAgo timestamp={dateCreated} />
              <TimeAgo timestamp={dateEdited} />
            </div>
            <div>
              <button
                className="btn edit--btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setOnEdit(true);
                }}
              >
                <i className="fa-regular fa-pen-to-square fa-2x" id="edt"></i>
              </button>
              <button className="btn delete--btn" onClick={() => onDelete(id)}>
                <i className="fa-regular fa-trash-can fa-2x" id="del"></i>
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              className="editable--input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="on--edit">
              <button className="e--btn save--btn" id="sav" onClick={onAdd}>
                Save
              </button>
              <button
                className="e--btn cancel--btn"
                id="can"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
