import React from 'react';
import Navbar from '../../layouts/frontend/Navbar';
import ViewAllFixtures from './fixtures/ViewAllFixtures';


function Home(){
    return(
        <div>
            <Navbar/>          
            <ViewAllFixtures/>
                        
        </div>
    )
}
export default Home;