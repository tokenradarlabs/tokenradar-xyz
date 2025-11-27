import { useQuery } from '@tanstack/react-query';

const CACHE_TIME = 300000; // 5 minutes

// Simulate API calls
const fetchCoins = async (): Promise<string[]> => {
  // In a real application, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const coins = [
    'BTC',
    'ETH',
    'USDT',
    'XRP',
    'ADA',
    'SOL',
    'DOGE',
    'DOT',
    'SHIB',
    'AVAX',
  ];
  return coins;
};

const fetchExchanges = async (): Promise<string[]> => {
  // In a real application, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 700));
  const exchanges = [
    'CoinGecko',
    'Uniswap',
    'Binance',
    'Coinbase',
    'Kraken',
    'Bybit',
    'Gate.io',
  ];
  return exchanges;
};

export const useCoinAndExchangeData = () => {
  const {
    data: coins = [],
    isLoading: isLoadingCoins,
    error: coinsError,
  } = useQuery<string[]>({
    queryKey: ['coins'],
    queryFn: fetchCoins,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  const {
    data: exchanges = [],
    isLoading: isLoadingExchanges,
    error: exchangesError,
  } = useQuery<string[]>({
    queryKey: ['exchanges'],
    queryFn: fetchExchanges,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    coins,
    exchanges,
    isLoading: isLoadingCoins || isLoadingExchanges,
    coinsError,
    exchangesError,
  };
};
