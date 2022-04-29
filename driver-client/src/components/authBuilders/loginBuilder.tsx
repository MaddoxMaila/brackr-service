import axios from "axios";
import React, {useState} from "react";
import { API_URL } from "../../constants";
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from "../../store/modules/auth.module";
import { AppButton, Media, Input, Texter, Space } from '../base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface LoginBuilderProps {}

const LoginBuilder : React.FC<LoginBuilderProps> = () => {

    const auth = useSelector((state: any) => state.auth.auth)
    console.log(auth)
    const dispatch = useDispatch()

    const [form, setForm] = useState<{email: string | number, password: any}>({email: "", password: ""})


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
                        <Input hint="Email or username" type="email-address" ontype={text => setForm({email: text, password: form.password})}/>

                        <Space size="2%" />

                        <Texter text="Password" font="text-grey-sm" />
                        <Space size="0.7%" />
                        <Input hint="Password" type="visible-password" secure={true} ontype={text => setForm({email: form.email, password: text})}/>
                        <Texter text={auth.token} />
                        <Space size="2%" />

                        <Media 
                            Left={
                                <AppButton press={() => {

                                    axios.post(`${API_URL}/auth/login`, form)
                                    .then(({data}) => {
                                        console.log(data)
                                        const {error, message, response} = data
                                        dispatch(setToken(response.token))
                                        console.log(auth)
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