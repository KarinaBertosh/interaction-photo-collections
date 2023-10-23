"use client";
import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import "./style.css";


const CLIENT_ID = "k4mKUfSFl2sc60DA18XI5fnXlZw0LwFqSi8W9SATfAc";
const unsplash = createApi({ accessKey: `${CLIENT_ID}` });


export default function Photos() {
  const [photos, setPhotos] = useState<any>([]);

  useEffect(() => {
    unsplash.photos.list({}).then((result) => {
      setPhotos(result.response?.results);
    });
  }, []);

  return (
    <div className="photos">
      {photos.map(({ urls: { regular } }: any) => (
        <img
          key={regular}
          src={regular}
          alt={regular}
          className="photos__photo"
        />
      ))}
    </div>
  );
}
