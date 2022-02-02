const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const USER_URL = process.env.USER_URL;

exports.getUser = async (token)=>{
    const res = await fetch(`${USER_URL}/users/me`,{
        method: "GET",
        headers: {
            Authorization: token
        }
    });
    const user = await res.json();
    return user;
}