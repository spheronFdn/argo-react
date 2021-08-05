import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({
  onClick,
  selected,
  title,
  itemId,
}: {
  disabled?: boolean;
  onClick: Function;
  selected: boolean;
  title: string;
  itemId: string;
}) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      className="nft-card"
      onClick={() => onClick(visibility)}
      //   onKeyDown={(ev) => {
      //     if (ev.code === "Enter") {
      //       onClick(visibility);
      //     }
      //   }}
      role="button"
      tabIndex={0}
    >
      <div className="card">
        {/* <div>{title}</div> */}
        <div>
          <img
            className="nft-img"
            src="https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png"
            alt="NFT Image"
          />
        </div>
        <div className="nft-name">NFT Name</div>
        <div className="nft-desc">Description: This space will contain the description of the above nft which is visible on the screen.</div>
        {/* <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div> */}
        {/* <div>selected: {JSON.stringify(!!selected)}</div> */}
      </div>
      {/* <div
        style={{
          backgroundColor: selected ? "green" : "bisque",
          height: "200px",
        }}
      /> */}
    </div>
  );
}
