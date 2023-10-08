import {  render} from '@testing-library/react';
import TDDCycleList from '../../../src/sections/TDDCycles-Visualization/TDDCycleList';
import { mockCommitData } from './__mocks__/dataTypeMocks/commitData';
import { mockSuccessJobData} from './__mocks__/dataTypeMocks/jobData';
import '@testing-library/jest-dom';

describe('TDDCycleList Component', () => {
  test('renders a list of cycle cards when provided with commits and jobs data', () => {
    const commitsInfo = [mockCommitData];
    const jobsByCommit = {
      [mockCommitData.sha]: mockSuccessJobData,
    };

    render(<TDDCycleList commitsInfo={commitsInfo} jobsByCommit={jobsByCommit} />);
    const cycleCards = document.getElementsByClassName('cycleCardContainer');
    expect(cycleCards.length).toBeGreaterThanOrEqual(1);

  });

  test('renders nothing when provided with no commits and jobs data', () => {
    render(<TDDCycleList commitsInfo={null} jobsByCommit={null} />);
    const cycleCards = document.getElementsByClassName('cycleCardContainer');
    expect(cycleCards.length).toBe(0);
  });
});