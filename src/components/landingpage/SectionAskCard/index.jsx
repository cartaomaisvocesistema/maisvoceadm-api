
import Image from 'next/image';
import styles from './sectionaskcard.module.scss';
import banner from '../../../../public/images/banner8.jpg';
import AskCardForm from '@/components/all/AskCardForm';

export default function SectionAskCard() {

    return (<>
        <div className={styles.sectionaskcard}>
            <div className={styles.sectionaskcardleft}>
                <Image src={banner} className={styles.sectionaskcardbanner} alt='banner 8' />
            </div>
            <div className={styles.sectionaskcardright}>
                <div className={styles.container}>
                    <AskCardForm />
                </div>
            </div>
        </div>
    </>);
}