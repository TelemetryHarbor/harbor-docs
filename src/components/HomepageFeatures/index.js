import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Real-time Data Visualization',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Telemetry Harbor provides powerful, real-time visualization tools for your IoT data. 
        Monitor your devices and analyze trends as they happen.
      </>
    ),
  },
  {
    title: 'Scalable Cloud Infrastructure',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Our cloud-native platform scales effortlessly with your needs. From a handful of devices 
        to millions, Telemetry Harbor grows with your IoT ecosystem.
      </>
    ),
  },
  {
    title: 'Secure Data Management',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Security is our top priority. Telemetry Harbor ensures your data is encrypted end-to-end, 
        with robust access controls and compliance with industry standards.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
