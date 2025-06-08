import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
   <header className={clsx('hero hero--primary', styles.heroBanner)}>
  <div className="container">
    <div className={styles.headerContent}>
      <Heading as="h1" className={styles.heroTitle}>
        {siteConfig.title}
      </Heading>
      <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      <p className={styles.heroDescription}>
        Seamlessly ingest, securely store, and powerfully visualize your IoT data. Empower your applications with real-time insights and robust data management.
      </p>
      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg" // Using Docusaurus's built-in button classes
          to="/docs/intro">
          Get Started - 5min ⏱️
        </Link>
      </div>
    </div>
  </div>
</header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Telemetry Harbor | Your IoT Data Horbor | Ingest, store, and visualize your data in seconds.  <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
