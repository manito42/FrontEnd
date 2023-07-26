import { Input } from "antd";
import { useRouter } from "next/router";

const SearchInput = () => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push({
      pathname: "/Search",
      query: { query: value },
    });
  };

  return (
    <>
      <Input.Search
        className="dark:ant-btn:bg-white"
        enterButton
        onSearch={handleSearch}
        style={{ verticalAlign: "middle" }}
      />
    </>
  );
};

export default SearchInput;
