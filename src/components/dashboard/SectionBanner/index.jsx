
import styles from './sectionbanner.module.scss';

export default function SectionBanner() {
    return (<>
      <div className={styles.banner}>
        <div className={styles.bannerlist}>
          <div className={styles.bannerlistitem}>
            <span>Banner 1</span>
          </div>
          <div className={styles.bannerlistitem}>
            <span>Banner 2</span>
          </div>
          <div className={styles.bannerlistitem}>
            <span>Banner 3</span>
          </div>
        </div>
      </div>
    </>);
  }
  
  