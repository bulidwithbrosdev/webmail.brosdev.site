"use client";

import { CheckCircle2 } from "@/components/icons";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
	Card,
	CardContent,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LicenseStatus } from "@/lib/licenses/types";
import { formatLicensePlan, loadLicenseStatus } from "./utils";

export function LicenseActivation() {
	const { t } = useLanguage();
	const [license, setLicense] = useState<LicenseStatus | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		loadLicenseStatus()
			.then((nextLicense) => {
				if (!cancelled) setLicense(nextLicense);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	if (loading) return <Skeleton className="h-40 w-full rounded-3xl" />;

	return (
		<Card className="rounded-3xl border-0 bg-white px-6">
			<CardContent className="flex items-start gap-4 py-8">
				<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
					<CheckCircle2 className="h-6 w-6" />
				</span>
				<div className="min-w-0 flex-1">
					<CardTitle>{t("licenses.activated")}</CardTitle>
					<p className="mt-2 text-sm leading-6 text-neutral-600">
						{t("licenses.activatedBody", { plan: formatLicensePlan(license?.plan || "team", t) })}
					</p>
					<p className="mt-1 text-sm text-neutral-500">
						{t("licenses.seatsUnlimited")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
