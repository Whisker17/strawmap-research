# Ethereum Strawmap Research Pack

本目录已经把隐藏工作区里的研究成果整理到根目录，便于直接同步给 Mantle dev team。

## 推荐阅读顺序

1. `REPORT_PACK.pdf`：完整可分享版本，适合直接转发或评审。
2. `REPORT_PACK.md`：完整 Markdown 版本，适合二次编辑。
3. `INDEX.md`：报告导航，列出 14 份主报告与 2 个附录。
4. `reports/`：每个方向的独立深度报告，均覆盖瓶颈、优化机制、未来效果、依赖关系与 Mantle 影响。
5. `SYNTHESIS.md`：高层综合分析，适合先快速理解整体路线。

## 目录结构

- `REPORT_PACK.pdf` / `REPORT_PACK.html` / `REPORT_PACK.md`：完整报告包。
- `INDEX.md`：最新报告包索引。
- `SYNTHESIS.md`：综合结论与跨层分析。
- `reports/`：14 份方向报告 + 2 个附录。
- `evidence/`：source ledger、claim ledger、验证报告、网页刷新结果、gate review。
- `worklogs/`：subagent 调研笔记、规划记录、扩展日志。
- `archive/initial-report/`：第一版高层报告、原始 Strawmap 抓取材料与早期来源缓存。
- `notes/`：人工补充笔记。
- `research/`：此前已有的研究草稿。

## 当前版本校验

最新可见报告包已根据 Claude Code Fable review 做过修订；隐藏工作区原件保留作历史快照，根目录版本是当前对外版本。

已验证结果：

- 编号主报告：14 份。
- 附录：2 份。
- 来源可达性：本轮对当前 122 个 unique URLs 做过 HTTP 可达性检查，结果为 120 OK、2 restricted、0 bad。
- 高风险声明：Mantle DA/proof 状态、EIP/fork meta、Appendix B crosswalk 已追加人工核验与修正。
- 必需章节缺失：0。
- 独立 gate review：上一轮为 `UNCONDITIONAL APPROVAL`；本轮已吸收 Fable review 的 P0/P1/P2 修正。

## 报告主题

1. Fast L1 Confirmation & Finality
2. Block Production & Censorship Resistance
3. Validator Scale, Issuance & Lean Specs
4. Consensus Resilience & Post-Quantum CL
5. PeerDAS & DA Capacity
6. Blob Propagation, Custody & Streaming
7. Resource Pricing, Fees & Futures
8. Gigagas L1 / P2P Throughput
9. BALs & Explicit State Access
10. Proof-Heavy Execution & Native Rollups
11. EVM Hardening & Proving Substrates
12. State Growth, Statelessness & Purges
13. Frame Transactions & Account Auth
14. Private L1 / Encrypted Mempool

附录 A 处理 fork 状态与路线图 caveat，附录 B 处理 Strawmap 中含义不稳定或非规范标签的 crosswalk。
