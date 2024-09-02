import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Expenses = () => {
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
                  <TableCell>${expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;