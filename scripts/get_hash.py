import os
import json
import hashlib

def get_file_hash(file_path):
    """Generate a hash of the file content."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def generate_file_hashes(directory):
    """Generate hashes for all files in the directory and its subdirectories."""
    file_hashes = {}
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.csv'):
                continue

            full_path = os.path.join(root, file)
            file_hash = get_file_hash(full_path)
            file_hashes[file] = file_hash  # Store the hash with the filename as the key
    return file_hashes

def save_file_hashes(info_path, file_hashes):
    """Save file hashes to a JSON file."""
    with open(info_path, "w") as f:
        json.dump(file_hashes, f, indent=4)

def main(directory, output_path="file_hashes.json"):
    file_hashes = generate_file_hashes(directory)
    save_file_hashes(output_path, file_hashes)
    print(f"File hashes saved to {output_path}.")

if __name__ == "__main__":
    directory = input("Enter the directory to scan for files: ")
    main(directory)
