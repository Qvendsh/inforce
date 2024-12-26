import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/Product';
import { Comment } from '../models/Comment.ts';

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: JSON.parse(localStorage.getItem('products') || '[]'),
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
                localStorage.setItem('products', JSON.stringify(state.products));
            }
        },
        addComment: (state, action: PayloadAction<{ productId: number; comment: string }>) => {
            const { productId, comment } = action.payload;
            const product = state.products.find(p => p.id === productId);
            if (product) {
                const newComment: Comment = {
                    id: Date.now(),
                    productId,
                    description: comment,
                    date: new Date().toLocaleString(),
                };
                product.comments.push(newComment);
            }
        },
        deleteComment: (state, action: PayloadAction<{ productId: number; commentId: number }>) => {
            const product = state.products.find(product => product.id === action.payload.productId);
            if (product) {
                product.comments = product.comments.filter(comment => comment.id !== action.payload.commentId);
                localStorage.setItem('products', JSON.stringify(state.products));
            }
        },
    },
});

export const { addProduct, deleteProduct, updateProduct, addComment, deleteComment } = productSlice.actions;
export default productSlice.reducer;
