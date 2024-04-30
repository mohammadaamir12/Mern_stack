import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import { AllEmployeesLists, Allattendance, BaseUrl, attendance } from '../config/config';
import moment from 'moment'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const MarkAttendance = ({navigation}) => {
    const [currentDate, setCurrentDate] = useState(moment())
    const [employees, setEmployees] = useState([])
    const [attendance, setAttendance] = useState([])
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
    useFocusEffect(
        useCallback(() => {
          fetchEmployeeData();
          fetchAttendanceData();
        }, [currentDate])
      );
    const fetchEmployeeData = () => {
        axios.get(BaseUrl + AllEmployeesLists)
            .then(function (response) {

                console.log(response.data.all);
                setEmployees(response.data.all)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const fetchAttendanceData = () => {
        axios.get(BaseUrl + Allattendance, {
            params: {
                date: currentDate.format("MMMM D,YYYY")
            },
        })
            .then(function (response) {

                console.log('attendance',response.data);
                setAttendance(response.data)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    const employeesWithAttendance = employees.map((employee) => {
        const attendanceRecord = attendance.find(
          (record) => record.employeeId === employee.employeeId
        );
        return {
          ...employee,
          status: attendanceRecord ? attendanceRecord.status : '',
        };
      });
    console.log('status',employeesWithAttendance);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
           
            <TouchableOpacity >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20 }}>
                    <MaterialIcons onPress={goToPrevDay} name='keyboard-arrow-left' color={'#000'} size={24} />
                    <Text>{formatDate(currentDate)}</Text>
                    <MaterialIcons onPress={goToNextDay} name='keyboard-arrow-right' color={'#000'} size={24} />
                </View>
                <View style={{ marginHorizontal: 12 }}>
                    {employeesWithAttendance.map((item, index) => (
                        <TouchableOpacity onPress={()=>navigation.navigate('User', {name:item?.employeeName,id:item?.employeeId,design:item?.designation,salary:item?.salary })} key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8 }}>
                            <View style={{
                                width: 50, height: 50, borderRadius: 8,
                                backgroundColor: '#4b6cb7',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>{item?.employeeName?.charAt(0)}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{item?.employeeName}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{item?.designation} ({item?.employeeId})</Text>
                            </View>
                            {item?.status && (
                                <View style={{
                                    width:40,
                                    height:40,
                                    borderRadius:30,
                                    padding:10,
                                    backgroundColor:'#09ad14',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <Text style={{
                                        fontSize:16,
                                        color:'#fff',
                                        fontWeight:'bold'
                                    }}>{item?.status.charAt(0)}</Text>
                                </View>
                            ) }
                        </TouchableOpacity>
                    ))}
                </View>

            </TouchableOpacity>


        </View>
    )
}

export default MarkAttendance