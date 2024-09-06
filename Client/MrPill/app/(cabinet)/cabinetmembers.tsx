import React, { useCallback } from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';
import { AppHomeButton } from "@/components/AppHomeButton";
import { MrPillLogo } from '@/components/MrPillLogo';
import { strFC } from "@/components/strFC";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RequestHandler from '@/RequestHandler';
import DataHandler from '@/DataHandler';

const backgroundColorLight = "#71e98d"
const backgroundColorMain = "#c8e6e0"
const borderColor = "#5a000b"

type Member = {
  firstName: string,
  lastName: string,
  phoneNumber: string
};

const CabinetMembersPage: React.FC = () => {

  const cabinet = DataHandler.get('cabinet');
  const [members, setMembers] = React.useState<[Member?]>([]);

  useFocusEffect(
    useCallback(() => {

      const sendGetMembersRequest = async () => {
        if (await RequestHandler.sendRequest('getCabinetMembers')) {
          setMembers(JSON.parse(RequestHandler.getResponse().request._response));
        }
      };
  
      sendGetMembersRequest();

      return () => {
        //console.log('Screen was unfocused or navigating away');
      };
    }, [])
  );

  function renderMember(member?: Member, id?: number) {
    if (!member) return;
    const memberIsTheUser = "0" + member.phoneNumber == DataHandler.getUser().PhoneNumber;
    return (
      <Pressable key={id} onPress={()=>{console.log('y')}}>
        
        <View style={styles.reminderBox}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
      
            <View style={[styles.plusMinusButton, {elevation: 5, backgroundColor: "#90e665"}]}>
              {//<Image source={{uri: member.imagePath}} style={{height: 50, width: 50}} resizeMode='center'></Image>
              }
            </View>
              
            <View style={{flexGrow: 1}}>
              
              <ThemedText style={{fontWeight: 'bold', marginRight: 35, textAlign: 'center'}}>{memberIsTheUser ? "אני" : `${member.firstName} ${member.lastName}`}</ThemedText>
              {!memberIsTheUser && <ThemedText style={{marginRight: 35, textAlign: 'center'}}>0{member.phoneNumber}</ThemedText>}
            </View>
    
          </View>
        </View>

      </Pressable>
    )
  }

  // MAIN PAGE LAYOUT
  return (    
    <View style={{backgroundColor: backgroundColorMain, flex: 1,}}>
        <View style={{flex: 1, marginBottom: 20}}>
        {MrPillLogo(0.5)}
            <View style={styles.pagetop}> 
                <ThemedText style={{lineHeight: 30, textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 8}}>
                    חברי ארון התרופות "{cabinet.medicineCabinetName}" 
                </ThemedText>
                <ParallaxScrollView backgroundColor={backgroundColorLight}>
                  {members.map((member, index) => renderMember(member, index))}
                </ParallaxScrollView>
            </View>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  pagetop: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: backgroundColorLight,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: borderColor,
    minHeight: 100,
    marginHorizontal: 15,
    padding: 5,
    elevation: 8,
  },
  pagebottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 5,
    maxHeight: 180
  },
  row: {
    flex: 1,
    minHeight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  reminderBox: {
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderColor: borderColor,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    minWidth: 300,
  },
  plusMinusButton: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: backgroundColorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 5,
  },
  plusMinusText: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
  }
});

export default CabinetMembersPage;