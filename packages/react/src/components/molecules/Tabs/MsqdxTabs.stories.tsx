import type { Meta, StoryObj } from '@storybook/react';
import { MsqdxTabs } from './MsqdxTabs';
import { useState } from 'react';
import { MsqdxIcon } from '../../atoms/Icon/MsqdxIcon';

const meta = {
  title: 'Design System/Molecules/Tabs',
  component: MsqdxTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'High-end tab navigation for the msqdx-glass design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current active tab value',
    },
  },
} as Meta<typeof MsqdxTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { value: 'home', label: 'Home' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'settings', label: 'Settings' },
  { value: 'profile', label: 'Profile' },
];

const tabsWithIcons = [
  { value: 'home', label: 'Home', icon: <MsqdxIcon name="Home" /> },
  { value: 'dashboard', label: 'Dashboard', icon: <MsqdxIcon name="Dashboard" /> },
  { value: 'settings', label: 'Settings', icon: <MsqdxIcon name="Settings" /> },
  { value: 'profile', label: 'Profile', icon: <MsqdxIcon name="Person" /> },
];

export const Default: Story = {
  args: { value: 'home', onChange: () => {}, tabs },
  render: () => {
    const [value, setValue] = useState('home');
    return <MsqdxTabs value={value} onChange={setValue} tabs={tabs} />;
  },
};

export const WithIcons: Story = {
  args: { value: 'home', onChange: () => {}, tabs: tabsWithIcons },
  render: () => {
    const [value, setValue] = useState('home');
    return <MsqdxTabs value={value} onChange={setValue} tabs={tabsWithIcons} />;
  },
};

export const ManyTabs: Story = {
  args: { value: 'tab1', onChange: () => {}, tabs: [] },
  render: () => {
    const [value, setValue] = useState('tab1');
    const manyTabs = Array.from({ length: 10 }, (_, i) => ({
      value: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
    }));
    return <MsqdxTabs value={value} onChange={setValue} tabs={manyTabs} />;
  },
};

export const Interactive: Story = {
  args: { value: 'home', onChange: () => {}, tabs: tabsWithIcons },
  render: () => {
    const [value, setValue] = useState('home');
    return (
      <div>
        <MsqdxTabs value={value} onChange={setValue} tabs={tabsWithIcons} />
        <div style={{ marginTop: '2rem', padding: '1rem' }}>
          <p>Selected tab: <strong>{value}</strong></p>
        </div>
      </div>
    );
  },
};
