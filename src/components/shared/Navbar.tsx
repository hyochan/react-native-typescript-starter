import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

import { ICON_BACK, ICON_SETTING } from '../../constants/Icons';
import { ratio } from '../../constants/Styles';

interface ItemProps {
  showBack?: boolean;
  showOption?: boolean;
  handleBack?: any;
  handleOption?: any;
  children?: any;
}

class Item extends Component<ItemProps, {}> {
  private static defaultProps: Partial<ItemProps> = {
  };

  public render() {
    return (
      <View style={styles.container}>
        {
          this.props.showBack
          ? <TouchableHighlight
              underlayColor='#ccc'
              style={styles.leftMenu}
              onPress={ this.props.handleBack }
            >
              <Image
                style={styles.center}
                source={ ICON_BACK }
              />
            </TouchableHighlight>
          : <View style={styles.leftMenu}/>
        }
        <Text style={[ styles.center, styles.title ]}>{ this.props.children }</Text>
        {
          this.props.showOption
          ? <TouchableHighlight
              underlayColor='#ccc'
              style={styles.rightMenu}
              onPress={ this.props.handleOption }
            >
              <Image
                style={styles.center}
                source={ ICON_SETTING }
              />
            </TouchableHighlight>
          : <View style={styles.rightMenu}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    borderColor: '#eee',
  },
  title: {
    fontSize: 20 * ratio,
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  leftMenu: {
    width: 48 * ratio,
    height: 48 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightMenu: {
    width: 48 * ratio,
    height: 48 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Item;
