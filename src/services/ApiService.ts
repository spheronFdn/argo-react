import { Observable, defer, from } from "rxjs";
import { API_URL } from "../config";

export const logout = (): Observable<any[]> => {
  return defer(() => {
    return from<Promise<any[]>>(
      fetch(`${API_URL}/auth/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }).then((res) => res.json()),
    );
  });
};

export const postUser = (user: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${API_URL}/users/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(user),
      }),
    );
  });
};
