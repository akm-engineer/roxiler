// components/TransactionsTable.js
import React from "react";

const TransactionsTable = ({ transactions }) => {
  // Ensure transactions is not undefined before mapping over it
  if (!transactions || transactions.length === 0) {
    return <p>No transactions found</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-400 mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-4 py-2">ID</th>
          <th className="border border-gray-400 px-4 py-2">Title</th>
          <th className="border border-gray-400 px-4 py-2">Description</th>
          <th className="border border-gray-400 px-4 py-2">Price</th>
          <th className="border border-gray-400 px-4 py-2">Category</th>
          <th className="border border-gray-400 px-4 py-2">Sold</th>
          <th className="border border-gray-400 px-4 py-2">Image</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.id}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.title}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.description}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.price}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.category}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {transaction.sold ? "Yes" : "No"}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <img
                src={transaction.image}
                alt={transaction.title}
                className="h-16"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
