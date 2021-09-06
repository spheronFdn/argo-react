import React, { useContext, useEffect, useRef, useState } from "react";
import "./Members.scss";
import { ActionContext, StateContext } from "../../../../hooks";
// import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  IActionModel,
  IStateModel,
  IUser,
  IUserInvite,
} from "../../../../model/hooks.model";
import { IInviteMemberModel, IMemberModel } from "../../../../model/member.model";
import { LazyLoadedImage } from "../../../_SharedComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "../../../../services";

const Members = () => {
  const history = useHistory();
  const { userLoading, selectedOrg, orgLoading } =
    useContext<IStateModel>(StateContext);
  const { setOrgLoading } = useContext<IActionModel>(ActionContext);
  const [memberLoading, setMemberLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<IMemberModel[]>([]);
  const [invitedMembers, setInvitedMembers] = useState<IInviteMemberModel[]>([]);
  // const [memberDeleted, setMemberDeleted] = useState<boolean>();

  const componentIsMounted = useRef(true);

  useEffect(() => {
    if (selectedOrg && !orgLoading) {
      if (componentIsMounted.current) {
        const members: IMemberModel[] = selectedOrg.users.map((user: IUser) => ({
          name: user.argoProfile.name,
          email: user.argoProfile.email,
          avatar: user.argoProfile.avatar,
          username: user.argoProfile.username,
          id: user._id,
        }));
        const invitedMembers: IInviteMemberModel[] = selectedOrg.invitedMembers.map(
          (index: IUserInvite) => ({
            email: index.userEmail,
            status: index.status,
            link: index.link,
            id: index._id,
          }),
        );
        setInvitedMembers(invitedMembers);
        setMembers(members);
        setMemberLoading(false);
      }
    } else {
      if (orgLoading) {
        setMemberLoading(true);
      } else {
        setMemberLoading(false);
      }
    }
  }, [selectedOrg, orgLoading]);

  const deleteInvitedUser = (userId: string) => {
    setOrgLoading(true);
    ApiService.deleteInvite(userId).subscribe((result) => {
      if (result.success) {
        // setMemberDeleted(true);
        setOrgLoading(false);
      } else {
        setOrgLoading(false);
      }
    });
  };

  // useEffect(() => {
  //   if (selectedOrg) {
  //     ApiService.getInviteList(selectedOrg._id).subscribe((res) => {
  //       if (componentIsMounted.current) {
  //         const invitedList: any[] = res.invitedUser.map((user: any) => ({
  //           invitedEmail: user.userEmail,
  //           invitedStatus: user.status,
  //           invitedLink: user.link,
  //         }));
  //         setInvitedMember(invitedList);
  //       }
  //     });
  //   }
  // }, [selectedOrg]);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return (
    <div className="Members">
      <div className="members-container">
        <div className="members-details">
          <div className="members-header">
            <span>Organisation members</span>
            <button
              type="button"
              className="primary-button"
              disabled={userLoading && orgLoading}
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
                  <div className="th"></div>
                </div>
              </div>
              {!memberLoading ? (
                <div className="tbody">
                  {members.map((member: IMemberModel, index: number) => (
                    <div className="tr" key={index}>
                      <div className="td">
                        <div className="avatar-container">
                          <LazyLoadedImage height={32} once>
                            <img
                              src={member.avatar}
                              alt="avatar"
                              className="profile-avatar"
                              height={32}
                              width={32}
                              loading="lazy"
                            />
                          </LazyLoadedImage>
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
                      <div className="td">
                        <div className="user-container">
                          <div className="trash-icon-container">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="trash-icon"
                              onClick={() => deleteInvitedUser(member.id)}
                            ></FontAwesomeIcon>
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
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={20} duration={2} />
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
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={20} duration={2} />
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
      <div className="members-container">
        <div className="members-details">
          <div className="members-header">
            <span>Invited members</span>
          </div>
          <div className="members-body">
            <div className="invite-table">
              <div className="thead">
                <div className="tr">
                  <div className="th">Invited user</div>
                  <div className="th">Status</div>
                  <div className="th"></div>
                </div>
              </div>
              {!memberLoading ? (
                <div className="tbody">
                  {invitedMembers.map((member: IInviteMemberModel, index: any) => (
                    <div className="tr" key={index}>
                      <div className="td">
                        <div className="user-container">
                          <div className="user-email">{member.email || "N.A"}</div>
                          <div className="user-username-message">
                            Awaiting user's response
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="invite-user-container">
                          <div className="invite-user-username">
                            {member.status || "N.A"}
                          </div>
                          <div className="clipboard-icon-container">
                            <FontAwesomeIcon
                              onClick={() => {
                                navigator.clipboard.writeText(member.link);
                              }}
                              icon={faClipboard}
                              className="clipboard-icon"
                            ></FontAwesomeIcon>
                          </div>
                        </div>
                      </div>
                      <div className="td">
                        <div className="user-container">
                          <div className="trash-icon-container">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="trash-icon"
                              onClick={() => deleteInvitedUser(member.id)}
                            ></FontAwesomeIcon>
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
                      <div className="user-container">
                        <div className="user-email">
                          <Skeleton width={150} duration={2} />
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
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={20} duration={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tr">
                    <div className="td">
                      <div className="user-container">
                        <div className="user-email">
                          <Skeleton width={150} duration={2} />
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
                    <div className="td">
                      <div className="user-container">
                        <div className="user-username">
                          <Skeleton width={20} duration={2} />
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
