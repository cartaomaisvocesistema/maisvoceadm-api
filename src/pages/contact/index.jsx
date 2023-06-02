import styles from './contact.module.scss';
import MainContainer from '@/layouts/LayoutLandingpage';
import { useState } from 'react';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import contactimg from '../../../public/images/contactimg.jpg';
import Image from 'next/image';

export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [text, setText] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    async function sendWhatsapp() {
        setText(`Contato enviado por ${name}, email: ${email}, assunto: ${subject}, mensagem: ${message}`);
    }

    return (<>
        <MainContainer>
            <div className={styles.sectioncontact}>
                <div className={styles.sectioncontactleft}>
                    <Image src={contactimg} className={styles.contactimg} />
                </div>
                <div className={styles.sectioncontactright}>
                    <div className={styles.container}>
                        <form className={styles.form}>
                            <span className={styles.formtitle}>
                                <span className={styles.formtitleorange}>Entre em contato</span> agora <br /> com a nossa equipe.
                            </span>
                            <input onChange={onChangeName} className={styles.contactinput} type="text" name="name" placeholder="Nome:" required />
                            <input onChange={onChangeEmail} className={styles.contactinput} type="text" name="email" placeholder="Email:" required />
                            <input onChange={onChangeSubject} className={styles.contactinput} type="text" name="subject" placeholder="Assunto:" required />
                            <textarea onChange={onChangeMessage} className={`${styles.contactinput} ${styles.contacttextarea}`} type="text" name="message" placeholder="Mensagem:" required />
                            {/*<div className={styles.groupbtn}>
                                <input type="submit" value="Enviar email" className={styles.contactbtnsend} />
    </div>*/}
                            <div className={styles.groupbtn}>
                                <Link
                                    className={styles.contactbtnwhatsapp}
                                    onClick={sendWhatsapp}
                                    target='_blank'
                                    href={`https://wa.me/555381466290?text=${text}`}
                                > <BsWhatsapp className={styles.btnicon} /> Enviar WhatsApp</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainContainer>
    </>);
}