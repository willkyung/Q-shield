from pydantic import BaseModel, Field
from typing import List, Literal, Optional
from datetime import datetime
from uuid import UUID

# 1) POST /api/scans
class ScanCreateRequest(BaseModel):
    github_url: str

class ScanCreateResponse(BaseModel):
    uuid: str
    status: str  # QUEUED | RUNNING | COMPLETED | FAILED


# 2) GET /api/scans/{uuid}/status
class ScanStatusResponse(BaseModel):
    status: str
    progress: float = Field(ge=0.0, le=1.0)
    message: str


# 3) GET /api/scans (이력)
class ScanListItem(BaseModel):
    uuid: str
    repo_name: str
    status: str
    created_at: datetime

class ScanListResponse(BaseModel):
    items: List[ScanListItem]


# 4) GET /api/scans/{uuid}/inventory
class AlgorithmRatio(BaseModel):
    name: str
    ratio: float = Field(ge=0.0, le=1.0, examples=[0.55])


class InventoryTableItem(BaseModel):
    algorithm: str
    count: int = Field(ge=0, examples=[12])
    locations: List[str] = Field(examples=[["src/auth.py:42", "src/crypto/rsa.py:10"]])


class InventoryResponse(BaseModel):
    pqc_readiness_score: float = Field(ge=0.0, le=10.0, examples=[6.8])
    algorithm_ratios: List[AlgorithmRatio] = Field(
        examples=[[{"name": "RSA", "ratio": 0.55}, {"name": "ECC", "ratio": 0.25}, {"name": "AES", "ratio": 0.2}]]
    )
    inventory_table: List[InventoryTableItem] = Field(
        examples=[
            [
                {"algorithm": "RSA", "count": 12, "locations": ["src/auth.py:42", "src/crypto/rsa.py:10"]},
                {"algorithm": "ECC", "count": 5, "locations": ["src/tls.py:88"]},
            ]
        ]
    )


# 5) GET /api/scans/{uuid}/heatmap
class HeatmapNode(BaseModel):
    name: str
    path: str
    type: Literal["dir", "file"]
    risk_score: float = Field(ge=0.0, le=1.0, examples=[0.62])
    children: List["HeatmapNode"] = Field(default_factory=list)


HeatmapNode.model_rebuild()


# 6) GET /api/scans/{uuid}/recommendations
class RecommendationResponse(BaseModel):
    priority_rank: int = Field(ge=1, examples=[1])
    estimated_effort: str = Field(examples=["2 M/D"])
    ai_recommendation: str = Field(
        examples=[
            "## 1) 인증 구간 RSA 사용 감지\\n- Kyber로 키교환 전환을 권장합니다.\\n- TLS 설정에서 PFS를 강화하세요.\\n"
        ]
    )
