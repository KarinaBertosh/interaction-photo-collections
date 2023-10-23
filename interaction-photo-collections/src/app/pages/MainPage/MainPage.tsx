import Collections from "@/app/components/Collections/Collection";
import "./style.css";
import Search from "@/app/components/Search/Search";

export default function MainPage() {
  return (
    <div className="main-page">
      <Search />
      <Collections/>
    </div>
  );
}
