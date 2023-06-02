
import { useState } from 'react';
import styles from "./sectionaskcardchat.module.scss";
import { BsWhatsapp } from 'react-icons/bs';

export default function SectionAskCardChat() {

    return (<>
        <div className={styles.sectionaskcardcontainer}>
            <div>
                <a className={styles.whatsappbutton}
                    href="https://wa.me/5553997068374"
                    target="_blank"
                >
                    <BsWhatsapp className={styles.socialicon} /></a>
            </div>
        </div>
    </>);
}