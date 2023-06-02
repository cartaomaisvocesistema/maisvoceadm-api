
import Link from 'next/link';
import { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import styles from './askcardform.module.scss';

export default function AskCardForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [acceptEmail, setAcceptEmail] = useState(false);
    const [acceptWhatsApp, setAcceptWhatsApp] = useState(false);
    const [text, setText] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const onChangeAcceptWhatsApp = (e) => {
        setAcceptWhatsApp(e.target.value);
    }

    const onChangeAcceptEmail = (e) => {
        setAcceptEmail(e.target.value);
    }

    async function sendWhatsapp() {
        setText(`Olá, meu nome é ${name}, possuo o email ${email} e o telefone ${phone}, e gostaria de concluir o pedido do meu Cartão Mais Você via whatsapp.`);
    }

    //function sendEmail -> fetch rota reponse alert

    return (<>
        <div className={styles.askcard}>
            <div className={styles.container}>
                <span className={styles.askcardtitle}>
                    Peça seu <span className={styles.askcardtitlecard}>cartão + você</span> agora e agende sua consulta:
                </span>
                <input onChange={onChangeName} className={styles.askcardinput} type="text" name="name" placeholder="Nome:" required />
                <input onChange={onChangeEmail} className={styles.askcardinput} type="text" name="email" placeholder="Email:" required />
                <input onChange={onChangePhone} className={styles.askcardinput} type="text" name="phone" placeholder="Telefone:" required />
                {/*<div className={styles.containercheckbox}>
                    <input onChange={onChangeAcceptWhatsApp} type="checkbox" id="acceptwhatsapp" name="acceacceptwhatsappptwp" className={styles.checkbox} />
                    <label className={styles.askcardtextcheck}>Eu aceito contato pelo Whatsapp</label>
                </div>
                <div className={styles.containercheckbox}>
                    <input onChange={onChangeAcceptEmail} type="checkbox" id="acceptemail" name="acceptemail" className={styles.checkbox} />
                    <label className={styles.askcardtextcheck}>Eu aceito notificações e contato via SMS ou email</label>
    </div>*/}
                <div className={styles.groupbtn}>
                    {/*<input type="submit" value="Enviar email" className={styles.contactbtnsend} />*/}
                    <Link
                        className={styles.contactbtnwhatsapp}
                        onClick={sendWhatsapp}
                        target='_blank'
                        href={`https://wa.me/5553997068374?text=${text}`}
                    > <BsWhatsapp className={styles.btnicon} /> Enviar WhatsApp</Link>
                </div>
            </div>
        </div>
    </>);

}