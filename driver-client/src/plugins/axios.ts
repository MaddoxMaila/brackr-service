import AsyncStorage from '@react-native-community/async-storage'
import axios, {AxiosRequestConfig, ResponseType} from 'axios'
import { COMPANY_KEY } from '../constants'

const JWTRequestMiddleware = async (request: AxiosRequestConfig) => {

    const JWTtoken = await AsyncStorage.getItem('jwt-token')
    console.log(JWTtoken)
    if (JWTtoken) request.headers['x-jwt'] = JWTtoken
  
    return request
}

const ApiKeyRequestMiddleware = (request: AxiosRequestConfig) => {

    const ApiKeyToken = COMPANY_KEY
    if (ApiKeyToken) request.headers['x-access-key'] = ApiKeyToken
  
    return request
}

// Request interceptor
axios.interceptors.request.use(ApiKeyRequestMiddleware)
axios.interceptors.request.use(JWTRequestMiddleware)

const BuildResponseMiddleware = (response: any) => response

const ErrorResponseMiddleware = (error: any) => {
    const { status } = error.response

    if (status >= 500) {
  
    }
  
    if (status === 401) {
      
    }
  
    return Promise.reject(error)
}

axios.interceptors.response.use(BuildResponseMiddleware) // , ErrorResponseMiddleware