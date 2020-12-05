import React from "react";
import LazyLoad from "react-lazyload";

const LazyLoadedImage: React.FC<any> = (props) => {
  return (
    <LazyLoad {...props} style={{ display: props.noFlex ? "block" : "flex" }}>
      {props.children}
    </LazyLoad>
  );
};

export default LazyLoadedImage;
