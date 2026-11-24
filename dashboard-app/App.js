import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 샘플 데이터 (웹 대시보드와 동일)
const DATA = [
  { date: '2026-01-05', category: '전자제품', product: '무선이어폰', qty: 2, amount: 118000 },
  { date: '2026-01-18', category: '생활용품', product: '텀블러', qty: 5, amount: 75000 },
  { date: '2026-02-03', category: '전자제품', product: '스마트워치', qty: 1, amount: 229000 },
  { date: '2026-02-21', category: '식품', product: '커피원두', qty: 3, amount: 54000 },
  { date: '2026-03-09', category: '생활용품', product: '수건세트', qty: 2, amount: 38000 },
  { date: '2026-03-27', category: '전자제품', product: '보조배터리', qty: 4, amount: 136000 },
  { date: '2026-04-11', category: '식품', product: '견과류', qty: 6, amount: 90000 },
  { date: '2026-04-25', category: '생활용품', product: '텀블러', qty: 3, amount: 45000 },
  { date: '2026-05-08', category: '전자제품', product: '무선이어폰', qty: 1, amount: 59000 },
  { date: '2026-05-30', category: '식품', product: '커피원두', qty: 4, amount: 72000 },
  { date: '2026-06-14', category: '생활용품', product: '수건세트', qty: 6, amount: 114000 },
  { date: '2026-07-02', category: '전자제품', product: '스마트워치', qty: 2, amount: 458000 },
];

const CATEGORIES = ['전체', ...new Set(DATA.map((r) => r.category))];
const won = (n) => n.toLocaleString('ko-KR') + '원';

export default function App() {
  const [cat, setCat] = useState('전체');

  const rows = useMemo(
    () => (cat === '전체' ? DATA : DATA.filter((r) => r.category === cat)),
    [cat]
  );

  const total = rows.reduce((s, r) => s + r.amount, 0);
  const avg = rows.length ? Math.round(total / rows.length) : 0;

  // 카테고리별 매출 (막대 그래프용)
  const byCat = {};
  rows.forEach((r) => (byCat[r.category] = (byCat[r.category] || 0) + r.amount));
  const maxCat = Math.max(1, ...Object.values(byCat));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>📊 데이터 대시보드</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.filterRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCat(c)}
              style={[styles.chip, cat === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, cat === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cards}>
          <Card label="총 매출" value={won(total)} />
          <Card label="총 주문 수" value={rows.length + '건'} />
          <Card label="평균 주문액" value={rows.length ? won(avg) : '-'} />
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>카테고리별 매출</Text>
          {Object.entries(byCat).map(([name, amount]) => (
            <View key={name} style={styles.barRow}>
              <Text style={styles.barLabel}>{name}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${(amount / maxCat) * 100}%` }]} />
              </View>
              <Text style={styles.barValue}>{won(amount)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>상세 내역</Text>
          {rows.map((r, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cellDate}>{r.date}</Text>
              <Text style={styles.cell}>{r.product}</Text>
              <Text style={styles.cellAmt}>{won(r.amount)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f6fa' },
  header: { backgroundColor: '#1f2a44', padding: 18 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  body: { padding: 16, gap: 14 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#e3e8f2' },
  chipActive: { backgroundColor: '#3b82f6' },
  chipText: { color: '#334', fontSize: 13 },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  cards: { gap: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14 },
  cardLabel: { fontSize: 13, color: '#667' },
  cardValue: { fontSize: 22, fontWeight: '700', marginTop: 4, color: '#222' },
  panel: { backgroundColor: '#fff', borderRadius: 10, padding: 14 },
  panelTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10, color: '#222' },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  barLabel: { width: 64, fontSize: 12, color: '#445' },
  barTrack: { flex: 1, height: 12, backgroundColor: '#e8edf5', borderRadius: 6, overflow: 'hidden' },
  barFill: { height: 12, backgroundColor: '#3b82f6' },
  barValue: { width: 88, fontSize: 11, color: '#445', textAlign: 'right' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cellDate: { width: 88, fontSize: 12, color: '#667' },
  cell: { flex: 1, fontSize: 13, color: '#222' },
  cellAmt: { fontSize: 13, color: '#222', fontWeight: '600' },
});
