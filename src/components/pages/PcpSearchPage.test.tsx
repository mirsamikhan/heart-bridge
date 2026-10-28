import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PcpSearchPage from './PcpSearchPage';
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));
afterEach(cleanup);
describe('Physician Finder', () => {
  it('combines keyword and city, language, and specialty filters, then resets', () => {
    render(<PcpSearchPage />);
    expect(screen.getByRole('status')).toHaveTextContent('354 providers found');
    fireEvent.change(screen.getByLabelText('Specialty'), { target: { value: 'Cardiology' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'McKinney' } });
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'Punjabi' } });
    fireEvent.change(screen.getByLabelText('Search the directory'), { target: { value: 'bhupinder' } });
    expect(screen.getByRole('status')).toHaveTextContent('1 provider found');
    expect(screen.getByRole('heading', { name: 'Bhupinder Singh, MD' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '972-612-0388' })).toHaveAttribute('href', 'tel:9726120388');
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByRole('status')).toHaveTextContent('354 providers found');
    expect(screen.getByLabelText('City')).toHaveValue('');
  });
  it('shows an empty state without inventing missing contact details', () => {
    render(<PcpSearchPage />);
    fireEvent.change(screen.getByLabelText('Search the directory'), { target: { value: 'Shams Kirimi' } });
    expect(screen.getByRole('heading', { name: 'Shams Kirimi, MD' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search the directory'), { target: { value: 'zzzznonexistent' } });
    expect(screen.getByRole('status')).toHaveTextContent('0 providers found');
    expect(screen.getByRole('heading', { name: 'No providers match your search' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset search' }));
    expect(screen.getByRole('status')).toHaveTextContent('354 providers found');
  });
  it('limits initial rendering and reveals additional providers', () => {
    render(<PcpSearchPage />);
    expect(screen.getAllByRole('article')).toHaveLength(24);
    fireEvent.click(screen.getByRole('button', { name: 'Show more providers' }));
    expect(screen.getAllByRole('article')).toHaveLength(48);
  });
});
