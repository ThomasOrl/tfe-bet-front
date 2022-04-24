import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';

function DisplayFixtures () {
  const [fixtures, setFixtures] = useState([]);

  useEffect(()=>{
    const getAllFixtures = async()=>{

      const fixtures = await axios("http://localhost:8000/api/fixture")
      
      setFixtures(fixtures.data.data.response)
      console.log(fixtures.data.data.response)
      // let arr = Object.entries(fixtures.data.data.response);
      // console.log(arr);
      
    }
    getAllFixtures()
    
  },[])
  
  return (
  <div className='listNomEquipes'>
    
      <div className='nomEquipeHome'>
        {fixtures.map((item,i)=>(
          <p key={i}>{item.teams.home.name}</p>
        ))}
      </div>
      
      <div className='nomEquipeAway'>
        {fixtures.map((item,j)=>(
          <p key={j}>{item.teams.away.name}</p>
        ))}
      </div>
      
  </div>
  );
}

export default DisplayFixtures;