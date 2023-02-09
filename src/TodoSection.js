import { useState } from "react";
import TodoItem from "./TodoItem";
import { useStore } from "./store/store";
import { toast, Toaster } from "react-hot-toast";
import { set } from "date-fns";

const TodoSection = () => {
  const createTodo = useStore((state) => state.createTodo);
  const todos = useStore((state) => state.todos);
  const filter = useStore((state) => state.filter);
  const filterValue = useStore((state) => state.filterValue);
  const sortByName = useStore((state) => state.sortByName);
  const sortByDateCreated = useStore((state) => state.sortByDateCreated);
  const sortByDateEdited = useStore((state) => state.sortByDateEdited);
  const clearCompleted = useStore((state) => state.clearCompleted);

  const [inputText, setInputText] = useState("");

  const handleFilter = (text) => {
    filter(text);
    toast(`Filtered ${text.toUpperCase()} Todos`);
  };

  const handleName = (e) => {
    sortByName();
    toast(`Todos Sorted by Name`);
  };
  const handleCreated = (e) => {
    sortByDateCreated();

    toast(`Todos Sorted by Creation Date`);
  };

  const handleEdited = (e) => {
    sortByDateEdited();
    toast(`Todos Sorted by Edited Date`);
  };

  const handleClear = () => {
    clearCompleted();
    toast("Deleted Completed Todos");
  };

  const filteredTodos = todos.filter((task) => {
    switch (filterValue) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <>
      {/* ========Input============== */}
      <div className="todo--input--area">
        <input
          type="text"
          className="textinput"
          placeholder="Add New Todo"
          value={inputText}
          maxLength="50"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="add--btn"
          disabled={!inputText.trim()}
          onClick={() => {
            createTodo(inputText);
            setInputText("");
            toast.success(`Sucesfully Created ToDo`);
          }}
        >
          Add
        </button>
      </div>
      <div>
        {/* ============Filters========= */}
        <div className="filters">
          <select
            className="sort--date"
            value={filterValue}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>

          <div className="sort--btns">
            <button className={`date--btn`} onClick={handleName}>
              Todo Name:
            </button>
            <button className={`date--btn`} onClick={handleCreated}>
              Date Created
            </button>
            <button className={`date--btn`} onClick={handleEdited}>
              Date Edited
            </button>
          </div>
          <button className="clear--btn" onClick={handleClear}>
            Clear Completed
          </button>
        </div>
        {/* ========== TODO List =========== */}
        <div className="todo--list">
          {filteredTodos.map((item) => {
            return (
              <div key={item.id}>
                <TodoItem
                  id={item.id}
                  value={item.value}
                  completed={item.completed}
                  dateCreated={item.dateCreated}
                  dateEdited={item.dateEdited}
                />
              </div>
            );
          })}
        </div>
        {/* ============= Custom Toasts =============*/}
        <Toaster
          position="top-right"
          containerClassName="toast"
          toastOptions={{
            duration: 5000,

            success: {
              duration: 2000,
              iconTheme: {
                primary: "white",
                secondary: "green",
              },
              style: {
                background: "#A3E296",
              },
            },
            error: {
              iconTheme: {
                primary: "white",
                secondary: "red",
              },
              duration: 2000,
              style: {
                background: "#E47878",
                color: "#fff",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default TodoSection;
