'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardDescription, CardFooter } from './ui/card';
import products from '../data/products.json';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function RecoSmart() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const handleGetRecommendations = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const filtered = products.filter((p: Product) =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Enter a keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleGetRecommendations}>Get recommendations</Button>
      </div>
      <div className="grid gap-4">
        {results.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.name}</CardHeader>
            <CardDescription>{product.description}</CardDescription>
            <CardFooter>${product.price.toFixed(2)}</CardFooter>
          </Card>
        ))}
        {results.length === 0 && (
          <p className="text-muted-foreground">No recommendations found.</p>
        )}
      </div>
    </div>
  );
}
