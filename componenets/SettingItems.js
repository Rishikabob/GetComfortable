import { TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const SettingItems = ({settingOptions}) => {
  return (
    <ScrollView style={styles.container}>
      {settingOptions.map(({title, subTitle, icon, onPress},index) => <TouchableOpacity onPress={onPress} style={styles.touchableContainer}key={title}>
        <View style={styles.innerItemsContainer}>
            <View style={styles.topItems}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color="white" />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
                {subTitle&&<Text style={styles.subTitleText} >{subTitle}</Text>}
            </View>
            <Ionicons style={{opacity: 0.4}}name="ellipsis-horizontal" size={18} color="black" />
        </View>
        
      </TouchableOpacity>
      
      
      )}
    </ScrollView>
  )
}

export default SettingItems

const styles = StyleSheet.create({
    container: {
        
    },
    innerItemsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems:'center',
        justifyContent: 'space-between'
    }, 
    titleText: {
        
        fontSize: 17,
        fontWeight: '500',
    },
    subTitleText: {
        opacity: 0.6,
        paddingTop: 5
    } ,
    touchableContainer: {
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
    },
    topItems: {
        paddingRight: 20,
        flexDirection: 'row'
    },
    iconContainer: {
        padding:5,
        borderRadius: 10,
        backgroundColor: '#00645F',
        
    },
    textContainer: {
        //backgroundColor:'red',
        flex:1,
    },
})