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
  <div>
    <ul>

      {fixtures.map((item,i)=>(
        <li key={i}>{item.teams.home.name}<br/>{item.teams.away.name}</li>
      ))}
      
    </ul>
  </div>
  );
}

export default DisplayFixtures;