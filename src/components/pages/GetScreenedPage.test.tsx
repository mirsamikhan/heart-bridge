import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetScreenedPage from './GetScreenedPage';


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
  it('shows the five approved screening locations and their schedules', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: "What's Included" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your Privacy & Consent' })).toBeInTheDocument();
    for (const name of ['Islamic Center of Irving', 'Gurdwara Sikh Sangat', 'Islamic Association of North Texas', 'Madinah Masjid of Carrollton', 'Barkaat Ul Quran']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    for (const schedule of ['Every Friday | 1:30–4:30 PM', 'Select Sundays', 'Every Friday | 1:00–4:00 PM', 'Every Friday | 1:30–3:30 PM', 'Last Friday of Every Month | 1:30–3:00 PM']) {
      expect(screen.getByText(schedule)).toBeInTheDocument();
    }
    const links = screen.getAllByRole('link', { name: 'View on Map' });
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(new URL(link.getAttribute('href')!).searchParams.get('query')).toMatch(/TX 7/);
    }
    expect(screen.queryByText(/offered every Sunday/)).not.toBeInTheDocument();
  });

  it('has one combined link in each desktop, mobile, and footer navigation', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    for (const nav of screen.getAllByRole('navigation')) {
      expect(within(nav).getAllByRole('link', { name: 'Get Screened' })).toHaveLength(1);
      expect(within(nav).queryByRole('link', { name: /Health Sites/ })).not.toBeInTheDocument();
    }
  });
});
