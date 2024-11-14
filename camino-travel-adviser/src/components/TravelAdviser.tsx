// TravelAdviser.tsx
import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, CheckCircle, XCircle, Bot, Globe, ChevronDown } from 'lucide-react';
import { ethers } from 'ethers';
import AIRecommendation from './AIRecommendation';

interface BaseData {
  address: string;
  hash: string;
  [key: string]: string;
}

interface HashRecord {
  hashValue: string;
  timestamp: number;
  id: number;
}
interface InputData {
  address: string;
  hash: string;
  selectedAttributes?: {
    [key: string]: string;
  };
}

interface OutputData {
  address: string;
  hash: string;
  [key: string]: string;
}

function transformData(input: InputData): OutputData {
  const { address, hash, selectedAttributes, ...rest } = input;
  const result: OutputData = { address, hash, ...rest };

  if (selectedAttributes) {
    Object.entries(selectedAttributes).forEach(([key, value]) => {
      result[key] = value;
    });
  }

  return result;
}

// Desteklenen diller
const languages = {
  'tr': 'Türkçe',
  'en': 'English',
  'de': 'Deutsch',
  'fr': 'Français',
  'es': 'Español',
  'it': 'Italiano',
  'ru': 'Русский'
};

const CONTRACT_ADDRESS = "0x9Ab0cF5435F8Da71D9a0A10C8c52C2337c5ca30D";
const RPC_URL = "https://columbus.camino.network/ext/bc/C/rpc";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "storeHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getAllHashes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hashValue",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"internalType": "struct HashStorage.HashRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getHashById",
		"outputs": [
			{
				"internalType": "string",
				"name": "hashValue",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getHashCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyLatestHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "hashValue",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const TravelAdviser = () => {
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState<BaseData | null>(null);
    const [error, setError] = useState<string>('');
    const [isVerified, setIsVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [showAI, setShowAI] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('tr');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
    useEffect(() => {
      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear().catch(console.error);
        }
      };
    }, []);
  
    useEffect(() => {
      if (scanning && !scannerRef.current) {
        const timeoutId = setTimeout(() => {
          try {
            scannerRef.current = new Html5QrcodeScanner(
              'reader',
              {
                qrbox: {
                  width: 250,
                  height: 250,
                },
                fps: 10,
              },
              false
            );
            scannerRef.current.render(onScanSuccess, onScanError);
          } catch (error) {
            console.error('Scanner initialization error:', error);
            setScanning(false);
          }
        }, 0);
  
        return () => clearTimeout(timeoutId);
      }
    }, [scanning]);
  
    const startScanner = () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
      setScanning(true);
      setScannedData(null);
      setError('');
      setIsVerified(false);
      setShowAI(false);
    };
  
    const stopScanner = () => {
      setScanning(false);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  
    const verifyWithBlockchain = async (data: BaseData) => {
      try {
        setVerifying(true);
        setError('');
  
        console.log('Verifying data:', {
          address: data.address,
          hash: data.hash
        });
  
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        console.log('Provider connected:', await provider.getNetwork());
  
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        console.log('Contract instance created');
  
        console.log('Fetching hashes for address:', data.address);
        const hashRecords: HashRecord[] = await contract.getAllHashes(data.address);
        console.log('Received hash records:', hashRecords);
  
        if (hashRecords && hashRecords.length > 0) {
          console.log('All stored hashes:');
          hashRecords.forEach((record, index) => {
            console.log(`Hash ${index}:`, {
              hashValue: record.hashValue,
              timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString(),
              id: Number(record.id)
            });
          });
        } else {
          console.log('No hash records found for this address');
        }
  
        const hashMatch = hashRecords.some(record => {
          const matches = record.hashValue === data.hash;
          console.log('Comparing hashes:', {
            stored: record.hashValue,
            scanned: data.hash,
            matches
          });
          return matches;
        });
  
        console.log('Final verification result:', hashMatch);
  
        setIsVerified(hashMatch);
        if (!hashMatch) {
          setError('Hash verification failed: No matching hash found on blockchain');
        }
      } catch (error) {
        console.error('Blockchain verification detailed error:', {
          error,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          errorName: error instanceof Error ? error.name : 'Unknown error type',
          contractAddress: CONTRACT_ADDRESS,
          rpcUrl: RPC_URL
        });
        setError('Failed to verify data with blockchain');
        setIsVerified(false);
      } finally {
        setVerifying(false);
      }
    };
  
    const onScanSuccess = async (decodedText: string) => {
      try {
        setScanning(false);
        if (scannerRef.current) {
          await scannerRef.current.clear();
          scannerRef.current = null;
        }
        
        let parsedData = JSON.parse(decodedText);
        parsedData =transformData(parsedData)
  
        if (!parsedData.address || !parsedData.hash) {
          throw new Error('Missing required fields (address or hash)');
        }
  
        setScannedData(parsedData);
        await verifyWithBlockchain(parsedData);
      } catch (error) {
        console.error('Scan error:', error);
        setError(error instanceof Error ? error.message : 'Invalid QR code format');
      }
    };
  
    const onScanError = (error: any) => {
      console.warn(error);
    };
  
    const renderDataFields = (data: BaseData) => {
      return Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <p className="text-gray-500 text-sm capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </p>
          <p className="font-medium break-all">
            {(key === 'address' || key === 'hash') 
              ? `${value.slice(0, 6)}...${value.slice(-4)}`
              : value}
          </p>
        </div>
      ));
    };
  
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Travel Adviser</h1>
              <p className="text-blue-100 mt-2">Verify your travel documents</p>
            </div>
  
            <div className="p-6">
              {!scanning ? (
                <button
                  onClick={startScanner}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Camera size={24} />
                  Scan QR Code
                </button>
              ) : (
                <div>
                  <div id="reader" className="mb-4" />
                  <button
                    onClick={stopScanner}
                    className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel Scan
                  </button>
                </div>
              )}
  
              {scannedData && (
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderDataFields(scannedData)}
                    </div>
                  </div>
  
                  {verifying ? (
                    <div className="p-4 rounded-lg flex items-center gap-3 bg-blue-50 text-blue-700">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700" />
                      Verifying with blockchain...
                    </div>
                  ) : error ? (
                    <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 text-red-700">
                      <XCircle className="text-red-500" />
                      {error}
                    </div>
                  ) : isVerified ? (
                    <div className="p-4 rounded-lg flex items-center gap-3 bg-green-50 text-green-700">
                      <CheckCircle className="text-green-500" />
                      Data verified successfully!
                    </div>
                  ) : null}
  
                  {isVerified && !showAI && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <button
                          onClick={() => setShowAI(true)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Bot size={24} />
                          Get AI Recommendations
                        </button>
                      </div>
  
                      <div className="relative">
                        <button
                          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Globe size={24} />
                          <span className="sm:hidden">{languages[selectedLanguage as keyof typeof languages]}</span>
                          <ChevronDown size={16} />
                        </button>
  
                        {showLanguageDropdown && (
                          <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg py-1 w-48 z-10">
                            {Object.entries(languages).map(([code, name]) => (
                              <button
                                key={code}
                                onClick={() => {
                                  setSelectedLanguage(code);
                                  setShowLanguageDropdown(false);
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-purple-50 ${
                                  selectedLanguage === code ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                                }`}
                              >
                                {name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
  
              {scannedData && !showAI && (
                <button
                  onClick={startScanner}
                  className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Scan Another Code
                </button>
              )}
            </div>
          </div>
        </div>
  
        {showAI && scannedData && (
          <AIRecommendation 
            travelData={scannedData}
            onClose={() => setShowAI(false)}
            initialLanguage={selectedLanguage}
          />
        )}
      </>
    );
  };
  
  export default TravelAdviser;