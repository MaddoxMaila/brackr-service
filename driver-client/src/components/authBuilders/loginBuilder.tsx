import React, {useContext, useState} from "react";
import { View, StyleSheet } from 'react-native'
import { AppButton, Media, Input, Texter, Space } from '../base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {AuthContext} from '../../contexts/Authentication'
import { ResponseType } from "../../types";
import AsyncStorage from "@react-native-community/async-storage";

interface LoginBuilderProps {}

const LoginBuilder : React.FC<LoginBuilderProps> = () => {

    const {authUser, setAuthState, AuthState} = useContext(AuthContext)
    const [email, setEmail] = useState<any>("")
    const [password, setPassword] = useState<any>("")

    const {user, apikey, authToken, loading, e} = AuthState

    return (
        <View style={styles.view}>
            <Media 
                Left={<Texter text="Brackr" font="text-max"/>}
                Body={null}
                Right={
                    <AppButton 
                        title="Create Account"
                        loading={false}
                        block={false}

                    />
                }
            />
            <Space size="10%" />

            <Texter text="Login Into Your Brackr Account" font="text-max" />

            <Space size="2%" />
            <Media 
                Right={false}
                Body={
                    <View>
                        <Texter text="Email or Username" font="text-grey-sm" />
                        <Space size="0.7%" />
                        <Input hint="Email or username" type="email-address" ontype={text => setEmail(text)}/>

                        <Space size="2%" />

                        <Texter text="Password" font="text-grey-sm" />
                        <Space size="0.7%" />
                        <Input hint="Password" type="visible-password" secure={true} ontype={text => setPassword(text)}/>
                        <Texter text={AuthState?.authToken} />
                        <Space size="2%" />

                        <Media 
                            Left={
                                <AppButton press={() => {

                                    // authUser({username : email});
                                    // if(Account) alert('Hello World')
                                    
                                    authUser({email: email, password: password}, async (data: any) => {
                                        console.log(data)
                                        if(!data?.error){
                                            await AsyncStorage.setItem('jwt-token', data.response.token)
                                            const {user, token} = data.response
                                            setAuthState({
                                                authToken: token,
                                                user: user,
                                                apikey,
                                                loading,
                                                e
                                            })

                                            alert(AuthState.authToken)
                                            
                                        }
                                    })

                                }} 
                                title="Login"
                                loading={false}
                                block={true} 
                             />
                            }

                            Body={null}

                            Right={null}
                        />
                    </View>
                }
            />

        </View>
    )
}

export default LoginBuilder

const styles = StyleSheet.create({
    view : {
        padding: wp("3%")
    }
})