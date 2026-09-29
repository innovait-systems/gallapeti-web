import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Delete your data",
  description: `How to delete your ${site.name} data.`,
};

export default function DeleteDataPage() {
  return (
    <LegalLayout
      title="Delete your data"
      updated={site.lastUpdated}
      intro={`${site.name} has no accounts and keeps your shop data only on your phone, so you are always in control of deleting it.`}
    >
      <h2>Delete some data</h2>
      <ul>
        <li>
          <strong>An item:</strong> Items → open the item → Delete item.
        </li>
        <li>
          <strong>All items:</strong> Items → scroll to the bottom → Delete all items.
        </li>
        <li>
          <strong>Your logo, UPI IDs or shop details:</strong> Settings → Shop details, then remove or edit them.
        </li>
      </ul>
      <p>Bills keep their numbers so your GST invoice series stays complete; a bill can be voided but not removed individually.</p>

      <h2>Delete everything</h2>
      <p>
        Uninstall {site.name}, or go to your phone&rsquo;s <strong>Settings → Apps → {site.name} → Storage → Clear storage</strong>.
        This permanently deletes all shop details, items, bills and settings from the phone. Create a backup first if you
        might need them again.
      </p>

      <h2>Backups and files you created</h2>
      <p>
        Backup files and Excel exports are saved wherever you chose (for example Google Drive, email or WhatsApp). Delete
        them from there — the app cannot reach them.
      </p>

      <h2>Emails you sent us</h2>
      <p>
        To delete feedback or support emails you sent us, write to{" "}
        <a href={`mailto:${site.supportEmail}?subject=${encodeURIComponent("Delete my emails")}`}>{site.supportEmail}</a> from the
        same address and we&rsquo;ll delete them within 30 days.
      </p>
    </LegalLayout>
  );
}
