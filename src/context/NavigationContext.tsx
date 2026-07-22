import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type AuthView = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'reset-password' 
  | 'verify-email' 
  | 'dashboard';

interface NavigationContextType {
  currentView: AuthView;
  setCurrentView: (view: AuthView) => void;
  tempEmail: string;
  setTempEmail: (email: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AuthView>('landing');
  const [tempEmail, setTempEmail] = useState<string>('');

  const navigateTo = (view: AuthView) => {
    setCurrentView(view);
    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        setCurrentView: navigateTo,
        tempEmail,
        setTempEmail,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
