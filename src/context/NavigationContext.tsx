import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type AuthView = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'reset-password' 
  | 'verify-email' 
  | 'dashboard'
  | 'editor';

export interface EditorTemplate {
  id: string;
  title: string;
  category: string;
  workspace: string;
  previewColor: string;
  pinned: boolean;
  favorite: boolean;
  updated: string;
}

interface NavigationContextType {
  currentView: AuthView;
  setCurrentView: (view: AuthView) => void;
  tempEmail: string;
  setTempEmail: (email: string) => void;
  editingTemplate: EditorTemplate | null;
  setEditingTemplate: (template: EditorTemplate | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AuthView>('landing');
  const [tempEmail, setTempEmail] = useState<string>('');
  const [editingTemplate, setEditingTemplate] = useState<EditorTemplate | null>(null);

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
        editingTemplate,
        setEditingTemplate,
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
