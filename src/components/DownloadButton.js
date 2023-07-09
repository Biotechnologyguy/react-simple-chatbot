import React from "react";
import "./Download.css";

export default function DownloadButton({ onClick, gridApiRef  }) {
  return (
    <div>
      <button onClick={onClick} className="download-button">
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              fill="#0f0fa4"
              height="109px"
              width="109px"
              version="1.1"
              id="Capa_1"
              viewBox="-126.62 -126.62 740.24 740.24"
              xmlSpace="preserve"
              stroke="#0f0fa4"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M392.15,324.9c-5.3-5.3-13.8-5.3-19.1,0l-116,116V13.5c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v427.4l-116-116 c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l139,139c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l139-139 C397.35,338.8,397.35,330.2,392.15,324.9z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </div>
        <div className="text">Download</div>
      </button>
    </div>
  );
}
