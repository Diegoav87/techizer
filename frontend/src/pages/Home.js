import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Showcase from '../components/Showcase';
import LatestProducts from '../components/Products/LatestProducts';

const Home = () => {

    return (
        <div>
            <Navbar />
            <Showcase />
            <LatestProducts />
        </div>
    )
}

export default Home;
