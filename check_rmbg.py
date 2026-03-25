#!/usr/bin/env python3
import struct, sys

def read_varint(data, pos):
    result = 0; shift = 0
    while True:
        b = data[pos]; pos += 1
        result |= (b & 0x7F) << shift
        if not (b & 0x80): break
        shift += 7
    return result, pos

def read_field(data, pos):
    tag, pos = read_varint(data, pos)
    field_num = tag >> 3; wire_type = tag & 7
    if wire_type == 0:
        val, pos = read_varint(data, pos)
        return field_num, wire_type, val, pos
    elif wire_type == 2:
        length, pos = read_varint(data, pos)
        val = data[pos:pos+length]; pos += length
        return field_num, wire_type, val, pos
    elif wire_type == 5:
        val = data[pos:pos+4]; pos += 4
        return field_num, wire_type, val, pos
    else:
        return None, None, None, None

def parse_graph_io(node_data):
    names = []
    pos = 0
    while pos < len(node_data):
        try:
            fnum, wtype, val, pos = read_field(node_data, pos)
            if fnum is None: break
            if fnum == 1 and wtype == 2:
                names.append(val.decode('utf-8', errors='replace'))
        except:
            break
    return names

with open('models/rmbg-1.4-quant.onnx', 'rb') as f:
    data = f.read()

print(f"文件大小: {len(data)} bytes ({len(data)/1024/1024:.1f} MB)")

pos = 0; graph_data = None
while pos < len(data):
    try:
        fnum, wtype, val, pos = read_field(data, pos)
        if fnum is None: break
        if fnum == 7 and wtype == 2:
            graph_data = val; break
    except: break

if graph_data is None:
    print("未找到 graph"); sys.exit()

inputs = []; outputs = []
pos2 = 0
while pos2 < len(graph_data):
    try:
        fnum, wtype, val, pos2 = read_field(graph_data, pos2)
        if fnum is None: break
        if fnum == 11 and wtype == 2:
            names = parse_graph_io(val)
            if names: inputs.append(names[0])
        elif fnum == 12 and wtype == 2:
            names = parse_graph_io(val)
            if names: outputs.append(names[0])
    except: break

print(f"Input 节点名: {inputs}")
print(f"Output 节点名: {outputs}")
