const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, 'dist', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes needed for PWA
const iconSizes = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-256x256.png', size: 256 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.ico', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'safari-pinned-tab.svg', size: 16 } // This one will be handled separately
];

// Generate all icons
async function generateIcons() {
  try {
    // Check if source icon exists
    const sourceIcon = path.join(iconsDir, 'icon.png');
    if (!fs.existsSync(sourceIcon)) {
      console.error('Error: Source icon not found at', sourceIcon);
      console.log('Please place your source icon (preferably 512x512) at:', sourceIcon);
      return;
    }

    console.log('Generating icons...');
    
    // Process each icon size
    for (const icon of iconSizes) {
      const outputPath = path.join(iconsDir, icon.name);
      
      // Handle special cases
      if (icon.name.endsWith('.svg')) {
        // Skip SVG for now as it requires different handling
        continue;
      } else {
        // Generate PNG icons
        await sharp(sourceIcon)
          .resize(icon.size, icon.size)
          .toFile(outputPath);
      }
      
      console.log(`Created: ${icon.name} (${icon.size}x${icon.size})`);
    }
    
    console.log('\nAll icons generated successfully!');
    console.log('Don\'t forget to update your manifest.json and HTML files if needed.');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Run the script
generateIcons();
