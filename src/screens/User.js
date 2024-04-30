import { View, Text, TouchableOpacity,TextInput,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Allattendance, BaseUrl } from '../config/config';

const User = ({ route,navigation }) => {
    const [currentDate, setCurrentDate] = useState(moment())
    const [attendanceStatus, setAttendanceStatus] = useState('present')
    const { name, design, id, salary } = route.params;
    console.log(name);
    const goToNextDay = () => {
        const nextDate = moment(currentDate).add(1, "days");
        setCurrentDate(nextDate);
    }
    const goToPrevDay = () => {
        const prevDate = moment(currentDate).subtract(1, "days");
        setCurrentDate(prevDate);
    }
    const formatDate = (date) => {
        return date.format("MMMM D,YYYY")
    }
    const submitAttendance=()=>{
    const attendanceData={
        employeeId:id,
        employeeName:name,
        date:currentDate.format("MMMM D,YYYY"),
        status:attendanceStatus
    }
    axios.post(BaseUrl+Allattendance,attendanceData)
          .then(function (response) {
            console.log(response);
            if(response.status==200){
                Alert.alert('Mark attendance successfully')
                navigation.navigate('MarkAttendance')
            }
         
          })
          .catch(function (error) {
            console.log(error.response);
            Alert.alert('Failed')
          });
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20 }}>
                <MaterialIcons onPress={goToPrevDay} name='keyboard-arrow-left' color={'#000'} size={24} />
                <Text>{formatDate(currentDate)}</Text>
                <MaterialIcons onPress={goToNextDay} name='keyboard-arrow-right' color={'#000'} size={24} />
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10, margin: 8 }}>
                <View style={{
                    width: 50, height: 50, borderRadius: 8,
                    backgroundColor: '#4b6cb7',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>{name.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{design} ({id})</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 12 }}>Basic Pay : {salary}</Text>
            <View>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginHorizontal: 12,
                    letterSpacing: 3,
                    marginTop: 7
                }}>ATTENDANCE</Text>
            </View>
            <View style={{flexDirection:'row',gap:16,alignItems:'center',margin:10}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setAttendanceStatus('present')} style={{
                    backgroundColor: '#c4e0e5',
                    padding: 10,
                    borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10,flex:1,
                }}>
                {attendanceStatus === "present" ? <MaterialCommunityIcons name='circle-slice-8' color={'#000'} size={24} />:<Entypo name='circle' color={'#000'} size={24} />}
                
                   
                    <Text style={{color:'#000',fontSize:14}}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setAttendanceStatus('halfday')} style={{
                    backgroundColor: '#c4e0e5',
                    padding: 10,
                    borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10,flex:1,
                }}>
                {attendanceStatus === "halfday" ? <MaterialCommunityIcons name='circle-slice-8' color={'#000'} size={24} />:<Entypo name='circle' color={'#000'} size={24} />}
                
                   
                    <Text style={{color:'#000',fontSize:14}}>Halfday</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',gap:16,alignItems:'center',margin:10}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setAttendanceStatus('absent')} style={{
                    backgroundColor: '#c4e0e5',
                    padding: 10,
                    borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10,flex:1,
                }}>
                {attendanceStatus === "absent" ? <MaterialCommunityIcons name='circle-slice-8' color={'#000'} size={24} />:<Entypo name='circle' color={'#000'} size={24} />}
                
                   
                    <Text style={{color:'#000',fontSize:14}}>Absent</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setAttendanceStatus('holiday')} style={{
                    backgroundColor: '#c4e0e5',
                    padding: 10,
                    borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 10,flex:1,
                }}>
                {attendanceStatus === "holiday" ? <MaterialCommunityIcons name='circle-slice-8' color={'#000'} size={24} />:<Entypo name='circle' color={'#000'} size={24} />}
                
                   
                    <Text style={{color:'#000',fontSize:14}}>Holiday</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',gap:10,alignItems:'center',margin:10}}>
            <TextInput 
            style={{
                borderRadius:6,
                borderWidth:2,
                borderColor:'#e0e0e0',
                padding:8,
                flex:1
            }}
            placeholderTextColor='#000'
            placeholder='Advance'
            />
            <TextInput 
            style={{
                borderRadius:6,
                borderWidth:2,
                borderColor:'#e0e0e0',
                padding:8,
                flex:1
            }}
            placeholderTextColor='#000'
            placeholder='Bonus'
            />
            </View>
         <TouchableOpacity onPress={submitAttendance} style={{padding:12,backgroundColor:'#00c6ff',width:200,marginLeft:'auto',marginRight:'auto',marginTop:30,borderRadius:6}}>
            <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>Submit</Text>
         </TouchableOpacity>
        </View>
    )
}

export default User