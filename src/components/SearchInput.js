import { View, Text, FlatList } from 'react-native'
import React from 'react'

const SearchInput = ({ data, input, setInput }) => {
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
                        return (
                            <View style={{ marginVertical: 10, gap: 10, flexDirection: 'row' ,alignItems:'center'}}>
                                <View style={{
                                    width: 50, height: 50, borderRadius: 8, padding: 10,
                                    backgroundColor: '#4b6cb7',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>{item?.employeeName?.charAt(0)}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{item?.employeeName}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{item?.designation} ({item?.employeeId})</Text>
                                </View>
                            </View>
                        )
                    }

                }}
            />

        </View>
    )
}

export default SearchInput