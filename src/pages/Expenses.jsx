import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Expenses = () => {
  const [expensesData, setExpensesData] = useState([
    { category: 'Rent', amount: 1500 },
    { category: 'Utilities', amount: 200 },
    { category: 'Transportation', amount: 300 },
    { category: 'Healthcare', amount: 150 },
    { category: 'Company Expenses', amount: 500 },
    { category: 'Shopping', amount: 400 },
    { category: 'Savings', amount: 1000 },
    { category: 'Investments', amount: 800 },
  ]);

  const handleAmountChange = (index, newAmount) => {
    const updatedExpenses = [...expensesData];
    updatedExpenses[index].amount = Number(newAmount);
    setExpensesData(updatedExpenses);
  };

  const handleUpdateChart = () => {
    // In a real application, you might want to save this data to a backend
    console.log("Updated expenses:", expensesData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expensesData.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleUpdateChart} className="mt-4">Update Chart</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;