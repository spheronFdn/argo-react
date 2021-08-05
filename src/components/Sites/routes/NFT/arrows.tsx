import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./NFT.scss";

function Arrow({
  children,
  disabled,
  isLeft,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  isLeft: boolean;
  onClick: VoidFunction;
}) {
  return (
    <div className={`${isLeft ? "arrow-left" : "arrow-right"}`}>
      <button
        disabled={disabled}
        className="arrow-btn"
        onClick={onClick}
        style={{
          opacity: disabled ? "0" : "1",
        }}
      >
        {children}
      </button>
    </div>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isFirstItemVisible,
  );
  // const [isLeft, setIsLeft] = React.useState(true);
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} isLeft={true} onClick={() => scrollPrev()}>
      <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible,
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} isLeft={false} onClick={() => scrollNext()}>
      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
    </Arrow>
  );
}
