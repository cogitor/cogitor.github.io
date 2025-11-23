#!/bin/bash

# This script generates multiple image renditions for the website.
# It finds all images ending in _xlarge.jpg or _xlarge.jpeg,
# creates a dedicated directory for each, and generates resized
# JPEG, WebP, and AVIF versions named by their width.
# If a target width is larger than the source image, it copies the
# largest available rendition to prevent upscaling and 404 errors.

set -e

# --- Configuration ---
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")
ASSETS_DIR="$PROJECT_ROOT/assets"

# Define the target widths for the renditions, in descending order.
TARGET_WIDTHS=(1600 1200 1024 800 640 480 360)
JPEG_QUALITY=85
AVIF_QUALITY=60

# --- Helper Functions ---
check_tool() {
  command -v "$1" >/dev/null 2>&1 || { echo >&2 "Error: Required tool '$1' not found. Please install it."; exit 1; }
}

# --- Main Script ---
check_tool "convert"
check_tool "cwebp"
check_tool "avifenc"
check_tool "identify"

if [ ! -d "$ASSETS_DIR" ]; then
  echo "Error: Assets directory '$ASSETS_DIR' not found."
  exit 1
fi

find "$ASSETS_DIR" -maxdepth 1 -type f \( -name "*_xlarge.jpg" -o -name "*_xlarge.jpeg" \) | while read -r source_image; do
  echo "Processing $source_image..."

  base_name=$(basename "$source_image" | sed -E 's/_xlarge\.(jpg|jpeg)$//')
  output_dir="$ASSETS_DIR/$base_name"
  mkdir -p "$output_dir"
  echo "  -> Creating directory: $output_dir"

  source_width=$(identify -format "%w" "$source_image")
  echo "  -> Source image width is ${source_width}px."

  # Use the source image for the largest available rendition.
  # Copy the source and generate its WebP/AVIF counterparts.
  largest_available_width=0
  for width in "${TARGET_WIDTHS[@]}"; do
      if [ "$width" -le "$source_width" ]; then
          largest_available_width=$width
          break
      fi
  done

  if [ "$largest_available_width" -eq 0 ]; then
      # If the source is smaller than the smallest target, use the source width itself.
      largest_available_width=$source_width
  fi
  
  echo "  -> Using source for ${largest_available_width}w rendition."
  # Resize source to the largest appropriate target size
  jpeg_largest="$output_dir/${largest_available_width}.jpg"
  convert "$source_image" -resize "${largest_available_width}x" -quality "$JPEG_QUALITY" "$jpeg_largest"
  
  webp_largest="$output_dir/${largest_available_width}.webp"
  cwebp -quiet -q "$JPEG_QUALITY" "$jpeg_largest" -o "$webp_largest"
  
  avif_largest="$output_dir/${largest_available_width}.avif"
  avifenc -q "$AVIF_QUALITY" "$jpeg_largest" "$avif_largest" > /dev/null 2>&1

  # Generate smaller renditions by downscaling from the largest generated JPEG.
  for width in "${TARGET_WIDTHS[@]}"; do
    if [ "$width" -lt "$largest_available_width" ]; then
      jpeg_output="$output_dir/${width}.jpg"
      webp_output="$output_dir/${width}.webp"
      avif_output="$output_dir/${width}.avif"

      echo "  -> Generating ${jpeg_output} (${width}w)"
      convert "$jpeg_largest" -resize "${width}x" -quality "$JPEG_QUALITY" "$jpeg_output"

      echo "  -> Generating ${webp_output} (${width}w)"
      cwebp -quiet -q "$JPEG_QUALITY" "$jpeg_output" -o "$webp_output"

      echo "  -> Generating ${avif_output} (${width}w)"
      avifenc -q "$AVIF_QUALITY" "$jpeg_output" "$avif_output" > /dev/null 2>&1
    fi
  done
  
  # Copy the largest available files for any skipped (larger) sizes.
  for width in "${TARGET_WIDTHS[@]}"; do
    if [ "$width" -gt "$largest_available_width" ]; then
      echo "  -> Copying ${largest_available_width}w for missing ${width}w size."
      cp "$jpeg_largest" "$output_dir/${width}.jpg"
      cp "$webp_largest" "$output_dir/${width}.webp"
      cp "$avif_largest" "$output_dir/${width}.avif"
    fi
  done
done

echo "Image rendition generation complete."