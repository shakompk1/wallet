import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { formatMoney } from "../utils/format";
import { useFinanceStore } from "../store";

export default function EntryItem({ entry }) {
    const remove = useFinanceStore((s) => s.removeEntry);

    return (
        <Pressable onLongPress={() => remove(entry.id)} style={styles.row}>
            <View style={styles.left}>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.meta}>
                    {entry.category ?? "—"} •{" "}
                    {new Date(entry.date).toLocaleDateString()}
                </Text>
            </View>
            <Text
                style={[
                    styles.amount,
                    { color: entry.type === "income" ? "#1a7f37" : "#d32f2f" },
                ]}
            >
                {entry.type === "expense" ? "−" : "+"}
                {formatMoney(entry.amount)}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: { flexShrink: 1, paddingRight: 12 },
    title: { fontSize: 16, fontWeight: "600" },
    meta: { color: "#666", marginTop: 2 },
    amount: { fontSize: 16, fontWeight: "700" },
});
