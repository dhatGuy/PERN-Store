import { useParams } from "react-router-dom";

function ProductEdit() {
  const { slug } = useParams();

  return <div>{slug}</div>;
}
export default ProductEdit;
