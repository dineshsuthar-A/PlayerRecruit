import * as SecureStore from 'expo-secure-store';
export const baseURL = "http://ljusa.flipclip.co:2060/";

export const getToken = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return token;
}