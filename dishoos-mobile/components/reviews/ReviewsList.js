/*item name, review*/

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,Image, ImageBackground,Dimensions,ScrollView,TouchableHighlight
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import {Header, Footer} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import { BlurView } from 'expo';
import FBImg from '../menu/FBImg.js';
import {Icon as ElemIcon} from 'react-native-elements';



const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const uri = 'https://images.unsplash.com/photo-1520238861346-a49993df0e69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f8247a715bd04208a03ba0244e26f2ad&auto=format&fit=crop&w=1050&q=80';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export default class ReviewList extends Component {

  constructor(props) {
    super(props);
    let navigation  = this.props.navigation;
    this.dish = navigation.state.params.dish;
    this.props.navigation.setParams({name:this.props.navigation.state.params.dish.name,
      details:this.props.navigation.state.params.dish.details,
      peopleArr:this.props.navigation.state.params.dish.arr,
      id:this.props.navigation.state.params.dish.id,

    });
  }

  componentWillMount() {
    this.getReviews(this.props.navigation.state.params.dish.name, this.props.navigation.state.params.dish.details, this.props.navigation.state.params.dish.arr);

  }

  componentDidMount() {

  }



  state = {
    reviews:[],
    avg:0,
  };

  async getReviews(name, details, peopleArr) {
    let reviews;
    try {
      const response = await axios.get('/reviews/getReviews', {
        params: {
          dishid: this.dish.id
        }
      });
      reviews = response.data.reviews;
    } catch (e) {
      console.log(e);
      reviews = [];
    }
    //this.setState({reviews:reviews});
    var sum = 0;
    var count = 0;
    reviews = reviews.map((review) => {
      var imageurl = "";
      if(review.imageurl == null) {
        imageurl = "";
      } else {
        imageurl = review.imageurl;
      }
      return {
        first:0,
        title:review.title,
        uri: axios.defaults.baseURL + imageurl,
        rating: parseFloat(review.rating),
        review: review.review,
        user: review.username
      };
    });
    reviews.map((review) => {
        sum = parseInt(sum) + parseInt(review.rating);
        count++;
    });
    var avg = sum/count;
    var arr = [{
      "dish":name,
      rating: avg,
      count: count,
      details: details,
      peopleArr: peopleArr,
      first:1
    }].concat(reviews);
    //console.log(JSON.stringify(arr));
    this.setState({reviews:arr});
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'REVIEWS',
      headerRight : <TouchableHighlight underlayColor = {'transparent'} onPress={() => navigation.push('AddReview', {dishId:navigation.state.params.dish})}><Icon name='plus' style={{ color: '#fff', paddingRight: 16, paddingTop: 4}} size={20} /></TouchableHighlight>,
      headerStyle : {
        backgroundColor: '#F81616'
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
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({dish: this.dish.id});
  }

  //CARD FOR REVIEW
  _renderItem ({item, index}) {
    var twidth = viewportWidth*0.85;
    var theight = viewportHeight*0.4;
    var fullheight = viewportHeight*0.7;
    if(this.state.reviews.length == 1) {
      return (
        <View style={{
          elevation: 0,
           top: 0,
           bottom: 18,
           shadowColor: 'black',
           shadowOpacity: 0.55,
           shadowOffset: { width: 0, height: 10 },
           shadowRadius: 10,
           borderRadius: 0}}>

            <View style={{elevation: 0, width: twidth,  height: fullheight ,backgroundColor: 'white',borderRadius: 0}}>
                 <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                   <Text h1 style={styles.title}>No reviews </Text>

                </View>
            </View>
          </View>

      );
    }
    if(item.first == 1) {
      return ( <View style={{
        elevation: 0,
         top: 0,
         bottom: 18,
         shadowColor: 'black',
         shadowOpacity: 0.55,
         shadowOffset: { width: 0, height: 10 },
         shadowRadius: 10,
         borderRadius: 2}}>

          <View style={{width: twidth,  height: fullheight ,backgroundColor: 'white',borderRadius: 10, paddingTop: 10}}>
               <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                 <Text h1 style={styles.title}>{ item.dish }</Text>
                 <StarRating
                 buttonStyle={{paddingHorizontal: 5}}
                 containerStyle={{marginTop:10}}
                  disabled={true}
                  maxStars={5}
                  starSize={20}
                  fullStarColor={'pink'}
                  rating={item.rating * 5}
                />
                <Text style={styles.percentage}> {item.rating * 5} stars ({item.count})</Text>
                <Text style={styles.description}> {item.details}</Text>
                {
                  item.peopleArr.map((data) => {
                    console.log("here");
                    return (
                      <FBImg id={data.id} name={data.name} dishid={this.dish.id} color="green"/>
                    );
                  })
                }


              </View>
          </View>
        </View>
    );


    }
       return (
         <View style={{
           elevation: 0,
            top: 0,
            bottom: 18,
            shadowColor: 'black',
            shadowOpacity: 0.55,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            borderRadius: 2}}>

             <View style={{width: twidth,  height: fullheight ,backgroundColor: 'white',borderRadius: 10}}>

                 <View style={{width:twidth,
                        height: theight,
                        borderTopLeftRadius: 10, borderTopRightRadius: 10,overflow: 'hidden'}} >
                        <Image source={{uri : item.uri}} style={{flex:1}}/>
                  </View>
                  <View style={{flex:0, justifyContent: 'flex-start',alignItems: 'center'}}>
                    <Text h1 style={styles.title}>{ item.title }</Text>



                   {
                     item.rating === 1 ? (
                       <Icon style={{paddingTop: 10, flex:0, justifyContent: 'flex-start',alignItems: 'center'}}
                       name='thumbs-up'
                       type='font-awesome'
                       size={35}
                       color='#AAF0D1'
                       />
                     ) : (

                       <Icon style={{paddingTop: 10, flex:0, justifyContent: 'flex-start',alignItems: 'center'}}
                       name='thumbs-down'
                       type='font-awesome'
                       size={35}
                       color='pink'
                       />
                     )
                   }



                 </View>
                 <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0,
                    paddingTop: 10
                  }}
                  />
                 <View style={{flex:1, justifyContent: 'flex-start',alignItems: 'flex-start',paddingLeft: 30,paddingTop: 10}}>

                   <ScrollView contentContainerStyle={{flex:1, flexDirection:'column'}}>
                     <Text style={styles.review}>{item.review}</Text>
                   </ScrollView>
                 </View>
                 <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 20, paddingBottom: 20}}>
                  <Text>{item.user}</Text>
                 </View>
             </View>
           </View>
       );
   }

  render() {
    var twidth = viewportWidth*0.85;
    return (
      <View style={{flex:1}}>
      <ImageBackground
        style={{
          width: screen_width, height: screen_height - 80
        }}
        source={{ uri:'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ccdbaaf7bb352c17aaf967cf09c1285c&auto=format&fit=crop&w=634&q=80' }}
      >

        <View style={styles.container} backgroundColor='transparent'>

            <View style={{  paddingTop: 20}}>
              <Carousel
                data={this.state.reviews}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={viewportWidth}
                itemWidth={twidth}
                slideStyle={{ paddingHorizontal: -10}}
              />
            </View>
        </View>
          <View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50}}>
            <ModalDropdown defaultIndex={0} defaultValue={'Latest'} options={['Latest','Most helpful', 'Most negative']}
            style={{width: viewportWidth }} dropdownStyle={{width: viewportWidth,alignItems: 'center'}} dropdownTextStyle={{width: viewportWidth, fontFamily: 'exo-bold-italic', fontSize: 20, color:'#000', alignItems: 'center',textAlign:  'center'}}
            textStyle={{fontFamily: 'exo-bold-italic', fontSize: 20, color:'#000', alignItems: 'center',textAlign:  'center'}}/>
          </View>
          </ImageBackground>
      </View>

    );
  }


}

