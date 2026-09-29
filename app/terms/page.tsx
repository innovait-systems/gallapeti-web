import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated={site.lastUpdated}
      intro={`These terms apply when you use the ${site.name} app and website, provided by ${site.company}. By using ${site.name} you agree to them.`}
    >
      <h2>Using {site.name}</h2>
      <p>
        {site.name} helps shops create bills, print receipts, share bills and see sales reports. You may use it for your own
        lawful business. You must be 18 or older, or have permission from the business owner.
      </p>

      <h2>Your data and your bills</h2>
      <ul>
        <li>Your shop data is stored on your phone. You are responsible for keeping regular backups (Settings → Backup &amp; restore).</li>
        <li>
          You are responsible for the prices, discounts, GST rates, HSN codes, GSTIN and other details you enter, and for the
          correctness of the bills and invoices you issue. {site.name} calculates totals from what you enter but is not tax or
          legal advice.
        </li>
        <li>You are responsible for having permission to record and message your customers&rsquo; contact details.</li>
      </ul>

      <h2>Free and Pro</h2>
      <p>
        The Free version is free to use with no time limit. Bills made with the Free version include a small &ldquo;Billed
        with {site.name}&rdquo; line. Paid Pro features, when available, will be described in the app with their price before
        you buy, and billed through Google Play.
      </p>

      <h2>Test versions</h2>
      <p>
        Test versions shared before or outside Google Play may stop working after a stated date. They still let you back up
        your data so you can move it to the latest version.
      </p>

      <h2>Acceptable use</h2>
      <p>Don&rsquo;t misuse the app — for example by reverse engineering it, reselling it, or using it for fraudulent billing.</p>

      <h2>Availability and changes</h2>
      <p>
        We work to keep {site.name} reliable and may update or change features. We may update these terms; the &ldquo;Last
        updated&rdquo; date shows the latest version.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        {site.name} is provided &ldquo;as is&rdquo;. To the extent permitted by law, {site.company} is not liable for indirect
        or consequential losses, lost data or lost profits arising from the use of the app, including printer or device
        issues and data lost without a backup.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in Chennai, Tamil Nadu have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> · {site.company}, {site.locationLegal}.
      </p>
    </LegalLayout>
  );
}
