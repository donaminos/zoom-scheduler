import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

import { Calendar } from "../src/components/Calendar";
import { MEETING_ENDPOINT, formatToClient } from "../src/utils/api";

export default function Home() {
  const { data, error } = useSWR(`${MEETING_ENDPOINT}`);
  const meetings = (data?.meetings || []).map(formatToClient);

  return (
    <div className={styles.container}>
      <Head>
        <title>Zoom scheduler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Zoom scheduler</h1>
        {error && <h3 style={{ color: "red" }}>Could not fetch meetings</h3>}
        {!error && !data && <h3>Loading...</h3>}
        {!error && data && <Calendar meetings={meetings} />}
      </main>
    </div>
  );
}
