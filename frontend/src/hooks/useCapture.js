import html2canvas from "html2canvas";

const useCapture = () => {
    const imageLink = document.createElement('img');
    imageLink.style.width = '7rem'

    const capture = () => {
        html2canvas(document.querySelector('.output-wave')).then(function(canvas) {
            // canvas.toBlob(blob => {
            //     const url = URL.createObjectURL(blob);
            //     imageLink.onload = () => URL.revokeObjectURL(url);
            //     imageLink.innerHTML = 'download'
            //     imageLink.href = url
                
            //     localStorage.setItem('image', imageLink.href)
            // })
            const base64image = canvas.toDataURL("image/png");
            localStorage.setItem('image', base64image)

            imageLink.src = localStorage.getItem('image')
            document.querySelector('.output-container').appendChild(imageLink);
        });
    }

    return {capture, imageLink};
}
 
export default useCapture;