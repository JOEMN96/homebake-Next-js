import { useState, useEffect } from "react";
import axios from "../helpers/backendAxios";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/Auth/ProtectedRoutes";

const fetchProf = async () => {
  try {
    const res = await axios.get("profile");
    console.log("fired");
    console.log(res);
  } catch (error) {
    console.log(error);
    console.log(error.response);
    return { redirect: { destination: "/SignUp", permanent: false } };
  }
};

function Profile(props) {
  const [profile, setProfile] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    fetchProf();
  }, []);
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

export default Profile;
