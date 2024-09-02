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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const initialExpenses = [
  { category: 'Rent', amount: 1500 },
  { category: 'Utilities', amount: 200 },
  { category: 'Transportation', amount: 300 },
  { category: 'Healthcare', amount: 150 },
  { category: 'Company Expenses', amount: 500 },
  { category: 'Shopping', amount: 400 },
  { category: 'Savings', amount: 1000 },
  { category: 'Investments', amount: 800 },
];

const fetchExpenses = async () => {
  // In a real app, this would be an API call
  return initialExpenses;
};

const Expenses = () => {
  const queryClient = useQueryClient();
  const { data: expensesData, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
    initialData: initialExpenses,
  });

  const updateExpensesMutation = useMutation({
    mutationFn: (newExpenses) => {
      // In a real app, this would be an API call to update the expenses
      return Promise.resolve(newExpenses);
    },
    onSuccess: (newExpenses) => {
      queryClient.setQueryData(['expenses'], newExpenses);
    },
  });

  const handleAmountChange = (index, newAmount) => {
    const updatedExpenses = expensesData.map((expense, i) => 
      i === index ? { ...expense, amount: Number(newAmount) } : expense
    );
    updateExpensesMutation.mutate(updatedExpenses);
  };

  const handleUpdateChart = () => {
    console.log("Updated expenses:", expensesData);
  };

  if (isLoading) return <div>Loading...</div>;

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