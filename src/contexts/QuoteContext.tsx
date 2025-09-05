import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface QuoteItem {
  product: Product;
  quantity: number;
}

interface QuoteContextType {
  quoteItems: QuoteItem[];
  addToQuote: (product: Product, quantity?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  getTotalItems: () => number;
  isInQuote: (productId: string) => boolean; // ✅ check if product already in quote
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedQuote = localStorage.getItem('shilpgrah-quote');
    if (savedQuote) {
      setQuoteItems(JSON.parse(savedQuote));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('shilpgrah-quote', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToQuote = (product: Product, quantity = 1) => {
    setQuoteItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromQuote = (productId: string) => {
    setQuoteItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setQuoteItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const getTotalItems = () => {
    return quoteItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInQuote = (productId: string) => {
    return quoteItems.some(item => item.product.id === productId);
  };

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        getTotalItems,
        isInQuote
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};
