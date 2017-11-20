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
import NativeButton from 'apsl-react-native-button';
import StarRating from 'react-native-star-rating';
import { ratio } from '@constants/Styles';

const dateFormat = 'YYYY-MM-DD(ddd)';

interface Idatum {
  pic: any;
  people: number;
  area: string;
  subArea: string;
  title: string;
  price: number;
  review: number;
  starCount: number;
}

interface ItemProps {
  datum?: Idatum;
}

class List extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
  };

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.categoryView }>
          <Text style={ styles.categoryTxt }>
            가장 선호나는 {this.props.datum.people + 1}인{this.props.datum.people === 4 ? ' 이상' : ''} 여행
          </Text>
        </View>
        <Image style={ styles.imgThumb } source={this.props.datum.pic} />
        <View style={styles.viewAreaGroup}>
          <View style={styles.viewArea}>
            <Text style={styles.txtArea}>
              { this.props.datum.area }
            </Text>
          </View>
          <View style={styles.viewArea}>
            <Text style={styles.txtArea}>
              { this.props.datum.subArea }
            </Text>
          </View>
        </View>
        <View style={ styles.content }>
          <Text style={styles.txtTitle}>{this.props.datum.title}</Text>
          <Text style={styles.txtPrice}>
            {
              this.props.datum.price.toLocaleString('ko',
                {
                  style: 'currency',
                  currency: 'KRW',
                },
              )
            }
          </Text>
        </View>
        <View style={ styles.viewReview }>
          <Text style={ styles.txtDate }>4월 21일(목) - 27일(수) 기준</Text>
          <View style={ styles.viewReviewStar }>
            <Text
              style={styles.txtReview}
            >후기 {this.props.datum.review} 개</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.props.datum.starCount}
              starSize={16}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36 * ratio,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  categoryView: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 32 * ratio,
    borderWidth: 1,
    borderColor: '#41b9e4',
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTxt: {
    color: '#41b9e4',
    fontSize: 12 * ratio,
  },
  imgThumb: {
    marginTop: 24 * ratio,
    marginBottom: 24 * ratio,
    width: 300 * ratio,
    height: 300 * ratio,
    borderRadius: 150 * ratio,
  },
  viewAreaGroup: {
    flexDirection: 'row',
    paddingLeft: 32 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewArea: {
    height: 24 * ratio,
    width: 48 * ratio,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    marginRight: 8 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtArea: {
    color: '#a6a6a6',
    fontSize: 12 * ratio,
  },
  content: {
    flexDirection: 'column',
    paddingLeft: 32 * ratio,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtTitle: {
    marginTop: 16 * ratio,
    color: 'black',
    fontSize: 20 * ratio,
  },
  txtPrice: {
    marginTop: 20 * ratio,
    color: 'black',
    fontSize: 16 * ratio,
  },
  viewReview: {
    flexDirection: 'row',
    paddingLeft: 32 * ratio,
    paddingRight: 32 * ratio,
    marginBottom: 40 * ratio,
    marginTop: 40 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewReviewStar: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  txtDate: {
    fontSize: 12 * ratio,
    color: '#999',
  },
  txtReview: {
    fontSize: 12 * ratio,
    color: 'black',
    marginBottom: 8 * ratio,
  },
});

export default List;
