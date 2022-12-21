import React, { useContext } from 'react'
// /import logo from '../example.png'
import { TransactionContext } from '../context/context'
import { shortenAddress } from "../utils/shortenAddress";
function Navbar() {
     const { currentAccount, connectwallet } = useContext(TransactionContext);
     return (
          <nav className='flex bg-[#008CFF]
         justify-between p-4 items-center      
         '>
               {currentAccount ? (

                    <div>
                         <p className='text-2xl font-bold font-serif'>VENMO</p>
                         <p>{shortenAddress(currentAccount)}</p>
                    </div>
               ) : (
                    <button onClick={connectwallet}>Connect Wallet</button>
               )}

          </nav>
     )
}

export default Navbar