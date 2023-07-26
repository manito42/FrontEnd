/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";

interface CursorProps {
  cursorText?: string;
  cursorColor?: string;
}

const Cursor: React.FC<CursorProps> = ({
  cursorText = "|",
  cursorColor = "white",
}) => {
  return (
    <span
      className="cursor"
      style={{
        paddingLeft: "3px",
        color: cursorColor,
      }}
    >
      {cursorText}
    </span>
  );
};

export default Cursor;
