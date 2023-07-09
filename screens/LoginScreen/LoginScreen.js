
import { Dimensions, View, TouchableOpacity, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import InputField from './InputField';
import { useFonts } from 'expo-font';


const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function LoginScreen({ navigation }) {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const [loaded] = useFonts({
        Kalam: require('../../assets/fonts/Kalam-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.center}>
            <Text style={styles.logo_text}>WeShowLight</Text>
            <InputField
                title="USERNAME"
                text={loginName}
                setText={setLoginName}
                secureTextEntry={false}
                icon={require("../../assets/user.png")}
                />
            <InputField
                title="PASSWORD"
                text={password}
                setText={setPassword}
                secureTextEntry={true}
                icon={require("../../assets/password.png")}
                />
            <View style={[styles.lateral, {width: '60%'}]}>
                <TouchableOpacity
                    style={styles.login_button}
                    onPress={
                        () => {
                            // Add hash function here in future
                            if(loginName == "admin" && password == "admin") {
                                navigation.navigate("HomeScreen")
                            } else {
                                alert("Incorrect Password")
                            }
                        }
                    }
                    >
                    <Text style={styles.login_text}>Login</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create(
    {
        textinput: {
            backgroundColor: '#fff',
            minWidth: '40%',
            maxWidth: '60%',
            borderRadius: 50,
            textAlign: 'center',
            paddingHorizontal: 20,
            paddingTop: 3,
            paddingBottom: 3,
            fontSize: 18,
            borderWidth: 1,
            borderColor: '#ccc'
        },
        center: {
            width: width,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        lateral: {
            flexDirection: 'row-reverse'
        },
        navigation_button: {
            width: 200,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 50,
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 2
        },
        login_button: {
            position: 'absolute',
            marginTop: 25,
            borderRadius: 50,
            paddingHorizontal: 30,
            paddingVertical: 12,
            backgroundColor: '#eee',
            borderWidth: 1,
            borderColor: '#000'
        },
        login_text: {
            fontSize: 15
        },
        logo_text: {
            fontSize: 40,
            marginBottom: 10,
            fontFamily: 'Kalam'
        }
    }
)