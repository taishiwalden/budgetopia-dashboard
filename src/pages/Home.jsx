import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  const { data: expensesData } = useQuery({
    queryKey: ['expenses'],
    initialData: [
      { category: 'Rent', amount: 1500, budget: 1600 },
      { category: 'Utilities', amount: 200, budget: 250 },
      { category: 'Transportation', amount: 300, budget: 350 },
      { category: 'Healthcare', amount: 150, budget: 200 },
      { category: 'Company Expenses', amount: 500, budget: 600 },
      { category: 'Shopping', amount: 400, budget: 300 },
      { category: 'Savings', amount: 1000, budget: 1000 },
      { category: 'Investments', amount: 800, budget: 700 },
    ],
  });

  const investmentData = [
    { name: 'Stocks', value: 40 },
    { name: 'Bonds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Crypto', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {investmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses Summary - {currentMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expensesData.map((expense, index) => (
                <div key={index} className="flex justify-between">
                  <span>{expense.category}</span>
                  <span>${expense.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>${totalExpenses.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses vs Budget Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesData}>
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" name="Actual Expenses" />
                  <Bar dataKey="budget" fill="#82ca9d" name="Budgeted Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;