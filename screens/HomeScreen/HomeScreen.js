import { useState, useEffect } from 'react';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CardPreview from './CardPreview';
import BulkSettings from './BulkSettings';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';
import * as api from '../../scripts/api'


const width = Dimensions.get("screen").width

export default function HomeScreen({ navigation }) {
    const [taskItems, setTaskItems] = useState(api._getItems(showIndex=true))
    const [searchName, setSearchName] = useState("")
    const [searchTags, setSearchTags] = useState(
        []
    )

    const [selectedSlots, setSelectedSlots] = useState([])

    const taskItemStatus = taskItems


    // https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback
    const isFocused = useIsFocused();
    
    function updateFunction(new_search = searchName, new_searchtags = searchTags) {
        setTaskItems(api._getItems(
            showIndex=true,
            search_filter=new_search.toString().toLowerCase(),
            search_filtertags=new_searchtags
            ))
        }
    useEffect(() => {
        isFocused && updateFunction()
      },[isFocused]);





    // console.log(taskItems)




    return (
        <View>
            {
                selectedSlots.length > 0 ? <BulkSettings index_arr={selectedSlots} navigation={navigation}/> : <></>
            }
            <View
                style={styles.screen_wrapper}
            >
                <View style={styles.inner_padding}>
                    <View style={[styles.search_container, styles.flex_horizontal]}>
                        <Text>Search:</Text>
                            <TextInput 
                                style={styles.search_bar}
                                onChangeText={(text) => {
                                    setSearchName(text);
                                    updateFunction(new_search = text, new_searchtags = searchTags);
                                }}
                                value={searchName}
                                />
                    </View>
                    <View style={[styles.search_tags, styles.flex_horizontal]}>
                        <Text>Tags:</Text>
                        <TextInput 
                            style={styles.search_bar}
                            onChangeText={(text) => {
                                setSearchTags(text.split(" "));
                                updateFunction(new_search = searchName, new_searchtags = text.split(" "));

                            }}
                            value={searchTags.join(" ")}
                            />
                    </View>
                
                </View>
                <FlatList
                    decelerationRate={0.85}
                    disableIntervalMomentum
                    showsHorizontalScrollIndicator={false} 
                    overScrollMode='never'
                    data={taskItemStatus}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        const index = item.index
                        const pass_data = {card:item.item, index:index}
                        return <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onLongPress={() => {
                                    // toggleSlot(index)
                                }}
                                onPress={() => {
                                    if(selectedSlots.length > 0) {
                                        // toggleSlot(index)
                                    } else
                                    navigation.navigate("AddCardScreen", pass_data)
                                }}
                                >
                                <CardPreview selected={selectedSlots.includes(index)} card={item.item} index={index} navigation={navigation}/>
                            </TouchableOpacity>
                        </View>
                            
                    }}
                    />
            </View>
            <View style={styles.export_button}>
                <TouchableOpacity style={styles.button_presser}
                    onPress={async () => {
                        navigation.navigate('QuestionsEditorScreen')

                    }}
                    onLongPress={() => {
                        try {
                            Alert.alert(
                                "Import Clipboard",
                                "Are you sure you want to import your clipboard?\n\nTHIS WILL OVERWRITE ALL DATA",
                                [
                                    {
                                        text: 'Cancel',
                                        isPreferred: true,
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Append',
                                        style: 'default',
                                        onPress: async () => {
                                            api._appendDB(JSON.parse(await Clipboard.getStringAsync()))
                                            setTaskItems(api._getQuestions(showIndex=true))
                                        }
                                    },
                                    {
                                        text: 'Yes',
                                        style: 'destructive',
                                        isPreferred: false,
                                        onPress: async () => {
                                        api._importDB(JSON.parse(await Clipboard.getStringAsync()))
                                        setTaskItems(api._getQuestions(showIndex=true))
                                    }},
                                  ],
                            )
                        } catch (error) {
                            alert('Clipboard error, cannot output.')
                        }
                    }}
                    >
                    <View style={styles.circular}>
                    </View>
                    <Text style={styles.plus_sign}>⇩</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.add_button}>
                <TouchableOpacity style={styles.button_presser} onPress={() => {
                    navigation.navigate("AddCardScreen", {})
                }}>
                    <View style={styles.circular}>
                    </View>
                    <Text style={styles.plus_sign}>+</Text>
                </TouchableOpacity>
            </View>
            
        </View>
            
    )
}

const styles = StyleSheet.create(
    {
        screen_wrapper: {
            width: width,
            height: '100%'
        },
        inner_padding: {
            paddingVertical: 20
        },
        add_button: {
            position: 'absolute',
            right: 20,
            bottom: 20,
            width: 60,
            height: 60,
        },
        export_button: {
            position: 'absolute',
            right: 95,
            bottom: 20,
            width: 60,
            height: 60,
        },
        button_presser: {
            width: '100%',
            height: '100%',
            alignItems: 'center'
        },
        circular: {
            width: '100%',
            height: '100%',
            borderRadius: 50,
            backgroundColor: '#fff8',
            borderColor: '#0001',
            borderWidth: 5
        },
        plus_sign: {
            position: 'absolute',
            fontSize: 40
        },
        search_tags: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
        },
        flex_horizontal: {
            marginHorizontal: width * .05,
            width: width * .9,
            justifyContent: 'space-between'
        },
        search_container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        search_bar: {
            marginLeft: 10,
            textAlignVertical: 'center',
            paddingHorizontal: 12,
            paddingVertical: 3,
            backgroundColor: '#fff',
            borderRadius: 20,
            height: 35,
            borderWidth: 2,
            borderColor: '#ccc',
            width: width * .725
        }
    }
)