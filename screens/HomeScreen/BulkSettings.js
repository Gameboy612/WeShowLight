import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native"
import * as api from '../../scripts/api'


export default function BulkSettings(props) {

    return (
        <>
            <TouchableOpacity
                style={[styles.button, styles.addtag]}
                onPress={() => {
                    props.navigation.navigate("BulkAddTagScreen", {index_arr: props.index_arr})
                }}
                >
                <Text style={styles.text}>Add Tag</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[styles.button, styles.removetag]}
                onPress={() => {
                    props.navigation.navigate("BulkRemoveTagScreen", {index_arr: props.index_arr})
                }}
                >
                <Text style={styles.text}>Remove Tag</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[styles.button, styles.delete]}
                onPress={() => {
                    Alert.alert(
                        "Bulk Remove",
                        "Are you sure you want to delete all selected questions?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                                isPreferred: true
                            },
                            {
                                text: "Yes",
                                style: "destructive",
                                isPreferred: false,
                                onPress: () => {
                                    api._removeQuestions(props.index_arr)
                                }
                            }
                        ]
                    )
                }}
                >
                <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create(
    {
        button: {
            position: "absolute",
            left: 20,
            zIndex: 10,
            backgroundColor: '#fff7',
            borderRadius: 32,
            width: 120,
            borderColor: '#ccc5',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        addtag: {
            bottom: 120
        },
        removetag: {
            bottom: 70
        },
        delete: {
            bottom: 20
        },
        text: {
            fontSize: 14,
            textAlign: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10
        }

    }
)