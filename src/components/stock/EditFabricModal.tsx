import { useState } from 'react';
import { updateFabric } from '../../services/fabricService';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import { Fabric } from '../../types';

interface EditFabricModalProps {
  fabric: Fabric;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditFabricModal({ fabric: initialFabric, isOpen, onClose }: EditFabricModalProps) {
  const [fabric, setFabric] = useState<Fabric>(initialFabric);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateFabric(fabric.id, fabric);
      toast.success('Tecido atualizado com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao atualizar tecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Tecido">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            required
            value={fabric.name}
            onChange={(e) => setFabric({ ...fabric, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="number"
              required
              min="0"
              value={fabric.quantity}
              onChange={(e) => setFabric({ ...fabric, quantity: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={fabric.price}
              onChange={(e) => setFabric({ ...fabric, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cor</label>
          <input
            type="text"
            required
            value={fabric.color}
            onChange={(e) => setFabric({ ...fabric, color: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            required
            value={fabric.category}
            onChange={(e) => setFabric({ ...fabric, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fornecedor</label>
          <input
            type="text"
            required
            value={fabric.supplier}
            onChange={(e) => setFabric({ ...fabric, supplier: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}