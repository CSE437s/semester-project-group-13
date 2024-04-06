import mysql.connector
import json


# Define your database connection parameters
config = {
    'user': 'avnadmin',
    'port': 16031,
    'password': 'AVNS_wABtR6d4vmnUszOm4hC',
    'host': 'oasispractice-chrisspam1126-ece5.a.aivencloud.com',
    'database': 'oasis',
    'raise_on_warnings': True
}

try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Define the table creation query
    create_table_query = """
    CREATE TABLE prototypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255),
    old_id VARCHAR(255),
    country VARCHAR(255),
    event_type VARCHAR(255),
    item VARCHAR(255),
    relationship VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE
    )
    """

    # Execute the table creation query
    cursor.execute(create_table_query)

    # Commit changes and close the cursor and connection
    cnx.commit()
    cursor.close()
    cnx.close()
    print("Table created successfully.")
except mysql.connector.Error as err:
    print("Error:", err)
