import React, { useState, useMemo, ChangeEvent, KeyboardEvent, useRef, useId } from 'react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  icon?: string; // Optional URL to the coin icon
}

// Mock data for demonstration purposes
const mockCoins: Coin[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: '/btc.svg' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '/eth.svg' }, // Placeholder, ideally a local asset
  { id: 'ripple', name: 'Ripple', symbol: 'XRP', icon: '/xrp.svg' }, // Placeholder, ideally a local asset
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', icon: '/ltc.svg' }, // Placeholder, ideally a local asset
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', icon: '/ada.svg' }, // Placeholder, ideally a local asset
];

interface CoinAutocompleteProps {
  onSelectCoin: (coin: Coin) => void;
  coins?: Coin[]; // Optional prop to provide external coin data
  minSearchLength?: number; // Optional prop to set minimum search length
}

const CoinAutocomplete: React.FC<CoinAutocompleteProps> = ({ onSelectCoin, coins = mockCoins, minSearchLength = 1 }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // For keyboard navigation
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null); // Ref for the component's root element

  const inputId = useId();
  const listboxId = useId();

  const filteredCoins = useMemo(() => {
    if (!searchTerm || searchTerm.length < minSearchLength) {
      // When search term is empty or too short, show a default list (e.g., top N coins)
      return coins.slice(0, 5); 
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        coin.symbol.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, coins, minSearchLength]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
    setActiveIndex(-1); // Reset active index on new search
  };

  const handleCoinClick = (coin: Coin) => {
    onSelectCoin(coin);
    setSearchTerm(coin.name); // Display selected coin name in input
    setIsOpen(false);
    inputRef.current?.focus(); // Return focus to input after selection
  };

  const handleBlur = () => {
    // Only close if focus has completely left the component
    setTimeout(() => {
      if (rootRef.current && !rootRef.current.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 100); // Small delay to allow click events on list items
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredCoins.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % filteredCoins.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex === -1 ? filteredCoins.length - 1 : (prevIndex - 1 + filteredCoins.length) % filteredCoins.length
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex !== -1 && activeIndex < filteredCoins.length) {
          handleCoinClick(filteredCoins[activeIndex]);
        } else if (filteredCoins.length > 0 && searchTerm) {
          // If enter is pressed, no item is highlighted, but there are results and a search term,
          // automatically select the first coin.
          handleCoinClick(filteredCoins[0]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur(); // Remove focus from input
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative w-full" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls={listboxId}>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-label="Search for a coin"
        aria-activedescendant={activeIndex !== -1 && activeIndex < filteredCoins.length ? `coin-option-${filteredCoins[activeIndex]?.id}` : undefined}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {isOpen && filteredCoins.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="coin-autocomplete-list absolute z-10 w-full mt-1 border border-input rounded-md bg-popover shadow-lg max-h-60 overflow-auto"
        >
          {filteredCoins.map((coin, index) => (
            <li
              key={coin.id}
              id={`coin-option-${coin.id}`}
              role="option"
              aria-selected={activeIndex === index}
              className={`px-3 py-2 cursor-pointer flex items-center ${
                activeIndex === index ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => handleCoinClick(coin)}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur from closing before click registers
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
