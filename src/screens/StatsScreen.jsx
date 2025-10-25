import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFinanceStore } from "../store";
import { formatMoney, isSameMonth } from "../utils/format";

export default function StatsScreen() {
    const entries = useFinanceStore((s) => s.entries);

    const { monthIncome, monthExpense, byCategory } = useMemo(() => {
        const now = new Date();
        const month = entries.filter((e) => isSameMonth(e.date, now));
        const monthIncome = month
            .filter((e) => e.type === "income")
            .reduce((a, b) => a + b.amount, 0);
        const monthExpense = month
            .filter((e) => e.type === "expense")
            .reduce((a, b) => a + b.amount, 0);
        const byCat = month
            .filter((e) => e.type === "expense")
            .reduce((acc, e) => {
                const key = e.category || "Без категории";
                acc[key] = (acc[key] ?? 0) + e.amount;
                return acc;
            }, {});
        return { monthIncome, monthExpense, byCategory: byCat };
    }, [entries]);

    return (
        <View style={{ flex: 1, backgroundColor: "#f4f6f8" }}>
            <View style={{ padding: 16, gap: 12 }}>
                <View style={styles.card}>
                    <Text style={styles.h}>Текущий месяц</Text>
                    <Text style={styles.kpi}>
                        Доход: {formatMoney(monthIncome)}
                    </Text>
                    <Text style={styles.kpi}>
                        Расходы: {formatMoney(monthExpense)}
                    </Text>
                    <Text style={styles.kpi}>
                        Итого: {formatMoney(monthIncome - monthExpense)}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.h}>Расходы по категориям</Text>
                    {Object.keys(byCategory).length === 0 ? (
                        <Text style={{ color: "#666", marginTop: 6 }}>
                            Нет данных
                        </Text>
                    ) : (
                        Object.entries(byCategory).map(([cat, sum]) => (
                            <View
                                key={cat}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 6,
                                }}
                            >
                                <Text>{cat}</Text>
                                <Text style={{ fontWeight: "700" }}>
                                    {formatMoney(sum)}
                                </Text>
                            </View>
                        ))
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: "#fff", padding: 16, borderRadius: 12 },
    h: { fontSize: 16, fontWeight: "800" },
    kpi: { marginTop: 6, fontSize: 15 },
});
