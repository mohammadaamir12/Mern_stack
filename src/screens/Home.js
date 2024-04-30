import { View, Text, ScrollView, TextInput,StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <StatusBar backgroundColor={"#7f7fd6"} />
      <LinearGradient colors={['#7f7fd6', '#e9e4f0',]} style={{ flex: 1 }}>
        <View style={{padding:12}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <AntDesign name="barschart" size={30} color={'#808080'} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#414a4c' }}>Employee Management</Text>
          {/* <TextInput placeholder='Employee' style={{paddingVertical:hp('1%'),paddingHorizontal:wp('40%'),paddingStart:10,borderRadius:10}} /> */}
          <Entypo name="lock" size={30} color={'#808080'} />
        </View>
        <View style={{alignItems:'center',marginTop:20,flexDirection:'row',gap:20,marginHorizontal:10}}>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('EmployeeLists')} style={{
            backgroundColor:'#d3cce3',
            padding:12,
            borderRadius:6,
            alignItems:'center',
            justifyContent:'center',
            flex:1
          }}>
            <View style={{
              width:50,
              height:50,
              borderRadius:25,
              backgroundColor:'#fff',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <Entypo name="users" size={24} color={'#000'} />
            </View>
            <Text style={{marginTop:7,fontWeight:'600',color:'#000'}}>Employee List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('MarkAttendance')} style={{
            backgroundColor:'#d3cce3',
            padding:12,
            borderRadius:6,
            alignItems:'center',
            justifyContent:'center',
            flex:1
          }}>
            <View style={{
              width:50,
              height:50,
              borderRadius:25,
              backgroundColor:'#fff',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <FontAwesome5 name="user-check" size={24} color={'#000'} />
            </View>
            <Text style={{marginTop:7,fontWeight:'600',color:'#000'}}>Mark Attendance</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:20,backgroundColor:'#f7f2f2',paddingHorizontal:10,paddingVertical:10,borderRadius:7}}>
          <TouchableOpacity style={{backgroundColor:'#be93c5',borderRadius:6,padding:10,flexDirection:'row',alignItems:'center',marginVertical:10}}>
            <View style={{padding:7,width:'45',height:45,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <Entypo name="news" size={24} color={'#000'} />
            </View>
            <Text style={{marginLeft:10,fontSize:16,fontWeight:'600',flex:1}}>Attendance Reports
            </Text>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={'#000'} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Summary')} style={{backgroundColor:'#be93c5',borderRadius:6,padding:10,flexDirection:'row',alignItems:'center',marginVertical:10}}>
            <View style={{padding:7,width:'45',height:45,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="summarize" size={24} color={'#000'} />
            </View>
            <Text style={{marginLeft:10,fontSize:16,fontWeight:'600',flex:1}}>Summary Reports
            </Text>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={'#000'} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#be93c5',borderRadius:6,padding:10,flexDirection:'row',alignItems:'center',marginVertical:10}}>
            <View style={{padding:7,width:'45',height:45,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="report" size={24} color={'#000'} />
            </View>
            <Text style={{marginLeft:10,fontSize:16,fontWeight:'600',flex:1}}>All Generate Reports
            </Text>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={'#000'} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#be93c5',borderRadius:6,padding:10,flexDirection:'row',alignItems:'center',marginVertical:10}}>
            <View style={{padding:7,width:'45',height:45,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <Entypo name="users" size={24} color={'#000'} />
            </View>
            <Text style={{marginLeft:10,fontSize:16,fontWeight:'600',flex:1}}>Overtime Employee
            </Text>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={'#000'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:20,flexDirection:'row',alignItems:'center',gap:20}}>
          <View style={{backgroundColor:'#bdc3c7',borderRadius:6,padding:12,alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <Entypo name="users" size={24} color={'#000'} />
            </View>
            <Text style={{marginTop:7,color:'#808080'}}>Attendance Criteria</Text>
          </View>
          <View style={{backgroundColor:'#bdc3c7',borderRadius:6,padding:12,alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <AntDesign name="barschart" size={30} color={'#000'} />
            </View>
            <Text style={{marginTop:7,color:'#808080'}}>Increase Workflow</Text>
          </View>
        </View>
        <View style={{marginTop:20,flexDirection:'row',alignItems:'center',gap:20}}>
          <View style={{backgroundColor:'#bdc3c7',borderRadius:6,padding:12,alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <Entypo name="users" size={24} color={'#000'} />
            </View>
            <Text style={{marginTop:7,color:'#808080'}}>Cost Saving</Text>
          </View>
          <View style={{backgroundColor:'#bdc3c7',borderRadius:6,padding:12,alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{width:35,height:35,borderRadius:7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <AntDesign name="barschart" size={30} color={'#000'} />
            </View>
            <Text style={{marginTop:7,color:'#808080'}}>Employee Performance</Text>
          </View>
        </View>
        </View>
      </LinearGradient>
    </ScrollView>

  )
}

export default Home