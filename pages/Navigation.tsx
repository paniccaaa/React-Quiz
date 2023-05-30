import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from './Auth';
import { Home } from './Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { User, onAuthStateChanged } from 'firebase/auth';
import { DifficultyMenu } from './DifficultyMenu';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { Carousel } from '../components/Carousel';
import { QuestionTypeMenu } from './QuestionTypeMenu';
import { CountQuestionMenu } from './CountQuestionMenu';
import { StackQuiz } from './StackQuiz';
import { QuizItem } from '../components/QuizItem';
import { QuizResults } from './QuizResults';
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" />
      <Stack.Navigator initialRouteName="Auth">
        {user ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={Auth} options={{ headerShown: false }} />
        )}
        <Stack.Screen
          name="DifficultyMenu"
          component={DifficultyMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionTypeMenu"
          component={QuestionTypeMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CountQuestionMenu"
          component={CountQuestionMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="QuizResults" component={QuizResults} options={{ headerShown: false }} />
        <Stack.Screen name="QuizItem" component={QuizItem} options={{ headerShown: false }} />
        <Stack.Screen name="StackQuiz" component={StackQuiz} options={{ headerShown: false }} />
        <Stack.Screen name="Carousel" component={Carousel} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
