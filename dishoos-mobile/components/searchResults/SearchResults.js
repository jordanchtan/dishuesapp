import React from 'react';
import { ImageBackground, Image, Dimensions, StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import ResultItem from './ResultItem.js';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo';

const uri = 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e813bc9e93c2b7ede92476a3eddf3606&auto=format&fit=crop&w=1050&q=80';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const database = {
  'Nandos' : {
    id: 0,
    name: 'Nandos',
    logoUrl: 'https://wl3-cdn.landsec.com/sites/default/files/styles/whats_on_gallery_large/public/images/shops/gallery/nandos4.jpg?itok=MyXO5C67',
    imageUrl: 'http://1000logos.net/wp-content/uploads/2017/09/Color-Nandos-Logo.jpg',
  },
  'Dozo': {
    id: 1,
    name: 'Dozo',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVI_QfGFgn9jPh2MPOvnQN1TGnuOOs488dmTrkKeR7jOpJefiUNA',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsncICVE8OCMdWktRqMezlRiV-ILr6rbNgaZwcVgCfgDW7-LGGHQ',
  }
}
/*
* Renders search results and performs the search.
*/
export default class SearchResults extends React.Component {

  state = {
    target: '',
    searchResults: [],
  };



  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: <View style=
    {{alignSelf: 'center', width: '90%', flex:1, flexDirection: 'row', height: '80%',
    borderRadius: 3, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}} >

    <Icon name='search' style={{alignItems: 'center', justifyContent: 'center', paddingTop: 0, paddingLeft: 10}} size={20} color={'black'}/>
    <TextInput
      underlineColorAndroid = "transparent"
      autoCorrect={false}
      onChangeText = {(text) => params.handleText(text)}
      onSubmitEditing={() => params.searchFunc()}
      style={styles.search} >{navigation.state.params.target}</TextInput></View>,

      headerBackground :<BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}>
            <Image style={{ width: screen_width , height: 100 }} source={{ uri }} />
          </BlurView>,
      headerRight: <Text></Text>,

    headerStyle: {
      backgroundColor: '#f81616',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };}

  constructor(props) {
    super(props);
    this.state.target = this.props.navigation.state.params.target;
    this.getSearchResults();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      target: this.state.target,
      handleText : this.setTarget.bind(this),
      searchFunc : this.goToSearchResults.bind(this)
    });
}

  setTarget(text) {
    this.setState({target : text});
  }

  async getSearchResults() {
    let searchResults;
    try {
      const response = await axios.get('/restaurant/search', {
        params: {
          q: this.state.target
        }
      });
      searchResults = response.data.results;
    } catch (e) {
      console.log(e);
      searchResults = [];
    }

    this.setState({searchResults:searchResults});
  }

  goToSearchResults() {
      const { navigation } = this.props;
      navigation.push('SearchResults', {
        target: this.state.target,
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground
        style={{
          width: screen_width, height: screen_height
        }}
        source={{ uri:'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ccdbaaf7bb352c17aaf967cf09c1285c&auto=format&fit=crop&w=634&q=80' }}
      >
        <FlatList style={{marginBottom: 10}}
          data={this.state.searchResults}
          renderItem={ ({ item }) =>
            <ResultItem
              name={item.name}
              logoUrl={item.logoUrl}
              imageUrl={item.imageUrl}
              restaurantId={item.id}
              navigation={this.props.navigation}
            />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text style={styles.title}>Sorry we could not find any results matching that query.</Text>}
        />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  header: {
    paddingTop: 26,
    height: 78,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  title: {
    fontFamily: 'exo-black-italic',
    fontWeight:'200',
    fontSize: 25,
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%',
    paddingTop: 28

  },
  search: {
    padding: 10,
    paddingBottom: 7,
    paddingRight: 20,
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    flex:1,

    fontFamily: 'exo-black-italic',

    alignSelf: 'center',
    width: '90%'

  },
});
