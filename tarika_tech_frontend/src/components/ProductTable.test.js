import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import axios from 'axios';
jest.mock('axios');
import ProductTable from './ProductTable';

// Mock Axios to avoid actual API calls
jest.mock('axios');

const mockProducts = [
  { id: 1, title: 'Product 1', price: 100 },
  { id: 2, title: 'Product 2', price: 200 }
];

describe('ProductTable', () => {
  it('should fetch and display products', async () => {
    axios.get.mockResolvedValueOnce({ data: { products: mockProducts } });

    render(<ProductTable />);

    // Check that the products are displayed after fetching
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });



  it('should delete a product from the list', async () => {
    axios.get.mockResolvedValueOnce({ data: { products: mockProducts } });

    render(<ProductTable />);

    // Wait for the products to be fetched
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Click delete on the first product
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // The first product should be removed from the list
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('should paginate products', async () => {
    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 100 + i
    }));
    axios.get.mockResolvedValueOnce({ data: { products: manyProducts } });

    render(<ProductTable />);

    // Wait for the products to be fetched
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Initially 10 products should be shown
    expect(screen.queryByText('Product 11')).not.toBeInTheDocument();

    // Click the "Next" button to paginate
    fireEvent.click(screen.getByText('2'));

    // Now, the second page should be visible
    expect(screen.getByText('Product 11')).toBeInTheDocument();
  });
});
