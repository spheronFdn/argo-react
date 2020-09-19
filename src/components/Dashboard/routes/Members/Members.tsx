import React, { useContext, useEffect, useState } from "react";
import "./Members.scss";
import { StateContext } from "../../../../hooks";
import { ApiService } from "../../../../services";
// import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { IUser } from "../../../../model/hooks.model";

const Members = () => {
  const history = useHistory();
  const { userLoading, selectedOrg } = useContext(StateContext);
  const [memberLoading, setMemberLoading] = useState(false);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    setMemberLoading(true);

    if (selectedOrg) {
      const subscription = ApiService.getOrganization(
        `${selectedOrg?._id}`,
      ).subscribe((data) => {
        const members = data.users.map((user: IUser) => ({
          name: user.argo_profile.name,
          email: user.argo_profile.email,
          avatar: user.argo_profile.avatar,
          username: user.argo_profile.username,
        }));
        setMembers(members);
        setMemberLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedOrg]);

  return (
    <div className="Members">
      <div className="members-container">
        <div className="members-details">
          <div className="members-header">
            <span>Organisation members</span>
            <button
              type="button"
              className="primary-button"
              disabled={userLoading}
              onClick={(e) => history.push("/dashboard/members/new")}
            >
              Add Members
            </button>
          </div>
          <div className="members-body">
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th"></div>
                  <div className="th">User</div>
                  <div className="th">Email</div>
                </div>
              </div>
              {!memberLoading ? (
                <div className="tbody">
                  {members.map((member: any, index: number) => (
                    <div className="tr" key={index}>
                      <div className="td">
                        <div className="avatar-container">
                          <img
                            src={member.avatar}
                            alt="avatar"
                            className="profile-avatar"
                          />
                        </div>
                      </div>
                      <div className="td">
                        <div className="user-container">
                          <div className="user-email">{member.name}</div>
                          <div className="user-username">{member.username}</div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="user-container">
                          <div className="user-username">
                            {member.email || "N.A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tbody">
                  <div className="tr">
                    <div className="td">
                      <div className="avatar-container">
                        <Skeleton
                          circle={true}
                          height={32}
                          width={32}
                          duration={2}
                        />
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-email">
                          <Skeleton width={150} duration={2} />
                        </div>
                        <div className="user-username">
                          <Skeleton width={100} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={100} duration={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr">
                    <div className="td">
                      <div className="avatar-container">
                        <Skeleton
                          circle={true}
                          height={32}
                          width={32}
                          duration={2}
                        />
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-email">
                          <Skeleton width={150} duration={2} />
                        </div>
                        <div className="user-username">
                          <Skeleton width={100} duration={2} />
                        </div>
                      </div>
                    </div>
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={100} duration={2} />
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

export default Members;
