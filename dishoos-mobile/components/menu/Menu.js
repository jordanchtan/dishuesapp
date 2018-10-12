import React from 'react';
import {ImageBackground, Dimensions, Image, Animated, StyleSheet, Text, View, FlatList,  ScrollView, TouchableHighlight, Button} from 'react-native';
import axios from 'axios';
import { BlurView } from 'expo';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

import MenuTab from './MenuTab.js';
import MenuItem from './MenuItem.js';
import ModalDropdown from 'react-native-modal-dropdown';
import {Button as ButtonElem} from 'react-native-elements';

const uri = 'http://hellojoburg.co.za/wp-content/uploads/2016/11/nandos-new-fino-platter1.jpg';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
import ProgressBar from 'react-native-progress/Bar';
/*
* The menu is used as a component to hold all the other components for
* the menu.
*/
export default class Menu extends React.Component {

  state = {
    menu: [],
    activeTab: 'ALL',
    modalVisible: false,
  };

  tabs =['ALL', 'MAIN','DESSERT', ];

  // Colors of filter option buttons when they are active and inactive respectivelly.
  inactiveFilterColor = 'white';
  activeFilterColor = '#AAF0D1';

  // The filter options which a user has clicked on and is currently applied.
  activeFilters = []

  static navigationOptions = ({navigation}) => {
    return {
    title: navigation.state.params.restaurant.name,
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
  };

  constructor(props) {
    super(props);
    // Must receive a restaurant object of the form {id: int, name: string}
    let navigation  = this.props.navigation;
    this.restaurant = navigation.state.params.restaurant; // {id: 0, name: 'Nandos'}
  }


  onPressNavButton(tab) {
    this.setState({activeTab: tab});
  }

  navigate(tab) {
    this.carousel.snapToItem(this.tabs.indexOf(tab));
  }

  navTextStyle(tab) {
    let style = {};
    if (tab === this.state.activeTab) {
      style.fontFamily = 'exo-black-italic';
      style.color = '#000';
      style.fontSize = 25;
    } else {
      style.color = '#000';
      style.fontFamily = 'exo-black-italic';
      style.fontSize = 17;
    }
    return style;
  }

  isActive(filterOption) {
    const col = this.activeFilters.includes(filterOption) ? this.activeFilterColor : this.inactiveFilterColor;
    return this.activeFilters.includes(filterOption);
  }

  selectOption(filterOption) {
    if (!this.isActive(filterOption)) {
      this.activeFilters.push(filterOption);
    } else {
      this.activeFilters.splice(this.activeFilters.indexOf(filterOption), 1);
    }
    this.setState({});
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  renderItem({item, index}) {
    return (<MenuTab tab={item} restaurantId={this.restaurant.id} navigation={this.props.navigation} filters={this.activeFilters}/>);
  }

  // View
  render() {
    return (

      <View style={styles.container}>
          <View style={{height:60}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{height:60, }}>
              <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this.navigate('ALL')} style={styles.nav}  >
                <Text style={this.navTextStyle('ALL')}>ALL</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this.navigate('MAIN')} style={styles.nav}>
                <Text style={this.navTextStyle('MAIN')}>MAINS </Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this.navigate('DESSERT')} style={styles.nav}>
                <Text style={this.navTextStyle('DESSERT')}>DESSERTS </Text>
              </TouchableHighlight>
            </ScrollView>
          </View>


        <Carousel
          ref={(carousel) => {this.carousel = carousel}}
          data={this.tabs}
          renderItem={this.renderItem.bind(this)}
          sliderWidth={screen_width}
          itemWidth={screen_width}
          style={{flex:4}}
          layout='default'
          onBeforeSnapToItem={(i) => this.onPressNavButton(this.tabs[i])}
        />
        <ButtonElem
          onPress={this.toggleModal.bind(this)}
          title='Filters'
          containerStyle={styles.filterOption4}
          buttonStyle={{
            backgroundColor: 'white'
          }}
          titleStyle={styles.titleStyling}
        />
        <Modal isVisible={this.state.modalVisible} onBackdropPress={this.toggleModal.bind(this)}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center',
          justifyContent: 'flex-end'}}>
            <ButtonElem onPress={() => this.selectOption('Vegan')}
            title='Vegan'
            buttonStyle={{
              backgroundColor: this.isActive('Vegan') ? this.activeFilterColor : this.inactiveFilterColor
            }}
            containerStyle={styles.filterOption1}
            titleStyle={styles.titleStyling}
              />

            <ButtonElem onPress={() => this.selectOption('Vegetarian')}
            title='Vegetarian'
            buttonStyle={{
              backgroundColor: this.isActive('Vegetarian') ? this.activeFilterColor : this.inactiveFilterColor
            }}
            containerStyle={styles.filterOption2}
            titleStyle={styles.titleStyling}
              />

            <ButtonElem onPress={() => this.selectOption('Allergy-Free')}
            title='No Mushrooms'
            buttonStyle={{
              backgroundColor: this.isActive('Allergy-Free') ? this.activeFilterColor : this.inactiveFilterColor
            }}
            containerStyle={styles.filterOption3}
            titleStyle={styles.titleStyling}
              />

            {/*<Button onPress={() => this.selectOption('Vegetarian')}
             color={this.isActive('Vegetarian') ? this.activeFilterColor : this.inactiveFilterColor} style={styles.filterOption} title='Vegetarian'/>

            <Button onPress={() => this.selectOption('Allergy-Free')}
            color={this.isActive('Allergy-Free') ? this.activeFilterColor : this.inactiveFilterColor} style={styles.filterOption} title='Allergy-Frees' />*/}
          </View>
        </Modal>
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
  filterOption1: {
    flex:1,
    position: 'absolute',
    bottom:100,
    width:screen_width,
    height:50,
    borderRadius: 50,
    paddingBottom: 0
  },
  filterOption2: {
    flex:1,
    position: 'absolute',
    bottom:50,
    width:screen_width,
    height:50,
    borderRadius: 50,
    paddingBottom: 0
  },
  filterOption3: {
    flex:1,
    position: 'absolute',
    bottom:0,
    width:screen_width,
    height:50,
    borderRadius: 50,
    paddingBottom: 0
  },
  filterOption4: {
    position: 'absolute',
    bottom:0,
    width:screen_width,
    height:50,
    backgroundColor: 'white',
    paddingBottom: 0,
    marginBottom: 0
  },
  titleStyling: {
    width: '90%', fontFamily: 'exo-bold-italic', fontSize: 20, color:'#000', alignItems: 'center',textAlign:  'center', fontWeight:'400'
  }
});
