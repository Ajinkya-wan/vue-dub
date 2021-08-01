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
    return http.put("/code/updateEmp", data, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    });
  }

  delete(id) {
    return http.delete(`/code/delete/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    });
  }
}

// Response interceptor for API calls
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async function(error) {
    if (error.response.status === 401) {
      console.log(error, "tetst");
    }
    return Promise.reject(error);
  }
);

export default new UserService();
