import * as SecureStore from 'expo-secure-store';
export const baseURL = "http://192.168.51.158:5000/";

export const getToken = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return token;
}