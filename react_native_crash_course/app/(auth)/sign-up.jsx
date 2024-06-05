import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from './../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';

const SignUp = () => {
  const {setUser,setIsLogged}=useGlobalContext();

  const [form, setForm] = useState({
    username:"",
    email: "",
    password:""
  })

  const [isSubmited, setIsSubmited] = useState(false)

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields')
    }
    setIsSubmited(true)
    
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result)
      setIsLogged(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmited(false)
    }
  }
  
  return (
    <SafeAreaView className="bg-primary h-full mt-7">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
        <FormField
          title="Username"
          vlaue={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Email"
          vlaue={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          vlaue={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyle="mt-7"
          />
          <CustomButton
          title="Sign up"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmited}
          />
          <View className=" justify-center pt-5 flex flex-row gap-2">
            <Text className="tex-lg text-gray-100 font-pregular">
              Already have account?
            </Text>
            <Link href="sign-in" className='tex-lg text-secondary font-pregular'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default SignUp
