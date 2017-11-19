import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  TouchableHighlight,
  AsyncStorage,
  Platform,
  PermissionsAndroid,
}
from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import { encrypt, decrypt } from 'react-native-simple-encryption';
import { doLogout } from '@apis/authApi';
import { ratio } from '../../constants/Styles';
import webapp from './embeded/index.html';

const encryptKey = '1the2moin5key8for0encrypt';

// javascript bridges
const IS_DEV = true;
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

interface ItemProps {
  navigator?: any;
}

class Page extends Component<ItemProps, any> {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
    };
    this.webView = null;
  }

  logout() {
    AsyncStorage.removeItem('LOGIN');
    AsyncStorage.removeItem('TOKEN');
    AsyncStorage.removeItem('EMAIL');
    AsyncStorage.removeItem('PW');

    const response = doLogout();
    console.log('logout response');
    console.log(response)

    this.props.navigator.push({
      id: 'IntroPage',
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump,
      reset: true,
    });
  }

  onLoaded = async () => {
    // check login
    const LOGIN_TYPE = await AsyncStorage.getItem('LOGIN');
    console.log('LOGIN_TYPE: ' + LOGIN_TYPE);
    const sendMessage = {};
    switch (LOGIN_TYPE) {
      case 'EMAIL':
        sendMessage.type = 'EMAIL_LOGIN';
        sendMessage.data = {
          email: decrypt(encryptKey, await AsyncStorage.getItem('EMAIL')),
          password: decrypt(encryptKey, await AsyncStorage.getItem('PW')),
        };
        break;
      case 'FACEBOOK':
        sendMessage.type = 'FACEBOOK_LOGIN';
        sendMessage.data = {
          token: await AsyncStorage.getItem('TOKEN'),
        };
        break;
      case 'NAVER':
        sendMessage.type = 'NAVER_LOGIN';
        sendMessage.data = {
          token: await AsyncStorage.getItem('TOKEN'),
        };
        break;
    }

    if (!sendMessage.type) {
      this.logout();
      return;
    }
    // send message to web
    console.log('sendMessage');
    console.log(JSON.stringify(sendMessage));
    this.webView.postMessage(JSON.stringify(sendMessage));
  }

  onMessage(e) {
    console.log('onMessage');
    console.log(e.nativeEvent.data);
    try {
      const result = JSON.parse(e.nativeEvent.data);
      if (result && result.type) {
        switch (result.type) {
          case 'LOGOUT':
            AsyncStorage.removeItem('LOGIN');
            AsyncStorage.removeItem('TOKEN');
            AsyncStorage.removeItem('EMAIL');
            AsyncStorage.removeItem('PW');

            const response = doLogout();
            console.log('logout response');
            console.log(response)

            this.props.navigator.push({
              id: 'IntroPage',
              sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump,
              reset: true,
            });
            break;
        }
      }
    } catch( err ) {
      console.log(err);
    }
  }

  render () {
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };

      window.postMessage = patchedPostMessage;
    };
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    return (
      <View style={ styles.container }>
          {/* source={webapp} */}
        <WebView
          source={ IS_DEV ? webapp : Platform.OS === 'ios' ? { uri: 'embeded/index.html' } : { uri: 'file:///android_asset/embeded/index.html' }}
          injectedJavaScript={patchPostMessageJsCode}
          mixedContentMode='always'
          thirdPartyCookiesEnabled={true}
          onMessage={ (e) => this.onMessage(e) }
          onLoadEnd={ this.onLoaded }
          startInLoadingState={ true }
          ref={( webView ) => this.webView = webView}
        />
      </View>
    );
  }
};

// require fn from '../';
// str = fn();

const mapState = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState)(Page);
