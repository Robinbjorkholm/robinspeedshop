import axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function Register(
  password,
  email,
  address,
  postalCode,
  city,
  country
) {
  return axios
    .post(
      `http://localhost:3001/user/registerUser`,
      {
        password: password,
        email: email,
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
