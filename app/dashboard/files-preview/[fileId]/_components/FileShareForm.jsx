import { Copy } from 'lucide-react';
import React, { useState } from 'react';
import GlobalApi from '../../../../_utils/GlobalApi'
import { date } from 'drizzle-orm/mysql-core';
import { useUser } from '@clerk/nextjs';

function FileShareForm({ file, onPasswordSave }) {
  const [isPasswordEnable, setIsPasswordEnable] = useState(false);
  const [password, setPassword] = useState('');
  const {user} = useUser()
  
  const sendEmail=()=>{
    const data={
      emailToSend:email,
      userName:user?.firstName,
      fileName:file.fileName,
      fileSize:file.fileSize,
      fileType:file.fileType,
      shortUrl:file.ShortUrl
    };
    GlobalApi.SendEmail(date).then(resp=>{
      console.log(resp);
    })
  }

  return file && (
    <div>
      <div>
        <label className='text-[14px] text-gray-500'>Share Url</label>
        <div className='flex gap-5 p-2 border rounded-md justify-between'>
          <input
            type='text'
            value={file.fileUrl}
            disabled
            className='disabled:text-gray-500 bg-transparent outline-none w-full'
          />
          <Copy className='text-gray-400 hover:text-gray-600 cursor-pointer' />
        </div>
      </div>
      <div className='gap-3 flex mt-5'>
        <input
          type='checkbox'
          onChange={(e) => setIsPasswordEnable(e.target.checked)}
        />
        <label>Enable Password</label>
      </div>
      {isPasswordEnable && (
        <div className='flex gap-3 items-center mt-3'>
          <div className='border rounded-md w-full p-2'>
            <input
              type='password'
              className='disabled:text-gray-500 bg-transparent outline-none w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-purple-500'
            disabled={password?.length < 3}
            onClick={() => onPasswordSave(password)}
          >
            Save
          </button>
        </div>
      )}
      <div className='mt-5'>
        <label className='text-[14px] text-gray-500'>Email</label>
        <div className='flex gap-3 items-center'>
          <div className='border rounded-md w-full p-2'>
            <input
              type='email'
              className='disabled:text-gray-500 bg-transparent outline-none w-full'
            />
          </div>
          <button
            className='p-2 bg-primary text-white rounded-md hover:bg-purple-700'
            onClick={()=>sendEmail()}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileShareForm;
