import React from 'react'
import { useState } from 'react'

const UploadType = {
    Text:"Text",
    Image:"Image",
    PDF:"PDF"
}

const HomeChooser = (props) => {
    const [uploadType, setUploadType] = useState(UploadType.Text)

    return <div></div>
}

export default HomeChooser 