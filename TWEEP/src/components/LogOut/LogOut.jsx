import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLogAtom } from "../../Atom/atom";
import { useSetAtom } from "jotai";

export const LogOut = () => {
  const unLog = useSetAtom(isLogAtom);
  const navigate = useNavigate();

  useEffect(() => {
    unLog(false);
    Cookies.remove('token');

    console.log("Cookie : delete");
    navigate('/');
  }, []);

  return null;
}
