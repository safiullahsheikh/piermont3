#!/usr/bin/env bash
# Encodes the client-supplied 4K footage in assets/ (not committed) into the web
# files in public/footage/. Needs ffmpeg with libx264 and libwebp.
#   bash scripts/encode-footage.sh
#
# Each clip gets a landscape (-l, 16:9) and a portrait (-p, 9:16 centre crop) cut,
# so phones decode a sharp portrait frame instead of upscaling a landscape strip,
# plus a WebP poster of the first frame.
#   ambient: plays on a loop; the tail is cross-faded into the head so the loop has no seam
#   scrub:   driven by scroll position; a keyframe every 10 frames keeps seeking smooth
# Pass clip names to encode only those, e.g. `bash scripts/encode-footage.sh hero`.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=assets
OUT=public/footage
mkdir -p "$OUT"

ONLY="$*"
X264=(-c:v libx264 -preset slow -pix_fmt yuv420p -profile:v high -movflags +faststart -an)

# name  source  start  length  mode     crf
encode() {
  local name=$1 src=$2 ss=$3 len=$4 mode=$5 crf=$6
  [[ -n $ONLY && " $ONLY " != *" $name "* ]] && return
  for shape in l p; do
    local size crop
    if [[ $shape == l ]]; then size=1280:720; crop="crop=ih*16/9:ih"; else size=720:1280; crop="crop=ih*9/16:ih"; fi
    local base="$crop,scale=$size:flags=lanczos,fps=30,setsar=1"
    # Rippled water is almost all fine detail; a light denoise and smaller frame keep it in the 6 MB / 3 MB hero budget.
    if [[ $name == hero ]]; then
      [[ $shape == l ]] && size=1600:900 || size=576:1024
      base="$crop,scale=$size:flags=lanczos,hqdn3d=2:1:3:3,fps=30,setsar=1"
    fi
    local out="$OUT/$name-$shape.mp4"
    if [[ $mode == ambient ]]; then
      # One extra second is read; it fades into the opening second so the end meets the start.
      ffmpeg -v error -y -ss "$ss" -t "$((len + 1))" -i "$SRC/$src" -filter_complex \
        "[0:v]$base,setpts=PTS-STARTPTS,split[a][b];[a]trim=$len:$((len + 1)),setpts=PTS-STARTPTS[tail];[b]trim=0:$len,setpts=PTS-STARTPTS[head];[tail][head]xfade=transition=fade:duration=1:offset=0[v]" \
        -map "[v]" "${X264[@]}" -crf "$crf" -g 60 "$out"
    else
      ffmpeg -v error -y -ss "$ss" -t "$len" -i "$SRC/$src" -vf "$base" \
        "${X264[@]}" -crf "$crf" -x264-params keyint=10:min-keyint=10:scenecut=0 "$out"
    fi
    ffmpeg -v error -y -i "$out" -frames:v 1 -c:v libwebp -quality 62 "$OUT/$name-$shape.webp"
    echo "$out $(du -k "$out" | cut -f1) KB, poster $(du -k "$OUT/$name-$shape.webp" | cut -f1) KB"
  done
}

encode loader "pier.mp4"            2 6  ambient 30
encode hero   "water shot dark.mp4" 4 7  ambient 33
encode diver  "diver.mp4"           0 13 scrub   28
encode reef   "coral reef.mp4"      0 8  scrub   28
encode ascent "bubbles.mp4"         0 12 scrub   28
