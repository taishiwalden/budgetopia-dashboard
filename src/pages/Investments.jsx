import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Investments = () => {
  const [investmentData, setInvestmentData] = useState([
    { name: 'Stocks', value: 40, risk: 8 },
    { name: 'Bonds', value: 30, risk: 3 },
    { name: 'Real Estate', value: 20, risk: 6 },
    { name: 'Crypto', value: 10, risk: 10 },
  ]);
  const [portfolioRisk, setPortfolioRisk] = useState(0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handlePercentageChange = (index, newValue) => {
    const updatedData = [...investmentData];
    updatedData[index].value = Number(newValue);
    setInvestmentData(updatedData);
  };

  const handleUpdateChart = () => {
    const total = investmentData.reduce((sum, item) => sum + item.value, 0);
    const normalizedData = investmentData.map(item => ({
      ...item,
      value: (item.value / total) * 100
    }));
    setInvestmentData(normalizedData);
    updatePortfolioRisk(normalizedData);
  };

  const calculatePortfolioRisk = (data) => {
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const weightedRisk = data.reduce((sum, item) => {
      return sum + (item.value / totalValue) * item.risk;
    }, 0);
    return weightedRisk;
  };

  const updatePortfolioRisk = (data) => {
    const risk = calculatePortfolioRisk(data);
    setPortfolioRisk(risk);
  };

  useEffect(() => {
    updatePortfolioRisk(investmentData);
  }, []);

  const getRiskLevel = (risk) => {
    if (risk < 3) return 'Very Low';
    if (risk < 5) return 'Low';
    if (risk < 7) return 'Moderate';
    if (risk < 9) return 'High';
    return 'Very High';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Investments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
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
                      label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                    >
                      {investmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              {investmentData.map((item, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.name}</label>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => handlePercentageChange(index, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
              <Button onClick={handleUpdateChart} className="w-full">Update Chart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
              <Progress value={portfolioRisk * 10} className="w-full" />
              <p className="mt-2">
                {portfolioRisk.toFixed(2)} / 10 - {getRiskLevel(portfolioRisk)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Risk Breakdown</h3>
              <ul className="list-disc list-inside">
                {investmentData.map((item, index) => (
                  <li key={index}>
                    {item.name}: {item.risk}/10 (Weight: {item.value.toFixed(1)}%)
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              This risk assessment is based on the asset allocation and individual risk scores of each investment type.
              A higher score indicates a higher level of risk.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;