import requests from "@/api/request";

export const getCompkey = (seedKey:String) => {
    console.log(seedKey)
    return requests({
        url: '/compkey/'+seedKey,
        method: 'GET',
    })
}
