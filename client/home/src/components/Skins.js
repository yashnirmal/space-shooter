import React,{useEffect,useState} from 'react';
import SkinCard from "./SkinCard"

export default function Skins() {

  const [skins,setSkins] = useState([])


  function fetchSkins(){
    fetch("http://localhost:5050/ships")
    .then((res)=>res.json())
    .then(data=>{
      if(data.status==='ok')
      setSkins(data.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchSkins()
  },[])

  return (
    <div className="skins">
    
      <h2>Skins</h2>
      <div className="skin-cont">
      {
        (skins.length)?
        skins.map((skin,idx)=>(
          <SkinCard image={skin.file} price={skin.price} idx={idx} />
        )):'Loading...'
      }
    </div>
    </div>
  )
}
