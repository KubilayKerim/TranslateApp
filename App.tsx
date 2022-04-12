import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [originText, setOriginText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('tr');

  const privatekey = "YOURAPIKEY";
  
  const translateTextRequest = () => {
    fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${
        privatekey
      }&q=${originText}&source=${source}&target=${target}`,
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        
        setTranslatedText(json.data.translations[0].translatedText);
      });
  }

  useEffect(() => {
    translateTextRequest();
  }, [originText]);


  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
        <Text>Translate App</Text>
        <Pressable style={{backgroundColor:'blue', width:300, height:50, justifyContent:'center', alignItems:'center', alignSelf:'center'}}
          onPress={()=>{
            setOriginText('');
            if(source=='en'){
              setSource('tr')
              setTarget('en')
            }
            else{
              setSource('en')
              setTarget('tr')
              }}}>
            <Text style={{color:'white'}}>
              {source=='en'?"Change language to Turkish English":"Dili İngilizce Türkçeye Çevir"}</Text>
          </Pressable>
        <TextInput value={originText} onChangeText={(value)=>{setOriginText(value)}} placeholder={source=='en'?'Enter your text here':'Metninizi buraya girin'} multiline={true} textAlignVertical='top' style={{ flex:1, width:'90%', }}>
        </TextInput>
        <View style={{ flex:1, width:'90%', }}>
            <Pressable style={{backgroundColor: 'blue', width: 100, height: 50, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => translateTextRequest()}>
              <Text style={{ color: 'white' }}>{source == 'en' ? "Translate" : "Çevir"}</Text>
            </Pressable>
          <Text>{translatedText}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
