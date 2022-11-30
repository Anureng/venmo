import { useContext } from 'react'
import logo from '../example.png'
import { TransactionContext } from '../context/context'
import { shortenAddress } from "../utils/shortenAddress";
function Result() {
    const { currentAccount, transaction } = useContext(TransactionContext);
    const generateRandomAvatar = () => {
        const randomAvator = Math.floor(Math.random() * 1000)
        return `https://avatars.dicebear.com/api/adventure/${randomAvator + currentAccount}.svg`;
    }
    return (
        <div>
            <div className='w-96 p-5 space-y-4 mt-80'>
                {transaction.map(
                    ({ id, addressFrom, timestamp, message, addressTo }, index) => (
                        <div key={index} >
                            <div>
                                <img

                                    src={generateRandomAvatar()}
                                    alt=""
                                />
                            </div>

                            <div >
                                <h3 >
                                    {shortenAddress(addressFrom)} to {shortenAddress(addressTo)}
                                </h3>
                                <span >
                                    {timestamp}

                                </span>

                                <p >{message}</p>
                            </div>


                        </div>
                    )
                )}
                <div>

                </div>
                {/* <img className='h-10 w-10 rounded-full' src={logo} />
                <p>Message</p>
                <p>Amount</p> */}
            </div>
        </div>
    )
}

export default Result