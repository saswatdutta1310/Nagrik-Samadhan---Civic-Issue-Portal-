/**
 * Image Hashing Utility for Duplicate Detection
 * Uses perceptual hashing (pHash) to detect similar/duplicate images
 */

/**
 * Convert image file to canvas for processing
 */
async function fileToCanvas(file: File): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }

                // Resize to 32x32 for perceptual hashing
                canvas.width = 32;
                canvas.height = 32;
                ctx.drawImage(img, 0, 0, 32, 32);
                resolve(canvas);
            };
            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

/**
 * Calculate average of array
 */
function average(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/**
 * Generate perceptual hash for an image
 * Returns a 64-bit hash as a hex string
 */
export async function generateImageHash(file: File): Promise<string> {
    try {
        const canvas = await fileToCanvas(file);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        // Get image data
        const imageData = ctx.getImageData(0, 0, 32, 32);
        const pixels = imageData.data;

        // Convert to grayscale and get brightness values
        const grayscale: number[] = [];
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            // Standard grayscale conversion
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            grayscale.push(gray);
        }

        // Calculate average brightness
        const avg = average(grayscale);

        // Generate hash: 1 if pixel is brighter than average, 0 otherwise
        let hash = "";
        for (let i = 0; i < grayscale.length; i++) {
            hash += grayscale[i] >= avg ? "1" : "0";
        }

        // Convert binary string to hex for compact storage
        let hexHash = "";
        for (let i = 0; i < hash.length; i += 4) {
            const chunk = hash.substr(i, 4);
            hexHash += parseInt(chunk, 2).toString(16);
        }

        return hexHash;
    } catch (error) {
        console.error("Error generating image hash:", error);
        throw error;
    }
}

/**
 * Calculate Hamming distance between two hashes
 * Returns number of different bits
 */
export function hammingDistance(hash1: string, hash2: string): number {
    if (hash1.length !== hash2.length) {
        throw new Error("Hashes must be same length");
    }

    // Convert hex to binary
    const bin1 = parseInt(hash1, 16).toString(2).padStart(hash1.length * 4, "0");
    const bin2 = parseInt(hash2, 16).toString(2).padStart(hash2.length * 4, "0");

    let distance = 0;
    for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] !== bin2[i]) {
            distance++;
        }
    }

    return distance;
}

/**
 * Check if two images are similar based on their hashes
 * @param hash1 First image hash
 * @param hash2 Second image hash
 * @param threshold Maximum allowed difference (default: 10)
 * @returns true if images are similar
 */
export function areImagesSimilar(
    hash1: string,
    hash2: string,
    threshold: number = 10
): boolean {
    try {
        const distance = hammingDistance(hash1, hash2);
        return distance <= threshold;
    } catch (error) {
        console.error("Error comparing hashes:", error);
        return false;
    }
}

/**
 * Check if an image hash exists in a list of hashes
 * @param newHash Hash of the new image
 * @param existingHashes Array of existing hashes
 * @param threshold Similarity threshold
 * @returns Index of matching hash, or -1 if no match
 */
export function findDuplicateHash(
    newHash: string,
    existingHashes: string[],
    threshold: number = 10
): number {
    for (let i = 0; i < existingHashes.length; i++) {
        if (areImagesSimilar(newHash, existingHashes[i], threshold)) {
            return i;
        }
    }
    return -1;
}
 
 
