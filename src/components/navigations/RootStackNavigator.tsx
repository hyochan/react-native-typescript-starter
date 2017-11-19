import FirstPage from '@pages/First';
import SecondPage from '@pages/Second';
import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  View,
} from 'react-native';

// const startPage = 'First';
const startPage: string = 'First';

class RootNavigator extends React.Component<any, any> {
  private _notificationSubscription: any;

  public componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  public componentWillUnmount() {
    // if (this._notificationSubscription) {
    //   this._notificationSubscription.remove();
    // }
  }

  public render() {
    const routeConfig = {
      First: {
        screen: FirstPage,
        path: 'first',
      },
      Second: {
        screen: SecondPage,
        path: 'second',
      },
    };

    const navigatorConfig = {
      initialRouteName: startPage,
      header: null,
      headerMode: 'none',
      navigationOptions: {
        header: null,
      },
    };

    // Current fix for navigating twice
    const navigateOnce = (getStateForAction) => (action, state) => {
      const { type, routeName } = action;
      return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
      ) ? null : getStateForAction(action, state);
    };

    const RootStackNavigator = StackNavigator(routeConfig, navigatorConfig);
    RootStackNavigator.router.getStateForAction = navigateOnce(RootStackNavigator.router.getStateForAction);

    return (
      <View style={{ flex: 1 }}>
        <RootStackNavigator />
      </View>
    );
  }
}

export default RootNavigator;
