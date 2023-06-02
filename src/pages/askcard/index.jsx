
import styles from './askcard.module.scss';

import MainContainer from '@/layouts/LayoutLandingpage';
import SectionAskCard from '@/components/landingpage/SectionAskCard';

export default function Login() {
    return (<>
        <MainContainer>
            <div style={{marginTop: '90px'}}>
                <SectionAskCard />
            </div>
        </MainContainer>
    </>);
}