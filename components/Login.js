import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';



function Login() {
 
  const [providers, setProviders] = useState(null);


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

    return (
      <div className="flex flex-col items-center space-y-20 pt-48">
        <Image
          src="https://rb.gy/ogau5a"
          width={150}
          height={150}
          objectFit="contain"
          className='bg-[#1d9bf0]' 
        />
  
       

          {providers&&
          Object.values(providers).map((provider)=>(
                   <div key={provider.name}>
                     <button
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#1d9bf0] rounded hover:bg-[#1d9bf0] group"
                onClick={() => signIn(provider.id)}
              >
                  Sign in with {provider.name}
              
              </button>
            </div>
          ))}
         
              

        
      </div>
    );
  }

 
  
  export default Login;