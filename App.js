import AppNavigator from './src/AppNavigator';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/authentication/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase';
const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  // console.log(auth.currentUser)
  useEffect(()=>{
    onAuthStateChanged(auth, (u) => {
      // console.log("user: " + u);
      setUser(u);
    })
    
  },[])
  return (
    
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName='Login'>
          
          {user? (
            <Stack.Screen name="test" component={AppNavigator} options={{headerShown:false}}/>
          ): (
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          )}
        </Stack.Navigator>
        
      </NavigationContainer>
   
  );
}

// import AppNavigator from './src/AppNavigator';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './src/screens/authentication/Login';
// import { User, onAuthStateChanged } from 'firebase/auth';
// import { auth } from './src/firebase';

// const Stack = createStackNavigator();

// export default function App() {
//   const [user, setUser] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       // Check if the authUser is not null before setting it in the state
//       if (authUser) {
//         setUser(authUser);
//       } else {
//         setUser(null); // Ensure user is null when not authenticated
//       }
//     });

//     return () => unsubscribe(); // Unsubscribe when component unmounts
//   }, []);

//   return (
//     <NavigationContainer>
//       {user ? (
//         <AppNavigator />
//       ) : (
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//       )}
//     </NavigationContainer>
//   );
// }
