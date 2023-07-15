"use client"
import React from 'react';
import "../styles/globals.css"
import AddTodo from "./component/add-todo";
import Todos from "./component/todos"
import todoStore, { nextLocalStorage } from "../store/todos"
import { Observer, observer, } from "mobx-react-lite";



const page = () => {
  return (
    <div className='text-white'>
          <AddTodo />
          <Todos store={ JSON.parse(JSON.stringify(todoStore.todoList))} />
    </div>
  );
}

export default observer(page);