// images={[
//   ,
//   ,
//   'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Nandos_logo.svg/1200px-Nandos_logo.svg.png',
// ]}

var entries = [
  {
    first: 1,
    dish: 'Nandos sunset burger',
    averagerate:4

  },
  {
    first:0,
    title:'Hello Jordan',
    uri: 'https://pbs.twimg.com/media/CvNTKxuWEAA0Nhr.jpg',
    rating:3,
    review: 'nandos is amazing',
    user:'Ashley'
  },
  {
    first:0,
    title:'test2',
    uri: 'https://metrouk2.files.wordpress.com/2016/10/sunset-burger.jpg?w=748&h=550&crop=1',
    rating:4,
    review: 'cheeky nandos',
    user: 'Anthony'

  }
]

// <Header style={{width: viewportWidth}}>
//   <Icon name='arrow-left' style={{ color: '#fff' }} size={20}/>
//   <Text style={{ color: '#fff' }}> Dish name</Text>
//   <Icon name='plus' style={{ color: '#fff'}} size={20} />
//
// </Header>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'exo-black-italic',
    fontWeight:'200',
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%'
  },
  friendsTitle: {
    fontFamily: 'exo-black-italic',
    fontWeight:'200',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20
  },
  summary: {
    fontFamily: 'exo-black-italic',
    fontWeight:'200',
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%',
    textDecorationLine: 'underline'
  },
  review: {
    fontFamily: 'exo-medium',
    flex: 3,
    flexWrap: 'wrap',
    padding: 17,
    color: '#000',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },
  percentage: {
    fontFamily: 'exo-bold-italic',
    color: 'black',
  },
  description: {
    fontFamily: 'exo-medium-italic',
    flex: 3,
    flexWrap: 'wrap',
    padding: 17,
    color: 'black',

  },
});
