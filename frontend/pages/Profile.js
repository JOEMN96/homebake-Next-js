import { useState, useEffect } from "react";
import axios from "../helpers/backendAxios";
import { useRouter } from "next/router";

function Profile({ data }) {
  const [profile, setProfile] = useState(undefined);
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios.get("logout");
    router.push("/");
  };
  console.log(data);

  return (
    <section>
      <h2>Hi, {data.name} Welcome Back</h2>
      <p>Email: {data.email}</p>
      <button onClick={handleLogout}> LogOut </button>
    </section>
  );
}

export const getServerSideProps = async (ctx) => {
  const headers = ctx.req.headers;

  try {
    const res = await axios.get("profile", {
      headers,
    });
    return { props: { data: res.data } };
  } catch (error) {
    ctx.res.writeHeader(307, { Location: "/SignIn" });
    ctx.res.end();
    return { props: { data: null } };
  }
};

export default Profile;
