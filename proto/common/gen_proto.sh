#!/bin/bash
echo "=== 编译 proto ==="
pbjs -t static-module -w commonjs -o ./gen/plaza_netpack.js plaza_netpack.proto
pbts -o ./gen/plaza_netpack.d.ts ./gen/plaza_netpack.js
echo "=== 完成 ==="