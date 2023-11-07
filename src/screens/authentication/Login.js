import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native';
export default function Login() {
    const [email, setEmail]= useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email, password);
            alert("Login successful");
            // console.log(response);
        }catch(e){
            console.log(e );
            alert("Registration failed: " + e.message);
        }finally{
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth,email, password);
            console.log(response);
            alert("Check your email and password")
        }catch(e){
            console.log(e);
            alert("Registration failed: " + e.message);
        }finally{
            setLoading(false);
        }
    }
    return (
        <View style= {styles.container}>
        <TextInput style = {styles.input} value={email} placeholder='Email'
            autoCapitalize='none' onChangeText={(v) => setEmail(v)}>
        </TextInput>
        <TextInput style = {styles.input} secureTextEntry= {true} value={password} placeholder='Password'
            autoCapitalize='none' onChangeText={(v) => setPassword(v)}>
        </TextInput>

        {loading ? (<ActivityIndicator size="large" color = "#0000ff"/> 
        ): (
            <>
                <Button title='Login' onPress={signIn}/>
                <Button title='Create account' onPress={signUp}/>
            </>
        )
            
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20, 
        flex: 1,
        justifyContent: 'center'
    },
    
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
})