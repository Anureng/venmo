import React, { useContext } from 'react'
import { TransactionContext } from '../context/context'

function Form() {
    const {
        connectwallet,
        currentAccount,
        sendTransaction,
        setAdressto,
        adressto,
        setAmount,
        amount,
        message,
        setMessage
    } = useContext(TransactionContext);

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!adressto || !amount || !message) return;
        setMessage('')
        sendTransaction();
    }
    return (

        <div className='border-black border w-96
        mt-10 mr-8
        p-2 flex flex-col float-right space-y-4'>
            <div className='font-bold text-xl'>
                Payment/Gateway Method
            </div>
            <form onSubmit={handlesubmit}>
                <div className='flex flex-col w-3/4 space-y-6 '>
                    <input type="text"
                        placeholder='To'
                        className='border border-black mt-2
                    rounded-lg p-1'
                        value={adressto}
                        onChange={e => setAdressto(e.target.value)}
                    />
                    <input type="text"
                        placeholder='Message'
                        className='border border-black
                    rounded-lg p-1'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <input type="Number"
                        placeholder='Amount'
                        className='border border-black
                    rounded-lg p-1'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <button className='border border-black w-20 rounded-xl 
                
                px-2 py-1
                '>Send</button>
                </div>

            </form>
        </div>
    )
}

export default Form