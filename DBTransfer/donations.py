import mysql.connector
import json


# Define your database connection parameters
config = {
    'user': 'avnadmin',
    'port': 13780,
    'password': 'AVNS_UugTJpwoWZiGpP6VjcA',
    'host': 'oasisdb-oasisdb.a.aivencloud.com',
    'database': 'oasis',
    'raise_on_warnings': True
}

try:
    # Establish a connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Define the table creation query
    create_table_query = """
    CREATE TABLE donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    old_id VARCHAR(255),  # Add a column for the old ID
    amount INT,
    completed BOOLEAN,
    items TEXT,
    date DATE,
    donator_id INT,
    user_id_who_created INT,
    FOREIGN KEY (donator_id) REFERENCES donators(donator_id),
    FOREIGN KEY (user_id_who_created) REFERENCES users(user_id)
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


