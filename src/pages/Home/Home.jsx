import React from 'react';
import Slider from './components/Slider';
import PopularSection from './components/PopularSection';
import { Helmet } from 'react-helmet';
import TopratedServices from './components/TopratedServices';
import FeatureOrBanefit from './components/FeatureOrBanefit';
import PriceingSection from './components/PriceingSection';
import TypewriterComponents from './components/TypewriterComponents';


const Home = () => {

    return (
        <div className='dark:bg-gray-900'>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <Slider></Slider>
            <PopularSection></PopularSection>
            <TopratedServices></TopratedServices>
            <FeatureOrBanefit></FeatureOrBanefit>
            <TypewriterComponents></TypewriterComponents>
            <PriceingSection></PriceingSection>

        </div >
    );
}


export default Home;