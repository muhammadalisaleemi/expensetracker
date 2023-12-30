"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Expense {
  name: string;
  price: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
`;

const ExpenseItem = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
`;

const IndexPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const handleAddExpense = () => {
    setExpenses([...expenses, { name, price }]);
    setName('');
    setPrice(0);
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <h1>Expense Tracker</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter expense name..."
      />
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Enter expense price..."
      />
      <Button onClick={handleAddExpense}>Add Expense</Button>
      {expenses.map((expense, index) => (
        <ExpenseItem key={index}>
          {expense.name}: ${expense.price}
          <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
        </ExpenseItem>
      ))}
      <BarChart width={500} height={300} data={expenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </Container>
  );
};

export default IndexPage;
