import os
import json
import hashlib
from openai import OpenAI
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

client = OpenAI(api_key="")

def get_file_hash(file_path):
    """Generate a hash of the file content."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def convert_csv_to_pdf(csv_path, pdf_path):
    """Convert a CSV file to PDF format."""
    data = pd.read_csv(csv_path)
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter
    text = c.beginText(40, height - 40)
    text.setFont("Helvetica", 10)

    for col in data.columns:
        text.textLine(", ".join(data.columns))
        break
    for _, row in data.iterrows():
        text.textLine(", ".join(str(value) for value in row))
    c.drawText(text)
    c.save()

def load_file_info(info_path):
    """Load file info (hashes) from a JSON file in the format {filename: hash}."""
    if os.path.exists(info_path):
        with open(info_path, "r") as f:
            return set(json.load(f))
    return set()

def save_file_info(info_path, file_info):
    """Save file info (hashes) to a JSON file."""
    with open(info_path, "w") as f:
        json.dump(file_info, f, indent=4)

def load_processed_files(state_path):
    """Load the list of processed files from the state file."""
    if os.path.exists(state_path):
        with open(state_path, "r") as f:
            return json.load(f)
    return {}

def save_processed_files(state_path, processed_files):
    """Save the list of processed files to the state file."""
    with open(state_path, "w") as f:
        json.dump(processed_files, f)

def find_new_or_modified_files(directory, file_info):
    """Detect new or modified files by comparing to stored hashes."""
    new_or_modified_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            full_path = os.path.join(root, file)
            file_hash = get_file_hash(full_path)
            
            # Skip processing if file hash already exists
            if file_hash in file_info:
                continue

            print('diff')

            # Handle CSV files separately for PDF conversion
            if file.endswith('.csv'):
                pdf_path = full_path.replace(".csv", ".pdf")
                convert_csv_to_pdf(full_path, pdf_path)
                #print(f"Converted {file} to PDF: {pdf_path}")
            else:
                # For non-CSV files, add to new_or_modified list for upload
                new_or_modified_files.append(full_path)

            # Add the hash to track processed files
            file_info.add(file_hash)

    return new_or_modified_files

def upload_files(vector_store_id, file_paths, state_path):
    """Upload files to the specified vector store in batches and update the processed files state."""
    processed_files = load_processed_files(state_path)
    batch_size = 100

    for i in range(0, len(file_paths), batch_size):
        current_batch_paths = file_paths[i:i + batch_size]
        file_streams = [open(path, "rb") for path in current_batch_paths]

        try:
            file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
                vector_store_id=vector_store_id, files=file_streams
            )
            print(f"Batch {i // batch_size + 1} status:", file_batch.status)
            print(f"Batch {i // batch_size + 1} file counts:", file_batch.file_counts)

            # Mark files as processed
            for path in current_batch_paths:
                processed_files[path] = True
            
        except Exception as e:
            print(f"Error processing batch {i // batch_size + 1}: {e}")
            break  # Stop on error to avoid partial uploads
        finally:
            for stream in file_streams:
                stream.close()

    save_processed_files(state_path, processed_files)

def main(directory, vector_store_id, info_path="file_hashes.json", state_path="processed_files.json"):
    file_info = load_file_info(info_path)
    processed_files = load_processed_files(state_path)
    new_or_modified_files = find_new_or_modified_files(directory, file_info)

    if new_or_modified_files:
        print(f"Found {len(new_or_modified_files)} new or modified files.")
        upload_files(vector_store_id, new_or_modified_files, state_path)
        save_file_info(info_path, file_info)
    else:
        print("No new or modified files to upload.")

if __name__ == "__main__":
    directory = input("Enter the directory to scan for files: ")
    vector_store_id = input("Enter the vector store ID: ")
    main(directory, vector_store_id)
