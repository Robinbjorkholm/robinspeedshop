import axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function LoginApi(
  email,
  password,

) {
  return axios
    .post(
      `http://localhost:3001/user/loginUser`,
      {
        email: email,
        password: password,
      },
      { headers: headers }
    )
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
