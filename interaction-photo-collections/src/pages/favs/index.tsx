'use-client';
import { getCurrentUser } from "../index";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function FavsPage() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [isLogIn, setIsLogIn] = useState<boolean>(false);


    useEffect(() => {
        getCurrentUser() ? setIsLogIn(true) : setIsLogIn(false);

        const email = getCurrentUser();
        if (email) {
            const values = localStorage.getItem(email);
            if (values) {
                const parsedData = JSON.parse(values);
                setPhotos(parsedData.favoritePhotos);
            }
        }
        getCurrentUser() ? setIsLogIn(!isLogIn) : setIsLogIn(isLogIn);
    }, []);

    return (
        <div >
            <div className={styles.header}>
                <button type="button" className="btn btn-info"><a href="/">Go to photo</a></button>
            </div>
            {photos.length > 1 && isLogIn
                ? <div className={styles.photosField}>
                    {photos.map((url: string) => (
                        <img key={url} src={url} alt={url} className={styles.photo} />
                    ))}
                </div>
                : photos.length < 1 && isLogIn
                    ? <div>There are no featured images yet</div>
                    : <div>This feature is available to authorized users</div>}
        </div>
    );
}