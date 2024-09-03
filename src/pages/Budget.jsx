import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stateTaxRates = {
  'California': 0.13,
  'Texas': 0,
  'New York': 0.11,
  'Florida': 0,
  'Illinois': 0.0495,
  // Add more states as needed
};

const Budget = () => {
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [selectedState, setSelectedState] = useState('California');
  const [afterTaxIncome, setAfterTaxIncome] = useState({
    monthly: 0,
    federal: 0,
    state: 0,
    fica: 0
  });

  const calculateAfterTaxIncome = (income, state) => {
    const federalTaxRate = 0.22;
    const stateTaxRate = stateTaxRates[state] || 0.05; // Default to 5% if state not found
    const ficaTaxRate = 0.0765;

    const federalTax = income * federalTaxRate;
    const stateTax = income * stateTaxRate;
    const ficaTax = income * ficaTaxRate;

    const totalTax = federalTax + stateTax + ficaTax;
    const afterTaxAnnual = income - totalTax;
    const afterTaxMonthly = afterTaxAnnual / 12;

    return {
      monthly: afterTaxMonthly,
      federal: federalTax,
      state: stateTax,
      fica: ficaTax
    };
  };

  useEffect(() => {
    const result = calculateAfterTaxIncome(annualIncome, selectedState);
    setAfterTaxIncome(result);
  }, [annualIncome, selectedState]);

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAnnualIncome(value === '' ? 0 : Number(value));
    }
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Budget</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Income Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="annual-income" className="block text-sm font-medium text-gray-700">
                  Annual Income
                </label>
                <Input
                  id="annual-income"
                  type="text"
                  value={annualIncome}
                  onChange={handleIncomeChange}
                  className="mt-1"
                  placeholder="Enter your annual income"
                />
              </div>
              <div>
                <label htmlFor="state-select" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Select onValueChange={handleStateChange} value={selectedState}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(stateTaxRates).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setAfterTaxIncome(calculateAfterTaxIncome(annualIncome, selectedState))}>
                Calculate After-Tax Income
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>After-Tax Income Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Monthly After-Tax Income:</strong> {formatCurrency(afterTaxIncome.monthly)}</p>
              <p><strong>Federal Tax (Annual):</strong> {formatCurrency(afterTaxIncome.federal)}</p>
              <p><strong>State Tax (Annual):</strong> {formatCurrency(afterTaxIncome.state)}</p>
              <p><strong>FICA Tax (Annual):</strong> {formatCurrency(afterTaxIncome.fica)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;