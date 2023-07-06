import Enroll from "@/components/enroll/Enroll";
import Layout from "@/components/layout/Layout";
import React, { useState } from "react";

const Profile: React.FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Layout>
        <div className="app-container">
          <Enroll />
        </div>
      </Layout>
    </>
  );
};

export default Profile;
