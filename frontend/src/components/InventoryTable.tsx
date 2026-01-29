import { type InventoryTableItem } from '../services/inventoryService'
import { FileCode, Hash } from 'lucide-react'

interface InventoryTableProps {
  inventory: InventoryTableItem[]
}

/**
 * Inventory Table 컴포넌트
 * T014: 암호화 자산 목록 테이블
 */
export const InventoryTable = ({ inventory }: InventoryTableProps) => {
  if (inventory.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
        <FileCode className="w-12 h-12 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-300 text-lg mb-2 font-medium">No cryptographic assets found</p>
        <p className="text-slate-500 text-sm">The scan did not detect any cryptographic assets.</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Algorithm Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Count
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Locations
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {inventory.map((asset) => {
              return (
                <tr
                  key={`${asset.algorithm}-${asset.count}`}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                        <FileCode className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-white font-medium">{asset.algorithm}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/5 rounded border border-white/10">
                        <Hash className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-slate-200 font-semibold">{asset.count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {asset.locations.map((location, idx) => (
                        <span
                          key={`${asset.algorithm}-${idx}`}
                          className="px-2 py-1 text-xs bg-white/5 text-slate-300 rounded font-mono"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
