import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import Header from './Header/HeaderSettings'
import styles from './Styles'

export default function SettingsPage({ navigation, route }) {
	const [name, updateName] = useState()

	const setName = (name) => {
		let user = auth().currentUser
		user.updateProfile({ displayName: name })
	}

	function logout() {
		auth()
			.signOut()
			.catch(function (error) {
				console.log(error)
			})
	}

	useEffect(() => {
		auth().onAuthStateChanged(function (user) {
			if (!user) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Login' }],
				})
			}
		})
	})

	return (
		<View style={styles.container}>
			<Header navigation={navigation} title="Settings" />
			<View style={styles.settingsContent}>
				<View style={{ flexDirection: 'row' }}>
					<TextInput
						style={styles.input}
						placeholder="Enter a new name"
						underlineColorAndroid="#A2A5BD"
						placeholderTextColor="#A2A5BD"
						onChangeText={(text) => updateName(text)}
					/>
					<Button
						// style={{ flexDirection: 'row' }}
						title="Save"
						onPress={() => {
							if (name != null) setName(name)
						}}
					/>
				</View>
			</View>
			{/* <View>
				<Button
					title="Done"
					onPress={() => {
						route.params.onGoBack()
						navigation.goBack()
					}}
				/>
			</View> */}
			<View>
				<Button title="Logout" onPress={() => logout()} />
			</View>
		</View>
	)
}
