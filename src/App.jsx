import { useState,useCallback,useEffect,useRef  } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const[password,setpassword]=useState('');
const passRef=useRef(null);
  
const generatePassword=useCallback(()=>{

  let pass="";
  let str="ABCDFGHIJKLMNOabcdefghijklmno";
  if(numberAllowed) str+='1234567890'
  if(charAllowed) str+='!@#$%^&*()_+'

for (let index = 1; index < length; index++) {
  const char=Math.floor(Math.random()*str.length+1) 
  pass+=str.charAt(char); 
}

setpassword(pass)

},[length,charAllowed,numberAllowed])


useEffect(()=>{
generatePassword()
},[length,charAllowed,numberAllowed])

const copyPasswordtoClicp=()=>{
  window.navigator.clipboard.writeText(password);
  passRef.current?.select()
}

  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 m-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' ref={passRef} value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly/>
        <button onClick={copyPasswordtoClicp} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={15} value={length} onChange={(e)=>setLength(e.target.value)} name="" id="" />
        <label htmlFor='length'>length: {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={numberAllowed} onChange={(e)=>{
        setnumberAllowed((prev)=>!prev)
        }}/>
        <label htmlFor='number'>Number</label>

      </div>

      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={charAllowed} onChange={(e)=>{
        setcharAllowed((prev)=>!prev)
        }}/>
        <label htmlFor='char'>Char</label>

      </div>

      </div>

   </div>
  )
}

export default App
