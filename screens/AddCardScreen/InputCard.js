import { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity, Button, Platform, Alert } from 'react-native'
import * as api from '../../scripts/api'
import uuid from 'react-native-uuid';
import DueDateEditor from './DueDateEditor';
import ImportPhoto from './ImportPhoto'

export default function InputCard(props) {
    const [name, setName] = useState("")
    const [owner, setOwner] = useState("")
    const [location, setLocation] = useState("")
    const [lastMaintenanceDate, setLastMaintenanceDate] = useState((new Date()).getTime())
    const [contactNumber, setContactNumber] = useState("")
    const [footnote, setFootnote] = useState("")
    const [tag, setTag] = useState([""])
    const [picture, setPicture] = useState(null)

    const [cardUUID, setCardUUID] = useState(uuid.v4())
    const [FIRSTLOAD, setFIRSTLOAD] = useState(true)

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    let fix_var = props.index

    setTimeout(() => {setFIRSTLOAD(false)}, 1)

    useEffect(()=>{
        if(props.card) {
            const card = props.card

            setName(card.name)
            setOwner(card.owner)
            setLocation(card.location)
            setLastMaintenanceDate(card.lastMaintenanceDate)
            setContactNumber(card.contactNumber)
            setFootnote(card.footnote)
            setPicture(card.picture)

            setCardUUID(card.uuid ? card.uuid : uuid.v4())
            if(!card.tag || JSON.stringify(card.tag) == '[]') { setTag([""]) } else setTag(card.tag)

            console.debug("InputCard: success")
        }
	}, [])
    
    

    function getOutput() {

        let new_tag = [...tag]
        while(new_tag.includes("")) {
            const index = new_tag.indexOf("")
            new_tag.splice(index, 1)
        }
        setTag(new_tag)
        return {uuid:cardUUID, name:name, owner:owner, location:location, lastMaintenanceDate:lastMaintenanceDate, contactNumber:contactNumber, footnote:footnote, picture:picture, tag:new_tag}
    }

    // https://stackoverflow.com/questions/49928476/confirm-warn-dialog-on-back
    useEffect(
        () =>
        props.navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
                }
    
                // Prevent default behavior of leaving the screen
                e.preventDefault();
    
                // Prompt the user before leaving the screen
                Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: "Cancel", style: 'cancel', onPress: () => {} },
                    {
                    text: 'Discard',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => props.navigation.dispatch(e.data.action),
                    },
                ]
            );
            
        }),
        [props.navigation, hasUnsavedChanges]
    );


    return <View>
        {
            fix_var == -1 ? <></> :
        <TouchableOpacity
                style={styles.delete_button}
                onPress={() => {
                    Alert.alert(
                        "Delete",
                        "Are you sure you want to delete this item?",
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {text: 'Yes', onPress: () => {
                                api._removeItem(fix_var);
                                props.navigation.navigate("HomeScreen", {})
                            }},
                          ],
                    )
                }}
            ><Text style={styles.delete_text}>Delete</Text></TouchableOpacity>
        
        }
        <TextInput
            multiline
            style={styles.name}
            placeholder={"Name"}
            placeholderTextColor="#999"
            onChangeText={(text) => {setHasUnsavedChanges(true); setName(text)}}
            value = {name}
        />
        <View style={styles.line}></View>

        <View style={styles.lateral}>
            <TouchableOpacity
                onPress={async () => {
                    setHasUnsavedChanges(true);
                    setPicture(await ImportPhoto(picture));
                }}
                >
                <Image 
                    source={picture == null ? require('../../assets/icon.png') : {uri: picture}}
                    style={styles.picture}
                    />
                
                </TouchableOpacity>
            <View style={styles.vertical}>
                <TextInput
                    style={styles.owner}
                    placeholder={"Owner (Company/User)"}
                    placeholderTextColor="#999"
                    onChangeText={(text) => {setHasUnsavedChanges(true); setOwner(text)}}
                    value = {owner}
                />
                <TextInput
                    style={styles.location}
                    placeholder={"Location"}
                    placeholderTextColor="#999"
                    onChangeText={(text) => {setHasUnsavedChanges(true); setLocation(text)}}
                    value = {location}
                />
                <TextInput
                    style={styles.contactNumber}
                    placeholder={"Contact Number"}
                    placeholderTextColor="#999"
                    onChangeText={(text) => {setHasUnsavedChanges(true); setContactNumber(text)}}
                    value = {contactNumber}
                />

                {/* {Due Date} */}
                <DueDateEditor
                    dateColor={"#ccc"}
                    date_DueDate={lastMaintenanceDate}
                    setDate_DueDate = {setLastMaintenanceDate}
                    setHasUnsavedChanges = {setHasUnsavedChanges}
                    date_FullDay={true}
                    isHour12={true}
                />
            </View>
        </View>

        
        <TextInput
            multiline
            style={styles.footnote}
            placeholder={"Notes"}
            placeholderTextColor="#999"
            onChangeText={(text) => {setHasUnsavedChanges(true); setFootnote(text)}}
            value = {footnote}
        />
    
        
        <View style={styles.tag_box}>
            <Text style={styles.tag_title}>Tags:</Text>
            <View style={styles.flex_direction_row}>
                {
                    [...tag].map(
                        (item, index, array) => {
                            return  <View key={index} style={styles.tag_item}>
                                <TextInput
                                style={styles.tag_textinput}
                                    placeholder={"Tag"}
                                    value = {tag[index]}
                                    autoFocus = {index != 0 && !FIRSTLOAD}
                                    onSubmitEditing={() => {
                                        let new_ans = JSON.parse(JSON.stringify(tag))
                                        if(index == tag.length - 1) {
                                            if(tag[index] != "") {
                                                new_ans.push("")
                                                setTag(new_ans)
                                            }
                                        } else if(tag[index] == "") {
                                            new_ans.splice(index, 1)
                                            setTag(new_ans)
                                        }
                                    }}
                                    onChangeText = {(text) => {
                                        setHasUnsavedChanges(true); 
                                        let new_tag = [...tag]
                                        new_tag[index] = text
                                        setTag(new_tag)
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setHasUnsavedChanges(true); 
                                        if(tag.length == 1) return setTag([""])
                                        let new_tag = [...tag]
                                        new_tag.splice(index, 1)
                                        setTag(new_tag)
                                    }}
                                    >
                                    <Text style={styles.cross_mark}>✖</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    )
                }
                <TouchableOpacity
                    style={styles.add_tag}
                    onPress={() => {
                        setTag([...tag, ""])
                    }}
                    >
                    <Text style={styles.add_tag_text}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        
        
        {
            fix_var == -1 ?
            <TouchableOpacity
            style={styles.add_to_list}
            onPress={() => {
                const output = getOutput()
                console.log(output)
                Alert.alert(
                    "Add to List",
                    "Do you confirm the above information is correct?",
                    [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => {
                            api._addItem(output)
                            props.navigation.navigate("HomeScreen", {})
                        }},
                      ],
                )
                
            }}
        >
            <Text>Add To List</Text>

        </TouchableOpacity>
        
        :

        <TouchableOpacity
            style={styles.add_to_list}
            onPress={() => {
                const output = getOutput()
                console.log(output)
                Alert.alert(
                    "Edit List",
                    "Do you confirm the above information is correct?",
                    [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => {
                            api._editItem(fix_var, output)
                            setHasUnsavedChanges(false)
                            setCardUUID(uuid.v4())
                            // props.navigation.navigate("HomeScreen", {})
                            alert('Saved')
                        }},
                      ],
                )
                
            }}
        >
            <Text>Edit List</Text>

        </TouchableOpacity>
    
    
        }
    </View>
}


