import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  viewMenu() {
      const { navigation } = this.props;
      const restaurantId = this.props.restaurantId;
      const restaurantName = this.props.name;
      navigation.push('Menu', {
        restaurant: {
          id: restaurantId,
          name: restaurantName
        },
      });
  }

  // <Image style={styles.image} source={{uri: this.props.logoUrl}}/>
  // <Image style={styles.image} source={{uri: this.props.imageUrl}}/>
  render() {
    return (
      <TouchableHighlight style = {{alignItems: 'center', alignItems: 'center'}} underlayColor = {'transparent'} onPress={this.viewMenu.bind(this)}>
      <View style={styles.container}>
        <Text style = {styles.name}> {this.props.name} </Text>
      </View>
      </TouchableHighlight>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 100,
    backgroundColor: '#FFF',
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,

  },
  details: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 25,
    fontFamily: 'exo-black-italic',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
