"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteRecordAction(id: number) {
    try {
        await pool.query("DELETE FROM stats WHERE id = ?", [id]);

        revalidatePath("/records");

        return { success: true };
    } catch (error) {
        console.error("Error during the deletion of the record:", error);

        return { success: false, error: "Failed to delete record." };
    }
}

export async function insertRecordAction(formData: FormData) {
    const year = Number(formData.get("year"));
    const month = Number(formData.get("month"));
    const episodes = Number(formData.get("episodes"));
    const hours = Number(formData.get("hours"));
    const generated = formData.get("generated") === "1";

    try {
        await pool.query(
            "INSERT INTO stats(year, month, episodes, hours, generated) VALUES (?, ?, ?, ?, ?)",
            [year, month, episodes, hours, generated],
        );
    } catch (error) {
        console.error("Error during the insertion of the record:", error);

        return { error: "Failed to insert record." };
    }

    revalidatePath("/records");

    redirect("/records");
}
