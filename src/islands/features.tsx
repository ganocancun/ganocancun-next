import React from "react";
import {
  Briefcase,
  CheckCircle,
  Coffee,
  Leaf,
  MapPin,
  Shield,
  Sun,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { Separator } from "~/islands/primitives/separator";

export function Features() {
  const t = useTranslations("landing");
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        title={t("features.1.title")}
        description={t("features.1.description")}
        icon={Leaf}
      />
      <FeatureCard
        title={t("features.2.title")}
        description={t("features.2.description")}
        icon={Coffee}
      />
      <FeatureCard
        title={t("features.3.title")}
        description={t("features.3.description")}
        icon={CheckCircle}
      />
      <FeatureCard
        title={t("features.4.title")}
        description={t("features.4.description")}
        icon={MapPin}
      />
      <FeatureCard
        title={t("features.5.title")}
        description={t("features.5.description")}
        icon={Sun}
      />
      <FeatureCard
        title={t("features.6.title")}
        description={t("features.6.description")}
        icon={Shield}
      />
      <FeatureCard
        title={t("features.7.title")}
        description={t("features.7.description")}
        icon={Users}
      />
      <FeatureCard
        title={t("features.8.title")}
        description={t("features.8.description")}
        icon={Briefcase}
      />
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background p-2 text-left">
      <div className="flex flex-col justify-between rounded-lg p-6">
        <div className="flex min-h-[64px] items-center space-x-4">
          <Icon className="h-8 w-8" aria-hidden />
          <Balancer
            as="h2"
            className="font-heading text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl"
          >
            {title}
          </Balancer>
        </div>
        <Separator className="my-4" />
        <Balancer as="p" className="flex text-muted-foreground">
          {description}
        </Balancer>
      </div>
    </div>
  );
}
