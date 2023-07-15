import React from "react";
import { FcTodoList } from "react-icons/fc";

const Header = () => {
  return (
    <div className="flex  justify-center items-center">
      <span className="mt-8 mr-4">
        <FcTodoList size={25}/>
      </span>{" "}
      <div className="flex align-center text-3xl font-bold justify-center items-center text-[white] mt-6">
        TO DO LIST APP
      </div>
      <span className="mt-8 ml-4" >
        <FcTodoList  size={25}/>
      </span>
    </div>
  );
};

export default Header;
