import requests from "@/api/request";

export interface searchResultType {
    compkey:Array<Array<any>>;
    seedKey:String;
    // 搜索量
    seed_key_volume:number;
}

export interface compKeyType {
    name:String;
    weights:number;
}

export const getCompkey = (seedKey:String) => {
    console.log(seedKey)
    return requests({
        url: '/compkey/'+seedKey,
        method: 'GET',
    })
}
