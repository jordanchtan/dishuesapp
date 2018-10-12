import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';
import FBImg from './FBImg.js'
import {Avatar } from 'react-native-elements';

export default class MenuItem extends React.Component {

  state = {
    rating: 0,
    arr:[],
  }

constructor(props) {
  super(props);
  this.getRating();
}

async getRating() {
    let rating;
    let arr;
    try {
      const response = await axios.get('/reviews/rating', {
        params: {
          id: this.props.dishid,
        }
      });
      rating = parseInt(response.data.rating) || 0;
    } catch (e) {
      console.log(e);
      rating = 0;
    }

    this.setState({rating:rating});
  }

  goToDishReviews() {
     this.props.navigation.push('Reviews', {
       dish :{
         id: this.props.dishid,
         name: this.props.name,
         details: this.props.details,
         arr: this.state.arr
       }
     });
  }

  render() {
    const x = "rigatoni"
    const y = false
    let avatar = null
    if (this.props.name === x) {
      avatar = <Avatar
        size="small"
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{borderWidth:3, borderColor: '#AAF0D1'}}
        />;
    }

    return (
      <TouchableHighlight
      underlayColor = {'transparent'}
      onPress={() =>
        {const searchFor = this.goToDishReviews.bind(this); searchFor(this)}}>
      <View style={styles.container}>
      <Image style={styles.image} source={{uri: this.props.imageUrl}}/>

      <View style={styles.details}>
        <Text style={styles.dishName}>{this.props.name}</Text>
        <Text style={styles.price}> £{this.props.price} </Text>
        <StarRating
disabled={true}
maxStars={5}
starSize={20}
buttonStyle={{paddingHorizontal: 2}}
containerStyle={{marginTop:11}}
fullStarColor={'pink'}
rating={this.state.rating * 5}
/>
<Text style={styles.percentage}> {this.state.rating * 5} stars</Text>

        <Text style={styles.description}>''{this.props.details}''</Text>
        { 
          this.props.arr.map((data) => {

              return (
             <FBImg id={data.id} name={data.name} dishid={this.props.dishid} color="green"/>
              );
          })
        }



      </View>
      </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 250,
    backgroundColor: '#FFF',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    elevation: 3,
  },
  image: {
    flex: 1,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishName: {
    fontFamily: 'exo-semibold',
    lineHeight: 22,
    paddingTop: 10,
    flex: 1,
    fontSize: 22,
  },
  description: {
    fontFamily: 'exo-medium-italic',
    flex: 3,
    flexWrap: 'wrap',
    padding: 17,
    color: '#000',
  },
  price: {
    fontFamily: 'exo-bold-italic',
    color: '#1fd340',
  },
  percentage: {
    fontFamily: 'exo-bold-italic',
    color: 'black',
  }
});
