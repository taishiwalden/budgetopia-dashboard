import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Budget = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Budget</h1>
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Budget details and management tools will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Budget;