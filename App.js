/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  AppRegistry,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';

import {Slider, CheckBox} from 'react-native-elements';

//import ReactHtmlParser from 'react-html-parser';
import {WebView} from 'react-native-webview';

import lightOn from './assets/light-on.png';
import Component1 from './components/Component1/Component1';
import Loadingpage from './components/LoadingPage/Loadingpage';
import TVLoadingpage from './components/TVLoadingPage/TVLoadingpage';
import MobileLoadingpage from './components/MobileLoadingPage/MobileLoadingpage';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const ipaddr = 'http://34.246.178.252:3000/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      mainpage: true,
      animal: 'cat',
      showcat: false,
      showdog: false,
      showanimals: false,
      animals_data: [],
    };
  }

  async componentDidMount() {
    //Have a try and catch block for catching errors.
    console.log('On Component Mounted...');
    try {
      const response = await fetch(ipaddr);
      const data = await response.text();

      console.log('Main  data acquired....', ipaddr + 'animals');
      const animalsresponse = await fetch(ipaddr + 'animals');
      const animalsdata = await animalsresponse.json();

      console.log(animalsdata);

      this.setState({
        isLoading: false,
        animals_data: animalsdata,
      });
    } catch (err) {
      console.log('Error fetching data-----------', err);
    }
  }
  onAnimalPressed = (animal) => {
    if (animal == 'cat') {
      this.setState({
        animal: 'cat',
        isLoading: false,
        showcat: true,
        showanimals: false,
        mainpage: false,
      });
    }
    if (animal == 'dog') {
      this.setState({
        animal: 'dog',
        isLoading: false,
        showdog: true,
        showanimals: false,
        mainpage: false,
      });
    }
  };
  onListAnimalsPressed = () => {
    this.setState({
      showdog: false,
      showcat: false,
      showanimals: true,
      mainpage: false,
    });
  };

  OnBackPressed = () => {
    this.setState({showdog: false, showcat: false, showanimals: true});
  };

  OnMainPagePressed = () => {
    this.setState({mainpage: true});
  };
  onSliderValueChange = () => {
    console.log('OnSliderChanged...');
    console.log(this.state.sliderval);
  };
  render() {
    let animals = this.state.animals_data.map((animal) => {
      return (
        <Button
          key={animal.id}
          title={animal.name}
          onPress={this.onAnimalPressed.bind(this, animal.name)}
        />
      );
    });
    if (this.state.isLoading) {
      console.log(Platform.OS);
      if (Platform.isTV) {
        console.log('TV Loading page');
        return <TVLoadingpage />;
      } else {
        console.log('Mobile Loading page');
        return <MobileLoadingpage />;
      }
    } else {
      if (this.state.mainpage) {
        console.log('Main Page');
        return (
          <>
            <View>
              <Text style={styles.headline}> Main Page </Text>
              <Button
                title="Animals"
                onPress={this.onListAnimalsPressed.bind(this)}
              />
            </View>
          </>
        );
      } else if (this.state.showanimals) {
        console.log('List of Animals');
        return (
          <>
            <View>
              <Text style={styles.headline}> Full List of Animals </Text>
              {animals}
              <Button
                title="Main Page"
                color="orange"
                onPress={this.OnMainPagePressed.bind(this)}
              />
            </View>
          </>
        );
      } else {
        let _uri = ipaddr + 'animals/' + this.state.animal;
        console.log(_uri);
        return (
          <>
            <WebView style={styles.container} source={{uri: _uri}} />
            <View>
              <Button
                title="Back"
                color="orange"
                onPress={this.OnBackPressed.bind(this)}
              />
              <StatusBar> </StatusBar>
            </View>
          </>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('myapp', () => App);