const styles = StyleSheet.create(
    {
        name: {
            fontSize: 20
        },
        line: {
            width: '100%',
            height: 1,
            backgroundColor: '#000',
            marginTop: 10,
            marginBottom: 12,
        },
        owner: {
            fontSize: 16,
            color: '#666'
        },
        location: {
            fontSize: 16,
            color: '#666'
        },
        contactNumber: {
            fontSize: 16,
            color: '#666'
        },
        footnote: {
            marginTop: 20,
            marginBottom: 16,
            backgroundColor: '#fff',
            padding: 10,
            borderColor: '#000',
            borderWidth: 1
        },
        flex_direction_row : {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        lateral: {
            flexDirection: 'row'
        },
        vertical: {
            flexDirection: 'column'
        },
        add_button: {
            marginLeft: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#ccc'
        },
        answer_box: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 10,
            marginBottom: 10,
            borderColor: '#ccc',
            borderWidth: 2
        },
        incorrect_box: {
            paddingHorizontal: 10,
            paddingVertical: 7,
            marginTop: 10,
            marginBottom: 10,
            borderColor: '#ccc',
            borderWidth: 2
        },
        tag_box: {
            paddingBottom: 20,
            paddingTop: 5
        },
        tag_title: {
            marginBottom: 5
        },
        add_tag: {
            width: 35,
            height: 35,
            borderRadius: 30,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        add_tag_text: {
            fontSize: 22
        },
        cross_mark: {
            fontSize: 20,
            paddingBottom: 5,
            paddingRight: 15
        },
        tag_textinput: {
            paddingVertical: 3,
            paddingRight: 20,
            paddingLeft: 20
        },
        tag_item: {
            marginRight: 10,
            marginBottom: 12,
            borderRadius: 30,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center'
        },
        add_to_list: {
            margintop: 10,
            marginLeft: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            width: 100,
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#ccc'
        },
        delete_button: {
            alignSelf: 'flex-end',
            marginBottom: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            width: 75,
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#ccc'
        },
        delete_text: {
            textAlign: 'center'
        },
        picture: {
            height: 100,
            width: 100,
            marginRight: 15
        }
    }
)