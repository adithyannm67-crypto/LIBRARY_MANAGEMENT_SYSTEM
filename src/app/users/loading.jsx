import "./users.css";

import { LoaderCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="loadingPage">
      <LoaderCircle size={50} className="spinner" />
    </div>
  );
}
