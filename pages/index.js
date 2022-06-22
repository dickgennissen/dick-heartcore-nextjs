import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getArtistsOverviewPage } from '../lib/api';

export default function Home({ content, artists }) {
  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>{content.title}</h1>
          <p className={styles.headerText}>{content.text}</p>
        </div>

        {artists.map(({ id, url, title, image, imageCredits }) => (
          <div key={id}>
            <Link href={url}>
              <a className={styles.artist}>
                <div className={styles.artistContent}>
                  <h2 className={styles.artistTitle}>{title}</h2>
                  <button className={styles.artistButton}>Check &amp;em out</button>
                </div>
                <div className={styles.artistImage}>
                  <img src={image._url} />
                </div>
                <div className={styles.artistCredits}>{imageCredits}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await getArtistsOverviewPage();
  return {
    props: { ...data }
  };
}