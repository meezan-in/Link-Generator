import React, { useEffect, useState } from 'react'

function FileInfo({file}) {
    const [fileType,setFileType]=useState();
    useEffect(()=>{
        file && setFileType(file?.fileType.split('/')[0]);
        console.log(fileType);
    },[file])
  return file&&(
    <div>
        <div className='text-center bprder flex justify-center m-4 flex-col items-center p-2 rounded-full
        border-purple-200'>
            <h2>{file.fileName}</h2>
            <h2 className='text-gary-400 text-[13px]'>{file.fileType}</h2>
        </div>
    </div>
  )
}

export default FileInfo