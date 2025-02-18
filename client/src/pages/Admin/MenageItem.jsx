import React, { useEffect, useState } from 'react';
import ProductService from '../../services/product.service';

const MenageItem = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductService.getAll();
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Items</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Price</th>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b">{item.name}</td>
                                <td className="px-4 py-2 border-b">{item.price}</td>
                                <td className="px-4 py-2 border-b">{item.category}</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                                    <button className="bg-red text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenageItem;