import { faInfoCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
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
    try {
      if (!wallet) {
        setWalletLoader(true);
        const wallet = await Web3Service.getAccount();
        setWallet(wallet);
        if (wallet) {
          const walletBal = await Web3Service.getArgoBalance(wallet);
          const walletApproval = await Web3Service.getArgoAllowances(wallet);
          setWalletBal(walletBal);
          setWalletApproval(walletApproval);
        }
        setWalletLoader(false);
      } else {
        setRechargeLoader(true);
        await Web3Service.giveAllowance(rechargeAmount);
        setRechargeLoader(false);
        fetchUser();
        history.goBack();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setWalletLoader(false);
      setRechargeLoader(false);
      window.location.reload();
    }
  };

  const refreshWallet = async () => {
    try {
      setWalletLoader(true);
      const wallet = await Web3Service.getCurrentAccount();
      const walletBal = await Web3Service.getArgoBalance(wallet);
      const walletApproval = await Web3Service.getArgoAllowances(wallet);
      setWallet(wallet);
      setWalletBal(walletBal);
      setWalletApproval(walletApproval);
      setWalletLoader(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setWalletLoader(false);
      window.location.reload();
    }
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
              <h1 className="wallet-recharge-title">Set Allowance</h1>
              <div className="wallet-recharge-form">
                <label className="wallet-recharge-form-title">Your wallet</label>
                <label className="wallet-chain-info">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ marginRight: 7 }}
                  ></FontAwesomeIcon>
                  We currently support Matic Mumbai Testnet. Please add Matic Mumbai
                  chain in your metamask.
                </label>
                <label className="wallet-recharge-form-subtitle">
                  Please approve more than minimum $DAI tokens to our Payment Smart
                  Contract. Approval transaction is <b>Gassless</b>, no need to hold
                  $MATIC tokens for approval.
                </label>
                <label className="wallet-recharge-form-subtitle">
                  To start deploying your application, minimum allowance required is
                  20 $DAI and minimum balance required is 20 $DAI tokens.
                </label>
                <label className="wallet-recharge-form-subtitle">
                  To get <b>Matic Testnet $DAI Tokens</b>, please visit{" "}
                  <a
                    href="https://faucet.argoapp.live"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://faucet.argoapp.live
                  </a>
                  .
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
                        <div className="wallet-details-item-title">DAI Balance</div>
                        <div className="wallet-details-item-desc">
                          {!walletLoader ? (
                            `${walletBal} $DAI`
                          ) : (
                            <Skeleton width={150} duration={2} />
                          )}
                        </div>
                      </div>
                      <div className="wallet-details-items">
                        <div className="wallet-details-item-title">
                          DAI Allowance
                        </div>
                        <div className="wallet-details-item-desc">
                          {!walletLoader ? (
                            `${walletApproval} $DAI`
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
                  Note: We currently support Matic Mumbai Testnet. Only owner of this
                  wallet can increase allowance
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
