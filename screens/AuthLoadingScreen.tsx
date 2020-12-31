import React, { useEffect } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ViewBase} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';


export default function AuthLoadingScreen() {

  const navigation = useNavigation();

  const AuthStack = async () => {

    navigation.navigate('Auth');

    // if (!userInfo) {
    //   navigation.navigate('Auth');
    // }
  }
  useEffect(() => {
    AuthStack();

    navigation.navigate('Auth');
    // navigation.navigate('Auth');
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} animating={true} color={'#fa1100'}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})