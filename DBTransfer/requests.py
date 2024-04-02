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
   CREATE TABLE requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    amount INT,
    completed BOOLEAN,
    items TEXT,
    date DATE,
    old_id VARCHAR(255),
    family_id INT,
    refugee_id INT,
    user_id_who_created INT,
    FOREIGN KEY (family_id) REFERENCES families(family_id),
    FOREIGN KEY (refugee_id) REFERENCES refugees(refugee_id),
    FOREIGN KEY (user_id_who_created) REFERENCES donators(donator_id)
);

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


