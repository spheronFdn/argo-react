import { Observable, defer, from } from "rxjs";
import config from "../config";
import { IUserResponse } from "../model/service.model";

export const logout = (): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/auth/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const fetchUser = (userId: string): Observable<IUserResponse> => {
  return defer(() => {
    return from<Promise<IUserResponse>>(
      fetch(`${config.urls.API_URL}/profile/${userId}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const updateProfile = (user: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/profile/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(user),
      }).then((res) => res.json()),
    );
  });
};

export const deleteProfile = (id: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/profile/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const getOrganization = (id: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/organization/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const createOrganization = (organization: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/organization/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "POST",
        body: JSON.stringify(organization),
      }).then((res) => res.json()),
    );
  });
};

export const updateOrganization = (id: string, org: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/organization/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(org),
      }).then((res) => res.json()),
    );
  });
};

export const deleteOrganization = (id: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/organization/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const sendMemberInvite = (invite: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/invite/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "POST",
        body: JSON.stringify(invite),
      }).then((res) => res.json()),
    );
  });
};

export const updateInvite = (inviteReply: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/invite/update/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "POST",
        body: JSON.stringify(inviteReply),
      }).then((res) => res.json()),
    );
  });
};

export const getAllRepos = (): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/repository/github/repo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const startDeployment = (deployment: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/logs/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "POST",
        body: JSON.stringify(deployment),
      }).then((res) => res.json()),
    );
  });
};

export const getAllProjects = (orgId: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/organization/${orgId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const getProject = (projectId: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/repository/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const getDeployment = (deploymentId: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/logs/${deploymentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const updateProject = (id: string, project: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/repository/${id}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(project),
      }).then((res) => res.json()),
    );
  });
};

export const rechargeWallet = (recharge: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/profile/wallet/balance`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(recharge),
      }).then((res) => res.json()),
    );
  });
};

export const updateWalletAddress = (address: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${config.urls.API_URL}/profile/wallet/address`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(address),
      }).then((res) => res.json()),
    );
  });
};
