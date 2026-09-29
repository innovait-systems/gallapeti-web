import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles your information — your shop data stays on your phone.`,
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated={site.lastUpdated}
      intro={`${site.name} is a billing app operated by ${site.company}. In short: your shop data stays on your phone. We don't ask you to sign up, and we don't collect, sell or share your bills, items or customer details.`}
    >
      <h2>What the app stores — on your phone only</h2>
      <p>To make bills, {site.name} saves the following in the app&rsquo;s private storage on your device:</p>
      <ul>
        <li>
          <strong>Shop details</strong> you enter — shop name, address, phone number, GSTIN, UPI IDs, bill settings and your
          shop logo.
        </li>
        <li>
          <strong>Items</strong> — names, prices, MRP, discounts, cost prices, GST rates, barcodes, HSN codes and stock.
        </li>
        <li>
          <strong>Bills</strong> — items sold, amounts, taxes, payment method, and a customer&rsquo;s name or mobile number if
          you choose to enter it.
        </li>
        <li>
          <strong>Settings</strong> — printer, paper size and app preferences.
        </li>
      </ul>
      <p>
        This data is <strong>not sent to {site.company}</strong> or to anyone else. We do not run servers that receive it. The
        app contains no advertising, analytics or tracking tools.
      </p>

      <h2>Permissions the app asks for</h2>
      <ul>
        <li>
          <strong>Camera</strong> — only to scan product barcodes. The camera image is read on your phone and is not saved or
          sent anywhere.
        </li>
        <li>
          <strong>Photos</strong> — only when you pick a shop logo. Just the image you choose is copied into the app.
        </li>
        <li>
          <strong>Nearby devices (Bluetooth)</strong> — to find, pair and print to your Bluetooth receipt printer. We never
          use Bluetooth to work out your location. On Android 11 and older, Android requires the location permission to find
          Bluetooth devices; it is used only for that.
        </li>
        <li>
          <strong>Network access</strong> — to print to Wi-Fi printers on your shop&rsquo;s network and to open WhatsApp,
          SMS or email when you share a bill.
        </li>
      </ul>
      <p>You can deny or turn off any permission in your phone&rsquo;s settings; the rest of the app keeps working.</p>

      <h2>When you share something</h2>
      <p>
        Bills are shared only when you tap to do so — by WhatsApp, SMS, email, printing or the Android share screen. The bill
        then goes to the app and person you choose, and is handled under their privacy policies. Backups and Excel exports
        are files that you create and save where you decide (for example Google Drive or your own WhatsApp); please keep them
        safe, as they contain your shop data.
      </p>

      <h2>Your customers&rsquo; details</h2>
      <p>
        If you record a customer&rsquo;s name or mobile number on a bill (for example to send it on WhatsApp), you are
        responsible for having their permission and for using it only for your shop&rsquo;s billing.
      </p>

      <h2>Feedback and support emails</h2>
      <p>
        If you write to us — including through &ldquo;Send feedback&rdquo; in the app — we receive what you send, such as
        your email address, your message, the app version and your Android version. We use it only to reply and improve{" "}
        {site.name}, and we don&rsquo;t share it.
      </p>

      <h2>Keeping your data safe</h2>
      <p>
        Your data is protected by your phone&rsquo;s own security, so use a screen lock. Anyone who can unlock your phone can
        open the app. Uninstalling the app or clearing its storage permanently deletes all its data from the phone — see{" "}
        <a href="/delete-data">Delete your data</a>.
      </p>

      <h2>Future online features</h2>
      <p>
        We plan optional online features such as cloud backup and multi-phone sync (Pro). If you choose to use them, this
        policy will be updated first to explain exactly what is stored online and how, and nothing will leave your phone
        unless you turn those features on.
      </p>

      <h2>Children</h2>
      <p>{site.name} is a business app intended for adults (18+) and is not directed to children.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Changes are shown by the &ldquo;Last updated&rdquo; date above.</p>

      <h2>Contact us</h2>
      <p>
        Questions about privacy? Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. {site.company},{" "}
        {site.locationLegal}.
      </p>
    </LegalLayout>
  );
}
