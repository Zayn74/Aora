import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from './../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';

const SignIn = () => {
  const {setUser,setIsLogged}=useGlobalContext();


  const [form, setForm] = useState({
    email: "",
    password:""
  })

  const [isSubmited, setIsSubmited] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields')
    }
    setIsSubmited(true)
    
    try {
      await signIn(form.email, form.password);

      const result =await getUser()
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
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
        <FormField
          title="Email"
          vlaue={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          vlaue={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyle="mt-7"
          />
          <CustomButton
          title="Sign in"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmited}
          />
          <View className=" justify-center pt-5 flex flex-row gap-2">
            <Text className="tex-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="sign-up" className='tex-lg text-secondary font-pregular'>Sign up</Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default SignIn
