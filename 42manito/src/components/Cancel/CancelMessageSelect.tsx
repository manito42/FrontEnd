import { Select } from "antd";
import React, {Dispatch, SetStateAction} from "react";
interface args{
  setOpenTextArea: Dispatch<SetStateAction<boolean>>;
  setCancelMsg: Dispatch<SetStateAction<string>>;
}

export default function CancelMessageSelect({setOpenTextArea, setCancelMsg} : args) {
  const defaultMsg = [
      {label: "시간이 맞지않아 취소합니다.", value: 1},
      {label: "멘토/멘티로부터 연락이 없어서 취소합니다.", value: 2},
      {label: "직접 입력", value: 3}
  ]

  const handleChange = (value: number) => {
    const msgObj = defaultMsg.find(({value: id}) => id === value);
    if (msgObj === undefined)
      setCancelMsg("");
    else
      setCancelMsg(msgObj.label);
    if (value === 3)
      setOpenTextArea(true);
    else
      setOpenTextArea(false);
  };

  return (
    <Select
        defaultValue={1}
        onChange={handleChange}
        style={{ width: "100%" }}
        options={defaultMsg}
        className="w-full max-w-[500px]"
    />
  );
}
