
import React from "react";

const ResizeHandles: React.FC = () => {
  return (
    <>
      <div className="resize-handle-n resize-handle"></div>
      <div className="resize-handle-e resize-handle"></div>
      <div className="resize-handle-s resize-handle"></div>
      <div className="resize-handle-w resize-handle"></div>
      <div className="resize-handle-ne resize-handle"></div>
      <div className="resize-handle-se resize-handle"></div>
      <div className="resize-handle-sw resize-handle"></div>
      <div className="resize-handle-nw resize-handle"></div>
    </>
  );
};

export default ResizeHandles;
