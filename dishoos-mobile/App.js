import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import {  createStackNavigator } from 'react-navigation';
import {SearchBar} from 'react-native-elements';
import ReviewList from './components/reviews/ReviewsList.js';
import axios from 'axios';

import Home from './components/landingPage/Home.js'
import Menu from './components/menu/Menu.js'
import SearchResults from './components/searchResults/SearchResults.js'
import AddReview from './components/addReview/AddReview.js'
import ReviewsList from './components/reviews/ReviewsList.js'


export default class App extends React.Component {
  message = "";
  constructor(props) {
    super(props);
    // UNCOMMENT WHEN PUSHING, OTEHRWISE SUPPLY YOUR DEVICES IP
    axios.defaults.baseURL = 'http://146.169.47.146:8081';
    //axios.defaults.baseURL = 'http://192.168.0.11:8081';
    this.state = {
      message :""
    }
  }

  render() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    return <RootStack />
  }
}

const RootStack = createStackNavigator({
  Home: Home,
  SearchResults: SearchResults,
  Menu: Menu,
  Reviews: ReviewList,
  AddReview: AddReview
});


const imgstyle = {

  flexDirection:'column'
}

const topViews = StyleSheet.create({
  container : {
    alignItems : 'center',
    marginTop:100
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'flex-start'
  },
});
const style1 = {
  marginTop:100,
  fontSize:20,
  alignItems:'center',
  justifyContent:'center',
}

const style2 = {

    backgroundColor : 'rgba(52,52,52,0)',
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0

};

const style3 = {
  borderColor:'black',
  borderWidth:2,

  backgroundColor : 'rgba(52,52,52,0)',
  shadowRadius: 0,
  shadowOffset: {
      height: 0,
  },
  shadowColor: 'transparent'
}
