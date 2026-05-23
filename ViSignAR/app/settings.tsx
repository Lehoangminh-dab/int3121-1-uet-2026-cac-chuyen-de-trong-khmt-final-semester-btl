import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useSettings } from '../src/hooks/useSettings'
import { setConsent, setDelay, setForceViroAR } from '../src/store/settings'
import { Colors, FontSizes, Spacing } from '../src/constants/theme'
import { checkARSupport, getLastARCheck, openARCoreInstaller } from '../src/services/arSupport'

function Para({ children }: { children: string }) {
  return <Text style={styles.cardBody}>{children}</Text>
}

const DELAY_OPTIONS = [500, 750, 1000, 1500, 2000]

export default function SettingsScreen() {
  const { delayMs, consentGiven, forceViroAR } = useSettings()
  const [arStatusText, setArStatusText] = useState('Chưa kiểm tra')

  const refreshARStatus = async () => {
    setArStatusText('Đang kiểm tra…')
    const info = await checkARSupport({ forceViro: forceViroAR })
    setArStatusText(`${info.status.toUpperCase()}${info.rawCode ? ` (${info.rawCode})` : ''} — ${info.message}`)
  }

  useEffect(() => {
    const last = getLastARCheck()
    if (last.status !== 'checking') {
      setArStatusText(`${last.status.toUpperCase()} — ${last.message}`)
    }
  }, [forceViroAR])

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* REQ-COMP-001 + REQ-ML-004 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông báo sử dụng</Text>
          <Para>Ứng dụng sẽ sử dụng microphone để thu âm giọng nói và gửi đến dịch vụ nhận dạng giọng nói để xử lý.</Para>
          <Para>Phạm vi dịch hiện tại giới hạn ở từ điển đã cấu hình. Các từ ngoài từ điển sẽ được thông báo không nhận dạng được và không tạo ra ký hiệu.</Para>
          <View style={styles.consentRow}>
            <Text style={styles.consentLabel}>Tôi đã đọc và đồng ý</Text>
            <Switch
              value={consentGiven}
              onValueChange={setConsent}
              thumbColor={Colors.white}
              trackColor={{ false: '#333333', true: Colors.blue }}
            />
          </View>
        </View>

        {/* AR / ARCore */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AR & ARCore</Text>
          <Para>
            Mặc định app dùng AR mô phỏng (ổn định). Chỉ bật &quot;Ưu tiên Viro AR&quot; khi muốn thử AR thật — một số máy (ví dụ Galaxy A16 5G) có thể văng app khi bật.
          </Para>
          <Text style={styles.arStatus}>{arStatusText}</Text>
          <View style={styles.consentRow}>
            <Text style={styles.consentLabel}>Ưu tiên Viro AR (ARCore)</Text>
            <Switch
              value={forceViroAR}
              onValueChange={setForceViroAR}
              thumbColor={Colors.white}
              trackColor={{ false: '#333333', true: Colors.blue }}
            />
          </View>
          <View style={styles.arActions}>
            <TouchableOpacity style={styles.linkBtn} onPress={refreshARStatus}>
              <Text style={styles.linkBtnText}>Kiểm tra lại ARCore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} onPress={openARCoreInstaller}>
              <Text style={styles.linkBtnText}>Mở Google Play Services for AR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inter-sign delay */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Độ trễ giữa ký hiệu</Text>
          <Para>Thời gian chờ giữa 2 ký hiệu liên tiếp (mặc định: 1000 ms).</Para>
          <View style={styles.delayRow}>
            {DELAY_OPTIONS.slice(0, 4).map((v) => (
              <Text
                key={v}
                onPress={() => setDelay(v)}
                style={[styles.delayOption, delayMs === v && styles.delayOptionActive]}
              >
                {v}ms
              </Text>
            ))}
          </View>
          <View style={styles.delayRow}>
            {DELAY_OPTIONS.slice(4).map((v) => (
              <Text
                key={v}
                onPress={() => setDelay(v)}
                style={[styles.delayOption, delayMs === v && styles.delayOptionActive]}
              >
                {v}ms
              </Text>
            ))}
          </View>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Giới thiệu</Text>
          <View style={styles.aboutBlock}>
            <Text style={styles.aboutVersion}>ViSignAR v1.0</Text>
            <Text style={styles.cardBody}>Dự án nghiên cứu UET — INT3121-1 (2026)</Text>
          </View>
          <Para>Chuyển đổi tiếng Việt nói sang hoạt ảnh 3D Ngôn ngữ Ký hiệu Việt Nam (VSL).</Para>
          <Para>Stack: Expo + React Native + ViroReact (ARCore) + OpenAI Whisper STT.</Para>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.black },
  container: { padding: Spacing.md, gap: Spacing.md },
  card: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 10,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardTitle: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '700' },
  cardBody: { color: '#CCCCCC', fontSize: FontSizes.sm, lineHeight: 20 },
  aboutBlock: { gap: 2 },
  aboutVersion: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  consentLabel: { color: Colors.white, fontSize: FontSizes.md },
  delayRow: { flexDirection: 'row' },
  delayOption: {
    color: Colors.blue,
    borderWidth: 1,
    borderColor: Colors.blue,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 6,
    fontSize: FontSizes.sm,
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  delayOptionActive: { backgroundColor: Colors.blue, color: Colors.white },
  arStatus: { color: '#8899BB', fontSize: FontSizes.sm, lineHeight: 20 },
  arActions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.xs },
  linkBtn: {
    borderWidth: 1,
    borderColor: Colors.blue,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 6,
  },
  linkBtnText: { color: Colors.blue, fontSize: FontSizes.sm, fontWeight: '600' },
})
