/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./GenerateResolverSkylink.scss";
import { SkynetClient } from "skynet-js";

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);
const dataDomain = "localhost";

const GenerateResolverSkylink = () => {
  const [mySky, setMySky] = useState<any>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);

        // load necessary DACs and permissions
        // await mySky.loadDacs(contentRecord);

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        // set react state for login status and
        // to access mySky in rest of app
        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    initMySky();

    return () => {
      handleMySkyLogout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginMySky = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    // set react state
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  };

  const handleMySkyLogout = async () => {
    /************************************************/
    /*        Step 3.4 Code goes here              */
    /************************************************/

    // call logout to globally logout of mysky
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID("");

    /*****/
  };

  return (
    <div className="GenerateResolverSkylink">
      <div className="modal-container">
        <div className="modal-body">
          <h3 className="modal-title">Generate Resolver Skylink</h3>
          <p className="modal-content">
            Resolver skylinks are a special type of skylink that enables skylinks
            whose underlying data changes. When resolver skylinks are accessed on
            Skynet, they "resolve" to other skylinks whose data is returned to the
            requester.
          </p>
          <div className="connect-container">
            <div className="seed-phrase-container">
              <input
                type="text"
                placeholder="Enter your seed phrase..."
                className="seed-text-input"
              />
            </div>
            <div className="or-text">Or</div>
            <div>
              <button className="connect-mysky-button" onClick={loginMySky}>
                Login with MySky
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateResolverSkylink;
