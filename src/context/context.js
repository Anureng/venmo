import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractAddresss, contractAbi } from "../utils/constants"
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en_US')

export const TransactionContext = createContext();

const { ethereum } = window

const createEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddresss,
        contractAbi,
        signer
    )
    return transactionContract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [adressto, setAdressto] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount')
    )
    const [transaction, setTransaction] = useState([])


    useEffect(() => {

        checkWalletConnected();

        checkTransactionExists();
    }, [transactionCount]);

    const checkTransactionExists = async () => {
        try {
            if (ethereum) {
                const transactionContract = createEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();
                window.localStorage.setItem('transactionCount', currentTransactionCount)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = createEthereumContract();
                const availableTransactions = await transactionContract.getAllTransactions();

                const structureTransactions = availableTransactions.map(
                    (transaction) => ({
                        adressto: transaction.receiver,
                        addressFrom: transaction.sender,
                        timestamp: timeAgo.format(
                            new Date(transaction.timestamp.toNumber() * 1000), 'mini'
                        ),
                        message: transaction.message,
                        amount: parseInt(transaction.amount._hex) / 10 ** 10,
                    })
                )
                console.log(structureTransactions);
                sendTransaction(structureTransactions)
            }
            else {
                console.log('no ethereum object');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkWalletConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Metamask is not installed')
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
            else {
                console.log('No account found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const transactionContract = createEthereumContract()
                const parsedAmount = ethers.utils.parseEther(amount);
                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: adressto,
                            gas: '0x5208',
                            value: parsedAmount._hex,
                        },
                    ],
                })
                const transactioHash = await transactionContract.addToBlockchain(
                    adressto,
                    parsedAmount,
                    message
                )
                setIsLoading(true);
                console.log(`Loading ${transactioHash.hash}`);
                await transactioHash.wait();
                console.log(`Loading ${transactioHash.hash}`);
                setIsLoading(false);

                const transactionsCount = await transactionContract.getTransactionCount();
                setTransactionCount(transactionsCount.toNumber);
                window.location.reload();
            }
            else {
                console.log('no ethereum object');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectwallet = async () => {
        try {
            if (!ethereum) {
                console.log("Please installed Metamask");
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object ')
        }
    }








    return (
        <TransactionContext.Provider value={{
            connectwallet,
            currentAccount,
            sendTransaction,
            setAdressto,
            adressto,
            setAmount,
            amount,
            message,
            setMessage,
            transaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
