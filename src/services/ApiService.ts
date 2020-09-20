import { Observable, defer, from } from "rxjs";
import { API_URL } from "../config";
import { IUserResponse } from "../model/service.model";

export const logout = (): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${API_URL}/auth/logout`, {
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
      fetch(`${API_URL}/profile/${userId}`, {
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
      fetch(`${API_URL}/profile/`, {
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
      fetch(`${API_URL}/profile/${id}`, {
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
      fetch(`${API_URL}/organization/${id}`, {
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
      fetch(`${API_URL}/organization/`, {
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
      fetch(`${API_URL}/organization/${id}`, {
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
      fetch(`${API_URL}/organization/${id}`, {
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
      fetch(`${API_URL}/invite/`, {
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
      fetch(`${API_URL}/invite/update/`, {
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
      fetch(`${API_URL}/repository/github/repo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};
