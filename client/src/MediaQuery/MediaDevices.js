

const getConnectedDevices = async (type) => {
    const connectedDevices = await navigator.mediaDevices.enumerateDevices()
    console.log(connectedDevices);
    return connectedDevices.filter(d => d.kind === type)
}

const openCamera = async (cameraId, minWidth, minHeight) => {
    const constrains = {
        'audio': { 'echoCacellation': true },
        'video': {
            'deviceId': cameraId,
            'width': { 'min': minWidth },
            'height': { 'min': minHeight }
        }
    }
    return await navigator.mediaDevices.getUserMedia(constrains)
}

module.exports = { getConnectedDevices, openCamera }