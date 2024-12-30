import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Fabric } from '../types';
import FabricList from '../components/stock/FabricList';
import AddFabricModal from '../components/stock/AddFabricModal';
import { Plus } from 'lucide-react';

export default function Stock() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'fabrics'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fabricsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Fabric[];
      
      setFabrics(fabricsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estoque de Tecidos</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Tecido
        </button>
      </div>

      <FabricList fabrics={fabrics} />
      
      <AddFabricModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}