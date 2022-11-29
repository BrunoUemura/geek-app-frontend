import { LoaderSpinner } from "../../components/UI/Loader";
import "./styles.scss";

export function Loading() {
  return (
    <div className="loading-container">
      <LoaderSpinner />
    </div>
  );
}
