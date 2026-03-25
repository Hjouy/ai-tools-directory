#!/usr/bin/env python3
"""检查 u2netp.onnx 模型的输入输出节点名称"""
import onnx

model_path = "models/u2netp.onnx"
model = onnx.load(model_path)

print("=== 输入节点 ===")
for inp in model.graph.input:
    print(f"  名称: {inp.name}")
    print(f"  形状: {[d.dim_value if d.dim_value else d.dim_param for d in inp.type.tensor_type.shape.dim]}")
    print(f"  类型: {inp.type.tensor_type.elem_type}")

print("\n=== 输出节点 ===")
for out in model.graph.output:
    print(f"  名称: {out.name}")
    print(f"  形状: {[d.dim_value if d.dim_value else d.dim_param for d in out.type.tensor_type.shape.dim]}")
    print(f"  类型: {out.type.tensor_type.elem_type}")

# 也检查所有初始化器（常量）
print("\n=== 初始化器数量 ===")
print(f"  共 {len(model.graph.initializer)} 个权重/常量")
