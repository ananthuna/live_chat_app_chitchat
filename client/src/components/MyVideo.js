import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
const { getConnectedDevices, openCamera } = require('../MediaQuery/MediaDevices')


function MyVideo() {
    const videoRef = useRef(null)
    const [devices, setDevices] = useState()



    useEffect(() => {
        getConnectedDevices('videoinput')
            .then(doc => setDevices(doc))
    }, [])

    useEffect(() => {
        navigator.mediaDevices.addEventListener('devicechange', event => {
            getConnectedDevices('videoinput').then(doc => setDevices(doc))
        })
    })

    const openCam = (id) => {
        if (devices && devices.length > 0) {
            openCamera(id, 580, 520).then(doc => videoRef.current.srcObject = doc)
        }
    }
    const openCamStop = () => {
        videoRef.current.srcObject.getTracks().forEach(track => {
            track.stop()
        })
        videoRef.current.srcObject = null

    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            pl: 120
        }}>
            {devices && devices.map((e, i) =>
                <>
                    <button key={i} onClick={() => openCam(e.deviceId)}>camera{e.deviceId}</button>
                    <button key={i} onClick={() => openCamStop(e.deviceId)}>camera</button>
                </>
            )}
            <video id='video001' ref={videoRef} autoPlay playsInline controls={false}></video>
        </Box>
    )
}

export default MyVideo