import React, {useState, useEffect} from 'react';
import {View,KeyboardAvoidingView,Platform, Image, Text, StyleSheet,TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Avatar, Icon, Button } from 'react-native-elements'
import { ThemeProvider } from 'react-native-elements';


export default function ListProducts({navigation}) {
    const [token, setToken] = useState('');
    const [produtos, setProdutos] = useState();
    // console.warn(AsyncStorage.getItem('@storage_Key'));

    function teste(){
        navigation.navigate('Login');
    }

    function novo(){
      navigation.navigate('NewProduct');
    }

    async function listProdutos(){
    
      try {
         await api.get('api/products/list-products', {
          }).then((result) => {
              setProdutos(result.data)

          
          });
      } catch (error) {
              console.warn(error)
      }
          
      }

    async function confirmUserDeletion(product){
      console.warn(product)

      // event.preventDefault();
      const data = {
          "id": product.id,
      }


      try {
        await api.post('api/products/delete-products', data, {
         }).then((result) => {
             listProdutos();

         
         });
     } catch (error) {
             console.warn(error)
     }
      
    }

    function getActions(product){
      return (
          <>
              <Button onPress={() => navigation.navigate('UpdateProduct', product)} 
              type="clear"
              icon={<Icon name="edit" size={25} color="orange"/>}
              />
              <Button onPress={() => confirmUserDeletion(product)} 
              type="clear"
              icon={<Icon name="delete" size={25} color="red"/>}
              />
          </>
      )
  }


  function getItem({item}) {
    return (
      <ListItem style={styles.list} rightElement={getActions(item)} key={item.id}  >
        {/* <Avatar source={{uri: item.name}} /> */}
        <ListItem.Content>
        <ListItem.Title >{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.brand}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem ><Text>{item.price.toString()}</Text></ListItem>
        <ListItem >{getActions(item)}</ListItem>
        {/* <ListItem.Content>{getActions(user)}</ListItem.Content> */}
    </ListItem>

    )
  }



    useEffect(() => {

        async function listProdutos(event){
    
        try {
           await api.get('api/products/list-products', {
            }).then((result) => {
                setProdutos(result.data)

            
            });
        } catch (error) {
                console.warn(error)
        }
            
        }

        listProdutos();

    }, []);

    const Item = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name+' - '+item.brand+' - '+item.price}</Text>
        </View>
      );


    const renderItem = ({ item }) => (
        <Item item={item} />
      );

      //onPress={() =>  navigation.navigate('ListProducts',item)}
    

    return (
        <>

        <Text style={styles.titulotela}>
        <Button onPress={() => navigation.navigate('Login')} 
              type="clear"
              icon={<Icon name="arrow-back" size={25} color="orange"/>}
        />
          Lista de Produtos</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={produtos}
                renderItem={getItem}
            />

    <View style={{flexDirection: "row", padding:5, margin:10}}>
    <View style={{ flex: 1}}>
        <Button
        onPress={novo}
        title="Cadastrar"
        buttonStyle = {{backgroundColor: 'green'}}
        />
    </View>
    <View style={{ flex: 1}}>
        <Button
        onPress={teste}
        title="Logout"
        buttonStyle = {{backgroundColor: 'red', marginLeft:5}}
        />
    </View>
    </View>
    </>
    )
}

// const theme = {
//   Button: {
//     containerStyle: {
//       marginTop: 10
//     }
//   }
// }


const styles = StyleSheet.create({
    titulotela:{
        marginTop:50,
        marginBottom: 10,
        marginHorizontal: 10,
        fontSize:20,
        backgroundColor:"gray"
    },
    // buttonadd:{
    //     color:'red'
    // },
    list:{
      borderBottomWidth:5,
      borderBottomColor:'grey'
    },
    diva: {
        marginTop:50
    },
    container: {
      flex: 1,
      marginTop: 10,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 4,
      marginHorizontal: 10,
    },
    title: {
      fontSize: 16,
    },
  });