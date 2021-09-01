import React, { useContext } from "react";
// import { useState } from "react";
import "./NFT.scss";
import { NFTItem } from "./components";
import { IStateModel } from "../../../../model/hooks.model";
import { StateContext } from "../../../../hooks";
import moment from "moment";

const NFT = () => {
  // const [nftLoading, setNftLoading] = useState<boolean>(false);

  const { projectLoading, selectedProject } = useContext<IStateModel>(StateContext);
  // const { fetchProject } = useContext<IActionModel>(ActionContext);

  const sortedDeployments = projectLoading
    ? []
    : selectedProject?.deployments.sort((a, b) =>
        moment(b.createdAt).diff(moment(a.createdAt)),
      );

  return (
    <div className="deploy-container">
      <div className="nft-header">NFT</div>
      <div className="deploy-summary-item">
        {!projectLoading ? (
          (sortedDeployments ? sortedDeployments : []).map((deployment, index) => (
            <div key={index}>
              <NFTItem index={index} type="filled" deployment={deployment} />
            </div>
          ))
        ) : (
          <>
            <NFTItem index={1} type="skeleton" deployment={null} />
            <NFTItem index={2} type="skeleton" deployment={null} />
          </>
        )}
      </div>
    </div>
  );
};
export default NFT;
