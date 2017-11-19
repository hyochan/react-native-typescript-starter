import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ratio } from '@constants/Styles';
import RootStackNavigator from '@navigations/RootStackNavigator';

import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';

import reducers from './reducers';
const store = createStore(
  combineReducers({
    ...reducers,
  }),
);

class App extends Component<{}, {}> {
  private navigator: any;

  constructor(props) {
    super(props);
    this.navigator = null;
  }
  public render() {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle='dark-content'
          />
          <RootStackNavigator/>
        </View>
      </Provider>
    );
  }
}

export default App;
