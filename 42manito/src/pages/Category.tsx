import CategoryModal from "@/components/category/CategoryModal";
import HappyDevelopAnimation from "@/components/category/HappyDevelopAnimaiton";
import PandaSingAnimation from "@/components/category/PandaSingAnimation";
import Layout from "@/components/layout/Layout";
import React, { useEffect } from "react";

const Category = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState<number>(0); //

  const onOpen = (id: number) => {
    setIsVisible(true);
    setCategoryId(id);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

  return (
    <>
      <Layout>
        <div className="app-container">
          <div className="flex flex-wrap w-full justify-center lg:justify-around items-center">
            <div>
              <HappyDevelopAnimation />
              <div className="w-full flex justify-start">
                <span
                  className="text-4xl dark:text-white text-slate-800 font-bold mt-4 hover:scale-110 hover:text-indigo-500"
                  onClick={() => {
                    onOpen(1);
                  }}
                >
                  ← Study
                </span>
              </div>
            </div>
            <div>
              <PandaSingAnimation />
              <div className="w-full flex justify-end">
                <span
                  className="text-4xl dark:text-white text-slate-800 font-bold mt-4 hover:scale-110 hover:text-indigo-500"
                  onClick={() => {
                    onOpen(2);
                  }}
                >
                  Hobby →
                </span>
              </div>
            </div>
          </div>
        </div>
        <CategoryModal
          isVisible={isVisible}
          onClose={onClose}
          categoryId={categoryId}
        />
      </Layout>
    </>
  );
};

export default Category;
