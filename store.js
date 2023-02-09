import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { v4 as uuid } from "uuid";

const setCreateTodo = (set) => (value) => {
  set((state) => ({
    todos: [
      ...state.todos,
      {
        id: uuid(),
        value,
        completed: false,
        dateCreated: new Date().toISOString(),
        dateEdited: null,
      },
    ],
  }));
};

const setEditTodo = (set) => (id, value) => {
  set((state) => ({
    todos: [
      ...state.todos.map((items) => {
        if (items.id === id) {
          return { ...items, value, dateEdited: new Date().toISOString() };
        }
        return items;
      }),
    ],
  }));
};

const setDeleteTodo = (set) => (id) => {
  set((state) => ({
    todos: state.todos.filter((item) => item.id !== id),
  }));
};

const setToggleCompleted = (set) => (id) => {
  set((state) => ({
    todos: [
      ...state.todos.map((items) => {
        if (items.id === id) {
          return { ...items, completed: !items.completed };
        }
        return items;
      }),
    ],
  }));
};

const setSortByDateCreated = (set) => () => {
  set((state) => ({
    todos: [...state.todos].sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    ),
  }));
};
const setSortByDateEdited = (set) => () => {
  set((state) => ({
    todos: [...state.todos].sort(
      (a, b) => new Date(b.dateEdited) - new Date(a.dateEdited)
    ),
  }));
};

const setFilter = (set) => (value) => {
  set((state) => ({
    filterValue: (state.filterValue = value),
  }));
};

const setSortByName = (set) => () => {
  set((state) => ({
    todos: [...state.todos.sort((a, b) => a.value.localeCompare(b.value))],
  }));
};

const setClearCompleted = (set) => () => {
  set((state) => ({
    todos: [...state.todos.filter((task) => !task.completed)],
  }));
};

export const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        filterValue: "all",
        createTodo: setCreateTodo(set, get),
        editTodo: setEditTodo(set, get),
        deleteTodo: setDeleteTodo(set, get),
        toggleCompleted: setToggleCompleted(set, get),
        filter: setFilter(set, get),
        sortByDateCreated: setSortByDateCreated(set, get),
        sortByDateEdited: setSortByDateEdited(set, get),
        clearCompleted: setClearCompleted(set, get),
        sortByName: setSortByName(set, get),
      }),
      {
        name: "todos-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
