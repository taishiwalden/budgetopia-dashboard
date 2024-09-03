import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

const stateTaxRates = {
  'Alabama': 0.05, 'Alaska': 0, 'Arizona': 0.045, 'Arkansas': 0.069, 'California': 0.13,
  'Colorado': 0.0455, 'Connecticut': 0.0699, 'Delaware': 0.066, 'Florida': 0,
  'Georgia': 0.0575, 'Hawaii': 0.11, 'Idaho': 0.058, 'Illinois': 0.0495,
  'Indiana': 0.0323, 'Iowa': 0.0853, 'Kansas': 0.057, 'Kentucky': 0.05,
  'Louisiana': 0.0425, 'Maine': 0.0715, 'Maryland': 0.0575, 'Massachusetts': 0.05,
  'Michigan': 0.0425, 'Minnesota': 0.0985, 'Mississippi': 0.05, 'Missouri': 0.054,
  'Montana': 0.069, 'Nebraska': 0.0684, 'Nevada': 0, 'New Hampshire': 0.05,
  'New Jersey': 0.1075, 'New Mexico': 0.059, 'New York': 0.109, 'North Carolina': 0.0525,
  'North Dakota': 0.029, 'Ohio': 0.0399, 'Oklahoma': 0.05, 'Oregon': 0.099,
  'Pennsylvania': 0.0307, 'Rhode Island': 0.0599, 'South Carolina': 0.07,
  'South Dakota': 0, 'Tennessee': 0, 'Texas': 0, 'Utah': 0.0495, 'Vermont': 0.0875,
  'Virginia': 0.0575, 'Washington': 0, 'West Virginia': 0.065, 'Wisconsin': 0.0765,
  'Wyoming': 0
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

  const queryClient = useQueryClient();

  const calculateAfterTaxIncome = (income, state) => {
    const federalTaxRate = 0.22;
    const stateTaxRate = stateTaxRates[state] || 0;
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
    queryClient.setQueryData(['annualIncome'], annualIncome);
  }, [annualIncome, selectedState, queryClient]);

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Budget</h1>
      <Card>
        <CardHeader>
          <CardTitle>Income Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="annual-income" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <Input
                id="annual-income"
                type="text"
                value={annualIncome}
                onChange={handleIncomeChange}
                className="w-full"
                placeholder="Enter your annual income"
              />
            </div>
            <div>
              <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Select onValueChange={handleStateChange} value={selectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(stateTaxRates).sort().map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setAfterTaxIncome(calculateAfterTaxIncome(annualIncome, selectedState))} className="w-full">
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
  );
};

export default Budget;