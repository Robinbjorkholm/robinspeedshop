import axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function RegisterApi(
  email,
  password,
  address,
  postalCode,
  city,
  country
) {
  return axios
    .post(
      `http://localhost:3001/user/registerUser`,
      {
        email: email,
        password: password,
        address: address,
        postalCode: postalCode,
        city: city,
        country: country,
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
