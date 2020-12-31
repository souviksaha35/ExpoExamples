import { AntDesign, EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';


const { height, width } = Dimensions.get('screen');
export default function LoginScreen() {

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{ fontSize: 60, fontWeight: 'bold', color: Colors.default.light.tint}}>
          CABRIDER
        </Text>
      </View>

      <View style={styles.lowerContainer}>
        <View style={{width: width / 1.5, height: 300,}}>
          <Input
          editable={true}
          placeholder={'Email Or Username'}
          autoFocus={true}
          leftIcon={
            <Feather name="user" size={24} color={Colors.default.light.tint} />
          }
          containerStyle={{borderColor: Colors.default.light.tint}}/>

          <Input
          autoFocus={true}
          editable={true}
          placeholder={'Password'}
          leftIcon={
            <MaterialIcons name="lock-outline" size={24} color={Colors.default.light.tint} />
          }
          secureTextEntry={true}
          containerStyle={{borderColor: Colors.default.light.tint}}/>

          <Button
          icon={
            <AntDesign name="login" size={24} color="white" />
          }
          buttonStyle={{ backgroundColor: Colors.default.light.tint, borderRadius: 20,}}
          
          title="SIGN IN"
          titleStyle={{ marginLeft: 10,}}
          />
        </View>

        <Button
          
          buttonStyle={{ backgroundColor: 'grey', marginLeft: 200,}}
          onPress={() => navigation.navigate('Signup')}
          title="Go to Signup"
        />
      </View>
    </View>
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