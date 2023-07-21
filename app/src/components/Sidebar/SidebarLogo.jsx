import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SidebarLogo({ icon, text, ...props }) {
  return (
    <div className="relative flex flex-row font-semibold text-3xl md:items-center md:mx-auto ssl mb-5 p-4 justify-between">
      <Link to="/">
        <img
          src={`FA.png`}
          alt="Logo Login"
          className="md:w-8 w-48 mx-auto display-block"
        /> {text}
      </Link>
      <button
        onClick={props.toggle}
        className="border border-emerald-300 text-xl font-medium py-2 px-4 block md:hidden absolute right-1 top-3"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default SidebarLogo;
