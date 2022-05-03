import React from 'react';
import Navbar from '../../layouts/frontend/Navbar';
import ViewFixtures from './fixtures/ViewFixtures';

function Home(){
    return(
        <div>
            <Navbar/>
            <ViewFixtures/>
        </div>
    )
}
export default Home;