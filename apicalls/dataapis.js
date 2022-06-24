import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

exports.getStateData = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getstates", {
        headers: {
            "Authorization": token
        }
    });
}

exports.getethanicitydata = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getethnicity", {
        headers: {
            "Authorization": token
        }
    });
}
exports.getgpadata = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getgpa", {
        headers: {
            "Authorization": token
        }
    });
}
exports.getpositiondata = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getposition", {
        headers: {
            "Authorization": token
        }
    });
}
exports.getcolleges = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getcolleges", {
        headers: {
            "Authorization": token
        }
    });
}
exports.getcities = async (id) => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getcities", {
        params: {
            "state": id
        },
        headers: {
            "Authorization": token
        }
    });
}

exports.getsportsdata = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getsports", {
        headers: {
            "Authorization": token
        }
    });
}

exports.getdivisiondata = async () => {
    const token = "Bearer " + await SecureStore.getItemAsync("token");
    return axios.get("/api/getdivisions", {
        headers: {
            "Authorization": token
        }
    });
}