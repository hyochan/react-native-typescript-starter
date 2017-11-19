import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  ICON_BACK, ICON_HEART, ICON_MESSAGE, ICON_PROFILE, ICON_SETTING,
} from '../../constants/Icons';
import { data } from '../../constants/Data';
import { ratio } from '../../constants/Styles';
import { updateSearch } from '../../actions/index';

const dateFormat = 'YYYY-MM-DD(ddd)';

interface ItemProps {
  dispatch: any;
  handleSearched: any;
  area: string;
  people: number;
  startDate: any;
  endDate: any;
  search: any;
  result: any[];
}

interface ItemState {
  isLoading: boolean;
  selectedDatePicker: string;
  showDatePicker: boolean;
  searchArea: string;
  searchPeople: number;
  searchStartDate: any;
  searchEndDate: any;
  peopleBtns: any[];
  searchTxt: string;
  btnIsLoading: boolean;
}

class Page extends Component<ItemProps, ItemState> {
  private datePicker: any;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      btnIsLoading: false,
      selectedDatePicker: 'START',
      showDatePicker: false,
      searchArea: this.props.search.area,
      searchPeople: this.props.search.people,
      searchStartDate: this.props.search.startDate,
      searchEndDate: this.props.search.endDate,
      peopleBtns: [
        { txt: '1명' },
        { txt: '2명' },
        { txt: '3명' },
        { txt: '4명' },
        { txt: '5명 이상' },
      ],
      searchTxt: '',
    };
  }

  public render() {
    return (
      <View style={ styles.container }>
        <View style={[ styles.menu, { marginTop: 15 } ]}>
          <Image style={ styles.img } source={ICON_MESSAGE} />
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            multiline={false}
            style={styles.textInput}
            onChangeText={ (searchArea) => this.setState({ searchArea }) }
            placeholder={'지역명을 입력해주세요.'}
            value={this.state.searchTxt}/>
        </View>
        <View style={ styles.menu }>
          <Image style={ styles.img } source={ICON_PROFILE} />
          <View style={ styles.peopleView}>
          {
            this.state.peopleBtns.map((peopleBtn, index) => {
              return (
                <NativeButton
                  key={index}
                  onPress={ () => this.handleBtnPeoplePressed(index) }
                  activeOpacity={0.5}
                  style={[
                    this.state.searchPeople === index
                    ? styles.peopleBtnS
                    : styles.peopleBtnN,
                    index === 0
                    ? { width: 44 }
                    : index === 4
                    ? { marginLeft: 8, width: 74 }
                    : { marginLeft: 8, width: 44 }
                  ]}
                  textStyle={[
                    styles.peopleTxtS,
                    this.state.searchPeople === index
                    ? styles.peopleTxtS
                    : styles.peopleTxtN,
                  ]}
                >{peopleBtn.txt}</NativeButton>
              );
            })
          }
          </View>
        </View>
        <View style={ styles.menu }>
          <Image style={ styles.img } source={ICON_SETTING} />
          <View style={ styles.menu3View } >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={ () => this.handleDatePickerPressed('START') }
            >
              <Text style={styles.menu3txt}>
                {
                  !this.state.searchStartDate
                    ? '시작 날짜' : this.state.searchStartDate.format(dateFormat)
                }
              </Text>
            </TouchableOpacity>
            <Text style={ styles.menu3txt }>/</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={ () => this.handleDatePickerPressed('END') }
            >
              <Text style={styles.menu3txt}>
                {
                  !this.state.searchEndDate
                    ? '종료 날짜' : this.state.searchEndDate.format(dateFormat)
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <NativeButton
          isLoading={this.state.btnIsLoading}
          onPress={() => this.handleSearch()}
          activeOpacity={0.75}
          style={ styles.btnStyle }
          textStyle={ styles.btnTxtStyle }
        >검색하기
        </NativeButton>
        <DateTimePicker
          ref={(v) => this.datePicker = v}
          mode={'date'}
          titleIOS='날짜 선택'
          isVisible={this.state.showDatePicker}
          onConfirm={(date) => this.selectDate(date)}
          onCancel={() => this.setState({ showDatePicker: false })}
        />
      </View>
    );
  }

  private handleSearch() {
    if (this.state.searchArea === '') {
      Alert.alert('지역명을 입력해주세요.');
      return;
    }

    const startDate = !this.state.searchStartDate
      ? moment().startOf('week').add(5, 'days') : this.state.searchStartDate;
    const endDate = !this.state.searchEndDate
      ? moment().startOf('week').add(7, 'days') : this.state.searchEndDate;

    const results = [];

    // parse results
    data.forEach((element) => {
      if (
        element.people === this.state.searchPeople &&
        element.area.toLowerCase().indexOf(this.state.searchArea) >= 0
      ) {
        results.push(element);
      }
    });

    this.props.dispatch(
      updateSearch({
        area: this.state.searchArea,
        people: this.state.searchPeople,
        startDate,
        endDate,
        results,
      }),
    );

    this.props.handleSearched();
  }

  private handleBtnPeoplePressed(index) {
    this.setState({
      searchPeople: index,
    });
  }

  private handleDatePickerPressed(type) {
    console.log('handleDatePickerPressed: ' + type);
    this.setState({
      showDatePicker: true,
      selectedDatePicker: type,
    });
  }

  private selectDate(date) {
    console.log('select date: ' + date);
    const momentDate = moment(date);

    switch (this.state.selectedDatePicker) {
      case 'START':
        this.setState({
          showDatePicker: false,
          searchStartDate: momentDate,
        });
        break;
      case 'END':
        if (!momentDate.isAfter(this.state.searchStartDate)) {
          Alert.alert('종료날짜는 시작날짜 이후여야 합니다. 다시 선택해주세요.');
          return;
        }
        this.setState({
          showDatePicker: false,
          searchEndDate: momentDate,
        });
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  menu: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    height: 60 * ratio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    width: 24 * ratio,
    height: 24 * ratio,
    marginRight: 16 * ratio,
  },
  textInput: {
    fontSize: 16 * ratio,
  },
  menu3View: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu3txt: {
    color: '#bbb',
    fontSize: 16 * ratio,
  },
  btnTxtStyle: {
    marginLeft: 32 * ratio,
    marginRight: 32 * ratio,
    fontSize: 16 * ratio,
    color: '#fff',
  },
  btnStyle: {
    marginTop: 24 * ratio,
    marginLeft: 28 * ratio,
    marginRight: 28 * ratio,
    height: 48,
    backgroundColor: 'black',
    borderRadius: 100,
    borderColor: '#ced4da',
  },
  peopleView: {
    flexDirection: 'row',
    paddingTop: 6 * ratio,
  },
  peopleBtnS: {
    height: 28 * ratio,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  peopleBtnN: {
    height: 28 * ratio,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  peopleTxtS: {
    color: 'white',
    fontSize: 14 * ratio,
  },
  peopleTxtN: {
    color: '#bbb',
    fontSize: 14 * ratio,
  },
});

const mapState = (state) => ({
  search: state.search,
});

export default connect(mapState)(Page);
