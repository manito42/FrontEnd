import React from "react";
import TypoAction from "./typoAction";

export default function About1() {
  return (
    <div className="about" id="about1">
      <div className="about-show" data-id="about1">
        <div className="about1-content">
          <div className="about-left text-white">
            <TypoAction
              text="No man lives alone."
              className="typo-action1"
              cursorView={false}
              speed={80}
            />
          </div>
          <div className="about-right">
            <TypoAction
              text="42Manito"
              className="typo-action2"
              speed={80}
              delay={80 * 3}
              cursorColor="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
