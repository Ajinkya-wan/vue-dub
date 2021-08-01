import axios from "axios";
import router from "../Router";

const API_URL = "http://13.232.221.164:8081/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.accessToken)
          );
          localStorage.setItem(
            "username",
            JSON.stringify(response.data.username)
          );

          localStorage.setItem("email", JSON.stringify(response.data.email));

          if (localStorage.getItem("user")) {
            router.push("/dashboard");
          }
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
