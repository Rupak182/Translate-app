import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let languages ={English:"en", French:"fr", Spanish:"es"}
  const[fromText,setFromText]=useState("Hello, how are you?");
  const [to,setTo]=useState("");
  const [fromlang,setFromlang] = useState("en");
  const [tolang,setTolang] = useState("fr");

  let fetchData = async()=>{
    let data =await fetch(`https://api.mymemory.translated.net/get?q=${fromText}!&langpair=${fromlang}|${tolang}`);
    let json = await data.json();
    let res = json.responseData.translatedText;
    console.log(res);
    setTo(res);
}

  const copyContent = (text)=>{
    navigator.clipboard.writeText(text);
  }

  const utterText = (text,language) =>{
    const synth= window.speechSynthesis;
    const utterance =new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  }
  

  useEffect(()=>{
      fetchData();
  },[])

  let  handleFrom=(e)=>{
    setFromText(e.target.value);
    
  }

  let handleSubmit = ()=>{
      fetchData();
  }

  let handlelang = (e)=>{
      setFromlang(languages[e.target.innerText]);
      console.log(languages[e.target.innerText]);
      console.log("infrom")
  }

  let handlelang2 = (e)=>{
    setTolang(languages[e.target.innerText]);
    console.log(languages[e.target.innerText]);
    // console.log("infrom")

}

  let handleSwitch = ()=>{
    let temp = fromlang;
    setFromlang(tolang);
    setTolang(temp);
    temp=fromText;
    setFromText(to);
    setTo(temp);
  }

  return (
    <>
      <div className="contain font-DM bg-[url(assets/hero_img.jpg)] bg-no-repeat bg-cover w-full min-h-[100vh] flex flex-col items-center justify-center">
        <div className="img">
          <img src="logo.svg" alt=""  />
        </div>
        <div className="boxes w-[90%] p-10 flex flex-col lg:flex-row  gap-4">
          <div className="box1 p-7  bg-[#212936cc] text-[#6c727f] rounded-3xl w-full   flex flex-col gap-4">
            <div className="top items-center ">
              <ul className=' flex gap-11 font-bold items-center '>
                {fromlang==="en" ? <li onClick={handlelang} className='bg-[#4D5562] text-white p-2 rounded-lg'>English</li> :<li className='p-2 rounded-lg' onClick={handlelang} >English</li>}
                {fromlang==="fr" ?<li onClick={handlelang} className='bg-[#4D5562] text-white p-2 rounded-lg'>French</li>: <li className='p-2 rounded-lg' onClick={handlelang}>French</li>}
                {/* <li><select className='outline-none bg-transparent' name="" id="">
                    <option value="English">Spanish</option>
                    <option value="Spanish">French</option>
                    <option value="French">S</option>
                  </select>
                  </li> */}

                {fromlang=="es" ? <li onClick={handlelang} className='flex items-center justify-center bg-[#4D5562] text-white p-2 rounded-lg'>Spanish<img src="Expand_down.svg" alt="" /></li>:<li  onClick={handlelang} className='flex p-2 rounded-lg items-center justify-center'>Spanish <img src="Expand_down.svg" alt="" /></li>}
                  
              </ul>
            </div>
            <hr className='border-[#4D5562] mt-2'/>

            <div className="body">
              <div className="text">
                {<textarea value={fromText} onChange={handleFrom}  className='resize-none w-full h-[20vh] bg-transparent text-white outline-none' name="" id=""></textarea>}
              </div>
            </div>

            <div className="footer flex w-full justify-between ">
              <div className="others mt-11">
              <button onClick={()=>utterText(fromText,fromlang)} className='p-2 mr-4 border-2 rounded-lg border-[#4D5562]'><img src="sound_max_fill.svg" alt="" /></button>
              <button onClick={()=>copyContent(fromText)} className='p-2 mr-4 border-2 rounded-lg border-[#4D5562]'><img src="Copy.svg" alt="" /></button>
              </div>

              <div className="translate self-end">
                <div className="char text-sm text-right">{fromText.length}/500</div>
                <button type='submit' onClick={handleSubmit} className='bg-[#3662E3] p-3 px-5 rounded-lg border mt-2 border-[#7CA9F3] '><span className='flex gap-2 text-white'><img src="Sort_alfa.svg" alt="" />Translate</span></button>
              </div>
         
            </div>

          </div>

          <div className="box2 p-7  bg-[#121826cc] text-[#6c727f] rounded-3xl w-full   flex flex-col gap-4">
            <div className="top flex justify-between items-center ">
              <ul className=' flex gap-11 font-bold'>
                
                {tolang==="en" ? <li onClick={handlelang2} className='bg-[#4D5562] text-white p-2 rounded-lg'>English</li> :<li className='p-2 rounded-lg' onClick={handlelang2} >English</li>}
                {tolang==="fr" ?<li onClick={handlelang2} className='bg-[#4D5562] text-white p-2 rounded-lg'>French</li>: <li className='p-2 rounded-lg' onClick={handlelang2}>French</li>}
                {/* <li><select className='outline-none bg-transparent' name="" id="">
                    <option value="English">Spanish</option>
                    <option value="Spanish">French</option>
                    <option value="French">S</option>
                  </select>
                  </li> */}

                {tolang==="es" ? <li onClick={handlelang2} className='flex items-center justify-center bg-[#4D5562] text-white p-2 rounded-lg'>Spanish<img src="Expand_down.svg" alt="" /></li>:<li  onClick={handlelang2} className='flex p-2 rounded-lg items-center justify-center'>Spanish <img src="Expand_down.svg" alt="" /></li>}


              </ul>
              <button onClick={handleSwitch} className='border-2  rounded-xl p-1 px-1 border-[#4D5562]'><img src="Horizontal_top_left_main.svg" alt=""  /></button>
            </div>
            <hr className='border-[#4D5562]'/>

            <div className="body">
              <div className="text">
                <textarea value={to} className='resize-none w-full h-[20vh] bg-transparent text-white outline-none' name="" id=""></textarea>
              </div>
            </div>

            <div className="footer flex w-full justify-between ">
              <div className="others mt-11">
              <button onClick={()=>utterText(to,tolang)} className='p-2 mr-4 border-2 rounded-lg border-[#4D5562]'><img src="sound_max_fill.svg" alt="" /></button>
              <button onClick={()=>copyContent(to)} className='p-2 mr-4 border-2 rounded-lg border-[#4D5562]'><img src="Copy.svg" alt="" /></button>
              </div>


         
            </div>

          </div>
        </div>

      </div>



    </>
  )
}

export default App
