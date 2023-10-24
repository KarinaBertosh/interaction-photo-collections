"use client";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { categories, unsplash } from "@/utils/common";
import Search from "../Search/Search";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";


export default function Photos() {
  const [photos, setPhotos] = useState<any>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    unsplash.photos.list({}).then((result) => {
      setPhotos(result.response?.results);
    });
  }, []);

  useEffect(() => {
    if (query !== '') {
      unsplash.search.getPhotos({
        query: query
      }).then((result) => { 
        setPhotos(result?.response?.results);
      });
    }
  }, [query]);

  const sortPhotos = (value: string) => {
    const currentPhotos = [...photos];
    if (value === '1') {
      setPhotos(currentPhotos.sort((current: any, next: any) => current.current_user_collections.like < next.current_user_collections.likes ? 1 : -1));
    }
    else if (value === '2') {
      setPhotos(currentPhotos.sort((current: any, next: any) => new Date(current.created_at) < new Date(next.created_at) ? 1 : -1));
    }
  };

  const updatePhotos = (value: any) => setPhotos(value);
  const searchPhotos = (value: any) => setQuery(value);


  return (
    <div className="photos">
      <Search request={searchPhotos} />

      <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue="Sort by" onChange={(e: any) => sortPhotos(e.target.value)}>
        <option disabled>Sort by</option>
        <option value="1">Popular</option>
        <option value="2">Date added</option>
      </select>

      <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue="Filter by category" onChange={(e: any) => setQuery(e.target.value)}>
        <option disabled>Filter by category</option>
        {categories.map((category: string) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {photos.length > 1
        ? <div>
          {photos.map(({ urls: { regular } }: any) => (
            <img
              key={regular}
              src={regular}
              alt={regular}
              className="photos__photo"
            />
          ))}
        </div>
        : <div>No matches</div>}

      <Pagination updatePhotos={updatePhotos} />
    </div >
  );
}
