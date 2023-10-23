"use client";
import { useEffect, useState } from "react";
import './style.css'

const BASE_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "k4mKUfSFl2sc60DA18XI5fnXlZw0LwFqSi8W9SATfAc";
const QUERY = "all";
const link = `${BASE_URL}?query=${QUERY}&client_id=${CLIENT_ID}`;

export default function Collections() {
  const [collections, setCollections] = useState<any[]>([]);

  const handling = (value: boolean) => {
    value &&
      fetch(link).then((res) =>
        res.json().then((data) => setCollections(data.results))
      );
  };

  useEffect(() => {
    handling(true)
  }, [])

  return (
    <div className="collections">
      {collections.map(({ urls: { regular, row } }) => (
          <img key={row} src={regular} alt={regular} className="collections__photo"/>
      ))}
    </div>
  );
}
