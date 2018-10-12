import React from 'react';
import {Dimensions, Image, Animated, StyleSheet, Text, View, FlatList,  ScrollView, TouchableHighlight} from 'react-native';
import MenuItem from './MenuItem.js';
import axios from 'axios';
import { BlurView } from 'expo';
import Filter from './Filterable.js';
import ModalDropdown from 'react-native-modal-dropdown';

const uri = 'http://hellojoburg.co.za/wp-content/uploads/2016/11/nandos-new-fino-platter1.jpg';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
/*
* The menu is used as a component to hold all the other components for
* the menu.
*/
export default class Menu extends React.Component {

  state = {
    menu: [],
    activeTab: 'ALL',
    arr:[],
  };

  filter = null;

  static navigationOptions = {
    title: 'Nundos',
    headerStyle: {
      backgroundColor: '#F81616',
      height: 60
    },

    headerTintColor: '#fff',

    headerBackground :<BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}>
          <Image style={{ width: screen_width , height: 100 }} source={{ uri }} />
        </BlurView>,


    headerTitleStyle: {
      fontFamily: 'exo-black-italic',
      fontWeight:'200',
      fontSize: 30,
      textAlign: 'center',
      alignSelf: 'center',
      width: '90%'
    },
    headerRight: <Text></Text>
  };

  constructor(props) {
    super(props);
    const tab = this.props.tab;
    this.getMenuItems('all');
  }

  update(menu) {
    this.setState({menu: menu});
  }
  // Model
  async getMenuItems(category) {
    if(global.username != null) {
      try {
        const arrres = await axios.get(`https://graph.facebook.com/v3.0/YXBwbGljYXRpb25fY29udGV4dDoyNTQ5MTU5NjUyNTU3ODQZD/friends_using_app`, {
          params : {
            access_token: global.token,
          }
        });
        var arr = arrres.data.data;
        this.setState({arr:arr});

      } catch (e) {
        console.log(e);
      }
    }

    let menu;
    try {
      const response = await axios.get('/menu/all', {
        params: {
          restaurantId: this.props.restaurantId,
          type: category
        }
      });
      menu = response.data.menu;
    } catch (e) {
      console.log(e);
      menu = [];
    }
    this.filter = new Filter(menu, 'type');
  //  this.filter.addListener(this);
    if (this.props.tab.toUpperCase() !== 'ALL') {
      this.filter.include(this.props.tab);
    }

    this.setState({menu: this.filter.results});
  }

  getData() {
    const filter = new Filter(this.state.menu, 'tags');
    for (let f of this.props.filters) {
      console.log(f);
      filter.include(f);
    }
    return filter.results;
  }
  // Controller
  // View
  render() {
    return (
      <View style={styles.container}>
        <FlatList style={{marginBottom: 10, marginTop: 0, flex:1} }
          data={this.getData()}
          renderItem={ ({ item }) => <MenuItem arr={this.state.arr} dishid={item.id} navigation={this.props.navigation} name={item.name} details={item.description} imageUrl={item.imageUrl} price={item.price}/>}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text style={styles.title}>Sorry we could not find any menu items matching your requirements.
          Try removing some filters or checking your internet connection.</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },

  nav: {
    width: 150,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'exo-black-italic',
    fontWeight:'200',
    fontSize: 18,
    paddingTop: 28,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
