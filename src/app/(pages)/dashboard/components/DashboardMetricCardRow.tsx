import DashboardMetricCard, { DashboardMetricCardProps } from "./DashboardMetricCard";

type DashboardMetricCardRowProps = {
    metrics: DashboardMetricCardProps[];
};

export default function DashboardMetricCardRow({ metrics }: DashboardMetricCardRowProps) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
                <DashboardMetricCard
                    key={index}
                    num={metric.num}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    subheading={metric.subheading}
                />
            ))}
        </div>
    );
}
