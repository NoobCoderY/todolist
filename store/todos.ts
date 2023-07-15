"use client";
import { types } from "mobx-state-tree";

export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const nextLocalStorage = (): Storage | void => {
  if (isBrowser()) {
    return window.localStorage;
  }
};

export interface todoInterface {
  id: string;
  task: {
    title: string;
    todo: string;
  };
  completed: boolean;
}

declare namespace NodeJS {
  interface Global {
    localStorage: {
      getItem: (key: string) => any;
      setItem: (key: string, value: string) => any;
    };
  }
}

export const TodoModdel = types.model("AllTodos", {
  id: types.string,
  task: types.union(
    types.model({
      title: types.string,
      todo: types.string,
    })
  ),
  completed: types.boolean,
});

const myTodosArray = types
  .model({
    todoList: types.array(TodoModdel),
  })
  .actions((self) => {
    return {
      setTodo(value: any) {
        self.todoList = value;
      },
      addTodo(value: any) {
        self.todoList.push(value);
      },
      editTodo(value: string, id: string) {
        const dummyArr = self.todoList;
        const indexno = dummyArr.findIndex((x) => x.id === id);
        dummyArr[indexno].task.todo = value;
        self.todoList = JSON.parse(JSON.stringify(dummyArr));
        localStorage.setItem("TODOSLIST", JSON.stringify(dummyArr));
      },
      deleteTodo(id: string) {
        const dummyArr = self.todoList;
        const newArr = dummyArr.filter((value) => {
          return value.id !== id;
        });
        self.todoList = JSON.parse(JSON.stringify(newArr));
        localStorage.setItem("TODOSLIST", JSON.stringify(newArr));
        },
        progessTracker(id: string) {
            const dummyArr = self.todoList;
            const indexno = dummyArr.findIndex((x) => x.id === id);
            if (dummyArr[indexno].completed === false)
            {
                dummyArr[indexno].completed=true
            }
            else {
                dummyArr[indexno].completed=false
            }
            self.todoList = JSON.parse(JSON.stringify(dummyArr));
            localStorage.setItem("TODOSLIST", JSON.stringify(dummyArr));
          
      },
      afterCreate() {
        self.todoList = nextLocalStorage()?.getItem("TODOSLIST")
          ? JSON.parse(localStorage.getItem("TODOSLIST")!)
          : [];
      },
    };
  });

const AllTodos = myTodosArray.create({
  todoList: [],
});

export default AllTodos;
