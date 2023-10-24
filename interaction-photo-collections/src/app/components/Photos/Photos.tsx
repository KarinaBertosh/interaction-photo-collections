"use client";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { unsplash } from "@/utils/common";
import "./style.css";

export default function Photos() {
  const [photos, setPhotos] = useState<any>([]);

  useEffect(() => {
    unsplash.photos.list({}).then((result) => {
      setPhotos(result.response?.results);
    });
  }, []);

  const updateData = (value: any) => {
    setPhotos(value);
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
      <Pagination updatePhotos={updateData} />
    </div >
  );
}
