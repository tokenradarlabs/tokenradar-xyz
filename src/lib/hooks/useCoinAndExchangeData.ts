import { useQuery } from '@tanstack/react-query';
import { getCache, setCache } from '@/lib/utils/cache';

const COINS_CACHE_KEY = 'coins';
const EXCHANGES_CACHE_KEY = 'exchanges';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Simulate API calls
const fetchCoins = async (): Promise<string[]> => {
  const cachedCoins = getCache<string[]>(COINS_CACHE_KEY);
  if (cachedCoins) {
    return cachedCoins;
  }
  // In a real application, this would be an actual API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  const coins = ["BTC", "ETH", "USDT", "XRP", "ADA", "SOL", "DOGE", "DOT", "SHIB", "AVAX"];
  setCache(COINS_CACHE_KEY, coins, CACHE_TTL);
  return coins;
};

const fetchExchanges = async (): Promise<string[]> => {
  const cachedExchanges = getCache<string[]>(EXCHANGES_CACHE_KEY);
  if (cachedExchanges) {
    return cachedExchanges;
  }
  // In a real application, this would be an actual API call
  await new Promise((resolve) => setTimeout(resolve, 700));
  const exchanges = ["CoinGecko", "Uniswap", "Binance", "Coinbase", "Kraken", "Bybit", "Gate.io"];
  setCache(EXCHANGES_CACHE_KEY, exchanges, CACHE_TTL);
  return exchanges;
};

export const useCoinAndExchangeData = () => {
  const { data: coins = [], isLoading: isLoadingCoins, error: coinsError } = useQuery<string[]>({ queryKey: ['coins'], queryFn: fetchCoins });
  const { data: exchanges = [], isLoading: isLoadingExchanges, error: exchangesError } = useQuery<string[]>({ queryKey: ['exchanges'], queryFn: fetchExchanges });

  return {
    coins,
    exchanges,
    isLoading: isLoadingCoins || isLoadingExchanges,
    error: coinsError || exchangesError,
  };
};
