"use client";
import { BiSolidEdit } from "react-icons/bi";
import Modal from "react-modal";
import React from "react";
import todoStore from "../../store/todos";
import { Observer, observer } from "mobx-react-lite";
import { todoInterface } from "../../store/todos";
import { AiOutlineDelete } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";

const Todos = ({ store }: any) => {
  //modal css
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [editId, seteditId] = React.useState("");
  //modal open function
  function openModal() {
    setIsOpen(true);
  }
  //modal close function
  function closeModal() {
    setIsOpen(false);
  }
  // all todo crud function
  function deleteTodo(id: string) {
    todoStore.deleteTodo(id);
  }

  function editTodos() {
    todoStore.editTodo(todo, editId);
    closeModal();
  }

  function progessChange(id: string) {
    todoStore.progessTracker(id);
  }

  return (
    <div className="mt-[1.4rem]">
      <div className="font-bold text-center text-3xl">ALL TODOS</div>
      {/*  show incomplete todos*/}
      <div className="flex gap-5 flex-wrap mt-[1.4rem] justify-center px-[2rem] items-center">
        {store?.map((Toodos: todoInterface, idx: number) => {
          if (Toodos.completed === false) {
            return (
              <div
                className="flex flex-col gap-2 bg-white rounded-md md:basis-[30%] basis-[100%] xl:basis-[22%] p-[0.7rem]  h-[23vh] overflow-y-auto overflow-x-auto overflow-scroll 
                sm:basis-[45%] sm:h-[30vh] md:h-[30vh]"
                key={Toodos.id}
              >
                <div className="flex justify-between px-[0.5rem] ">
                  <div className="w-[60%] text-black font-bold">
                    {Toodos?.task?.title}
                  </div>
                  <AiOutlineDelete
                    color="black"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteTodo(Toodos.id);
                    }}
                  />
                  <BiSolidEdit
                    color="black"
                    onClick={() => {
                      openModal();
                      setTodo(Toodos.task.todo);
                      seteditId(Toodos.id);
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <div
                  className="text-black whitespace-normal  h-[10vh] overflow-y-auto overflow-x-auto overflow-scroll sm:h-[20vh] 
                  md:h-[20vh]"
                  id="todoScrollbar"
                >
                  {Toodos?.task?.todo}
                </div>
                <div className=" text-black flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="progress"
                    name="progress"
                    value="progress"
                    className="h-[20px] w-[20px]"
                    checked={Toodos.completed}
                    onChange={() => {
                      progessChange(Toodos.id);
                    }}
                  />
                  <span className="font-bold">Completed</span>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* modal for edit */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-[0.2rem]">
          <textarea
            className="text-black rounded-[.4rem] py-[.4rem] px-[0.8rem] outline-none"
            rows={5}
            cols={28}
            placeholder="Edit your todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="rounded-[.3rem] py-[.5rem] px-[1.5rem] border-none bg-green-500 w-[50%] flex items-center justify-center gap-2">
            {" "}
            <button
              className="font-bold"
              onClick={() => {
                editTodos();
              }}
            >
              EDIT
            </button>
          </div>
        </div>
      </Modal>

      {/*  ALL completed todos */}

      <div className="font-bold text-center text-3xl mt-5">Completed TODOS</div>
      <div className="flex gap-5 flex-wrap mt-[1.4rem] justify-center px-[2rem] items-center">
        {store.map((Toodos: todoInterface, idx: number) => {
          if (Toodos.completed === true) {
            return (
              <div
                className="flex flex-col gap-2 bg-white rounded-md  md:basis-[30%] basis-[100%] xl:basis-[22%] p-[0.7rem]  h-[23vh] overflow-y-auto overflow-x-auto overflow-scroll 
                sm:basis-[45%] sm:h-[30vh] md:h-[30vh]"
                id="todoScrollbar"
                key={Toodos.id}
              >
                <div className="flex justify-between px-[0.5rem] ">
                  <div className="w-[60%] text-black font-bold">
                    {Toodos.task.title}
                  </div>
                  <AiOutlineDelete
                    color="black"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteTodo(Toodos.id);
                    }}
                  />
                  <BiSolidEdit color="black" />
                </div>
                <div
                  className="text-black whitespace-normal h-[10vh] overflow-y-auto overflow-x-auto overflow-scroll sm:h-[20vh] 
                  md:h-[20vh] "
                  id="todoScrollbar"
                >
                  {Toodos.task.todo}
                </div>
                <div className=" text-black flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="progress"
                    name="progress"
                    value="progress"
                    className="h-[20px] w-[20px]"
                    checked={Toodos.completed}
                    onChange={() => {
                      progessChange(Toodos.id);
                    }}
                  />
                  <span className="font-bold">Completed</span>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default observer(Todos);
