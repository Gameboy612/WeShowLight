import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import * as api from '../../scripts/api'


export default function BulkremoveTagscreen({navigation, route}) {
    const [removeTags, setRemoveTags] = useState([""])

    return (
        <View style={styles.wrapper}>
            <Text>Type the tags you want to remove below:</Text>
            <View style={styles.taglist}>
                {
                    [...removeTags].map((item, index) => {
                        return <TextInput
                            style={styles.textinput}
                            key={index}
                            autoFocus={removeTags.length - 1 == index}
                            onChangeText={(text) => {
                                let new_removeTags = JSON.parse(JSON.stringify(removeTags))
                                new_removeTags[index] = text
                                setRemoveTags(new_removeTags)
                            }}
                            onSubmitEditing={() => {
                                let new_removeTags = JSON.parse(JSON.stringify(removeTags))
                                if(index == removeTags.length - 1) {
                                    if(removeTags[index] != "") {
                                        new_removeTags.push("")
                                        setRemoveTags(new_removeTags)
                                    }
                                } else if(removeTags[index] == "") {
                                    new_removeTags.splice(index, 1)
                                    setRemoveTags(new_removeTags)
                                }
                            }}
                            value={removeTags[index]}
                            />
                    })
                }
            </View>
            
            <TouchableOpacity
                style={styles.confirmbutton}
                onPress={() => {
                    Alert.alert(
                        "Remove Tag",
                        "Are you sure you want to remove the tags to the selected elements?",
                        [
                            {
                                text: 'Cancel',
                                isPreferred: true,
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                style: 'destructive',
                                isPreferred: false,
                                onPress: async () => {
                                api._bulkRemoveTag(route.params.index_arr, removeTags)
                                navigation.navigate("HomeScreen", {})
                            }},
                          ]
                    )
                }}
                ><Text>Confirm</Text></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        wrapper: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textinput: {
            fontSize: 14,
            textAlign: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            minWidth: 80,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#ccc',
            borderRadius: 30,
            marginHorizontal: 5,
            marginVertical: 5
        },
        taglist: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        confirmbutton: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#ccc',
            borderRadius: 30
        }

    }
)