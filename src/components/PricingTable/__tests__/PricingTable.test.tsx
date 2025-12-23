import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingTable, PricingPlan } from '../PricingTable';

describe('PricingTable Component', () => {
  const mockPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for individuals',
      price: 9,
      period: 'month',
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: true },
        { name: 'Feature 3', included: false },
      ],
      ctaLabel: 'Get Started',
      ctaAction: jest.fn(),
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for teams',
      price: 29,
      period: 'month',
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: true },
        { name: 'Feature 3', included: true },
        { name: 'Feature 4', included: true },
      ],
      ctaLabel: 'Get Started',
      ctaAction: jest.fn(),
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      price: 99,
      period: 'month',
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: true },
        { name: 'Feature 3', included: true },
        { name: 'Feature 4', included: true },
        { name: 'Feature 5', value: 'Unlimited' },
      ],
      ctaLabel: 'Contact Sales',
      ctaAction: jest.fn(),
    },
  ];

  it('renders pricing table with all plans', () => {
    render(<PricingTable plans={mockPlans} />);

    // Check if all plan names are rendered
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders plan prices correctly', () => {
    render(<PricingTable plans={mockPlans} />);

    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('renders plan descriptions', () => {
    render(<PricingTable plans={mockPlans} />);

    expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
    expect(screen.getByText('Best for teams')).toBeInTheDocument();
    expect(screen.getByText('For large organizations')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<PricingTable plans={mockPlans} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Contact Sales')).toBeInTheDocument();
  });

  it('highlights plan when highlightedPlanId is provided', () => {
    render(<PricingTable plans={mockPlans} highlightedPlanId="pro" />);

    const proPlan = screen.getByText('Pro').closest('th');
    expect(proPlan).toHaveClass('bg-blue-50');
  });

  it('highlights popular plan by default', () => {
    render(<PricingTable plans={mockPlans} />);

    const proPlan = screen.getByText('Pro').closest('th');
    expect(proPlan).toHaveClass('bg-blue-50');
  });

  it('renders "Popular" badge for popular plans', () => {
    render(<PricingTable plans={mockPlans} />);

    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('renders custom badge when provided', () => {
    const plansWithBadge: PricingPlan[] = [
      {
        ...mockPlans[0],
        badge: 'Best Value',
      },
    ];

    render(<PricingTable plans={plansWithBadge} />);

    expect(screen.getByText('Best Value')).toBeInTheDocument();
  });

  it('renders features correctly', () => {
    render(<PricingTable plans={mockPlans} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders feature values when provided', () => {
    render(<PricingTable plans={mockPlans} />);

    expect(screen.getByText('Unlimited')).toBeInTheDocument();
  });

  it('renders header with custom title and description', () => {
    render(
      <PricingTable
        plans={mockPlans}
        headerTitle="Choose a Plan"
        headerDescription="Select the plan that fits your needs"
      />
    );

    expect(screen.getByText('Choose a Plan')).toBeInTheDocument();
    expect(screen.getByText('Select the plan that fits your needs')).toBeInTheDocument();
  });

  it('does not render header when showHeader is false', () => {
    render(<PricingTable plans={mockPlans} showHeader={false} />);

    expect(screen.queryByText('Choose Your Plan')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PricingTable plans={mockPlans} className="custom-pricing-table" />
    );

    const pricingTable = container.querySelector('.custom-pricing-table');
    expect(pricingTable).toBeInTheDocument();
  });

  it('handles empty plans array', () => {
    const { container } = render(<PricingTable plans={[]} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('formats string prices correctly', () => {
    const plansWithStringPrice: PricingPlan[] = [
      {
        id: 'custom',
        name: 'Custom',
        price: 'Custom',
        features: [],
      },
    ];

    render(<PricingTable plans={plansWithStringPrice} />);

    expect(screen.getByText('$Custom')).toBeInTheDocument();
  });

  it('calls ctaAction when button is clicked', () => {
    const handleCta = jest.fn();
    const plansWithAction: PricingPlan[] = [
      {
        id: 'test',
        name: 'Test Plan',
        price: 10,
        features: [],
        ctaLabel: 'Click Me',
        ctaAction: handleCta,
      },
    ];

    render(<PricingTable plans={plansWithAction} />);

    const button = screen.getByText('Click Me');
    button.click();

    expect(handleCta).toHaveBeenCalledTimes(1);
  });

  describe('Variants', () => {
    it('renders table variant by default', () => {
      const { container } = render(<PricingTable plans={mockPlans} variant="table" />);
      expect(container.querySelector('table')).toBeInTheDocument();
    });

    it('renders cards variant', () => {
      const { container } = render(<PricingTable plans={mockPlans} variant="cards" />);
      const cards = container.querySelectorAll('.grid');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('renders minimal variant', () => {
      const { container } = render(<PricingTable plans={mockPlans} variant="minimal" />);
      const minimalContainer = container.querySelector('.space-y-8');
      expect(minimalContainer).toBeInTheDocument();
    });

    it('renders featured variant', () => {
      const { container } = render(<PricingTable plans={mockPlans} variant="featured" />);
      const featuredPlan = container.querySelector('.bg-gradient-to-br');
      expect(featuredPlan).toBeInTheDocument();
    });
  });
});

