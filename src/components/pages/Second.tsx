import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { ICON_MESSAGE, ICON_SETTING } from '@constants/Icons';
import Navbar from '../shared/Navbar';
import SearchView from '../shared/SearchView';
import List from '../shared/List';
import { ratio } from '../../constants/Styles';

const dateFormat1 = 'MM.DD';
const dateFormat2 = 'DD';

interface ItemProps {
  navigation?: any;
  search?: any;
  dispatch?: any;
}

interface ItemState {
  searchViewVisible: boolean;
}

class Page extends Component<ItemProps, ItemState> {
  constructor(props) {
    super(props);
    this.state = {
      searchViewVisible: false,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={ styles.header }>
          <Navbar
            showBack={true}
            handleBack={this.handleBack}
          > Let's Travel </Navbar>
        </View>
        <View style={ styles.content }>
          <ScrollView style={{ alignSelf: 'stretch' }}>
            <View style={styles.viewTop}>
              <Image style={styles.topImg1} source={ ICON_MESSAGE } />
              <Text style={styles.fontBlackStyle}>{this.props.search.area}</Text>
              <Text style={styles.fontGrayStyle}>  /  </Text>
              <Text style={styles.fontBlackStyle}>{this.props.search.people + 1}인</Text>
              <Text style={styles.fontGrayStyle}>  /  </Text>
              <Text style={styles.fontBlackStyle}>
                {
                  this.props.search.startDate && this.props.search.endDate
                  ? this.props.search.startDate.format(dateFormat1) + '-' +
                    this.props.search.endDate.format(dateFormat2)
                  : null
                }
              </Text>
              <TouchableOpacity
                style={styles.topImg2View}
                activeOpacity={0.5}
                onPress={ () => this.setState({ searchViewVisible: !this.state.searchViewVisible}) }
              >
                <Image style={styles.topImg2} source={ ICON_SETTING } />
              </TouchableOpacity>
              <View style={styles.topOval}>
                <Text style={styles.topOvalTxt}>{this.props.search.results.length}</Text>
              </View>
            </View>
            {
              this.state.searchViewVisible
              ? <SearchView handleSearched={ this.handleSearched }/>
              : null
            }
            {
              this.props.search.results.map((datum, index) => {
                return <List key={index} datum={datum}/>;
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  private handleBack = () => {
    console.log('handleBack');
    this.props.navigation.goBack();
  }

  private handleSearched = () => {
    console.log('handleSearched');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : '$statusSize',
    paddingTop: Platform.OS === 'ios' ? '$statusPaddingSize' : 0,
    backgroundColor: 'white',
  },
  header: {
    height: 56 * ratio,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewTop: {
    height: 64 * ratio,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 32 * ratio,
    paddingRight: 32 * ratio,

    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topImg1: {
    width: 28 * ratio,
    height: 28 * ratio,
    marginRight: 16 * ratio,
  },
  topImg2View: {
    position: 'absolute',
    top: 28 * ratio,
    bottom: 16 * ratio,
    right: 28 * ratio,
  },
  topImg2: {
    width: 28 * ratio,
    height: 28 * ratio,
  },
  topOval: {
    position: 'absolute',
    top: 20 * ratio,
    right: 20 * ratio,
    backgroundColor: 'red',
    width: 20 * ratio,
    height: 20 * ratio,
    borderRadius: 10 * ratio,

    justifyContent: 'center',
    alignItems: 'center',
  },
  topOvalTxt: {
    color: 'white',
    fontSize: 12 * ratio,
  },
  fontBlackStyle: {
    fontSize: 16 * ratio,
    color: 'black',
  },
  fontGrayStyle: {
    fontSize: 16 * ratio,
    color: '#eee',
  },
});

const mapState = (state) => ({
  search: state.search,
});

export default connect(mapState)(Page);
