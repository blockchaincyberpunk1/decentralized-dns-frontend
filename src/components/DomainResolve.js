import React, { useState } from 'react';
import DecentralizedDNS from '../contracts/DecentralizedDNS.json';

// The DomainResolve component now receives the web3 instance as a prop.
const DomainResolve = ({ web3 }) => {
    const [domain, setDomain] = useState('');
    const [resolvedAddress, setResolvedAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResolve = async () => {
        // Check if the web3 instance is available.
        if (!web3) {
            alert("Please connect to your wallet.");
            return;
        }

        // Use the provided web3 instance to create a contract instance.
        const contract = new web3.eth.Contract(
            DecentralizedDNS.abi, 
            '0x224857BD2fd8FaE264236725fa166D98Ab2E3509' // Replace with your contract's address
        );

        if (!domain) {
            alert("Please enter a domain to resolve.");
            return;
        }

        setLoading(true);

        try {
            // Call the resolve method on the contract to get the address.
            const address = await contract.methods.resolve(domain).call();
            setResolvedAddress(address);
        } catch (error) {
            alert("Failed to resolve domain. See console for details.");
            console.error("Error resolving domain:", error);
            setResolvedAddress('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter domain" 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
                disabled={loading} 
            />
            <button onClick={handleResolve} disabled={loading}>
                {loading ? "Resolving..." : "Resolve Domain"}
            </button>
            {resolvedAddress && <p>Resolved Address: {resolvedAddress}</p>}
        </div>
    );
};

export default DomainResolve;
