import React, { useContext, useEffect, useRef, useState } from "react";
import "./Wallet.scss";
import { ActionContext, StateContext } from "../../../../hooks";
import { ApiService, Web3Service } from "../../../../services";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { IActionModel, IStateModel } from "../../../../model/hooks.model";
import BounceLoader from "react-spinners/BounceLoader";
import { IPaymentModel } from "../../../../model/payment.model";
import moment from "moment";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wallet = () => {
  const history = useHistory();
  const { userLoading, selectedOrg, orgLoading } =
    useContext<IStateModel>(StateContext);
  const { fetchUser } = useContext<IActionModel>(ActionContext);
  const [paymentsLoading, setPaymentsLoading] = useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [payments, setPayments] = useState<IPaymentModel[]>([]);
  const [orgWallet, setOrgWallet] = useState<string>("");
  const [wallet, setWallet] = useState<string>("");
  const [walletBal, setWalletBal] = useState<number>(0);
  const [argoAllowance, setArgoAllowance] = useState<number>(-1);
  const [walletLoader, setWalletLoader] = useState<boolean>(false);
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [removalLoader, setRemovalLoader] = useState<boolean>(false);

  const componentIsMounted = useRef(true);

  const isWalletPresent = !!selectedOrg?.wallet;

  useEffect(() => {
    if (selectedOrg && !orgLoading) {
      setPaymentsLoading(true);
      setWalletLoading(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (componentIsMounted.current) {
        setOrgWallet(selectedOrg.wallet ? selectedOrg.wallet.address : "");
        setWalletLoading(false);
        setPayments(selectedOrg.payments || []);
        setPaymentsLoading(false);
      }
    } else {
      if (orgLoading) {
        setPaymentsLoading(true);
        setWalletLoading(true);
      } else {
        setPaymentsLoading(false);
        setWalletLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrg, orgLoading]);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
      Web3Service.disconnect();
    };
  }, []);

  const connectWallet = async () => {
    setWalletLoader(true);
    const wallet = await Web3Service.getAccount();
    setWallet(wallet);
    let walletBal = 0;
    try {
      walletBal = await Web3Service.getArgoBalance(wallet);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setWalletBal(walletBal);
    setWalletLoader(false);
  };

  const checkAllowance = async () => {
    setWalletLoader(true);
    await Web3Service.getAccount();
    let walletApproval = 0;
    try {
      walletApproval = await Web3Service.getArgoAllowances(orgWallet);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setArgoAllowance(walletApproval);
    setWalletLoader(false);
  };

  const enableWallet = async () => {
    setEnableLoader(true);
    const walletBody = {
      address: wallet,
      orgId: selectedOrg?._id,
    };
    ApiService.enableWallet(walletBody).subscribe((res) => {
      if (componentIsMounted.current) {
        setEnableLoader(false);
        fetchUser();
      }
    });
  };

  const removeWallet = async () => {
    setRemovalLoader(true);
    await Web3Service.getAccount();
    try {
      const signature = await Web3Service.signRemoveWallet();
      const removeBody = {
        id: selectedOrg?.wallet._id,
        signature,
      };
      ApiService.removeWallet(removeBody).subscribe((res) => {
        if (componentIsMounted.current) {
          setRemovalLoader(false);
          fetchUser();
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setRemovalLoader(false);
    }
  };
  const showProtocolPrice = (protocol: string) => {
    switch (protocol) {
      case "arweave":
        return "AR";
      case "skynet":
        return "SIA";

      default:
    }
  };

  return (
    <div className="Wallet">
      <div className="wallet-container">
        <div className="wallet-details">
          <div className="wallet-header">
            <span>Organisation Wallet</span>
          </div>
          <div className="wallet-body">
            {!isWalletPresent && !walletLoading ? (
              <>
                <div className="wallet-subtitle">
                  Enable your wallet for <b>{selectedOrg?.profile.name}</b>
                </div>
                <div className="wallet-info">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ marginRight: 7 }}
                  ></FontAwesomeIcon>
                  We currently support Matic Mumbai Testnet. Please add Matic Mumbai
                  chain in your metamask.
                </div>
                {!wallet ? (
                  <button
                    type="button"
                    className="primary-button"
                    disabled={userLoading}
                    onClick={connectWallet}
                  >
                    Connect
                  </button>
                ) : (
                  <div className="wallet-recharge-form">
                    <label className="wallet-recharge-form-title">
                      Wallet Details
                    </label>
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
                    </div>
                    <div className="wallet-details-button">
                      <button
                        type="button"
                        className="primary-button"
                        disabled={enableLoader}
                        onClick={enableWallet}
                      >
                        {enableLoader && (
                          <BounceLoader size={20} color={"#fff"} loading={true} />
                        )}
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="wallet-body-header">
                  <div>
                    <div className="wallet-body-title">Wallet Details</div>
                    <div className="wallet-note">
                      Note: Only owner of this wallet can increase allowance
                    </div>
                  </div>
                  <div className="button-container">
                    {!walletLoading && (
                      <>
                        <button
                          type="button"
                          className="primary-button remove-button"
                          disabled={walletLoading}
                          onClick={removeWallet}
                        >
                          {removalLoader && (
                            <BounceLoader size={20} color={"#fff"} loading={true} />
                          )}
                          Remove
                        </button>
                        <button
                          type="button"
                          className="primary-button recharge-button"
                          disabled={walletLoading}
                          onClick={() => history.push("/wallet/recharge")}
                        >
                          Set Allowance
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="wallet-details-body">
                  <div className="wallet-details-item">
                    <label>Address</label>
                    <span>
                      {!walletLoading ? (
                        `${orgWallet}`
                      ) : (
                        <Skeleton width={150} duration={2} />
                      )}
                    </span>
                  </div>
                  <div className="wallet-details-item">
                    <label>Allowance</label>
                    <span>
                      {!walletLoading ? (
                        <div>
                          {argoAllowance === -1 ? (
                            <button
                              type="button"
                              className="primary-button"
                              disabled={walletLoader}
                              onClick={checkAllowance}
                            >
                              {walletLoader && (
                                <BounceLoader
                                  size={20}
                                  color={"#fff"}
                                  loading={true}
                                />
                              )}
                              Check Allowance
                            </button>
                          ) : (
                            `${argoAllowance} $DAI`
                          )}
                        </div>
                      ) : (
                        <Skeleton width={150} duration={2} />
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="payment-details">
          <div className="payment-header">
            <span>Payments</span>
          </div>
          <div className="payment-body">
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th">Project Name</div>
                  <div className="th">Deployment Id</div>
                  <div className="th">Build Time</div>
                  <div className="th">Upload Fee</div>
                  <div className="th">Amount</div>
                  <div className="th">Date</div>
                </div>
              </div>
              {!paymentsLoading ? (
                <div className="tbody">
                  {payments.length > 0 ? (
                    payments.map((payment: IPaymentModel, index: number) => (
                      <div className="tr" key={index}>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">{payment?.projectName}</div>
                          </div>
                        </div>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">{payment?.deploymentId}</div>
                          </div>
                        </div>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">{payment?.buildTime} s</div>
                          </div>
                        </div>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">
                              {payment?.providerFee}{" "}
                              {showProtocolPrice(payment?.protocol)}
                            </div>
                          </div>
                        </div>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">
                              {payment?.finalArgoFee.toFixed(3)} $DAI
                            </div>
                          </div>
                        </div>
                        <div className="td">
                          <div className="user-container">
                            <div className="user-text">
                              {moment(payment?.createdAt).format(
                                "DD-MM-YYYY hh:mm A",
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="tr tr-center">No payments to show</div>
                  )}
                </div>
              ) : (
                <div className="tbody">
                  <div className="tr">
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={80} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={90} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={80} duration={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr">
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={80} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={90} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={50} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-text">
                          <Skeleton width={80} duration={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
