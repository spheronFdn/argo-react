import React, { useContext, useEffect, useState } from "react";
import "./SettingsWallet.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import { StateContext, ActionContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
import { useHistory } from "react-router-dom";

const SettingsWallet = () => {
  const history = useHistory();

  const { user, userLoading } = useContext(StateContext);
  const { fetchUser } = useContext(ActionContext);

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<string>("0");
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setWalletAddress(
        user.argo_wallet
          ? user.argo_wallet.wallet_address
            ? user.argo_wallet.wallet_address
            : ""
          : "",
      );
      setWalletBalance(
        user.argo_wallet
          ? user.argo_wallet.wallet_balance
            ? user.argo_wallet.wallet_balance.toFixed(3)
            : "0"
          : "0",
      );
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (
        (user.argo_wallet ? user.argo_wallet.wallet_address : "") !== walletAddress
      ) {
        setIsDataChanged(true);
      } else {
        setIsDataChanged(false);
      }
    }
  }, [walletAddress, user]);

  const updateWalletAddress = () => {
    setUpdateLoading(true);
    const wallet = {
      wallet_address: walletAddress,
    };
    ApiService.updateWalletAddress(wallet).subscribe((response) => {
      fetchUser();
      setUpdateLoading(false);
    });
  };

  return (
    <div className="UserSettingsGeneral">
      <div className="settings-right-container">
        <div className="settings-profile-details">
          <div className="settings-profile-header">Wallet Details</div>
          <div className="settings-profile-body">
            <div className="settings-profile-item">
              <label className="settings-profile-item-title">
                Your Wallet Address
              </label>
              <label className="settings-profile-item-subtitle">
                This is your wallet address with which you have recharged your ArGo
                wallet.
              </label>
              {!userLoading ? (
                <input
                  type="text"
                  className="settings-profile-item-input"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
            <div className="settings-profile-item">
              <div className="settings-profile-top">
                <div className="settings-profile-top-details">
                  <label className="settings-profile-item-title">
                    Your Wallet Balance
                  </label>
                  <label className="settings-profile-item-subtitle">
                    This is your wallet balance from where your deployment cost are
                    going to get cut off. Make sure you have minimum 0.1 AR balance
                    to deploy your sites.
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    className="primary-button recharge-button"
                    disabled={userLoading}
                    onClick={() => history.push("/wallet/recharge")}
                  >
                    Recharge
                  </button>
                </div>
              </div>
              {!userLoading ? (
                <div className="user-balance-container">
                  <span className="user-balance">{walletBalance}</span>
                  <span className="arweave-token">AR</span>
                </div>
              ) : (
                <Skeleton width={326} height={36} duration={2} />
              )}
            </div>
          </div>
          <div className="settings-profile-footer">
            <div className="warning-text-container">
              <span className="exclamation-icon">
                <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              </span>
              <span>Click save to update your profile</span>
            </div>
            <button
              type="button"
              className="primary-button"
              disabled={userLoading || updateLoading || !isDataChanged}
              onClick={updateWalletAddress}
            >
              {updateLoading && (
                <BounceLoader size={20} color={"#fff"} loading={true} />
              )}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWallet;
