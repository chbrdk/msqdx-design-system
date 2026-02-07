import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MsqdxQueueDashboard } from './MsqdxQueueDashboard';
import type { QueueStats, ProcessingJob } from './MsqdxQueueDashboard';

const meta = {
  title: 'Design System/AUDION/QueueDashboard',
  component: MsqdxQueueDashboard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Dashboard component for displaying queue statistics and job lists.

## Features
- **Queue statistics** display
- **Job list** with status chips
- **Job selection** and detail view
- **Retry functionality** for failed jobs
- **Design token integration**

## Usage
\`\`\`tsx
<MsqdxQueueDashboard
  stats={stats}
  jobs={jobs}
  selectedJobId={selectedJobId}
  onJobSelect={(id) => setSelectedJobId(id)}
  onRetry={async (id) => {}}
  onRefresh={() => {}}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof MsqdxQueueDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockStats: QueueStats = {
  pendingCount: 5,
  processingCount: 2,
  completedCount: 150,
  failedCount: 3,
  workerCount: 4,
  workerAvailable: true,
};

const mockJobs: ProcessingJob[] = [
  {
    id: 'job-1',
    documentId: 'doc-12345',
    status: 'processing',
    progress: 65,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'job-2',
    documentId: 'doc-67890',
    status: 'completed',
    progress: 100,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'job-3',
    documentId: 'doc-11111',
    status: 'failed',
    progress: 30,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    error: 'Processing timeout',
  },
  {
    id: 'job-4',
    documentId: 'doc-22222',
    status: 'pending',
    progress: 0,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

/**
 * Default dashboard
 */
export const Default: Story = {
  args: {
    stats: mockStats,
    jobs: mockJobs,
  },
};

/**
 * Interactive dashboard
 */
export const Interactive: Story = {
  render: (args) => {
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    return (
      <MsqdxQueueDashboard
        {...args}
        stats={mockStats}
        jobs={mockJobs}
        selectedJobId={selectedJobId}
        onJobSelect={(id) => setSelectedJobId(id)}
        onRetry={async (id) => {
          alert(`Retrying job ${id}`);
        }}
        onRefresh={() => {
          alert('Refreshing...');
        }}
      />
    );
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    stats: {
      pendingCount: 0,
      processingCount: 0,
      completedCount: 0,
      failedCount: 0,
      workerCount: 0,
      workerAvailable: false,
    },
    jobs: [],
  },
};
