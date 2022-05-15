import { useState , useEffect } from "react";

const useMobileDetect = (size) => {

    const [mobile,setMobile] = useState(window.innerWidth <= size);

    const onScreenSizeChange = () => {
      if(window.innerWidth <= size) setMobile(true)
      else setMobile(false)
    }
  
    useEffect(()=>{
      window.addEventListener('resize',onScreenSizeChange);
      return ()=> window.removeEventListener('resize',onScreenSizeChange)
    },[mobile])


    return [mobile]

}

export { useMobileDetect }