import { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native"

export default function CardPreview(props) {

    const card = props.card

    return (
        <View style={styles.quest_wrapper}>
            <View style={[styles.quest_box, {backgroundColor: props.selected ? '#b6d0d1': '#aaa'}]}>
                    
                    
                    <View style={styles.text_box}>

                        {/* {Card Name} */}
                        <View>
                            <Text style={styles.title}>{card.name}</Text>
                        </View>

                        {/* {Line} */}
                        <View style={[styles.line, {marginBottom: 10}]}></View>

                        {/* Content */}
                        <View style={styles.lateral}>
                            {/* Image */}
                            <Image source={card.picture == null ? require('../../assets/icon.png') : {uri: card.picture}} style={styles.image}/>

                            {/* Info */}
                            <View style={styles.vertical}>
                                <Text style={styles.info}>{card.owner}</Text>
                                <Text style={styles.info}>{card.location}</Text>


                                <Text style={styles.info}>
                                <Text style={{color:"white"}}>上次維修日期: </Text>
                                <Text style={{color: "#d5fcff"}}>{new Date(card.lastMaintenanceDate).getDate().toString()}/{(new Date(card.lastMaintenanceDate).getMonth() + 1).toString()}
                                
                                {
                                    new Date(card.lastMaintenanceDate).getFullYear() != new Date().getFullYear() ?
                                    "/" + new Date(card.lastMaintenanceDate).getFullYear().toString()
                                    :
                                    ""
                                }
                            
                                </Text>
                                </Text>
                            </View>
                        </View>


                        {/* Card */}
                        <View style={styles.tag_container}>
                            {
                                card.tag ? card.tag.map((item, index) => {
                                    return <View key={index}><Text style={styles.tag_text}>{item}</Text>
                                        </View>
                                }) : <></>
                            }
                        </View>
                        
                    </View>

            </View>

        </View>
    )
}


const styles = StyleSheet.create(
    {
        quest_wrapper: {
            width: '100%',
            paddingHorizontal: 25,
            paddingVertical: 10
        },
        quest_box: {
            paddingVertical: 8,
            backgroundColor: '#aaa',
            justifyContent: 'space-around'
        },
        lateral: {
            flexDirection: 'row'
        },
        vertical: {
            flexDirection: 'column'
        },
        image: {
            width: 70,
            height: 70,
            marginRight: 30
        },
        quest_flexdir: {
            width: '100%',
            flexDirection: 'row'
        },
        text_box: {
            justifyContent: 'space-around',
            paddingVertical: 8,
            paddingHorizontal: 20,
            flex: 3
        },
        title: {
            flexWrap: 'wrap',
            color: 'white',
            fontSize: 22
        },
        info: {
            flexWrap: 'wrap',
            color: '#d5fcff',
            fontSize: 16
        },
        line: {
            width: '100%',
            height: 3,
            backgroundColor: '#fff'
        },
        tag_container: {
            alignItems: 'baseline',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        tag_text: {
            textAlign: 'center',
            backgroundColor: '#fffd',
            marginTop: 5,
            paddingVertical: 3,
            paddingHorizontal: 7,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#ccc',
            marginRight: 5
        }

    }
)