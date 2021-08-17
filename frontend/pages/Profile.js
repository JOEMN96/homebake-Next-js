import { useState, useEffect } from "react";
import axios from "../helpers/backendAxios";
import { useRouter } from "next/router";

function Profile(props) {
  const [profile, setProfile] = useState(undefined);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await axios.get("logout");
    router.push("/SignUp");
  };
  console.log(props);
  return (
    <div>
      {/* <h1>Hi, {profile?.name || "Anon"}</h1> */}
      <button> LogOut </button>
    </div>
  );
}

export async function getServerSideProps() {
  // try {
  //   const res = await axios.get("profile");
  //   console.log("fired");
  //   console.log(res);
  //   return { props: { res } };
  // } catch (error) {
  //   console.log(error);
  // return { redirect: { destination: "/SignUp", permanent: false } };
  //   return { props: {} };
  // }
  const res = await axios.get("profile");
  console.log(res);
  return { props: { res } };
  // if (res.status === 307 || res.status === 401) {
  //   console.log("fired");
  //   return {
  //     props: res.data,
  //   };
  // } else {
  // }
}

export default Profile;
