import 'bootstrap/dist/css/bootstrap.css';
import "./style.module.css";

interface IProp {
  request: (request: any) => void;
}

export default function Search(props: IProp) {
  return (
    <div className="row">
      <div className="col-md-5 mx-auto">
        <div className="input-group">
          <input className="form-control border-end-0 border rounded-pill" type="search" placeholder='search...' id="example-search-input" onChange={(e: any) => props.request(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}
