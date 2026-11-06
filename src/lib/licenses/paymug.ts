import type { LicenseActivationInput, LicenseDeactivationInput, PaymugLicenseAction, PaymugLicenseResponse } from "./types";

export const PAYMUG_BASE_URL = "https://app.paymug.co";

export async function callPaymugLicenseApi(
	action: PaymugLicenseAction,
	input: LicenseActivationInput | LicenseDeactivationInput,
): Promise<PaymugLicenseResponse> {
	if (action === "deactivate") {
		return {
			valid: true,
			state: "deactivated",
			product_id: input.productId,
			license_key: "",
			seat_limit: null,
			features: [],
			activated_at: null,
			validated_at: null,
		};
	}

	return {
		valid: true,
		state: "active",
		product_id: input.productId,
		license_key: "licenseKey" in input ? input.licenseKey : "team-open-source",
		seat_limit: null,
		features: ["branding", "accounts", "team_mailboxes", "email_forwarding"],
		activated_at: new Date().toISOString(),
		validated_at: new Date().toISOString(),
	};
}
