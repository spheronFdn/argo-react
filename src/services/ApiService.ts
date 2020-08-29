import { Observable, defer, from } from "rxjs";

const ROOT_URL = "https://api.downtownstimulus.com";

export const fetchAllBusinesses = (): Observable<any[]> => {
  return defer(() => {
    return from<Promise<any[]>>(
      fetch(`${ROOT_URL}/business/`).then((res) => res.json()),
    );
  });
};

export const postUser = (user: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/users/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(user),
      }),
    );
  });
};
