import { createContext } from "react";

export const RecordScreenContext = createContext()

export const RecordScreenProvider = ({ children }) => {
    let video;
    let recorder = null;
    let chunks = []

    async function captureScreen(mediaConstraints = {
        video: {
          cursor: 'always',
          resizeMode: 'crop-and-scale'
        }
      }) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints)
      
      return screenStream
    }


    const init = async () => {
        video = document.getElementById('video')
        startRecording()

        setTimeout(() => {
            stopRecording()
        }, 4000)
    }


    const startRecording = async() => {
        const screenStream = await captureScreen()
        const stream = new MediaStream(screenStream)
        
        video.src = null
        video.muted = true
        video.srcObject = stream

        
        recorder = new MediaRecorder(stream)

        recorder.ondataavailable = event => {
            if (event.data.size > 0) {
                chunks.push(event.data)
            }
        }
        
        recorder.onstop = () => {
            const blob = new Blob(chunks, {
                type: 'video/webm'
            })
            
            chunks = []
            const blobUrl = URL.createObjectURL(blob)

            video.srcObject = null
            video.src = blobUrl
            video.muted = false
        }
        
        recorder.start(200)
    }

    function stopRecording() {
        recorder.stream.getTracks().forEach(track => track.stop())
    }   

    return(
        <RecordScreenContext.Provider value={{init, startRecording, stopRecording, video}}>
            {children}
        </RecordScreenContext.Provider>
    )
}