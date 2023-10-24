"use client";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { unsplash } from "@/utils/common";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";

export default function Photos() {
  const [photos, setPhotos] = useState<any>([]);

  useEffect(() => {
    unsplash.photos.list({}).then((result) => {
      setPhotos(result.response?.results);
    });
  }, []);


  const updatePhotos = (value: any) => {
    setPhotos(value);
  };

  const sortPhotos = (value: string) => {
    const currentPhotos = [...photos];
    
    if (value === '1') {
      setPhotos(currentPhotos.sort((current: any, next: any) => current.current_user_collections.like < next.current_user_collections.likes ? 1 : -1));
    }

    else if (value === '2') {
      setPhotos(currentPhotos.sort((current: any, next: any) => new Date(current.created_at) < new Date(next.created_at) ? 1 : -1));
    }
  };

  return (
    <div className="photos">

      <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e: any) => sortPhotos(e.target.value)}>
        <option disabled>Sort by</option>
        <option value="1">Popular</option>
        <option value="2">Date added</option>
      </select>

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

      <Pagination updatePhotos={updatePhotos} />
    </div >
  );
}
