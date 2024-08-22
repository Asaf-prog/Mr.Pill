import React from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';
import { AppHomeButton } from "@/components/AppHomeButton";
import { MrPillLogo } from '@/components/MrPillLogo';
import { strFC } from "@/components/strFC";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import DataHandler from "@/DataHandler";
import { Pressable } from 'react-native';

const backgroundColorLight = "#c9c9ff"
const backgroundColorMain = "#dff5ff"
const borderColor = "#8a8aa7"

function helloMessage() {
  let hours = new Date().getHours();
  console.log(hours)
  if      (hours > 0  && hours <= 10) return "בוקר טוב";
  else if (hours > 10 && hours <= 17) return "צהריים טובים";
  else if (hours > 17 && hours <  22) return "ערב טוב";

  else return "לילה טוב";
}

type Reminder = {
  userId: number;
  reminderTime: string;
  message?: string;
  isRecurring: boolean;
  recurrenceInterval?: string;
};

const mockreminder = {
  "userId": 1,
  "reminderTime": "2024-08-16T10:00:00Z",
  "message": "Take your pill",
  "isRecurring": true,
  "recurrenceInterval": "PT24H"
}

const HomePage: React.FC = () => {

  const dateTime = new Date();

  function renderReminder(reminder?: Reminder) {
    return (
      <View style={styles.reminderBox}>
        <View style={{flexDirection: 'row'}}>
  
        <Pressable onPress={()=>{}}>
          <View style={[styles.plusMinusButton, {backgroundColor: "#90e665"}]}>
            <ThemedText style={[styles.plusMinusText, {paddingTop: 21.5}]}>✔</ThemedText>
          </View>
        </Pressable>
  
        <Pressable onPress={()=>{}}>
          <View style={[styles.plusMinusButton, {backgroundColor: "#cc4e4e"}]}>
            <ThemedText style={[styles.plusMinusText, {paddingTop: 18}]}>✖</ThemedText>
          </View>
        </Pressable>
  
        <View>
          <ThemedText>Calcium carbonate</ThemedText>
          <ThemedText>בשעה 14:00 לאחר האוכל </ThemedText>
        </View>
  
        </View>
      </View>
    )
  }

  const user = DataHandler.getUser()

  return (
    <View style={{backgroundColor: backgroundColorMain, flex: 1}}>
      <View style={{flex: 1, minHeight: 40}}>
        {MrPillLogo(1)}
      </View>
      <View style={{flex: 1, minHeight: 50,}}>
        <View style={styles.pagetop}> 

          <ThemedText style={{fontSize: 18, textAlign: 'center'}}>{helloMessage()} <ThemedText style={{fontSize: 18, fontWeight: 'bold',}}>{user.FirstName + " " + user.LastName + ".\n"}</ThemedText>תזכורות להיום:</ThemedText>
          <ParallaxScrollView backgroundColor={backgroundColorLight}>
            {renderReminder()}
            {renderReminder()}
            {renderReminder()}
            {renderReminder()}
            {renderReminder()}
          </ParallaxScrollView>
        
        </View>
      </View>
      <View style={styles.pagebottom}>

        <View style={styles.row}>
          <AppHomeButton ButtonContent={strFC("תרופות משותפות")} ButtonAction={()=>{router.navigate('/(cabinet)/mycabinets')}}/>
          <AppHomeButton ButtonContent={strFC("התרופות שלי")} ButtonAction={()=>{router.navigate('/(pills)/mypills')}}/>
        </View>

        <View style={styles.row}>
          <AppHomeButton ButtonContent={strFC("תזכורות")} ButtonAction={()=>{router.navigate('/(reminders)/reminders')}}/>
          <AppHomeButton ButtonContent={strFC("הוסף תרופה חדשה")} ButtonAction={()=>{router.navigate('/(pills)/addpill')}}/>
        </View>

      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  pagetop: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: backgroundColorLight,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: borderColor,
    minHeight: 100,
    marginHorizontal: 15,
    padding: 5,
  },
  pagebottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    minHeight: 150,
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 5,
  },
  row: {
    flex: 1,
    minHeight: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColorMain,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  reminderBox: {
    backgroundColor: 'pink',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plusMinusText: {
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
  }
});

export default HomePage;
