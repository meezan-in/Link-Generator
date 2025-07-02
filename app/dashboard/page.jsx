"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { analytics, app } from '@/firebaseconfig';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import GenerateRandomString from '../_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';

function Dashboard() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Firebase analytics initialized:", analytics);
    }
  }, []);

  const {user} = useUser();
  const [progress,setProgress]=useState();
  const router=useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [fileDocId,setFileDocId] = useState();

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type
    };

    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);

        progress==100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          saveInfo(file,downloadURL);
        });
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        console.log('Upload successful!');
      }
    );
  }
  const saveInfo=async(file,fileUrl)=>{
    const docId=GenerateRandomString().toString();
    await setDoc(doc(db, "uplodedFile", docId), {
      fileName:file?.name,
      fileSize:file?.size,
      fileType:file?.type,
      fileUrl:fileUrl,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      password:'',
      id:docId,
      shortUrl:process.env.NEXT_PUBLIC_BASE_URL+GenerateRandomString()
    });
    setFileDocId(docId);
  }

  useEffect(() => {
    if (fileDocId) {
      router.push('dashboard/files-preview/' + fileDocId);
    }
  }, [fileDocId, router]);

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='font-bold text-2xl text-center'>Start<strong className='text-primary'> Uploading</strong>  your files.</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      </div>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} 
        progress={progress}
        />
    </div>
  )
}

export default Dashboard;
