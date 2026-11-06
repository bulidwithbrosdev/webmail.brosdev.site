import { getServerTranslator } from "@/lib/i18n/server";
import { LicenseActivation } from "./license-activation";

export default async function LicensesPage() {
  const t = await getServerTranslator();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-neutral-900">{t("licenses.title")}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {t("licenses.description")}
        </p>
      </div>
      <LicenseActivation />
    </div>
  );
}
