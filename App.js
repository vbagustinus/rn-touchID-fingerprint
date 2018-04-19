/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from './ShakingText.component';
import styles from './FingerprintPopup.component.styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }
 
  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        // this.props.handlePopupDismissed();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.message });
        // Alert.alert('SALAH CUK')
        this.description.shake();
      });
  }
 
  componentWillUnmount() {
    FingerprintScanner.release();
  }
 
  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    Alert.alert('SALAH CUK')
    this.description.shake();
  };
  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;
 
    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
 
          <Image
            style={styles.logo}
            source={{uri :'https://raw.githubusercontent.com/hieuvp/react-native-fingerprint-scanner/master/examples/src/assets/finger_print.png'}}
          />
 
          <Text style={styles.heading}>
            Fingerprint{'\n'}Authentication
          </Text>
          <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessage)}>
            {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
          </ShakingText>
 
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}
          >
            <Text style={styles.buttonText}>
              BACK TO MAIN
            </Text>
          </TouchableOpacity>
 
        </View>
      </View>
    );
  }
}

// App.propTypes = {
//   style: ViewPropTypes.style,
//   handlePopupDismissed: PropTypes.func.isRequired,
// };
 
export default App;
