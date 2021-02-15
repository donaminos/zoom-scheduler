import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Calendar } from "../src/components/Calendar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zoom scheduler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Zoom scheduler</h1>
        <Calendar />
      </main>
    </div>
  );
}
