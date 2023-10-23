import Photos from "@/app/components/Photos/Photos";
import Search from "@/app/components/Search/Search";
import "./style.css";

export default function MainPage() {
  return (
    <div className="main-page">
      <Search />
      <Photos />
    </div>
  );
}
