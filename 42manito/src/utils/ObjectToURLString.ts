export const ObjectToURLString = (obj: any) => {
  let str = "";
  let count = 0;
  for (const key in obj) {
    str += count == 0 ? "?" : "&";
    str += `${key}=`;
    ++count;
    // if obj[key] is array
    let valCount = 0;
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        ++count;
        for (const value of obj[key]) {
          if (valCount != 0) str += ",";
          ++valCount;
          str += `${value}`;
        }
      } else {
        str += `${obj[key]}`;
      }
    }
  }
  return str;
};
