import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import SearchInput from '../components/SearchInput';
import { AllEmployeesLists, BaseUrl } from '../config/config';
import { useFocusEffect } from '@react-navigation/native';


const EmployeeLists = ({navigation}) => {
    const [employee,setEmployee]=useState([])
    const [input,setInput]=useState('')
    useFocusEffect(
      useCallback(() => {
        employeeList();
      }, [employee.employeeName])
    );
   

    const employeeList =()=>{
      axios.get(BaseUrl+AllEmployeesLists)
      .then(function (response) {
    
        console.log(response.data.all);
        setEmployee(response.data.all)
      })
      .catch(function (error) {
        console.log(error.response);
      });
    }
    
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:10,justifyContent:'center'}}>
        <TouchableOpacity style={{position:'absolute',left:10}} onPress={()=>navigation.goBack()} activeOpacity={0.8}>
        <AntDesign  name='arrowleft' color={'#000'} size={24} />
        </TouchableOpacity>
       <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',elevation:5,borderRadius:10,width:'75%',marginRight:8 }}>
        <TextInput style={{flex:1,paddingStart:10,color:'#000'}} placeholder='Search Employee' value={input} onChangeText={setInput}   />
       <AntDesign style={{paddingEnd:10}} name='search1' color={'#000'} size={24} />
       </View>
       {employee.length > 0 && (
        <TouchableOpacity style={{position:'absolute',right:4}} activeOpacity={0.8} onPress={()=>navigation.navigate('Addemployee')}>
        <Ionicons  name='add-circle' color={'blue'} size={40} />
        </TouchableOpacity>
       )}
       
       
      </View>
      {employee.length > 0 ?(
        <SearchInput data={employee} input={input} setInput={setInput}/>
       ):(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'#000',fontSize:16,fontWeight:'600'}}>No Data</Text>
          <Text style={{color:'#000',fontSize:16,fontWeight:'500'}}>Press on add button to register new employee</Text>
          <TouchableOpacity style={{marginTop:5}} activeOpacity={0.8} onPress={()=>navigation.navigate('Addemployee')}>
          <Ionicons  name='add-circle' color={'blue'} size={60} />
        </TouchableOpacity>
        </View>
       )}
       
                   
                        
                  
                 
                 
    </View>
  )
}

export default EmployeeLists