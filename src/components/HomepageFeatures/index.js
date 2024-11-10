import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Efficient Data Ingestion',
    description: (
      <>
        Telemetry Harbor seamlessly ingests data from diverse IoT devices and sources. 
        Our platform supports multiple protocols and formats, ensuring smooth data collection 
        at any scale, from individual sensors to vast networks of connected devices.
      </>
    ),
  },
  {
    title: 'Secure and Scalable Storage',
    description: (
      <>
        Store your valuable IoT data with confidence. Telemetry Harbor offers robust, 
        cloud-native storage solutions that scale effortlessly. With end-to-end encryption 
        and flexible retention policies, your data remains safe and accessible.
      </>
    ),
  },
  {
    title: 'Powerful Data Visualization',
    description: (
      <>
        Transform raw data into actionable insights with Telemetry Harbor's advanced 
        visualization tools. Create custom dashboards, real-time monitors, and interactive 
        reports to unlock the full potential of your IoT data.
      </>
    ),
  },
];

function Feature({ title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
