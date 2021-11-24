import request from '@/utils/request'

export function fetchInitVersionData(data) {
    return request({
    url: '/PMC/initVersionData',
    method: 'get',
    data
    })
}

export function fetchUploadPmcVersion(data) {
    return request({
        url: '/PMC/uploadPmcVersion',
        method: 'post',
        data,
        headers: {
        'content-type': 'multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd'
        },
    })
}

export function fetchInitPmcComputerListData(data) {
    return request({
    url: '/PMC/initPmcComputerListData',
    method: 'get',
    data
    })
}

export function fetchSearchPmcComputerList(data) {
    return request({
    url: '/PMC/searchPmcComputerList',
    method: 'post',
    data,
    headers: {
        'content-type': 'application/json'
        },
    })
}