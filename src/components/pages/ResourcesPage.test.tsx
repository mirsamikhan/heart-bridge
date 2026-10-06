import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResourcesPage from './ResourcesPage';
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
  render(<MemoryRouter><ResourcesPage /></MemoryRouter>);
}

it('displays a real thumbnail and retains the original download link, falling back if the image fails', async () => {
  vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [
    { _id: 'one', resourceTitle: 'Heart Health', previewImageUrl: '/resource-previews/heart.jpg', downloadableFileUrl: '/handouts/heart.pdf' },
  ] } as any);
  renderPage();
  const image = await screen.findByRole('img', { name: 'First-page preview of Heart Health' });
  expect(image).toHaveAttribute('src', '/resource-previews/heart.jpg');
  const download = screen.getByRole('link', { name: 'Download Resource' });
  expect(download).toHaveAttribute('href', '/handouts/heart.pdf');
  expect(download).toHaveAttribute('target', '_blank');
  fireEvent.error(image);
  expect(screen.getByRole('img', { name: 'Preview coming soon for Heart Health' })).toBeInTheDocument();
  expect(download).toHaveAttribute('href', '/handouts/heart.pdf');
});

it('shows placeholders while preserving category filtering and downloadable files', async () => {
  vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [
    { _id: 'one', resourceTitle: 'Heart Health', topicCategory: 'Basics', downloadableFileUrl: '/handouts/heart.pdf' },
    { _id: 'two', resourceTitle: 'Cooking', topicCategory: 'Nutrition' },
  ] } as any);
  renderPage();
  expect(await screen.findByRole('img', { name: 'Preview coming soon for Heart Health' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Preview coming soon for Cooking' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Download coming soon' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Basics' }));
  expect(screen.queryByRole('img', { name: 'Preview coming soon for Cooking' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Download Resource' })).toHaveAttribute('href', '/handouts/heart.pdf');
});

it('gives all six default handouts placeholders without inventing download links', async () => {
  vi.mocked(BaseCrudService.getAll).mockResolvedValue({ items: [] } as any);
  renderPage();
  expect(await screen.findAllByRole('img', { name: /^Preview coming soon for/ })).toHaveLength(6);
  expect(screen.getAllByRole('button', { name: 'Download coming soon' })).toHaveLength(6);
  expect(screen.queryByRole('link', { name: 'Download Resource' })).not.toBeInTheDocument();
});
