export const formatMoney = (n, currency = "AZN") =>
    new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

export const isSameMonth = (iso, now = new Date()) => {
    const d = new Date(iso);
    return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
};
