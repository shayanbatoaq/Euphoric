"use client";

import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries()
  .map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function countryFlag(code: CountryCode) {
  return code
    .split("")
    .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

function nationalDigits(value: string, country: CountryCode) {
  const callingCode = getCountryCallingCode(country);
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith(`00${callingCode}`)) {
    digits = digits.slice(callingCode.length + 2);
  } else if (digits.startsWith(callingCode)) {
    digits = digits.slice(callingCode.length);
  }

  return digits.replace(/^0+/, "").slice(0, 15 - callingCode.length);
}

export function formatInternationalPhone(
  value: string,
  country: CountryCode,
) {
  const callingCode = getCountryCallingCode(country);
  const digits = nationalDigits(value, country);

  if (country === "PK") {
    const mobileDigits = digits.slice(0, 10);
    if (!mobileDigits) return "+92 ";
    if (mobileDigits.length <= 3) return `+92 ${mobileDigits}`;
    return `+92 ${mobileDigits.slice(0, 3)}-${mobileDigits.slice(3)}`;
  }

  if (!digits) return `+${callingCode} `;
  return new AsYouType().input(`+${callingCode}${digits}`);
}

export function InternationalPhoneField({
  country,
  value,
  onCountryChange,
  onValueChange,
  error,
}: {
  country: CountryCode;
  value: string;
  onCountryChange: (country: CountryCode) => void;
  onValueChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
        Phone Number
      </label>
      <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
        <select
          value={country}
          onChange={(event) => {
            const nextCountry = event.target.value as CountryCode;
            onCountryChange(nextCountry);
            onValueChange(formatInternationalPhone("", nextCountry));
          }}
          aria-label="Phone country"
          className="w-full border border-[#C0C0C0]/30 bg-[#0A0A0A] px-3 py-3 text-[#F5F5F5] outline-none transition-colors focus:border-[#C0C0C0]"
        >
          {countries.map((option) => (
            <option key={option.code} value={option.code}>
              {countryFlag(option.code)} {option.name} (+{option.callingCode})
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={value}
          onChange={(event) =>
            onValueChange(formatInternationalPhone(event.target.value, country))
          }
          placeholder={
            country === "PK"
              ? "+92 334-1111657"
              : `+${getCountryCallingCode(country)}`
          }
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "contact-phone-error" : undefined}
          className="w-full border border-[#C0C0C0]/30 bg-[#0A0A0A] px-4 py-3 text-[#F5F5F5] outline-none transition-colors focus:border-[#C0C0C0]"
        />
      </div>
      {error && (
        <p id="contact-phone-error" className="mt-2 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
