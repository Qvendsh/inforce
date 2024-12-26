import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../models/Product.ts';
import { addProduct, updateProduct, deleteProduct } from '../redux/productsSlice.ts';
import ProductModal from './ProductModal';
import ConfirmationModal from './ConfirmationModal';
import ProductView from './ProductView';

const ProductList: FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
    const [isProductViewOpen, setIsProductViewOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [sortOption, setSortOption] = useState<string>('alphabetically');

    const openAddModal = () => {
        setIsModalOpen(true);
        setSelectedProduct(null);
    };

    const openEditModal = (product: Product) => {
        setIsModalOpen(true);
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
    };

    const closeProductView = () => {
        setIsProductViewOpen(false);
        setSelectedProduct(null);
    };

    const handleSaveProduct = (product: Product) => {
        if (selectedProduct) {
            dispatch(updateProduct(product));
        } else {
            dispatch(addProduct(product));
        }
        closeModal();
    };

    const handleDeleteProduct = () => {
        if (selectedProduct) {
            dispatch(deleteProduct(selectedProduct.id));
        }
        closeConfirmation();
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setIsConfirmationOpen(true);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsProductViewOpen(true);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'alphabetically') {
            return a.name.localeCompare(b.name);
        } else {
            return b.count - a.count;
        }
    });

    return (
        <div>
            <button onClick={openAddModal}>Add Product</button>
            <select onChange={handleSortChange}>
                <option value="alphabetically">Sort Alphabetically</option>
                <option value="count">Sort by Count</option>
            </select>

            <div>
                {sortedProducts.map((product) => (
                    <div key={product.id} onClick={() => handleProductClick(product)}>
                        <h3>{product.name}</h3>
                        <button onClick={() => openEditModal(product)}>Edit</button>
                        <button onClick={() => handleDeleteClick(product)}>Delete</button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ProductModal
                    product={selectedProduct}
                    onSave={handleSaveProduct}
                    onClose={closeModal}
                />
            )}

            {isConfirmationOpen && (
                <ConfirmationModal
                    onConfirm={handleDeleteProduct}
                    onCancel={closeConfirmation}
                />
            )}

            {isProductViewOpen && selectedProduct && (
                <ProductView product={selectedProduct} onClose={closeProductView} />
            )}
        </div>
    );
};

export default ProductList;
