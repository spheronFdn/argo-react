import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { ActionContext, StateContext } from "../../hooks";
import { IActionModel, IStateModel } from "../../model/hooks.model";
import { Web3Service } from "../../services";
import "./WalletRecharge.scss";

const RootHeader = React.lazy(() => import("../_SharedComponents/RootHeader"));

function WalletRecharge() {
  const history = useHistory();
  const { fetchUser } = useContext<IActionModel>(ActionContext);
  const { selectedOrg, orgLoading } = useContext<IStateModel>(StateContext);

  const [wallet, setWallet] = useState<string>("");
  const [walletBal, setWalletBal] = useState<number>(0);
  const [walletApproval, setWalletApproval] = useState<number>(0);
  const [rechargeAmount, setRechargeAmount] = useState<string>("");
  const [walletLoader, setWalletLoader] = useState<boolean>(false);
  const [rechargeLoader, setRechargeLoader] = useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const [orgWallet, setOrgWallet] = useState<string>("");
  const componentIsMounted = useRef(true);

  useEffect(() => {
    if (selectedOrg && !orgLoading) {
      setWalletLoading(true);
      if (componentIsMounted.current) {
        setOrgWallet(selectedOrg.wallet.address);
        setWalletLoading(false);
      }
    } else {
      if (orgLoading) {
        setWalletLoading(true);
      } else {
        setWalletLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrg, orgLoading]);

  const rechargeArGo = async () => {
    if (!wallet) {
      setWalletLoader(true);
      const wallet = await Web3Service.getAccount();
      setWallet(wallet);
      const walletBal = await Web3Service.getArgoBalance(wallet);
      const walletApproval = await Web3Service.getArgoAllowances(wallet);
      setWalletBal(walletBal);
      setWalletApproval(walletApproval);
      setWalletLoader(false);
    } else {
      setRechargeLoader(true);
      await Web3Service.giveAllowance(rechargeAmount);
      setRechargeLoader(false);
      fetchUser();
      history.goBack();
    }
  };

  const refreshWallet = async () => {
    setWalletLoader(true);
    const wallet = await Web3Service.getCurrentAccount();
    const walletBal = await Web3Service.getArgoBalance(wallet);
    const walletApproval = await Web3Service.getArgoAllowances(wallet);
    setWallet(wallet);
    setWalletBal(walletBal);
    setWalletApproval(walletApproval);
    setWalletLoader(false);
  };

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
      Web3Service.disconnect();
    };
  }, []);

  const rechargeDisable =
    rechargeLoader || wallet ? !rechargeAmount || wallet !== orgWallet : false;

  return (
    <div className="WalletRecharge">
      <RootHeader parent={"CreateOrg"} />
      <main className="app-main">
        <div className="wallet-recharge-container">
          <div className="wallet-recharge-card">
            <div className="wallet-recharge-card-inner">
              <h1 className="wallet-recharge-title">Increase Allowance</h1>
              <div className="wallet-recharge-form">
                <label className="wallet-recharge-form-title">Your wallet</label>
                <label className="wallet-recharge-form-subtitle">
                  Please approve $ARGO tokens to our Payment smart contract.
                </label>
                <label className="wallet-recharge-form-subtitle">
                  To start deploying your application, minimum allowance required is
                  50 $ARGO.
                </label>
                <div className="current-wallet-details">
                  <div className="current-wallet-details-title">Owner Address:</div>
                  <div className="current-wallet-details-desc">
                    {!walletLoading ? (
                      `${orgWallet}`
                    ) : (
                      <Skeleton width={150} duration={2} />
                    )}
                  </div>
                </div>
              </div>
              {wallet && (
                <>
                  <div className="wallet-recharge-form">
                    <div className="wallet-recharge-form-title-container">
                      <label className="wallet-recharge-form-title">
                        Wallet Details
                      </label>
                      <div className="refresh-control" onClick={refreshWallet}>
                        <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
                      </div>
                    </div>
                    <div className="wallet-details-container">
                      <div className="wallet-details-items">
                        <div className="wallet-details-item-title">
                          Wallet Address
                        </div>
                        <div className="wallet-details-item-desc">
                          {!walletLoader ? (
                            wallet
                          ) : (
                            <Skeleton width={300} duration={2} />
                          )}
                        </div>
                      </div>
                      <div className="wallet-details-items">
                        <div className="wallet-details-item-title">ARGO Balance</div>
                        <div className="wallet-details-item-desc">
                          {!walletLoader ? (
                            `${walletBal} $ARGO`
                          ) : (
                            <Skeleton width={150} duration={2} />
                          )}
                        </div>
                      </div>
                      <div className="wallet-details-items">
                        <div className="wallet-details-item-title">
                          ARGO Allowance
                        </div>
                        <div className="wallet-details-item-desc">
                          {!walletLoader ? (
                            `${walletApproval} $ARGO`
                          ) : (
                            <Skeleton width={150} duration={2} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wallet-recharge-form">
                    <label className="wallet-recharge-form-title">
                      Approval Amount
                    </label>
                    <label className="wallet-recharge-form-subtitle">
                      Please provide the approval amount.
                    </label>
                    <input
                      type="number"
                      className="wallet-recharge-form-input"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                    />
                  </div>
                </>
              )}
              {wallet && wallet !== orgWallet ? (
                <div className="note-container">
                  Note: only owner can increase the allowance amount
                </div>
              ) : null}
              <div className="button-container">
                <button
                  type="button"
                  className="primary-button"
                  disabled={rechargeDisable}
                  onClick={rechargeArGo}
                >
                  {rechargeLoader && (
                    <BounceLoader size={20} color={"#fff"} loading={true} />
                  )}
                  {!wallet ? "Connect" : "Approve"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={(e) => history.goBack()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletRecharge;
