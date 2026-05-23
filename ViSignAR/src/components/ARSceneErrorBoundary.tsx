import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, FontSizes, Spacing } from '../constants/theme'

interface Props {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ARSceneErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('[ViSignAR] Viro AR crash, fallback to simulated AR:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.wrap}>
          <Text style={styles.title}>Viro AR gặp lỗi — chuyển sang AR mô phỏng</Text>
          <Text style={styles.body}>
            ARCore có thể đã cài nhưng session AR không khởi tạo được trên A16 5G.
          </Text>
          <View style={styles.fallback}>{this.props.fallback}</View>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  fallback: {
    flex: 1,
  },
  title: {
    color: '#FFAA00',
    fontSize: FontSizes.sm,
    textAlign: 'center',
    backgroundColor: 'rgba(180, 80, 0, 0.9)',
    padding: Spacing.sm,
  },
  body: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
})
