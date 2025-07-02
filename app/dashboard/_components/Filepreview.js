import { X } from 'lucide-react'
import React from 'react'

function Filepreview({ file,removeFile }) {
    return (
        <div className='flex items-center gap-2 mt-5 justify-between
        border rounded-md p-2  bg-slate-200'> 
            <div className='text-left '>
                <h2>{file.name}</h2>
                <h2 className='text-[12px] text-gray-400'>{file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB</h2>
            </div>
            <X className='text-red-500 hover:cursor-pointer' onClick={()=>removeFile()}/>
        </div>

    )
}

export default Filepreview