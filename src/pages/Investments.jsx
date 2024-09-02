import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Investments = () => {
  const [investmentData, setInvestmentData] = useState([
    { name: 'Stocks', value: 40 },
    { name: 'Bonds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Crypto', value: 10 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handlePercentageChange = (index, newValue) => {
    const updatedData = [...investmentData];
    updatedData[index].value = Number(newValue);
    setInvestmentData(updatedData);
  };

  const handleUpdateChart = () => {
    // Normalize percentages to ensure they sum up to 100%
    const total = investmentData.reduce((sum, item) => sum + item.value, 0);
    const normalizedData = investmentData.map(item => ({
      ...item,
      value: (item.value / total) * 100
    }));
    setInvestmentData(normalizedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Investments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
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
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              {investmentData.map((item, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">{item.name}</label>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => handlePercentageChange(index, e.target.value)}
                    className="mt-1"
                  />
                </div>
              ))}
              <Button onClick={handleUpdateChart} className="mt-4">Update Chart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;