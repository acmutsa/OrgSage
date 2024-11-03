import os
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from openai import OpenAI



client = OpenAI(api_key="")
 
assistant = client.beta.assistants.create(
  name="OrgSage Assistant",
  instructions="You are a helpful assistant that is an expert on the Association For Computing Machinery (ACM) at the University of Texas at San Antonio (ACM). Use your knowledge to help officers to understand how we put on events and important information to run the organization.",
  model="gpt-4o-mini",
  tools=[{"type": "file_search"}],
)

# Define the main directory containing the files and subdirectories
main_directory = "/mnt/c/"

# Function to convert a CSV file to PDF
def convert_csv_to_pdf(csv_path, pdf_path):
    data = pd.read_csv(csv_path)
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter
    text = c.beginText(40, height - 40)
    text.setFont("Helvetica", 10)

    # Add CSV content to PDF
    for col in data.columns:
        text.textLine(", ".join(data.columns))  # Header row
        break
    for i, row in data.iterrows():
        text.textLine(", ".join(str(value) for value in row))
    c.drawText(text)
    c.save()

# Recursively get all file paths from the main directory and its subdirectories
file_paths = []
for root, dirs, files in os.walk(main_directory):
    for file in files:
        full_path = os.path.join(root, file)
        
        # Check if the file is a CSV
        if file.endswith(".csv"):
            # Convert CSV to PDF and add PDF path to file_paths
            pdf_path = full_path.replace(".csv", ".pdf")
            convert_csv_to_pdf(full_path, pdf_path)
            file_paths.append(pdf_path)
        else:
            # Add non-CSV files directly to file_paths
            file_paths.append(full_path)

# Check if file_paths is not empty
if not file_paths:
    print("No files found in the directory or its subdirectories.")
else:
    # Create the vector store
    vector_store = client.beta.vector_stores.create(name="OrgSage")
    
    # Set batch size
    batch_size = 10
    
    # Upload files in batches
    for i in range(0, len(file_paths), batch_size):
        # Get the current batch of file paths
        current_batch_paths = file_paths[i:i + batch_size]
        
        # Open each file in the current batch
        file_streams = [open(path, "rb") for path in current_batch_paths]
        
        # Upload the current batch of files
        file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store.id, files=file_streams
        )
        
        # Print status and file counts for each batch
        print(f"Batch {i // batch_size + 1} status:", file_batch.status)
        print(f"Batch {i // batch_size + 1} file counts:", file_batch.file_counts)
        
        # Close all file streams in the current batch
        for stream in file_streams:
            stream.close()
