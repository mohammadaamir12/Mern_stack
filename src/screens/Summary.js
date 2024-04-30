import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Allattendancereport, BaseUrl } from '../config/config';
import axios from 'axios'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { DataTable } from 'react-native-paper';
import { parse, getMonth } from 'date-fns';

const Summary = () => {
    const [attendanceSummary, setAttendanceSummary] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const [day, setDay] = useState('');
  const [years, setYear] = useState('');
    const goToNextMonth = () => {
        const nextMonth = moment(currentDate).add(1, "months");
        setCurrentDate(nextMonth);
        setadd()
        
    }
    console.log('jhgfds',currentDate);
    const goToPrevMonth = () => {
        const prevMonth = moment(currentDate).subtract(1, "months");
        setCurrentDate(prevMonth);
        setsubtract()
        
    }
    const setadd=()=>{
        const dateObject = new Date(currentDate);
        const month = dateObject.getUTCMonth()+1; // Adding 1 because months are zero-indexed
        const year = dateObject.getUTCFullYear();
        setDay(month)
        setYear(year) 
    }
    const setsubtract=()=>{
        const dateObject = new Date(currentDate);
        const month = dateObject.getUTCMonth()-1; // Adding 1 because months are zero-indexed
        const year = dateObject.getUTCFullYear();
        setDay(month)
        setYear(year)
    }
    const formatDate = (date) => {
        return date.format("MMMM, YYYY")
    }
    const fetchAttendanceData = () => {
      

        console.log(day,years);
        axios.get(`${BaseUrl}${Allattendancereport}`, {
            params: {
                month: 4,
                year: 2024,
            },
        })
            .then(function (response) {

                console.log('attendance', response.data.report);
                setAttendanceSummary(response.data.report)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    useEffect(() => {
        fetchAttendanceData();
    }, [currentDate])
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20 }}>
                <MaterialIcons onPress={goToPrevMonth} name='keyboard-arrow-left' color={'#000'} size={24} />
                <Text>{formatDate(currentDate)}</Text>
                <MaterialIcons onPress={goToNextMonth} name='keyboard-arrow-right' color={'#000'} size={24} />
            </View>
            <View style={{marginHorizontal:12}}>
            {attendanceSummary?.map((item, index) => (
  <View key={index} style={{ marginVertical: 10 }}>
    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
      <View style={{
        width: 50, height: 50, borderRadius: 8,
        backgroundColor: '#4b6cb7',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>{item?.name?.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{item?.name}</Text>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{item?.designation} ({item?.employeeId})</Text>
      </View>
    </View>
    <View style={{marginTop:15,margin:5,padding:5,backgroundColor:'#a1ffce',borderRadius:5}}>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>P</DataTable.Title>
                <DataTable.Title>A</DataTable.Title>
                <DataTable.Title>HD</DataTable.Title>
                <DataTable.Title>H</DataTable.Title>
                <DataTable.Title>NW</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
                <DataTable.Cell>{item?.present}</DataTable.Cell>
                <DataTable.Cell>{item?.absent}</DataTable.Cell>
                <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                <DataTable.Cell>1</DataTable.Cell>

                <DataTable.Cell>8</DataTable.Cell>

            </DataTable.Row>
        </DataTable>
    </View>
  </View>
))}

            </View>
        </ScrollView>
    )
}

export default Summary