import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './editpartner.module.scss';
import { api } from "@/services/api";
import { useRouter } from 'next/router';
import Image from "next/image";

export default function EditPartner() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [partnernameValue, setPartnernameValue] = useState('');
  const [partnerbannerimgValue, setPartnerbannerimgValue] = useState('');
  const [partnerbannerValue, setPartnerbannerValue] = useState(null);
  const [partnerdescriptionValue, setPartnerdescriptionValue] = useState('');
  const [partneremailValue, setPartneremailValue] = useState('');
  const [partnerphonenumberValue, setPartnerphonenumberValue] = useState('');
  const [partneraddressValue, setPartneraddressValue] = useState('');
  const [partnerwebsiteValue, setPartnerwebsiteValue] = useState('');
  const [partnercategoryValue, setPartnercategoryValue] = useState('SAUDE');

  const [periodoManha, setPeriodoManha] = useState(false);
  const [periodoTarde, setPeriodoTarde] = useState(false);
  const [periodoNoite, setPeriodoNoite] = useState(false);

  const { user } = useContext(AuthContext)

  useEffect(() => {
    recoveryUser()
  }, [])

  const recoveryUser = async () => {
    try {
      const { id } = router.query;
      const response = await api.get(`/api/parceiros/${id}`)
      const data = (response).data;

      //console.log(data);

      if (data.partnername)
        setPartnernameValue(data.partnername);

      if (data.partnerdescription)
        setPartnerdescriptionValue(data.partnerdescription);

      if (data.partneremail)
        setPartneremailValue(data.partneremail);

      if (data.partnerphonenumber)
        setPartnerphonenumberValue(data.partnerphonenumber);

      if (data.partneraddress)
        setPartneraddressValue(data.partneraddress);

      if (data.partnerwebsite)
        setPartnerwebsiteValue(data.partnerwebsite);

      if (data.partnercategory)
        setPartnercategoryValue(data.partnercategory);

      if (data.banner)
        setPartnerbannerimgValue(data.banner);

      if (data.categorypartner)
        setPartnercategoryValue(data.categorypartner);

      if (data.openinghours !== '') {
        if (data.openinghours.includes('manhã')) {
          setPeriodoManha(true);
        }
        if (data.openinghours.includes('tarde')) {
          setPeriodoTarde(true);
        }
        if (data.openinghours.includes('noite')) {
          setPeriodoNoite(true);
        }
      }

    } catch (error) {
      console.log(error);
    }

  }

  const handleChangeMaskPhone = (e) => {
    const { value } = e.target
    setPartnerphonenumberValue(phoneMask(value))
  }

  const phoneMask = (value) => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
  }

  const updateParceiro = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { id } = router.query;

    let oh = '';

    if (periodoManha) {
      oh += 'manhã, '
    }

    if (periodoTarde) {
      oh += 'tarde, '
    }

    if (periodoNoite) {
      oh += 'noite'
    }

    const editPartner = {
      id: id,
      partnername: partnernameValue,
      partnerdescription: partnerdescriptionValue,
      partneremail: partneremailValue,
      partnerphonenumber: partnerphonenumberValue.toString().replace(/\D/g, ''),
      partneraddress: partneraddressValue,
      partnerwebsite: partnerwebsiteValue,
      openinghours: oh,
      categorypartner: partnercategoryValue

    }

    try {
      const response = await api.patch(`/api/parceiros/`, editPartner)
      if (response.status === 200) {

        if (partnerbannerValue && (partnerbannerValue.type == 'image/jpeg' || partnerbannerValue.type == 'image/png') && partnerbannerValue.size <= 1100000) {
          const formData = new FormData();
          formData.append('image', partnerbannerValue);
          const res = await api.post(`/api/parceiros/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }
        alert('Parceiro atualizado com sucesso.');
        router.push('/partners/');
      } else {
        alert('Erro ao atualizar o parceiro.');
      }
    } catch (error) {
      alert('Erro ao atualizar o parceiro.');
      console.log(error)
    }

    setLoading(false);

  }

  return (
    <main>
      <LayoutDashboard>
        <div className={styles.container}>
          <div className={styles.topbar}>
            <span className={styles.topbartitle}>Edição de Parceiro</span>
          </div>
          <div className={styles.card}>
            <div className={styles.formcontainer}>
              <form onSubmit={updateParceiro}>
                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partnername">
                    Nome:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="partnername"
                    name="partnername"
                    value={partnernameValue}
                    maxLength='70'
                    placeholder="São João"
                    onChange={e => setPartnernameValue(e.target.value)}
                    required
                  />
                </div>
                {partnerbannerimgValue &&
                  <Image
                    src={partnerbannerimgValue}
                    className={styles.imgupload}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                }

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partnerbanner">
                    Banner do parceiro:
                  </label>
                  <input
                    type="file"
                    className={styles.buttonupload}
                    id="partnerbanner"
                    name="partnerbanner"
                    maxLength='70'
                    onChange={e => setPartnerbannerValue(e.target.files[0])}
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partnerdescription">
                    Descrição:
                  </label>
                  <textarea
                    className={`${styles.forminputtext} ${styles.forminputtextarea}`}
                    id="partnerdescription"
                    name="partnerdescription"
                    value={partnerdescriptionValue}
                    maxLength='250'
                    onChange={e => setPartnerdescriptionValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partneremail">
                    Email:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="email"
                    id="partneremail"
                    name="partneremail"
                    value={partneremailValue}
                    maxLength='70'
                    placeholder="parceiro@gmail.com"
                    onChange={e => setPartneremailValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partnerphonenumber">
                    Telefone:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="tel"
                    id="partnerphonenumber"
                    name="partnerphonenumber"
                    value={phoneMask(partnerphonenumberValue)}
                    maxLength='15'
                    placeholder="(53)99999-9999"
                    onChange={e => handleChangeMaskPhone(e)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="partneraddress">
                    Endereço:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="partneraddress"
                    name="partneraddress"
                    value={partneraddressValue}
                    maxLength='70'
                    placeholder="ex. Rua José Pedro da Silva"
                    onChange={e => setPartneraddressValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="website">
                    Website:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="url"
                    id="partnerwebsite"
                    name="partnerwebsite"
                    placeholder="http://site.com"
                    value={partnerwebsiteValue}
                    maxLength='70'
                    onChange={e => setPartnerwebsiteValue(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="periodo">
                    Período:
                  </label>
                  <div className={styles.checkboxgroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="manha"
                        checked={periodoManha}
                        onChange={e => setPeriodoManha(!periodoManha)}
                      />
                      <span className={styles.checkbox1}>Manhã</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="tarde"
                        checked={periodoTarde}
                        onChange={e => setPeriodoTarde(!periodoTarde)}
                      />
                      <span className={styles.checkbox1}>Tarde</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="periodo"
                        value="noite"
                        checked={periodoNoite}
                        onChange={e => setPeriodoNoite(!periodoNoite)}
                      />
                      <span className={styles.checkbox1}>Noite</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="categoria">
                    Categoria:
                  </label>
                  <select
                    className={styles.forminputtext}
                    id="categoria"
                    name="categoria"
                    value={partnercategoryValue}
                    onChange={e => setPartnercategoryValue(e.target.value)}
                    required
                  >
                    <option value="SAUDE">Saúde</option>
                    <option value="COMERCIO">Comércio</option>
                    <option value="OUTROS">Outros</option>
                  </select>
                </div>

                <button
                  className={styles.button}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : 'Salvar'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </main>
  );
}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx);
  const { ['nextAuth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  //await apiClient.get('/users');

  return {
    props: {}
  }

}