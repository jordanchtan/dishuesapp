import React from 'react';
import {ImageBackground,  Dimensions, StyleSheet, Text, View, FlatList, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { ImagePicker, Permissions } from 'expo';
import StarRating from 'react-native-star-rating';
import { BlurView } from 'expo';
import {Icon, Button, Badge } from 'react-native-elements';


const uri = 'https://images.unsplash.com/photo-1494862121583-9711ee30fb0b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e8a4329a5bf40f6f61a59c6a6e5a01e&auto=format&fit=crop&w=1050&q=80';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

/*
* Renders search results and performs the search.
*/
export default class AddReview extends React.Component {


  state = {
    review: '',
    image: 'Placeholder for image',
    rating: 1,
    added: '                  ',
    recommend: 'REC'
  };

  static navigationOptions = {
    title: 'Add Review',
    headerStyle : {
      backgroundColor: '#F81616'
    },
    headerTintColor: '#000',

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
    this.dishId = this.props.navigation.state.params.dishId;
    this.selectionOnPress = this.selectionOnPress.bind(this);
    console.log('DISH ID IS ' + this.dishId);
  }

  sendReview = async () => {
    const review = {}
    review.review = this.state.review;
    review.image = this.state.image.base64;
    review.rating = this.state.rating;
    review.dishid = this.dishId;
    review.username = global.username;
      axios.post('/reviews/', review);
    const items = {}
    items.userId = global.userid;
    items.name = global.username;
    axios.post('/reviews/addDetails', items);
    const {pop} = this.props.navigation;
    Alert.alert('Thank you for your review!', '',   [
    {text: 'OK', onPress: () => pop()},
  ],);
  };

  handleReview = (text) => {
    this.setState({ review : text });
  };

  getImage = async () => {
    const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const  cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({base64:true, allowsEditing:true});
    if (!result.cancelled) {
      this.setState({image: result});
      this.setState({added: 'ADDED PHOTO'});

    }
  };


  onStarRatingPress = (rating) => {
    this.setState({rating:rating});
  };


  selectionOnPress(rating) {

    this.setState({rating:rating})
}

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.search}
          onChangeText = {this.handleReview}
          placeholder = 'Things you could talk about: taste, texture, value,
          smell, presentation ... Be honest!'
          multiline = {true}
          numberOfLines = {10}
          >

        </TextInput>

        {/*}<Text style={{fontFamily: 'exo-medium'}}>(You are logged in as {global.userid}.)</Text>*/}
        <View style={styles.buttonContainer}>

<View style={styles.recommendContainer}>

        <Button
        onPress={() => this.selectionOnPress(1)}
          icon={
            <Icon
            name='thumbs-up'
            type='font-awesome'
            size={35}
            color={ this.state.rating === 1 ? '#AAF0D1' : '#DDD' }
            />
          }
          clear
          title =''
          containerStyle={{margin:5}}
        />
        <Button
        onPress={() => this.selectionOnPress(0)}
          icon={
            <Icon
            name='thumbs-down'
            type='font-awesome'
            size={35}
            color={ this.state.rating === 0 ? 'pink' : '#DDD' }
            />
          }
          clear
          title =''
          containerStyle={{margin:5}}
        />
</View>


        <Badge containerStyle={{backgroundColor:'pink', width:150, height:35}} onPress={this.getImage}>
            <Text style={{fontFamily: 'exo-black-italic', fontSize:17, fontWeight: '400', color: 'white'}}>ADD IMAGE</Text>
        </Badge>



          <Text style={{fontFamily: 'exo-black-italic', fontSize:15, fontWeight: '400', color: '#AAF0D1', lineHeight: 30}}>{this.state.added} </Text>


          <Badge containerStyle={{backgroundColor:'pink', width:150, height:35}} onPress={this.sendReview}>
              <Text style={{fontFamily: 'exo-black-italic', fontSize:17, fontWeight: '400', color: 'white'}}>SUBMIT</Text>
          </Badge>


        </View>
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
  space: {
    flex:1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  recommendContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-start',
    padding:5,
    marginBottom:10

  },
  header: {
    paddingTop: 26,
    height: 78,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#fb9850',
    marginBottom: 10,
  },
  search: {
    textAlignVertical: "top",
    fontFamily: 'exo-medium',
    width: screen_width - 110,
    height: screen_height - 300,
    padding: 15,
    paddingTop: 12,
    fontSize: 15,
    marginTop: 20,
    marginBottom:10,
    borderWidth:2,
    borderColor:'#DDD',
    borderRadius: 3
  },
});
