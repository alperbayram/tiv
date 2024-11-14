# Camino Travel Adviser

Camino Travel Adviser is a React-based web application that provides QR code verification and AI-powered travel recommendations using the Camino blockchain network. This application allows users to verify travel documents via QR codes and receive personalized travel recommendations in multiple languages.

## Features

- **QR Code Scanning**: Scan and verify travel documents using the device camera
- **Blockchain Verification**: Verify document authenticity using Camino blockchain
- **Multi-language Support**: Get recommendations in 7 different languages:
  - English
  - Turkish
  - German
  - French
  - Spanish
  - Italian
  - Russian
- **AI-Powered Recommendations**: Get personalized travel suggestions using OpenAI's GPT-4
- **MetaMask Integration**: Seamless integration with MetaMask wallet
- **Real-time Verification**: Instant verification status display

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- OpenAI API key
- Internet connection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/camino-travel-adviser.git
cd camino-travel-adviser
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Configuration

1. Configure MetaMask to connect to Camino Columbus Network:
```
Network Name: Columbus (testnet)
RPC URL: https://columbus.camino.network/ext/bc/C/rpc
Chain ID: 501
Currency Symbol: CAM
Block Explorer: https://suite.camino.network/explorer/c-chain
```

2. Update the smart contract address in `TravelAdviser.tsx` if needed:
```typescript
const CONTRACT_ADDRESS = "your_contract_address";
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Access the application in your browser at `http://localhost:5173`

### QR Code Format
The QR code should contain JSON data in the following format:
```json
{
  "address": "0x...",
  "hash": "hash_value",
  "selectedAttributes": {
    "Name": "value",
    "Age": "value",
    "IdentificationNumber": "value",
    "Nationality": "value",
    "Gender": "value"
  }
}
```

Required fields:
- Name
- Age (must be 18 or older)
- IdentificationNumber

Optional fields:
- Nationality
- Gender

### Using the Application

1. **Document Verification**:
   - Click "Scan QR Code"
   - Allow camera access
   - Scan a valid QR code
   - Wait for blockchain verification

2. **Getting AI Recommendations**:
   - After successful verification, click "Get AI Recommendations"
   - Select your preferred language using the language dropdown
   - Wait for AI-generated recommendations
   - Click "Generate New Recommendations" for alternative suggestions

## Project Structure

```
src/
├── components/
│   ├── TravelAdviser.tsx    # Main component
│   ├── AIRecommendation.tsx # AI recommendations component
│   └── Payment.tsx          # Payment handling component
├── contracts/
│   └── HashStorage.sol      # Smart contract for verification
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## Dependencies

- React
- ethers.js
- OpenAI API
- html5-qrcode
- react-markdown
- lucide-react
- MetaMask SDK
- date-fns

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.