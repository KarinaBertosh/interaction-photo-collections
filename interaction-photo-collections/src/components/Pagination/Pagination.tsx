"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/utils/common";
import styles from "./style.module.css";
import 'bootstrap/dist/css/bootstrap.css';

interface IProps {
  updatePhotos: (updatePhotos: any) => void;
}


export default function Pagination(props: IProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    unsplash.photos.list({ page: currentPage, perPage: 30 }).then((result) => {
      props.updatePhotos(result.response?.results);
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
    <div className={styles.pagination}>
      <nav aria-label="Exam">
        <ul className="pagination ">
          <li className="page-item"><a className="page-link" href="#" onClick={() => handling(false)} >Last</a></li>
          {pages.map((num: number) => (
            <li key={num} className="page-item"><a className={`${currentPage === num ? `page-link ${styles.active}` : 'page-link'}`} href="#" onClick={() => setCurrentPage(num)}>{num}</a></li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={() => handling(true)} >Next</a></li>
        </ul>
      </nav>
    </div >
  );
}
