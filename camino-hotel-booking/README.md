# Camino Hotel Booking System

A React-based hotel booking system that integrates with the Camino blockchain network for secure identity verification and payment processing. This application allows users to book hotel rooms with blockchain-based identity verification and MetaMask payments.

## Features

- **Hotel Room Booking**: Choose dates, room types, and number of guests
- **Identity Verification**: Secure verification using QR codes and blockchain technology
- **MetaMask Integration**: Pay for bookings using CAM tokens on Camino Network
- **DatePicker Integration**: User-friendly date selection for bookings
- **Smart Contract Verification**: Verify identity documents using Camino blockchain
- **Age Verification**: Ensures guests are 18 or older
- **Dynamic Pricing**: Adjusts total price based on:
  - Number of nights
  - Room type selection
  - Number of guests (50% additional charge per extra guest)

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- MetaMask wallet extension
- Camino Network CAM tokens for payments
- Valid ID QR code for verification

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/camino-hotel-booking.git
cd camino-hotel-booking
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install react-datepicker @types/react-datepicker
npm install @metamask/sdk ethers lucide-react html5-qrcode
```

## Configuration

1. Configure MetaMask for Camino Columbus Testnet:
```
Network Name: Columbus (testnet)
RPC URL: https://columbus.camino.network/ext/bc/C/rpc
Chain ID: 501 (0x1F5)
Currency Symbol: CAM
Block Explorer: https://suite.camino.network/explorer/c-chain
```

2. Update configuration in code if needed:
```typescript
const RECIPIENT_ADDRESS = "your_hotel_wallet_address";
const CONTRACT_ADDRESS = "your_contract_address";
```

## QR Code Format
Your identity QR code should contain:

Required Fields:
```json
{
  "address": "0x...",
  "hash": "hash_value",
  "selectedAttributes": {
    "Name": "John Doe",
    "Age": "25",
    "IdentificationNumber": "ID123456"
  }
}
```

Optional Fields:
```json
{
  "Nationality": "Country",
  "Gender": "Value"
}
```

## Room Types and Pricing

```typescript
const ROOM_PRICES = {
  'standard': 0.1,  // CAM per night
  'deluxe': 0.2,
  'suite': 0.3
};
```

Additional guests: 50% of base price per guest

## Usage Flow

1. **Room Selection**:
   - Choose check-in and check-out dates
   - Select room type (Standard/Deluxe/Suite)
   - Specify number of guests (1-10 guests)

2. **Identity Verification**:
   - Click "Scan QR Code to Verify"
   - Present valid ID QR code
   - System verifies age and identity on blockchain

3. **Payment Process**:
   - After successful verification, click "Pay with MetaMask"
   - Confirm network switch to Camino if needed
   - Complete payment transaction

## Project Structure

```
src/
├── components/
│   ├── TravelAdviser.tsx    # Main booking component
│   └── Payment.tsx          # Payment processing component
├── interfaces/              # TypeScript interfaces
├── constants/              # Configuration constants
└── styles/                # CSS and styling
```

## Key Components

### TravelAdviser.tsx
- Handles room booking interface
- Manages date selection and pricing
- Integrates QR scanner
- Verifies identity on blockchain

### Payment.tsx
- Manages MetaMask integration
- Handles network switching
- Processes CAM payments
- Shows transaction status

## Development

Run the development server:
```bash
npm run dev
```

## Security Features

- Age verification (18+ requirement)
- Blockchain-based identity verification
- Secure MetaMask transactions
- Required field validation
- Smart contract verification

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Notes

- All payments are processed in CAM tokens
- Ensure you have sufficient CAM in your MetaMask wallet
- Keep your QR code information up to date
- Verify your MetaMask is correctly configured for Camino Network