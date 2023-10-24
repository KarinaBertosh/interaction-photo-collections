"use client";
import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";


const CLIENT_ID = "k4mKUfSFl2sc60DA18XI5fnXlZw0LwFqSi8W9SATfAc";
const unsplash = createApi({ accessKey: `${CLIENT_ID}` });


export default function Photos() {
  const [photos, setPhotos] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    unsplash.photos.list({}).then((result) => {
      setPhotos(result.response?.results);
    });
  }, []);

  useEffect(() => {
    unsplash.photos.list({ page: currentPage }).then((result) => {
      setPhotos(result.response?.results);
    });
  }, [currentPage]);

  const increasePage = () => {
    if (currentPage === pages[pages.length - 1]) {
      const newPagePagination = [...pages, pages[pages.length - 1] + 1];
      newPagePagination.shift();
      setPages(newPagePagination);
    }
  };

  const reducePage = () => {
    if (currentPage === pages[0] && currentPage !== 1) {
      const newPagePagination = [...pages];
      newPagePagination.pop();
      newPagePagination.unshift(newPagePagination[0] - 1);
      setPages(newPagePagination);
    }
  };

  const handling = (value: boolean) => {
    if (value) {
      setCurrentPage(currentPage + 1);
      increasePage();
    } else if (!value && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      reducePage();
    }
  };


  return (
    <div className="photos">
      <div>
        {photos.map(({ urls: { regular } }: any) => (
          <img
            key={regular}
            src={regular}
            alt={regular}
            className="photos__photo"
          />
        ))}
      </div>
      <nav aria-label="Exam">
        <ul className="pagination ">
          <li className="page-item"><a className="page-link" href="#" onClick={() => handling(false)} >Last</a></li>
          {pages.map((num: number) => (
            <li key={num} className="page-item"><a className={`${currentPage === num ? "page-link active-page" : 'page-link'}`} href="#" onClick={() => setCurrentPage(num)}>{num}</a></li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={() => handling(true)} >Next</a></li>
        </ul>
      </nav>
    </div >
  );
}
