import React, { useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Pressable,
} from "react-native";
import { useFinanceStore } from "../store";
import { formatMoney, isSameMonth } from "../utils/format";
import EntryItem from "../components/EntryItem";

export default function HomeScreen({ navigation }) {
    const entries = useFinanceStore((s) => s.entries);

    const { income, expense, balance, monthIncome, monthExpense } =
        useMemo(() => {
            const sum = (arr, type) =>
                arr
                    .filter((e) => e.type === type)
                    .reduce((a, b) => a + b.amount, 0);

            const inc = sum(entries, "income");
            const exp = sum(entries, "expense");
            const now = new Date();
            const monthEntries = entries.filter((e) =>
                isSameMonth(e.date, now),
            );
            const monthInc = sum(monthEntries, "income");
            const monthExp = sum(monthEntries, "expense");

            return {
                income: inc,
                expense: exp,
                balance: inc - exp,
                monthIncome: monthInc,
                monthExpense: monthExp,
            };
        }, [entries]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f6f8" }}>
            <FlatList
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
                data={entries}
                keyExtractor={(i) => i.id}
                ListHeaderComponent={
                    <View>
                        <View style={styles.card}>
                            <Text style={styles.h}>Баланс</Text>
                            <Text style={styles.balance}>
                                {formatMoney(balance)}
                            </Text>
                            <Text style={styles.sub}>
                                В этом месяце: +{formatMoney(monthIncome)} / −
                                {formatMoney(monthExpense)}
                            </Text>
                        </View>

                        <View style={[styles.rowBtns]}>
                            <Pressable
                                style={[
                                    styles.btn,
                                    { backgroundColor: "#1a7f37" },
                                ]}
                                onPress={() =>
                                    navigation.navigate("Add", {
                                        type: "income",
                                    })
                                }
                            >
                                <Text style={styles.btnText}>+ Доход</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.btn,
                                    { backgroundColor: "#d32f2f" },
                                ]}
                                onPress={() =>
                                    navigation.navigate("Add", {
                                        type: "expense",
                                    })
                                }
                            >
                                <Text style={styles.btnText}>− Расход</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.btn,
                                    { backgroundColor: "#0d47a1" },
                                ]}
                                onPress={() => navigation.navigate("Stats")}
                            >
                                <Text style={styles.btnText}>Статистика</Text>
                            </Pressable>
                        </View>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                marginTop: 12,
                                marginBottom: 8,
                            }}
                        >
                            Операции
                        </Text>
                    </View>
                }
                renderItem={({ item }) => <EntryItem entry={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: "#fff", padding: 16, borderRadius: 12 },
    h: { color: "#555" },
    balance: { fontSize: 28, fontWeight: "800", marginTop: 6 },
    sub: { color: "#666", marginTop: 4 },
    rowBtns: { flexDirection: "row", gap: 8, marginTop: 12 },
    btn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
    btnText: { color: "#fff", fontWeight: "700" },
});
