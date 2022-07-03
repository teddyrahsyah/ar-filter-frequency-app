import html2canvas from "html2canvas";

const useCapture = () => {

    const captureOutput = () => {
        html2canvas(document.querySelector('.output-wave'), {
            onclone : (clonedElem) => {
                clonedElem.querySelector('.output-container').style.display = 'block'
            }
        }).then(function(canvas) {
            const base64image = canvas.toDataURL("image/png");
            localStorage.setItem('imageOutput', base64image)
        });
    }

    const capturefrequency = () => {
        html2canvas(document.querySelector('.frequency-counter'), {
            onclone : (clonedElem) => {
                clonedElem.querySelector('.output-container').style.display = 'block'
            }
        }).then(function(canvas) {
            const base64image = canvas.toDataURL("image/jpeg");
            localStorage.setItem('imageFrequency', base64image)
        });
    }

    return {captureOutput, capturefrequency};
}
 
export default useCapture;