import http from "../http-common";

class UserService {
  getAll() {
    return http.get("/code/getAll", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    });
  }

  create(data) {
    return http.post("/api/auth/signup", data);
  }

  update(data) {
    return http.put("/code/updateEmp", data);
  }

  delete(id) {
    return http.delete(`/code/delete/${id}`);
  }
}

export default new UserService();
