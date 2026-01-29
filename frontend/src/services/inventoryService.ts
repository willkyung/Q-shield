import { handleError, type AppError } from '../utils/errorHandler'
import { logError } from '../utils/logger'

/**
 * 알고리즘 비율 타입
 */
export interface AlgorithmRatio {
  name: string
  ratio: number
}

/**
 * 인벤토리 테이블 아이템 타입
 */
export interface InventoryTableItem {
  algorithm: string
  count: number
  locations: string[]
}

/**
 * 인벤토리 응답 타입
 */
export interface InventoryResponse {
  pqc_readiness_score: number // 0.0-10.0
  algorithm_ratios: AlgorithmRatio[]
  inventory_table: InventoryTableItem[]
}

/**
 * 네트워크 지연 시뮬레이션 (0.5-1초)
 */
const simulateNetworkDelay = (): Promise<void> => {
  const delay = 500 + Math.random() * 500 // 0.5-1초
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * 인벤토리 서비스
 */
export const inventoryService = {
  /**
   * 스캔 인벤토리 조회
   * Mock: 요구사항에 맞는 더미 데이터 반환
   */
  async getScanInventory(uuid: string): Promise<InventoryResponse> {
    try {
      // 네트워크 지연 시뮬레이션
      await simulateNetworkDelay()

      // 실제 API 호출 (현재는 mock)
      // const response = await apiClient.get<InventoryResponse>(`/scans/${uuid}/inventory`)
      // return response.data

      // localStorage에서 캐시 확인
      const inventoryKey = `pqc-scanner-inventory-${uuid}`
      const cached = localStorage.getItem(inventoryKey)
      if (cached) {
        return JSON.parse(cached) as InventoryResponse
      }

      // 요구사항에 맞는 Mock 인벤토리 데이터
      const mockInventory: InventoryResponse = {
        pqc_readiness_score: 6.8,
        algorithm_ratios: [
          { name: 'RSA', ratio: 0.55 },
          { name: 'ECC', ratio: 0.25 },
          { name: 'AES', ratio: 0.2 },
        ],
        inventory_table: [
          {
            algorithm: 'RSA',
            count: 12,
            locations: ['src/auth.py:42', 'src/crypto/rsa.py:10'],
          },
          {
            algorithm: 'ECC',
            count: 5,
            locations: ['src/tls.py:88'],
          },
        ],
      }

      // localStorage에 저장 (나중에 재사용)
      localStorage.setItem(inventoryKey, JSON.stringify(mockInventory))

      return mockInventory
    } catch (error) {
      logError('Failed to get scan inventory', error)
      throw handleError(error) as AppError
    }
  },
}
