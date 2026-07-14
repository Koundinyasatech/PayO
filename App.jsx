// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AuthProvider } from './src/context/AuthContext';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';  

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <AuthProvider>
//           <AppNavigator />
//         </AuthProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

///////////////////////////////////////////////


import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';  

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* ✅ Redux Provider must wrap everything that uses Redux */}
        <Provider store={store}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
 