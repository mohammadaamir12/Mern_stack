import { View, Text,TextInput,ScrollView,TouchableOpacity,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import axios from 'axios';
import { AddEmployees, BaseUrl } from '../config/config';


const Addemployee = ({navigation}) => {
    const [employeeName,setEmployeeName]=useState('')
    const [employeeId,setEmployeeId]=useState('')
    const [employeePhone,setEmployeePhone]=useState('')
    const [designation,setDesignation]=useState('')
    const [dateOfBirth,setDateOfBirth]=useState('')
    const [joiningDate,setJoiningDate]=useState('')
    const [salary,setSalary]=useState('')
    const [address,setAddress]=useState('')

    const add=()=>{
      console.log(employeeId);
        const employ={
     employeeName:employeeName,
     employeeId:employeeId,
      designation:designation,
      phoneNumber:employeePhone,
      dateOfBirth:dateOfBirth,
      joiningDate:joiningDate,
      activeEmployee:true,
      salary:salary,
      address:address
        };
        axios.post(BaseUrl+AddEmployees,employ)
          .then(function (response) {
            console.log(response);
           Alert.alert('Registration Successful','You can it on this page')
           navigation.navigate('EmployeeLists')
           setEmployeeName('')
           setAddress('')
           setDateOfBirth('')
           setDesignation('')
           setEmployeeId('')
           setEmployeePhone('')
           setSalary('')
           setJoiningDate('')
          })
          .catch(function (error) {
            console.log(error.response);
            Alert.alert('Registration Failed')
          });
    }
  return (
    <ScrollView style={{backgroundColor:'#fff',flex:1}} contentContainerStyle={{alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10,justifyContent:'center',width:'92%'}}>
         <TouchableOpacity onPress={()=>navigation.goBack()} activeOpacity={0.8} style={{position:'absolute',left:0,}}>
        <AntDesign  name='arrowleft' color={'#000'} size={24} />
        </TouchableOpacity>
        <View >
        <Text style={{fontSize:22,fontWeight:'700',color:'#000', }}>Add a New Employee</Text>
        </View>
        </View>
        <View style={{width:'92%',marginTop:10}}>
            <View>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Employee Name</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:-Rahul'  value={employeeName} onChangeText={setEmployeeName} />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Employee Id</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:-10034' value={employeeId} onChangeText={setEmployeeId}  />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Designation</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:-Software Engineer' value={designation} onChangeText={setDesignation}  />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Employee Phone Number</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:- 1234567890' value={employeePhone} onChangeText={setEmployeePhone}  />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Date of Birth</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:- 1 march 2000' value={dateOfBirth}  onChangeText={setDateOfBirth}  />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Joining Date</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:- 14 june 2023' value={joiningDate} onChangeText={setJoiningDate}   />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Salary</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:- 10000000' value={salary} onChangeText={setSalary} />
            </View>
            <View style={{marginTop:5}}>
            <Text style={{fontSize:16,color:'#000',fontWeight:'600',marginBottom:5}}>Address</Text>
            <TextInput style={{backgroundColor:'#D3D3D3',borderRadius:10,elevation:2,paddingStart:10}} placeholder='Eg:- Moti Nagar,Delhi' value={address} onChangeText={setAddress}  />
            </View>
           <TouchableOpacity activeOpacity={0.7} onPress={add} style={{alignItems:'center',marginTop:30,backgroundColor:'blue',borderRadius:30,paddingVertical:10,elevation:5}}>
            <Text style={{color:'#fff',fontSize:20,}}>Add Employee</Text>
           </TouchableOpacity>
        </View>
      
    </ScrollView>
  )
}

export default Addemployee