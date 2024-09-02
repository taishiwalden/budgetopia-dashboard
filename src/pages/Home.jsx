import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Home = () => {
  const investmentData = [
    { name: 'Stocks', value: 40 },
    { name: 'Bonds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Crypto', value: 10 },
  ];

  const expensesData = [
    { category: 'Rent', amount: 1500 },
    { category: 'Utilities', amount: 200 },
    { category: 'Transportation', amount: 300 },
    { category: 'Healthcare', amount: 150 },
    { category: 'Company Expenses', amount: 500 },
    { category: 'Shopping', amount: 400 },
    { category: 'Savings', amount: 1000 },
    { category: 'Investments', amount: 800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={investmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {investmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expensesData.map((expense, index) => (
                <div key={index} className="flex justify-between">
                  <span>{expense.category}</span>
                  <span>${expense.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Budget details will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;