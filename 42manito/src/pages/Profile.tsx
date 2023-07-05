import Layout from "@/components/Layout";
import React, { useState } from "react";

const Profile: React.FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Layout>
        <div className="app-container">프로필 페이지</div>
      </Layout>
    </>
  );
};

export default Profile;
