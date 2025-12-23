import React from 'react';
import { cn } from '../../utils/cn';

export interface PricingFeature {
  name: string;
  included?: boolean;
  value?: string | React.ReactNode;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: string | number;
  period?: string;
  currency?: string;
  features: PricingFeature[];
  ctaLabel?: string;
  ctaAction?: () => void;
  popular?: boolean;
  badge?: string;
}

export type PricingTableVariant = 'table' | 'cards' | 'minimal' | 'featured';

export interface PricingTableProps {
  plans: PricingPlan[];
  highlightedPlanId?: string;
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  variant?: PricingTableVariant;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  highlightedPlanId,
  className,
  showHeader = true,
  headerTitle = 'Choose Your Plan',
  headerDescription,
  variant = 'table',
}) => {
  if (plans.length === 0) return null;

  // Get all unique feature names from all plans
  const allFeatures = plans.reduce((acc, plan) => {
    plan.features.forEach((feature) => {
      if (!acc.find((f) => f.name === feature.name)) {
        acc.push(feature);
      }
    });
    return acc;
  }, [] as PricingFeature[]);

  const formatPrice = (price: string | number, currency = '$') => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency === '$' ? 'USD' : currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }
    return `${currency}${price}`;
  };

  const isPlanHighlighted = (planId: string) => {
    return highlightedPlanId === planId || plans.find((p) => p.id === planId)?.popular;
  };

  // Render Cards Variant
  const renderCardsVariant = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isHighlighted = isPlanHighlighted(plan.id);

          return (
            <div
              key={plan.id}
              className={cn(
                'flex flex-col border rounded-lg overflow-hidden transition-all duration-200',
                isHighlighted
                  ? 'border-blue-600 border-2 shadow-xl transform scale-105'
                  : 'border-gray-200 shadow-md hover:shadow-lg'
              )}
            >
              {plan.badge && (
                <div className="text-center pt-4">
                  <span
                    className={cn(
                      'inline-block text-xs font-semibold px-3 py-1 rounded-full',
                      isHighlighted
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    )}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}
              {plan.popular && !plan.badge && (
                <div className="text-center pt-4">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-600 text-white">
                    Popular
                  </span>
                </div>
              )}
              <div
                className={cn(
                  'p-6 text-center flex-grow',
                  isHighlighted ? 'bg-blue-50' : 'bg-white'
                )}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                )}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 text-lg ml-1">/{plan.period}</span>
                  )}
                </div>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      {feature.value !== undefined ? (
                        <>
                          <CheckIcon
                            className={cn(
                              'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                              isHighlighted ? 'text-blue-600' : 'text-green-600'
                            )}
                          />
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{feature.name}: </span>
                            <span className="text-gray-700">{feature.value}</span>
                          </div>
                        </>
                      ) : feature.included === false ? (
                        <>
                          <XIcon className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 line-through">{feature.name}</span>
                        </>
                      ) : (
                        <>
                          <CheckIcon
                            className={cn(
                              'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                              isHighlighted ? 'text-blue-600' : 'text-green-600'
                            )}
                          />
                          <span className="text-gray-700">{feature.name}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {plan.ctaLabel && (
                  <button
                    onClick={plan.ctaAction}
                    className={cn(
                      'w-full px-6 py-3 rounded-md font-medium transition-colors',
                      isHighlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    )}
                    aria-label={`Select ${plan.name} plan`}
                    tabIndex={0}
                  >
                    {plan.ctaLabel}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Minimal Variant
  const renderMinimalVariant = () => {
    return (
      <div className="space-y-8">
        {plans.map((plan) => {
          const isHighlighted = isPlanHighlighted(plan.id);

          return (
            <div
              key={plan.id}
              className={cn(
                'border-b pb-8 last:border-b-0 last:pb-0',
                isHighlighted && 'border-blue-200'
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                    {plan.badge && (
                      <span
                        className={cn(
                          'text-xs font-medium px-2 py-1 rounded',
                          isHighlighted
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {plan.badge}
                      </span>
                    )}
                    {plan.popular && !plan.badge && (
                      <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                        Popular
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                  )}
                  <ul className="space-y-2 mt-4">
                    {plan.features.slice(0, 3).map((feature) => (
                      <li key={feature.name} className="flex items-center text-sm text-gray-600">
                        {feature.included !== false && (
                          <CheckIcon className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        )}
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-end">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 text-base ml-1">/{plan.period}</span>
                    )}
                  </div>
                  {plan.ctaLabel && (
                    <button
                      onClick={plan.ctaAction}
                      className={cn(
                        'px-6 py-2 rounded-md font-medium transition-colors text-sm',
                        isHighlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'
                      )}
                      aria-label={`Select ${plan.name} plan`}
                      tabIndex={0}
                    >
                      {plan.ctaLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Featured Variant (one plan highlighted prominently)
  const renderFeaturedVariant = () => {
    const highlightedPlan = plans.find((p) => isPlanHighlighted(p.id)) || plans[1] || plans[0];
    const otherPlans = plans.filter((p) => p.id !== highlightedPlan.id);

    return (
      <div className="space-y-8">
        {/* Featured Plan */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-600 rounded-xl p-8 shadow-xl">
          <div className="text-center mb-6">
            {highlightedPlan.badge && (
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-blue-600 text-white mb-3">
                {highlightedPlan.badge}
              </span>
            )}
            {highlightedPlan.popular && !highlightedPlan.badge && (
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-blue-600 text-white mb-3">
                Most Popular
              </span>
            )}
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{highlightedPlan.name}</h3>
            {highlightedPlan.description && (
              <p className="text-gray-700 mb-4">{highlightedPlan.description}</p>
            )}
            <div className="mb-6">
              <span className="text-6xl font-bold text-gray-900">
                {formatPrice(highlightedPlan.price, highlightedPlan.currency)}
              </span>
              {highlightedPlan.period && (
                <span className="text-gray-700 text-xl ml-1">/{highlightedPlan.period}</span>
              )}
            </div>
            {highlightedPlan.ctaLabel && (
              <button
                onClick={highlightedPlan.ctaAction}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Select ${highlightedPlan.name} plan`}
                tabIndex={0}
              >
                {highlightedPlan.ctaLabel}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {highlightedPlan.features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                <CheckIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Plans */}
        {otherPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPlans.map((plan) => (
              <div
                key={plan.id}
                className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                )}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 text-base ml-1">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature.name} className="flex items-center text-sm">
                      {feature.included !== false && (
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-700">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                {plan.ctaLabel && (
                  <button
                    onClick={plan.ctaAction}
                    className="w-full bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label={`Select ${plan.name} plan`}
                    tabIndex={0}
                  >
                    {plan.ctaLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Table Variant
  const renderTableVariant = () => {
    return (
      <>
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left font-medium text-gray-700 border-b">
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={cn(
                      'p-4 text-center border-b relative',
                      isPlanHighlighted(plan.id) &&
                        'bg-blue-50 border-blue-200 border-2 border-b-0'
                    )}
                  >
                    <div className="flex flex-col items-center">
                      {plan.badge && (
                        <span
                          className={cn(
                            'text-xs font-semibold px-2 py-1 rounded-full mb-2',
                            isPlanHighlighted(plan.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          )}
                        >
                          {plan.badge}
                        </span>
                      )}
                      {plan.popular && !plan.badge && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full mb-2 bg-blue-600 text-white">
                          Popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      {plan.description && (
                        <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                      )}
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatPrice(plan.price, plan.currency)}
                        </span>
                        {plan.period && (
                          <span className="text-gray-600 text-sm ml-1">/{plan.period}</span>
                        )}
                      </div>
                      {plan.ctaLabel && (
                        <button
                          onClick={plan.ctaAction}
                          className={cn(
                            'mt-6 w-full px-6 py-2 rounded-md font-medium transition-colors',
                            isPlanHighlighted(plan.id)
                              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                              : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                          )}
                          aria-label={`Select ${plan.name} plan`}
                          tabIndex={0}
                        >
                          {plan.ctaLabel}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature) => (
                <tr key={feature.name} className="border-b">
                  <td className="p-4 font-medium text-gray-700">{feature.name}</td>
                  {plans.map((plan) => {
                    const planFeature = plan.features.find((f) => f.name === feature.name);
                    const isHighlighted = isPlanHighlighted(plan.id);

                    return (
                      <td
                        key={plan.id}
                        className={cn('p-4 text-center', isHighlighted && 'bg-blue-50')}
                      >
                        {planFeature ? (
                          planFeature.value !== undefined ? (
                            <span className="text-gray-900">{planFeature.value}</span>
                          ) : planFeature.included === false ? (
                            <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                          ) : (
                            <CheckIcon
                              className={cn(
                                'w-5 h-5 mx-auto',
                                isHighlighted ? 'text-blue-600' : 'text-green-600'
                              )}
                            />
                          )
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {plans.map((plan) => {
            const isHighlighted = isPlanHighlighted(plan.id);

            return (
              <div
                key={plan.id}
                className={cn(
                  'border rounded-lg overflow-hidden',
                  isHighlighted
                    ? 'border-blue-600 border-2 shadow-lg'
                    : 'border-gray-200'
                )}
              >
                <div
                  className={cn(
                    'p-6 text-center',
                    isHighlighted ? 'bg-blue-50' : 'bg-gray-50'
                  )}
                >
                  {plan.badge && (
                    <span
                      className={cn(
                        'inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2',
                        isHighlighted
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      )}
                    >
                      {plan.badge}
                    </span>
                  )}
                  {plan.popular && !plan.badge && (
                    <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 bg-blue-600 text-white">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                  )}
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 text-sm ml-1">/{plan.period}</span>
                    )}
                  </div>
                  {plan.ctaLabel && (
                    <button
                      onClick={plan.ctaAction}
                      className={cn(
                        'mt-6 w-full px-6 py-2 rounded-md font-medium transition-colors',
                        isHighlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                          : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                      )}
                      aria-label={`Select ${plan.name} plan`}
                      tabIndex={0}
                    >
                      {plan.ctaLabel}
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start">
                        {feature.value !== undefined ? (
                          <>
                            <span className="font-medium text-gray-700 mr-2">
                              {feature.name}:
                            </span>
                            <span className="text-gray-900 flex-1">{feature.value}</span>
                          </>
                        ) : feature.included === false ? (
                          <>
                            <XIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature.name}</span>
                          </>
                        ) : (
                          <>
                            <CheckIcon
                              className={cn(
                                'w-5 h-5 mr-2 flex-shrink-0 mt-0.5',
                                isHighlighted ? 'text-blue-600' : 'text-green-600'
                              )}
                            />
                            <span className="text-gray-700">{feature.name}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'cards':
        return renderCardsVariant();
      case 'minimal':
        return renderMinimalVariant();
      case 'featured':
        return renderFeaturedVariant();
      case 'table':
      default:
        return renderTableVariant();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {showHeader && (
        <div className="text-center mb-8">
          {headerTitle && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{headerTitle}</h2>
          )}
          {headerDescription && (
            <p className="text-gray-600">{headerDescription}</p>
          )}
        </div>
      )}

      {renderVariant()}
    </div>
  );
};

PricingTable.displayName = 'PricingTable';

