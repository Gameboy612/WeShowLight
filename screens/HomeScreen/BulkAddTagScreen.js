import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import * as api from '../../scripts/api'


export default function BulkAddTagScreen({navigation, route}) {
    const [addTags, setAddTags] = useState([""])

    return (
        <View style={styles.wrapper}>
            <Text>Type the tags you want to add below:</Text>
            <View style={styles.taglist}>
                {
                    [...addTags].map((item, index) => {
                        return <TextInput
                            style={styles.textinput}
                            key={index}
                            autoFocus={addTags.length - 1 == index}
                            onChangeText={(text) => {
                                let new_addTags = JSON.parse(JSON.stringify(addTags))
                                new_addTags[index] = text
                                setAddTags(new_addTags)
                            }}
                            onSubmitEditing={() => {
                                let new_addTags = JSON.parse(JSON.stringify(addTags))
                                if(index == addTags.length - 1) {
                                    if(addTags[index] != "") {
                                        new_addTags.push("")
                                        setAddTags(new_addTags)
                                    }
                                } else if(addTags[index] == "") {
                                    new_addTags.splice(index, 1)
                                    setAddTags(new_addTags)
                                }
                            }}
                            value={addTags[index]}
                            />
                    })
                }
            </View>
            
            <TouchableOpacity
                style={styles.confirmbutton}
                onPress={() => {
                    Alert.alert(
                        "Add Tag",
                        "Are you sure you want to add the tags to the selected elements?",
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
                                api._bulkAddTag(route.params.index_arr, addTags)
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