import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";

const useInfo = () => useContext(UserInfoContext);

export default useInfo;