import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useFinanceStore } from "../store";

export default function AddEntryScreen({ route, navigation }) {
    const presetType = route.params?.type ?? "expense";
    const addEntry = useFinanceStore((s) => s.addEntry);
    console.log(presetType);
    const [type, setType] = useState(presetType);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");

    const onSave = () => {
        const num = Number(amount.replace(",", "."));
        if (!title.trim() || !Number.isFinite(num) || num <= 0) {
            Alert.alert("Проверь поля", "Название и сумма (>0) обязательны");
            return;
        }
        addEntry({
            type,
            title: title.trim(),
            amount: num,
            category: category.trim() || undefined,
            date: new Date().toISOString(),
            notes: notes.trim() || undefined,
        });
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: "padding", android: undefined })}
            style={{ flex: 1 }}
        >
            <View style={{ padding: 16, gap: 12 }}>
                <View style={styles.switchRow}>
                    <Pressable
                        onPress={() => setType("income")}
                        style={[
                            styles.switchBtn,
                            type === "income" && styles.switchActiveGreen,
                        ]}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                type === "income" && styles.switchTextActive,
                            ]}
                        >
                            Доход
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setType("expense")}
                        style={[
                            styles.switchBtn,
                            type === "expense" && styles.switchActiveRed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                type === "expense" && styles.switchTextActive,
                            ]}
                        >
                            Расход
                        </Text>
                    </Pressable>
                </View>

                <TextInput
                    placeholder="Название (например, Зарплата / Кофе)"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Сумма (например, 12.5)"
                    keyboardType="decimal-pad"
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                />
                <TextInput
                    placeholder="Категория (опционально)"
                    style={styles.input}
                    value={category}
                    onChangeText={setCategory}
                />
                <TextInput
                    placeholder="Заметка (опционально)"
                    style={[
                        styles.input,
                        { height: 90, textAlignVertical: "top" },
                    ]}
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                />

                <Pressable style={styles.saveBtn} onPress={onSave}>
                    <Text style={styles.saveText}>Сохранить</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    switchRow: { flexDirection: "row", gap: 8 },
    switchBtn: {
        flex: 1,
        padding: 12,
        backgroundColor: "#e5e7eb",
        borderRadius: 8,
        alignItems: "center",
    },
    switchActiveGreen: { backgroundColor: "#c8e6c9" },
    switchActiveRed: { backgroundColor: "#ffcdd2" },
    switchText: { fontWeight: "700", color: "#333" },
    switchTextActive: { color: "#000" },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: "#0d47a1",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 4,
    },
    saveText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
