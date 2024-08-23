import { useLoaderData } from "next";

export default function GetEmail({ params: { VerifyEmailId } }) {
  const email = useLoaderData();

  return <div>Email: {email}</div>;
}

export async function loader({ params: { VerifyEmailId } }) {
  async function fetchUserEmail() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/api/get-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            VerifyEmailId,
          }),
        }
      );
      return response.json();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const userEmail = await fetchUserEmail();
  return userEmail;
}
