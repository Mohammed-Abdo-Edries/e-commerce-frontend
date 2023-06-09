export const url = "https://localhost:4000";
export const setHeaders = () => {
    const headers = {
        headers:{
            "Content-type": "application/json",
            "token": localStorage.getItem("token")
        }
    };
    return headers;
}