import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const Savings = () => {
  const [savingsData, setSavingsData] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [timeline, setTimeline] = useState('1year');

  const { data: annualIncome } = useQuery({
    queryKey: ['annualIncome'],
    initialData: 50000, // Default value
  });

  useEffect(() => {
    generateSavingsData();
  }, [monthlySavings, timeline]);

  const generateSavingsData = () => {
    const data = [];
    let total = 0;
    let months = 12;

    switch (timeline) {
      case 'months':
        months = 12;
        break;
      case '1year':
        months = 12;
        break;
      case '2years':
        months = 24;
        break;
      case '5years':
        months = 60;
        break;
    }

    for (let i = 0; i < months; i++) {
      total += monthlySavings;
      data.push({
        period: timeline === 'months' ? `Month ${i + 1}` : `Month ${(i % 12) + 1}, Year ${Math.floor(i / 12) + 1}`,
        savings: total,
      });
    }
    setSavingsData(data);
  };

  const handleMonthlySavingsChange = (e) => {
    setMonthlySavings(Number(e.target.value));
  };

  const handleTimelineChange = (value) => {
    setTimeline(value);
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
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
              Timeline
            </label>
            <Select onValueChange={handleTimelineChange} value={timeline}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="2years">2 Years</SelectItem>
                <SelectItem value="5years">5 Years</SelectItem>
              </SelectContent>
            </Select>
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
                <XAxis 
                  dataKey="period" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  interval={timeline === 'months' ? 0 : 'preserveStartEnd'}
                />
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