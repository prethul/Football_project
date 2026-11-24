import PageHeader from "../components/PageHeader";
import RegistrationForm from "../components/RegistrationForm";
import { tournament } from "../data/tournament";

export default function Register() {
  return (
    <>
      <PageHeader
        eyebrow="টিম রেজিস্ট্রেশন"
        title="আপনার দলের রেজিস্ট্রেশন করুন"
        description={`প্রতিটি দলকে ঠিক ৯ জন খেলোয়াড়ের নাম ও জার্সি সাইজ দিতে হবে। এন্ট্রি ফি ${tournament.entryFee}।`}
      />
      <section className="pitch-bg py-12 sm:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
