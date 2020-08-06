import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './Styles'
import { createStackNavigator } from '@react-navigation/stack';
import Month from './Month/Month'
import Header from '../Global/Header/Header'
import firestore from '@react-native-firebase/firestore'

const Stack = createStackNavigator();

export default function CalendarPage() {
	const [year, setYear] = useState(new Date().getFullYear().toString())
	const [months, setMonths] = useState([])
	const [storageReceived, setReceived] = useState(false)
	const update = (async () => {
		if (!storageReceived) {
			const ref = await firestore().collection('messages').doc('years').collection('yearList').doc(year).collection('months').get()
			setMonths(ref.docs.map(doc => doc.data().monthName))
			setReceived(true)
		}
	})()
	return (months.length != 0 ? (
		<View style={{ flex: 1 }}>
			<Header title="Calendar" page="Calendar" />
			{months.map(month => {
				return <Month month={month} year={year}/>
			})}
		</View>
	) : (
		<View style={{ flex: 1 }}>
			<Header title="Calendar" page="Calendar" />
			<Text>Couldn't find any entries. Start writing in the journal!</Text>
		</View>
	))

}