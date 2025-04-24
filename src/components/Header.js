import React from "react";

function Header({ onChangePage }) {
  return (
    <header>
      <h1>Quiz Admin</h1>
      <nav>
        <button onClick={() => onChangePage("List")}>View Questions</button>
        <button onClick={() => onChangePage("Form")}>New Question</button>
      </nav>
    </header>
  );
}

export default Header;
