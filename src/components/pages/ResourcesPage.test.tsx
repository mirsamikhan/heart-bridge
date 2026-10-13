import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResourcesPage, { HANDOUTS } from './ResourcesPage';

afterEach(cleanup);
function renderPage() { render(<MemoryRouter initialEntries={['/resources/educational-handouts']}><ResourcesPage /></MemoryRouter>); }

it('shows the five supplied handouts with uncropped previews and original downloads', () => {
  renderPage();
  expect(screen.getAllByRole('img', { name: /^Preview of/ })).toHaveLength(5);
  for (const item of HANDOUTS) {
    expect(screen.getByRole('link', { name: `Download ${item.title}`, exact: true })).toHaveAttribute('href', item.file);
    expect(screen.getByRole('link', { name: `Download ${item.title}`, exact: true })).toHaveAttribute('download');
  }
  fireEvent.click(screen.getByRole('button', { name: 'Nutrition', exact: true }));
  expect(screen.getAllByRole('img', { name: /^Preview of/ })).toHaveLength(2);
  expect(screen.queryByRole('heading', { name: 'SACH Diabetes Brochure' })).not.toBeInTheDocument();
});

it('opens both brochure pages and closes the accessible viewer', () => {
  renderPage();
  fireEvent.click(screen.getByRole('button', { name: 'Preview SACH Diabetes Brochure' }));
  const dialog = screen.getByRole('dialog', { name: 'SACH Diabetes Brochure' });
  expect(within(dialog).getAllByRole('img')).toHaveLength(2);
  expect(within(dialog).getByRole('link', { name: 'Download original SACH Diabetes Brochure' })).toHaveAttribute('href', '/handouts/sach-diabetes-brochure.pdf');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('provides the HEART reminder link and Resources subpages on mobile', () => {
  renderPage();
  expect(screen.getByRole('link', { name: 'Text HEART' })).toHaveAttribute('href', 'sms:+18664909361?&body=HEART');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
  const menus = screen.getAllByText('Resources', { selector: 'summary' });
  fireEvent.click(menus[1]);
  const details = menus[1].closest('details')!;
  expect(within(details).getByRole('link', { name: 'Educational Handouts', hidden: true })).toHaveAttribute('href', '/resources/educational-handouts');
  expect(within(details).getByRole('link', { name: 'PCP Search', hidden: true })).toHaveAttribute('href', '/resources/pcp-search');
});
