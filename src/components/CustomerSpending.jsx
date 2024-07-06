import React, { useState, useEffect } from 'react';

const transactions = [
  { id: 't_01', customer: 'Rose Roberts', amount: 84 },
  { id: 't_02', customer: 'Chris Cook', amount: 30 },
  { id: 't_03', customer: 'Mary Martin', amount: 42 },
  { id: 't_04', customer: 'Susan Smith', amount: 26 },
  { id: 't_05', customer: 'Rose Roberts', amount: -84 },
  { id: 't_06', customer: 'Rose Roberts', amount: 48 },
  { id: 't_07', customer: 'Susan Smith', amount: 104 },
  { id: 't_08', customer: 'Larry Lewis', amount: 140 },
  { id: 't_09', customer: 'Mary Martin', amount: 10 },
  { id: 't_10', customer: 'Chris Cook', amount: 60 },
  { id: 't_11', customer: 'Susan Smith', amount: -26 },
  { id: 't_12', customer: 'Larry Lewis', amount: -140 },
  { id: 't_13', customer: 'Rose Roberts', amount: 26 },
  { id: 't_14', customer: 'Ryan Roberts', amount: 44 }
];

const CustomerSpending = () => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedFilter = localStorage.getItem('customerFilter');
    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customerFilter', filter);
  }, [filter]);

  const customerTotals = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.customer]) {
      acc[transaction.customer] = 0;
    }
    acc[transaction.customer] += transaction.amount;
    return acc;
  }, {});

  const filteredCustomers = Object.entries(customerTotals).filter(([customer]) =>
    customer.toLowerCase().includes(filter.toLowerCase())
  );

  const topCustomer = Object.keys(customerTotals).reduce((a, b) => customerTotals[a] > customerTotals[b] ? a : b);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Spending</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by customer name"
        className="mb-4 p-2 border rounded w-full"
      />
      <ul className=" mb-6">
        {filteredCustomers.map(([customer, total]) => (
          <li key={customer} className="mb-2 text-lg">
            <span className="font-semibold">{customer}</span>: Rs.{total}
          </li>
        ))}
      </ul>
      <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Top Customer</h2>
        <p className="text-xl mt-2">{topCustomer}: Rs.{customerTotals[topCustomer]}</p>
      </div>
    </div>
  );
};

export default CustomerSpending;
