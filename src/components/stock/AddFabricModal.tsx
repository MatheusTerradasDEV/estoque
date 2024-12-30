import { useState } from 'react';
import { addFabric } from '../../services/fabricService';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import { Fabric } from '../../types';

interface AddFabricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFabricModal({ isOpen, onClose }: AddFabricModalProps) {
  const [fabric, setFabric] = useState<Partial<Fabric>>({
    name: '',
    quantity: 0,
    price: 0,
    color: '',
    category: '',
    supplier: '',
    description: '',
    minimumStock: 0,
    width: 0,
    composition: '',
    weight: 0,
    pattern: '',
    notes: '',
    supplierCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addFabric(fabric);
      toast.success('Tecido adicionado com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao adicionar tecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Tecido">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Código do Fornecedor</label>
            <input
              type="text"
              value={fabric.supplierCode}
              onChange={(e) => setFabric({ ...fabric, supplierCode: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
            <input
              type="number"
              min="0"
              value={fabric.minimumStock}
              onChange={(e) => setFabric({ ...fabric, minimumStock: Number(e.target.value) })}
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

        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700">Padrão/Estampa</label>
            <input
              type="text"
              value={fabric.pattern}
              onChange={(e) => setFabric({ ...fabric, pattern: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Largura (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={fabric.width}
              onChange={(e) => setFabric({ ...fabric, width: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Peso (g/m²)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={fabric.weight}
              onChange={(e) => setFabric({ ...fabric, weight: Number(e.target.value) })}
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Composição</label>
          <input
            type="text"
            value={fabric.composition}
            onChange={(e) => setFabric({ ...fabric, composition: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Ex: 100% Algodão"
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            value={fabric.description}
            onChange={(e) => setFabric({ ...fabric, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea
            value={fabric.notes}
            onChange={(e) => setFabric({ ...fabric, notes: e.target.value })}
            rows={2}
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