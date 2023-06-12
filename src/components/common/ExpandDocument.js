import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { popupMutation } from '../../redux/mutations'

import "./ExpandDocument.scss";

const ExpandDocument = ({ driver, title, front, back }) => {
  const [docShown, setDocShown] = useState();
  const dispatch = useDispatch();
  const toggleDoc = () => {
    setDocShown(!docShown);
  };

  const downloadImage = async (url, filename) => {
    dispatch(popupMutation.popLoading());
    await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      });
    dispatch(popupMutation.clearPopPanel());
  };

  const downloadFrontImage = () => {
    downloadImage(front, `${title} - front (${driver}).jpg`);
  };

  const downloadBackImage = () => {
    downloadImage(back, `${title} - back (${driver}).jpg`);
  };

  return (
    <div className="expand-document radius-15px shadow-5px baby-blue-bg">
      <div className="expand-document--header flex-row-between pointer" onClick={toggleDoc}>
        <p className="inter white size-16px space-none text-shadow">{title}</p>
        <div className="margin-2px-V size-14px font-bold ">
          <i className={`bi bi-chevron-${docShown ? "up" : "down"} white `} />
        </div>
      </div>
      {docShown && (
        <div className="expand-document--body full-width flex-row-center flex-wrap">
          <div className="white flex-col-center expand-document--body--img">
            <div className="flex-row-between margin-4px-V full-width">
              Front
              <div className="expand-document--download-btn flex-row-center white-bg baby-blue radius-circular pointer" onClick={downloadFrontImage}>
                <i className="bi bi-download size-14px" />
                <div className='expand-document--download-btn--tag white inter size-12px radius-5px shadow-5px'>
                  Download
                </div>
              </div>
            </div>
            <img src={`${front}`} alt={`front`} />
          </div>

          <div className="white flex-col-center expand-document--body--img">
            <div className="flex-row-between margin-4px-V full-width">
              Back
              <div className="expand-document--download-btn flex-row-center white-bg baby-blue radius-circular pointer" onClick={downloadBackImage}>
                <i className="bi bi-download size-14px" />
                <div className='expand-document--download-btn--tag white inter size-12px radius-5px shadow-5px'>
                  Download
                </div>
              </div>
            </div>
            <img src={`${back}`} alt={`back`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandDocument;
