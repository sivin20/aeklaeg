#!/usr/bin/env bash
# Compresses the muted background loop videos in assets-src/video into public/.
# They autoplay silently, so audio is stripped entirely.
#
# Kept at 1080p: measured against the source, 1080p CRF 28 scores better SSIM than
# 720p CRF 24 at the same file size, so downscaling buys nothing here.
# Lower CRF = better quality, bigger file (~1.3x per 2 steps down).
#
# Run after adding a new background video:  bun run optimize:videos
set -euo pipefail

CRF=${CRF:-28}

for src in assets-src/video/*.mp4; do
    name=$(basename "$src")
    ffmpeg -y -hide_banner -loglevel error \
        -i "$src" \
        -an \
        -vf "scale='min(1920,iw)':-2:flags=lanczos" \
        -c:v libx264 -preset slow -crf "$CRF" \
        -pix_fmt yuv420p -profile:v high \
        -movflags +faststart \
        "public/$name"

    before=$(wc -c <"$src")
    after=$(wc -c <"public/$name")
    printf '%-24s %6.2f MB -> %5.2f MB  (-%d%%)\n' \
        "$name" \
        "$(echo "$before / 1048576" | bc -l)" \
        "$(echo "$after / 1048576" | bc -l)" \
        "$(echo "(1 - $after / $before) * 100" | bc -l | cut -d. -f1)"
done
