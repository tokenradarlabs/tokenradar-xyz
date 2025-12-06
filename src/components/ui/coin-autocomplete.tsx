import React, { useState, useMemo, ChangeEvent } from 'react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  icon?: string; // Optional URL to the coin icon
}

// Mock data for demonstration purposes
const mockCoins: Coin[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '/btc.svg' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025' },
  { id: 'ripple', name: 'Ripple', symbol: 'XRP', icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=025' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025' },
];

interface CoinAutocompleteProps {
  onSelectCoin: (coin: Coin) => void;
  coins?: Coin[]; // Optional prop to provide external coin data
}

const CoinAutocomplete: React.FC<CoinAutocompleteProps> = ({ onSelectCoin, coins = mockCoins }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredCoins = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        coin.symbol.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, coins]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const handleCoinClick = (coin: Coin) => {
    onSelectCoin(coin);
    setSearchTerm(coin.name); // Display selected coin name in input
    setIsOpen(false);
  };

  const handleBlur = () => {
    // Delay hiding to allow click event on coin item to register
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {isOpen && filteredCoins.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 border border-input rounded-md bg-popover shadow-lg max-h-60 overflow-auto">
          {filteredCoins.map((coin) => (
            <li
              key={coin.id}
              className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-center"
              onClick={() => handleCoinClick(coin)}
            >
              {coin.icon && (
                <img src={coin.icon} alt={coin.name} className="w-5 h-5 mr-2 rounded-full" />
              )}
              <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoinAutocomplete;
