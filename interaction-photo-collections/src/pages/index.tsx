import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Photos from '@/components/Photos/Photos';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  return (
    <>
      <Head>
        <title>Photos</title>
      </Head>
      <div className="main-page">
        <div className={styles.header}>
          <button type="button" className="btn btn-info"><a href="/auth">Sign in </a></button>
        </div>
        <Photos />
      </div>
    </>
  );
}
