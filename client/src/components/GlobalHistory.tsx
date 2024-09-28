// https://stackoverflow.com/a/70002872/11885780
import { useNavigate } from "react-router-dom";

export const GlobalHistory = () => {
  History.navigate = useNavigate();

  return null;
};
