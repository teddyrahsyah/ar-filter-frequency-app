import { createRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot'

const useScreenShot = () => {
    const [shot, getShot] = useState(null)
    const getScrnsht = (e) => {
        e.preventDefault();
        const link = 'https://www.google.com';
        fetch(`https://screenshotapi.net/api/v1/screenshot?url=${link}&token=REUXZIEP5RLXUEFS8PEF0RZTH15SJK5A`, {
            
        })
        .then((res) => {
          const screenshot = res.data.screenshot;
          getShot({screenshot})
          console.log(screenshot);
        });
    }
    return {getScrnsht};
}
 
export default useScreenShot;