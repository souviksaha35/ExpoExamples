import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as Colors from '../constants/Colors';

const {width, height } = Dimensions.get('screen')

export default function EmailVerificationScreen() {
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
          autoFocus={true}
          editable={true}
          placeholder={'Password'}
          leftIcon={
            <MaterialIcons name="lock-outline" size={24} color={Colors.default.light.tint} />
          }
          secureTextEntry={true}
          containerStyle={{borderColor: Colors.default.light.tint}}/>

          <Button
          buttonStyle={{ backgroundColor: Colors.default.light.tint, borderRadius: 20,}}
          
          title="VERIFY EMAIL"
          titleStyle={{ marginLeft: 10,}}
          />
        </View>
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