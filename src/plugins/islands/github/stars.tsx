import React from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Coffee,
  DollarSign,
  Files,
  LayoutDashboard,
  Leaf,
  MapPin,
  PlaneTakeoff,
  QrCode,
  Server,
  Shield,
  ShieldAlert,
  ShipWheel,
  ShoppingBag,
  Sun,
  Text,
  ToggleRight,
  Train,
  TrainFront,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import {
  DISCORD_URL,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  REPOSITORY_URL,
  siteConfig,
} from "~/app";
import { Icons } from "~/islands/icons";
import { Badge } from "~/islands/primitives/badge";
import { Separator } from "~/islands/primitives/separator";
import { Link } from "~/navigation";

export async function GithubStarsPlugin() {
  const githubStars = await getGithubStars();

  return (
    <>
      {githubStars ? (
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Badge
            className="rounded-lg border-2 border-zinc-900/10 px-3.5 py-1.5 text-sm font-semibold dark:border-zinc-800 lg:text-base"
            variant="outline"
          >
            <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-label="GitHub" />
            <OssStarsBadge githubStars={githubStars} />
          </Badge>
        </Link>
      ) : null}
    </>
  );
}

export async function getGithubStars(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 },
      },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function OssStarsBadge({ githubStars }: { githubStars: number | null }) {
  const t = useTranslations("plugins");
  return (
    <>
      {t("stars")} {githubStars}/500
    </>
  );
}

export function OssFeaturesSection({
  githubStars,
}: {
  githubStars: number | null;
}) {
  const t = useTranslations("landing");
  return (
    <section
      id="open-source-features"
      className="mx-auto my-14 mt-4 grid w-fit place-items-center items-center justify-center gap-6 space-y-6 rounded-lg border bg-card px-6 py-14 pb-20 pt-4 text-card-foreground shadow-sm transition-opacity hover:opacity-80"
    >
      <Balancer
        as="h2"
        className="mx-auto my-6 flex max-w-xl font-heading text-lg font-semibold leading-[1.1] tracking-tight text-muted-foreground sm:text-xl"
      >
        {t("open-source.title")}
      </Balancer>
      <Balancer
        as="p"
        className="mx-auto flex max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
      >
        <Link href={REPOSITORY_URL}>
          <span>{t("open-source.stars", { count: githubStars })}</span>
        </Link>{" "}
        {t("title")} {t("open-source.subtitle.first")} {t("features.subtitle")}{" "}
        {t("subtitle")}
        <br />
        {t("open-source.subtitle.second")}{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
          href={REPOSITORY_URL}
        >
          GitHub
        </Link>{" "}
        and visit our{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
          href={DISCORD_URL}
        >
          Discord
        </Link>
        .
      </Balancer>
      <Features />
    </section>
  );
}

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
