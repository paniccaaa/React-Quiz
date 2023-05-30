import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from './pages/Navigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <Navigation />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
}
