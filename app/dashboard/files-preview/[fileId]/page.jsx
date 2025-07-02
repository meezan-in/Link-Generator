"use client"
import { app } from '@/firebaseconfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';

function Filepreview({ params }) {
  const [file, setFile] = useState();
  const db = getFirestore(app);

  useEffect(() => {
    console.log(params?.fileId);
    params?.fileId && getFileInfo();
  }, [params?.fileId]);

  const getFileInfo = async () => {
    const docRef = doc(db, "uplodedFile", params?.fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const onPasswordSave = async (password) => {
    const docRef = doc(db, "uplodedFile", params?.fileId);
    await updateDoc(docRef, {
      password: password
    });
  };

  return (
    <div className='py-10 px-10'>
      <FileInfo file={file} />
      <FileShareForm file={file} onPasswordSave={(password) => onPasswordSave(password)} />
    </div>
  );
}

export default Filepreview;
