import React, { useState } from 'react';
import DecentralizedDNS from '../contracts/DecentralizedDNS.json';

// The DomainRegister component now receives the web3 instance and the user's account address as props.
const DomainRegister = ({ web3, account }) => {
    const [domain, setDomain] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        // Check if the web3 instance and account are available.
        if (!web3 || !account) {
            alert("Please connect to your wallet.");
            return;
        }

        // Use the provided web3 instance to create a contract instance.
        const contract = new web3.eth.Contract(
            DecentralizedDNS.abi, 
            '0x224857BD2fd8FaE264236725fa166D98Ab2E3509' // Replace with your contract's address
        );

        if (!domain || !address) {
            alert("Please enter both domain and address.");
            return;
        }

        setLoading(true);

        try {
            // Interact with the smart contract to register a domain.
            await contract.methods.register(domain, address).send({ from: account });
            alert("Domain registered successfully");
        } catch (error) {
            alert("Failed to register domain. See console for details.");
            console.error("Error registering domain:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Domain" 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
                disabled={loading} 
            />
            <input 
                type="text" 
                placeholder="Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                disabled={loading} 
            />
            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register Domain"}
            </button>
        </div>
    );
};

export default DomainRegister;
