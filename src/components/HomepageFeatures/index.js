import React from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { CheckCircle2, Database, Ship, Package } from 'lucide-react';

export default function HomepageFeatures() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Heading as="h2" className={styles.title}>
          Getting Started with Telemetry Harbor
        </Heading>
        
        <table className={styles.stepsTable}>
          <tbody>
            <tr>
              <td className={styles.stepCell}>
                <div className={styles.stepContent}>
                  <CheckCircle2 className={styles.checkIcon} />
                  <Heading as="h3" className={styles.stepTitle}>Step 1</Heading>
                  <Link href="/docs/getting-started/quick-start#2-create-a-harbor" className={styles.stepLink}>
                    Create Harbor →
                  </Link>
                  <p className={styles.stepDescription}>Set up your first data harbor to start collecting information. Choose a harbor type (Telemetry, GPS, or General).</p>
                </div>
              </td>
              
              <td className={styles.stepCell}>
                <div className={styles.stepContent}>
                  <CheckCircle2 className={styles.checkIcon} />
                  <Heading as="h3" className={styles.stepTitle}>Step 2</Heading>
                  <Link href="/docs/getting-started/quick-start#4-send-your-first-data-point" className={styles.stepLink}>
                    Connect Device →
                  </Link>
                  <p className={styles.stepDescription}>Generate an API key for your harbor and configure your device with the API endpoint to start sending data.</p>
                </div>
              </td>
              
              <td className={styles.stepCell}>
                <div className={styles.stepContent}>
                  <CheckCircle2 className={styles.checkIcon} />
                  <Heading as="h3" className={styles.stepTitle}>Step 3</Heading>
                  <Link href="/docs/getting-started/quick-start#5-visualize-your-data" className={styles.stepLink}>
                    Visualize →
                  </Link>
                  <p className={styles.stepDescription}>Create custom dashboards to visualize your data, set up alerts, and gain insights from your IoT data.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className={styles.section}>
        <Heading as="h2" className={styles.title}>
          Understanding the Building Blocks
        </Heading>
        <p className={styles.description}>
          Learn the key concepts that power Telemetry Harbor's flexible IoT data platform.
        </p>
        
        <table className={styles.clientsTable}>
          <tbody>
            <tr>
              <td className={styles.clientCell}>
                <div className={styles.clientContent}>
                  <div className={styles.clientIconWrapper}>
                    <Database className={styles.clientIcon} />
                  </div>
                  <Heading as="h3" className={styles.clientTitle}>Harbors</Heading>
                  <p className={styles.clientDescription}>Organize your data into logical groups for easy management and analysis. Each harbor can be configured for specific data types and volumes.</p>
                  
                </div>
              </td>
              
              <td className={styles.clientCell}>
                <div className={styles.clientContent}>
                  <div className={styles.clientIconWrapper}>
                    <Ship className={styles.clientIcon} />
                  </div>
                  <Heading as="h3" className={styles.clientTitle}>Ships</Heading>
                  <p className={styles.clientDescription}>Individual devices or data sources that send information to your harbors. Monitor and manage all your connected devices from a single interface.</p>
                  
                </div>
              </td>
              
              <td className={styles.clientCell}>
                <div className={styles.clientContent}>
                  <div className={styles.clientIconWrapper}>
                    <Package className={styles.clientIcon} />
                  </div>
                  <Heading as="h3" className={styles.clientTitle}>Cargo</Heading>
                  <p className={styles.clientDescription}>The valuable data flowing from your devices to the harbor, ready for processing and analysis. Transform raw data into actionable insights.</p>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}