import React, { Component } from 'react';
import {
  View,
  Platform,
  StyleSheet,
} from 'react-native';

import Navbar from '@shared/Navbar';
import SearchView from '@shared/SearchView';
import { ratio } from '@constants/Styles';

interface ItemProps {
  navigation?: any;
  dispatch?: any;
}

class Page extends Component<ItemProps, {}> {
  private static defaultProps: Partial<ItemProps> = {
  };

  public render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Navbar>Let's Travel</Navbar>
        </View>
        <View style={ styles.content }>
          <SearchView handleSearched={ this.handleSearched }/>
        </View>
      </View>
    );
  }

  private handleSearched = () => {
    this.props.navigation.navigate('Second');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    height: 56 * ratio,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24 * ratio,
    fontWeight: 'bold',
  },
});

export default Page;
