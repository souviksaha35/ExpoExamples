import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState} from 'react';
import { Text, View, TextInput,Dimensions, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import * as Colors from '../constants/Colors';
import {createUser} from '../graphql/mutations';


const { height, width } = Dimensions.get('screen');


export default function SignUpScreen() {

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disableinput, setDisableInput] = useState(false);

  async function onPressSignup() {

    setDisabled(true);
    setLoading(true);
    setDisableInput(true);

    try {
      const { user } = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
        }
      })

      console.log(user);

      

      // const newUser = {
      //   id: user
      // }

      // const userInfo = await API.graphql(graphqlOperation(
      //   createUser, {
      //     input: {

      //     }
      //   }
      // ))

      setLoading(false);

      
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <KeyboardAvoidingView behavior={'position'}>
      <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{ fontSize: 50, fontWeight: 'bold', color: Colors.default.light.tint}}>
          CABRIDER
        </Text>
      </View>

      <View style={styles.lowerContainer}>
        
        <View style={{width: width / 1.5, height: 300,}}>
          <TextInput
          value={fullname}
          onChange={(text) => setFullname(e.target.value)}
          leftIcon={
            <MaterialIcons name="person-outline" size={24} color={Colors.default.light.tint} />
          }
          placeholder={'Full Name'}/>

          <Input
          disabled={disableinput}
          value={username}
          onChange={text => setUsername(text)}
          leftIcon={
            <Feather name="user" size={24} color={Colors.default.light.tint} />
          }
          placeholder={'User Name'}/>

          <Input
          disabled={disableinput}
          value={email}
          onChange={text => setEmail(text)}
          leftIcon={
            <MaterialCommunityIcons name="email-outline" size={24} color={Colors.default.light.tint} />
          }
          keyboardAppearance={'dark'}
          placeholder={'Email'}/>

          <Input
          disabled={disableinput}
          value={password}
          onChange={text => setPassword(text)}
          leftIcon={
            <MaterialIcons name="lock-outline" size={24} color={Colors.default.light.tint} />
          }
          secureTextEntry={true}
          placeholder={'Password'}/>

          <ActivityIndicator hidesWhenStopped={true} size={'large'} color={Colors.default.light.tint} animating={loading}/>

          <Button
          buttonStyle={{ backgroundColor: Colors.default.light.tint,}}
          onPress={onPressSignup}
          title="SIGN UP"
          disabled={disabled}
          />
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  upperContainer: {
    justifyContent: 'center',
    width: width,
    height: 350,
    alignItems: 'center',
    
  },

  lowerContainer: {
    justifyContent: 'center',
    width: width,
    height: 350,
    alignItems: 'center',
  }
});