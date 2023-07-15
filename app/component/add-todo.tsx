"use client";
import { FormEvent, useState } from "react";
import { CgAddR } from "react-icons/cg";
import genUniqueId from "@/helper/getUniqueId";
import todoStore from "../../store/todos"

// for use localstore property bcz by default it is not type
declare namespace NodeJS {
  interface Global {
    localStorage: {
      getItem: (key: string) => any;
      setItem: (key: string, value: string) => any;
    };
  }
}

export function AddTodo() {
  const [todo, setTodo] = useState("");
  const [title, settitle] = useState("");

  //for add todo function
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // for get unique id helper function
    const _id = genUniqueId();
    const newTodo = {
      id: _id,
      task: {
        title: title,
        todo: todo,
      },
      completed: false,
      };
      todoStore.addTodo(newTodo)
    const getLocalStorageArray = localStorage.getItem("TODOSLIST")
      ? JSON.parse(localStorage?.getItem("TODOSLIST")!)
      : []; 
    localStorage.setItem(
      "TODOSLIST",
      JSON.stringify([...getLocalStorageArray, newTodo])
    );
    setTodo("")
    settitle("")
  }

  return (
    <div className="flex justify-center items-center mt-7">
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-center items-center gap-[1rem] flex-col w-[30%]"
      >
        <input
          type="text"
          className="text-black rounded-[.4rem] py-[.4rem] px-[0.8rem] outline-none"
          placeholder="Write your title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          className="text-black rounded-[.4rem] py-[.4rem] px-[0.8rem] outline-none"
          rows={5}
          cols={28}
          placeholder="Write your todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <div className="rounded-[.3rem] py-[.8rem] px-[2rem] border-none bg-green-500 w-[40%] flex items-center justify-center gap-2">
          {" "}
          <CgAddR size={23} />{" "}
          <button type="submit" className="font-bold">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
