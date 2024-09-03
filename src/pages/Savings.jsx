import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const Savings = () => {
  const [savingsData, setSavingsData] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState(500);

  const { data: annualIncome } = useQuery({
    queryKey: ['annualIncome'],
    initialData: 50000, // Default value
  });

  useEffect(() => {
    generateSavingsData();
  }, [monthlySavings]);

  const generateSavingsData = () => {
    const data = [];
    let total = 0;
    for (let i = 0; i < 12; i++) {
      total += monthlySavings;
      data.push({
        month: `Month ${i + 1}`,
        savings: total,
      });
    }
    setSavingsData(data);
  };

  const handleMonthlySavingsChange = (e) => {
    setMonthlySavings(Number(e.target.value));
  };

  const savingsPercentage = ((monthlySavings * 12) / annualIncome) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Savings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Savings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label htmlFor="monthly-savings" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Savings Amount
            </label>
            <Input
              id="monthly-savings"
              type="number"
              value={monthlySavings}
              onChange={handleMonthlySavingsChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Savings Percentage of Annual Income: {savingsPercentage.toFixed(2)}%
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Savings;