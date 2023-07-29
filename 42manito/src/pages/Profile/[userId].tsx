import dynamic from "next/dynamic";

const UserProfile = dynamic(() => import("@/components/Profile/UserProfile"), {
  ssr: false,
});

const Profile = () => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export default Profile;
