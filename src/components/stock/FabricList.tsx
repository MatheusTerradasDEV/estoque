import { useState } from 'react';
import { Fabric } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import EditFabricModal from './EditFabricModal';
import { deleteFabric } from '../../services/fabricService';
import toast from 'react-hot-toast';

interface FabricListProps {
  fabrics: Fabric[];
}

export default function FabricList({ fabrics }: FabricListProps) {
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este tecido?')) {
      try {
        await deleteFabric(id);
        toast.success('Tecido excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir tecido.');
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fabrics.map((fabric) => (
              <tr key={fabric.id}>
                <td className="px-6 py-4 whitespace-nowrap">{fabric.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fabric.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(fabric.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{fabric.color}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fabric.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fabric.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingFabric(fabric)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fabric.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingFabric && (
        <EditFabricModal
          fabric={editingFabric}
          isOpen={!!editingFabric}
          onClose={() => setEditingFabric(null)}
        />
      )}
    </>
  );
}