/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet, Image
} from 'react-native';
import axios from 'axios';

export default class MyComponent extends Component {
  state = {
    color:'#AAF0D1',
    res:false,
    img:'',
  }
  constructor(props) {
    super(props);
    this.getFriend();
    if(this.state.res) {

    }
  }
  async getFriend() {
    console.log("here");
    const response = await axios.get('/reviews/friend', {
      params: {
        dishid: this.props.dishid,
        userid:this.props.name,
      }
    });
    if(response.data.res.length > 0 ) {
      rating = response.data.res[0].rating;
      if(rating == 0) {
        this.setState({color:'red'});
      }
      this.setState({res:true});
      this.getImg();
      console.log("here2");

    }

  }
  async getImg() {
    console.log("here3");

      let rating;
      let arr;
      try {
        const imgurl = await axios.get('https://graph.facebook.com/v3.0/' + this.props.id + '/picture', {
          params : {
            access_token: global.token,
          }
        });
        this.setState({img:imgurl.request.responseURL});
        console.log(JSON.stringify(imgurl.request.responseURL));

        {/*this.setState({img:'http://www.homepcpatrol.com/sites/default/files/imagecache/Profile_Full/alice-stilwell.jpg'});*/}
      } catch(e) {
        console.log(e);
      }
    }
  render() {
    if(this.state.res) {
      return (
         <Image style={[styles.image,{borderColor: this.state.color}]} source={{ uri: this.state.img}} />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width:50,
    height:50
  },
  image: {
    borderWidth: 3,
    borderRadius:20,
    width:40,
    height:40,
    marginBottom: 10
  }
});
