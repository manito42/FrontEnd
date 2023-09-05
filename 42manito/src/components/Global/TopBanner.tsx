import React from "react";
import TypeIt from "typeit-react";

interface props {
  title: string; // title
  description: string; // description
}

export default function TopBanner({ title, description }: props) {
  return (
    <>
      <div className="top-banner-wrapper banner-default">
        <div className="top-banner-container">
          <div className="top-banner-title">
            <TypeIt
              options={{
                loop: false,
                speed: 70,
                waitUntilVisible: true,
                cursor: false,
              }}
              getBeforeInit={(instance) => {
                instance.type(title);
                return instance;
              }}
            />
          </div>
          <div className="top-banner-description">
            <TypeIt
              options={{
                loop: false,
                speed: 70,
                waitUntilVisible: true,
                cursor: false,
              }}
              getBeforeInit={(instance) => {
                instance.pause(100 * title.length).type(description);
                return instance;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
