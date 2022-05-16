import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>在线IDE</title>
        <meta name="description" content="在线IDE，创建应用支持在线域名访问" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to online code editor.
        </h1>

        <p className={styles.description}>
        </p>

        <div className={styles.grid}>
          <a href="/manager/ContainerList" className={styles.card}>
            <h2>应用列表 &rarr;</h2>
            <p>访问管理应用</p>
          </a>

          <a href="/manager/ContainerCreate" className={styles.card}>
            <h2>创建应用 &rarr;</h2>
            <p>创建新的应用</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        Powered by next.js and dockeronde.
      </footer>
    </div>
  )
}

export default Home
