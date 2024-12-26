import { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../models/Product.ts';
import { addComment, deleteComment } from '../redux/productsSlice.ts';

interface ProductViewProps {
    product: Product;
    onClose: () => void;
}

const ProductView: FC<ProductViewProps> = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const [comment, setComment] = useState<string>('');
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

    useEffect(() => {
        setUpdatedProduct(product);
    }, [product]);

    useEffect(() => {
        setUpdatedProduct(products.find((p: Product) => p.id === product.id) || product);
    }, [products, product.id]);

    const handleAddComment = () => {
        if (comment.trim()) {
            dispatch(addComment({ productId: product.id, comment }));
            setComment('');
        }
    };

    const handleDeleteComment = (commentId: number) => {
        dispatch(deleteComment({ productId: product.id, commentId }));
    };

    return (
        <div>
            <button onClick={onClose}>Close</button>
            <h2>{updatedProduct.name}</h2>
            <img src={updatedProduct.imageUrl} alt={updatedProduct.name} width={200} />
            <p>Weight: {updatedProduct.weight}</p>
            <p>Size: {updatedProduct.size.width}x{updatedProduct.size.height}</p>
            <p>Count: {updatedProduct.count}</p>
            <h3>Comments</h3>
            <ul>
                {updatedProduct.comments && updatedProduct.comments.length > 0 ? (
                    updatedProduct.comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.description}</p>
                            <small>{comment.date}</small>
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No comments yet</li>
                )}
            </ul>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default ProductView;
