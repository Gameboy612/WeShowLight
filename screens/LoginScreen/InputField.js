
import { Dimensions, View, Image, Text, TextInput, StyleSheet } from 'react-native';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function InputField(props) {
    const title = props.title
    
    const icon = props.icon

    const text = props.text
    const setText = props.setText

    const secureTextEntry = props.secureTextEntry

    return (
        <View
            style={styles.box}
            >

            {/* Input Field */}
            <View style={styles.lateral}>
                <Image
                    style={styles.logo}
                    source={icon}
                    />
                <View style={styles.vertical}>
                    <Text
                        style = {styles.title}
                        >{title}</Text>

                    <TextInput 
                        style={styles.textinput}
                        onChangeText={setText}
                        value={text}
                        secureTextEntry={secureTextEntry}
                        />
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create(
    {
        box: {
            backgroundColor: '#fff',
            paddingTop: 8,
            paddingBottom: 8,
            paddingHorizontal: 10,
            width: width * 0.6,
            margin: 5,
            borderColor: '#ccc',
            borderWidth: 1,
        },
        logo: {
            alignSelf: 'flex-end',
            width: 24,
            height: 24,
            marginRight: 10
        },
        title: {
            fontWeight: '600',
            fontSize: 13,
            color: '#777'
        },
        lateral: {
            flexDirection: 'row'
        },
        vertical: {
            flexDirection: 'column'
        },
        textinput: {
            height: 24,
            fontSize: 15,
            width: 100
        }
    }
)