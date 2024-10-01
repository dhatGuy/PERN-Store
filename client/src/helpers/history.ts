import { Location, NavigateFunction } from "react-router-dom";

const history = {
  navigate: null,
  location: null,
} as {
  navigate: NavigateFunction | null;
  location: Location | null;
};

export default history;
