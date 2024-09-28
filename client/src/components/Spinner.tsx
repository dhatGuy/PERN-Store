import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderSizeProps } from "react-spinners/helpers/props";

const Spinner = ({
  css,
  size,
  loading,
}: {
  css?: CSSProperties;
  size?: LoaderSizeProps["size"];
  loading?: boolean;
}) => {
  return (
    <div className="absolute transform -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
      <ClipLoader cssOverride={css} size={size} color="#123abc" loading={loading} />
    </div>
  );
};

export default Spinner;
