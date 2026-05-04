import pool from "@/lib/db";
import Header from "@/components/Header";
import Section from "@/components/Section";
import RecordForm from "@/components/RecordForm";
import { notFound } from "next/navigation";

export default async function EditRecordPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const recordId = Number(resolvedParams.id);

    const [record] = await pool.query("SELECT * FROM stats WHERE id = ?", [
        recordId,
    ]);
    const recordData = record as any[];

    if (recordData.length === 0) {
        notFound();
    }

    const recordToEdit = recordData[0];

    return (
        <div>
            <Header
                title="Edit Record"
                subtitle="Update data for the month of"
            />

            <Section title="Edit record">
                <RecordForm initialData={recordToEdit} />
            </Section>
        </div>
    );
}
