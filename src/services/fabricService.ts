import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Fabric } from '../types';

export const addFabric = async (fabric: Partial<Fabric>) => {
  const fabricData = {
    ...fabric,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return await addDoc(collection(db, 'fabrics'), fabricData);
};

export const updateFabric = async (id: string, fabric: Partial<Fabric>) => {
  const fabricRef = doc(db, 'fabrics', id);
  const fabricData = {
    ...fabric,
    updatedAt: new Date()
  };
  
  return await updateDoc(fabricRef, fabricData);
};

export const deleteFabric = async (id: string) => {
  const fabricRef = doc(db, 'fabrics', id);
  return await deleteDoc(fabricRef);
};