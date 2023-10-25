"use-client";
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { categories, unsplash } from '@/utils/common';
import Search from '@/components/Search/Search';
import Pagination from '@/components/Pagination/Pagination';

const inter = Inter({ subsets: ['latin'] });
export const getCurrentUser = () => localStorage.getItem('currentUser') 

export default function Main() {
  const [photos, setPhotos] = useState<any>([]);
  const [query, setQuery] = useState<string>('');
  const [isLogIn, setIsLogIn] = useState<boolean>(false);


  useEffect(() => {
    unsplash.photos.list({ perPage: 30 }).then((result) => {
      setPhotos(result.response?.results);
    });
    getCurrentUser() ? setIsLogIn(!isLogIn) : setIsLogIn(isLogIn);
  }, []);

  useEffect(() => {
    if (query !== '') {
      unsplash.search.getPhotos({
        query: query,
        perPage: 30
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

  const addPhotoToFavs = (url: string) => {
    const currentEmail = getCurrentUser();
    if(currentEmail) {
      const value = localStorage.getItem(currentEmail)
      if(value) {
        const newData = JSON.parse(value);
        newData['favoritePhotos'].push(url)
        localStorage[currentEmail] = JSON.stringify(newData)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Photos</title>
      </Head>
      <div className="main-page">
        <div className={styles.header}>
          <button type="button" className="btn btn-info"><a href="/auth">Sign in </a></button>
          <button type="button" className="btn btn-info"><a href="/favs">Favorites </a></button>
        </div>
        <div className={styles.photos}>
          <Search request={searchPhotos} />


          {
            isLogIn
              ? <select className="form-select form-select-sm" style={{ marginTop: 10 }} aria-label=".form-select-sm example" defaultValue="Sort by" onChange={(e: any) => sortPhotos(e.target.value)}>
                <option disabled>Sort by</option>
                <option value="1">Popular</option>
                <option value="2">Date added</option>
              </select>
              : <div>Sorting by popularity and creation date is available only to authorized users.</div>
          }


          <select className="form-select form-select-sm" style={{ margin: '10px 0' }} aria-label=".form-select-sm example" defaultValue="Filter by category" onChange={(e: any) => setQuery(e.target.value)}>
            <option disabled>Filter by category</option>
            {categories.map((category: string) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {photos.length > 1
            ? <div className={styles.photosField}>
              {photos.map(({ urls: { regular } }: any) => (
                <div key={regular} style={{ position: 'relative' }}>
                  {isLogIn 
                  ? <img className={styles.plus} src='plus.svg' alt='plus' onClick={() => addPhotoToFavs(regular)} />
                  : <div></div>
                  }
                  <img src={regular} alt={regular} className={styles.photo} />
                </div>
              ))}
            </div>
            : <div>No matches</div>}

          <Pagination updatePhotos={updatePhotos} />
        </div >
      </div>
    </>
  );
}
