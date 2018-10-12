import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Video } from 'expo';
import { Font } from 'expo';
import Expo  from 'expo';
import {Facebook} from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements'


export default class App extends React.Component {


  static navigationOptions = {
      header: null
  }

  state = {
    fontLoaded: false,
    target: '',
    modalVisible: false,
    id:''
  }
  showOverlay() {
  this.setState({modalVisible: true})
}

hideOverlay() {
  this.setState({modalVisible: false})
}
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./OpenSans-Regular.ttf'),
      'exo-black-italic': require('./Exo-BlackItalic.ttf'),
      'exo-bold-italic': require('./Exo-BoldItalic.ttf'),
      'exo-medium-italic': require('./Exo-MediumItalic.ttf'),
      'exo-medium': require('./Exo-Medium.ttf'),
      'exo-semibold': require('./Exo-SemiBold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  constructor(props) {
    super(props);
  }

  goToSearchResults() {
      const { navigation } = this.props;
      navigation.push('SearchResults', {
        target: this.state.target,
        id: this.state.id
      });
  }

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('254915965255784', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      global.token = token;
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
          var test = (await response.json());
        this.setState({id: test.id});
        global.userid = test.id;
        global.username = test.name;
      Alert.alert(
        'Logged in!',
      );
      console.log("logged in " + global.userid + " " + global.username);
    }
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">


        <Video
          source={{ uri: 'https://storage.googleapis.com/coverr-main/mp4/Night-BBQ.mp4' }}
          shouldPlay
          isLooping
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />

        <View style={topViews.container}>
          <Image style={imgstyle} source={require('./logodish1.png')}/>
          {
            this.state.fontLoaded ? (
              <Text style={style1}>Check out dishes at</Text>
            ) : null
          }
        </View>
        <View style = {styles.searchSection}>
        <Icon name='search' style={{alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingRight: 20}} size={20} color={'white'}/>
        {
          this.state.fontLoaded ? (
            <TextInput
              autoCorrect={false}
              underlineColorAndroid = 'transparent'
              onChangeText = {(text) => this.setState({target: text})}
              onSubmitEditing={() =>
              {const searchFor = this.goToSearchResults.bind(this); searchFor()}}
              placeholder=''
              style={styles.search}
              >
              </TextInput>
          ) : null
        }

        </View>
        <SocialIcon

        style = {{width: 200}}
          title='Sign In With Facebook'
          button
          type='facebook'
          onPress={() => this.logIn()}
        />

      </KeyboardAvoidingView>
    );
  }
}

const imgstyle = {
  width: 130,
  height: 130
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
  searchSection: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingRight: 35

  },
  search: {
    fontFamily: 'exo-black-italic',
    fontSize: 25,
    width: 200,
    padding: 6,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'

  },
});
const style1 = {
  fontFamily: 'exo-black-italic',
  marginTop:30,
  fontSize:25,
  alignItems:'center',
  justifyContent:'center',
  color: '#fff'
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
