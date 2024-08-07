import axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function VerifyEmailApi(id, token) {
  return axios
    .post(
      `http://localhost:3001/user/validateToken`,
      {
        id: id,
        token: token,
      },
      { headers: headers }
    )
    .then((response) => {
      return response.data.success;
    })
    .catch(function (error) {
      console.log(error);
      const { response } = error;
      return response.data;
    });
}
