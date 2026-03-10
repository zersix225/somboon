export function exportCSV<T extends Record<string, unknown>>(
  data: readonly T[] | undefined,
) {
  console.log(data);
  if (!data || data.length === 0) return;

  const headerStr =
    Object.keys(data[0]!)
      .map((key) => `"${key}"`)
      .join(",") + "\r\n";
  console.log(headerStr);

  const bodyStr = data
    .map((faObj) => {
      const row = Object.values(faObj).map((value) => {
        const str = String(value ?? "");
        return `"${str.replaceAll('"', '""')}"`;
      });
      return row + "\r\n";
    })
    .join("");
  window.open("data:text/csv;charset=utf-8,\uFEFF" + headerStr + bodyStr);
}
