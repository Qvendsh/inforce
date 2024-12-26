import {useState, useEffect, FC} from 'react';
import { Product } from '../models/Product.ts';

interface ProductModalProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onClose: () => void;
}

const ProductModal:FC<ProductModalProps> = ({ product, onSave, onClose }) => {
    const [name, setName] = useState<string>('');
    const [count, setCount] = useState<number>(1);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [width, setWidth] = useState<number>(200);
    const [height, setHeight] = useState<number>(200);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setCount(product.count);
            setImageUrl(product.imageUrl);
            setWeight(product.weight);
            setWidth(product.size.width);
            setHeight(product.size.height);
        }
    }, [product]);

    const handleSave = () => {
        if (!name || !imageUrl || !weight) return;
        const newProduct: Product = {
            id: product ? product.id : Date.now(),
            name,
            count,
            imageUrl,
            weight,
            size: { width, height },
            comments: [],
        };
        onSave(newProduct);
    };

    return (
        <div>
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" />
            <input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Image URL"
            />
            <input
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Weight"
            />
            <input value={count} onChange={e => setCount(Number(e.target.value))} type="number" />
            <input
                value={width}
                onChange={e => setWidth(Number(e.target.value))}
                placeholder="Width"
                type="number"
            />
            <input
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                placeholder="Height"
                type="number"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default ProductModal;
