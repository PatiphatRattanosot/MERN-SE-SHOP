import React from "react";

const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;
    console.log(order);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[800px] max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Order Details</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">×</button>
                </div>

                {/* Table: Products */}
                <h3 className="font-bold mb-2">Products</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Unit Price</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">SubTotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products?.map((item, index) => (
                            <tr key={index} className="text-center">
                                {console.log(item)
                                }
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">
                                    <img src={item?.productId?.image} alt="product" className="w-10 h-10 object-cover mx-auto" />
                                </td>
                                <td className="border p-2">{item?.productId?.name}</td>
                                <td className="border p-2">฿{item?.productId?.price}</td>
                                <td className="border p-2">{item?.quantity}</td>
                                <td className="border p-2">฿{((item?.productId?.price) * item?.quantity).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total */}
                <div className="text-right font-bold text-lg mt-4">
                    Total: ฿{(order?.total / 100).toLocaleString() || "0.00"}
                </div>

                {/* Shipping Details */}
                <h4 className="font-semibold mt-4">Shipping Details</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>
                            <strong>Name:</strong> {order.shipping?.name || "N/A"}
                        </p>
                        <p>
                            <strong>Phone:</strong> {order.shipping?.phone || "+66"}
                        </p>
                        <p>
                            <strong>Address:</strong>{" "}
                            {order.shipping?.address?.line1 || "N/A"}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>City:</strong> {order.shipping?.address?.city || "N/A"}
                        </p>
                        <p>
                            <strong>Country:</strong>{" "}
                            {order.shipping?.address?.country || "N/A"}
                        </p>
                        <p>
                            <strong>Postal Code:</strong>{" "}
                            {order.shipping?.address?.postal_code || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;
