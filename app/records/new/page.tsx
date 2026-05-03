import Header from "@/components/Header";
import RecordForm from "@/components/RecordForm";
import Section from "@/components/Section";

export default function NewRecordPage() {
    return (
        <div>
            <Header
                title="Add New Record"
                subtitle="Fill in the details for the new monthly entry."
            />

            <Section title="Add a new record">
                <RecordForm />
            </Section>
        </div>
    );
}
