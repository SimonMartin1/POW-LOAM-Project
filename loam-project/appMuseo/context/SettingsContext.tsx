import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


type SettingsState = {
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
  biometricsEnabled: boolean;
};


type SettingsContextType = SettingsState & {
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  toggleLocation: () => void;
  toggleBiometrics: () => void;
  isLoading: boolean; 
};

const defaultSettings: SettingsState = {
  isDarkMode: false,
  notificationsEnabled: true,
  locationEnabled: true,
  biometricsEnabled: false,
};

const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  toggleDarkMode: () => {},
  toggleNotifications: () => {},
  toggleLocation: () => {},
  toggleBiometrics: () => {},
  isLoading: true,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedJson = await AsyncStorage.getItem('userSettings');
        if (storedJson) {
          const storedSettings = JSON.parse(storedJson);
          
          setSettings({ ...defaultSettings, ...storedSettings });
        }
      } catch (e) {
        console.error("Error cargando configuración:", e);
      } finally {
        setIsLoaded(true); 
      }
    };
    loadSettings();
  }, []);

  
  useEffect(() => {
    if (isLoaded) {
      const saveSettings = async () => {
        try {
          await AsyncStorage.setItem('userSettings', JSON.stringify(settings));
        } catch (e) {
          console.error("Error guardando configuración:", e);
        }
      };
      saveSettings();
    }
  }, [settings, isLoaded]);

  
  const toggleDarkMode = () => setSettings(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  const toggleNotifications = () => setSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
  const toggleLocation = () => setSettings(prev => ({ ...prev, locationEnabled: !prev.locationEnabled }));
  const toggleBiometrics = () => setSettings(prev => ({ ...prev, biometricsEnabled: !prev.biometricsEnabled }));

  return (
    <SettingsContext.Provider value={{
      ...settings,
      toggleDarkMode,
      toggleNotifications,
      toggleLocation,
      toggleBiometrics,
      isLoading: !isLoaded
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);