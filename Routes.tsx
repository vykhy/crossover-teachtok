import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Discover from './screens/Discover';
import Activity from './screens/Activity';
import Bookmarks from './screens/Bookmarks';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'home'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'compass'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'stopwatch'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'bookmark-sharp'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'person-circle'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
