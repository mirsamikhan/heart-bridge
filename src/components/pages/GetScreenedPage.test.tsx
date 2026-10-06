import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetScreenedPage from './GetScreenedPage';
import { BaseCrudService } from '@/integrations';

vi.mock('@/integrations', () => ({ BaseCrudService: { getAll: vi.fn() } }));

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

function renderPage() {
  return render(<MemoryRouter><GetScreenedPage /></MemoryRouter>);
}

describe('combined screening page', () => {
  it('keeps screening content and displays only active locations with their details', async () => {
    vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [
      { _id: 'active', isActive: true, locationName: 'Community Center', address: '123 Main Street', operatingHours: 'Saturday 10 AM', description: 'Walk-up screenings', mapLink: 'https://maps.google.com/?q=123+Main+Street' },
      { _id: 'inactive', isActive: false, locationName: 'Inactive Site' },
    ] } as any);
    renderPage();
    expect(screen.getByRole('heading', { name: "What's Included" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your Privacy & Consent' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Community Center' })).toBeInTheDocument();
    expect(screen.queryByText('Inactive Site')).not.toBeInTheDocument();
    expect(screen.getByText('123 Main Street')).toBeInTheDocument();
    expect(screen.getByText('Saturday 10 AM')).toBeInTheDocument();
    expect(screen.getByText('Walk-up screenings')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View on Map' })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'View Health Sites' })).toHaveAttribute('href', '#health-sites');
    expect(BaseCrudService.getAll).toHaveBeenCalledWith('healthsites');
  });

  it('shows a compact loading status and retains the empty-site message', async () => {
    let resolveSites!: (value: any) => void;
    vi.mocked(BaseCrudService.getAll).mockReturnValue(new Promise(resolve => { resolveSites = resolve; }));
    renderPage();
    expect(screen.getByRole('status')).toHaveTextContent('Loading health sites...');
    expect(screen.queryByText('Health Sites Coming Soon')).not.toBeInTheDocument();
    resolveSites({ items: [] });
    expect(await screen.findByText('Health Sites Coming Soon')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('has one combined link in each desktop, mobile, and footer navigation', async () => {
    vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [] } as any);
    renderPage();
    await screen.findByText('Health Sites Coming Soon');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    for (const nav of screen.getAllByRole('navigation')) {
      expect(within(nav).getAllByRole('link', { name: 'Get Screened' })).toHaveLength(1);
      expect(within(nav).queryByRole('link', { name: /Health Sites/ })).not.toBeInTheDocument();
    }
  });
});
